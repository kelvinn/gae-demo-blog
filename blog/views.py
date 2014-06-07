from django.shortcuts import render_to_response, get_object_or_404
from django.template.defaultfilters import slugify
from django.template import RequestContext
from django.http import HttpResponseRedirect, HttpResponse, HttpResponsePermanentRedirect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.exceptions import ObjectDoesNotExist
from rss.feeds import Feed, FeedDoesNotExist
from google.appengine.api.labs import taskqueue
from google.appengine.api import memcache
from google.appengine.api import users
from blog.models import *
import urllib
import pprint
import settings
    
def get_blob_status():
    mem_key = "blob status twitter"
    status = memcache.get(mem_key)
    if status is None:
        q = Blob.all()
        q = q.filter("service_name =", "Twitter")
        q = q.order("-publish_date")
        status = q.get()
        memcache.add(mem_key, status, 600)
    return status

def verify_user(user):
    if user:
        email = user.email()
        q = MyContact.all()
        q = q.filter("email =", email)
        contact_list = q.fetch(1)
        if contact_list > 0:
            valid_user = True
        else:
            valid_user = None
    else:
        valid_user = None
    return valid_user

def get_index(request):

    more_entries = None
    more_type = None
    email = None
    login_url= None
    valid_user = None
    mem_key = "entry index"

    object_list = memcache.get(mem_key)
    
    #This filters out any entries listed as private
    if object_list is None:
        q = Entry.all()
        object_list = q.filter('private =', False)
        object_list = q.order('-publish_date')       
        memcache.add(mem_key, object_list, 3600)

    status = get_blob_status()

    q = Country.all()
    country_list = q.order("title")
    
    #This allows the template filter to show any entry
    valid_user = True

    return render_to_response("blog/entry_detail.html", {
        'object': object_list[0],
        'valid_user': valid_user,
        'login_url': login_url,
        'email': email,
        'more_entries': object_list[:5],
        'more_type': "Recent Entries",
        'country_list': country_list,
        'status': status,
    },context_instance=RequestContext(request))


def get_post_list(request, genre):

    PAGESIZE = 5
    more_entries = None
    more_type = None
    email = None
    login_url = None
    valid_user = None
    country_list = None
    mem_key = "entry -publish_date "+str(genre)

    object_list = memcache.get(mem_key)
    if object_list is None:
        q = Entry.all()
        q = q.order('-publish_date')
        object_list = q.filter("genre =", genre)
        memcache.add(mem_key, object_list, 3600)

    paginate_by = 5
    paginator = Paginator(object_list,  paginate_by)

    page = request.GET.get('page')


    if page:
        entries = paginator.page(page)
    else:
        # If page is not an integer, deliver first page.
        entries = paginator.page(1)

    status = get_blob_status()

    if genre == "projects":
        about_text = "This page lists the projects I have worked on, or am working on."
    elif genre == "howtos":
        about_text = "This page lists the tutorials I have written for the greater tech community."    
    elif genre == "tech-blog":
        about_text = "This page lists the technology-related articles I have written."
    elif genre == "articles":
        about_text = "This page lists various articles I have written."
    elif genre == "blog":
        about_text = "This page lists the entries surrounding my life that I have written."
        q = Country.all()
        country_list = q.order("title")

    user = users.get_current_user()
    valid_user = verify_user(user)
    if valid_user == None:
        login_url=users.create_login_url(request.build_absolute_uri())

    return render_to_response("blog/entry_list.html", {  
        'more_entries': object_list[:5],
        'more_type': "Recent Entries",
        'genre': genre,
        'valid_user': valid_user,
        'login_url': login_url,
        'country_list': country_list,
        'about_text': about_text,
        'status': status,
        'entries': entries,
    },context_instance=RequestContext(request))

def travelmap(request):

    # show the travel map
    return render_to_response("blog/travelmap.html", {
                                },)

def engagement(request):

    # add in recent entries here
    return render_to_response("blog/engagement.html", {
        },)

def about_me(request):

    q = Blob.all()
    q = q.filter("service_name =", "Twitter")
    q = q.order("-publish_date")
    status_list = q.fetch(5)

    # add in recent entries here
    return render_to_response("blog/about_me.html", {
                                "status_list": status_list,
                                },)

def show_press(request):
    # add in recent entries here
    return render_to_response("blog/press.html", {
                                },)

def redirect_this(request, slug):
    if slug == None:
        return HttpResponsePermanentRedirect("/articles/")
    else:
        return HttpResponsePermanentRedirect("/articles/%s/" % slug)

def get_post_detail(request, slug):

    login_url = None
    valid_user = None

    q = Entry.all()
    q = q.filter("slug =", slug)
    entry_obj = q.get()

    q = Entry.all()
    q = q.order('-publish_date')

    if entry_obj.country and entry_obj.genre:
        q = q.filter("country =", entry_obj.country)
        more_entries = q.fetch(5)
        more_type = "Other Entries in %s" % entry_obj.country.title
    else:
        more_entries = q.fetch(5)
        more_type = "Recent Entries"

    status = get_blob_status()

    user = users.get_current_user()
    valid_user = verify_user(user)
    if valid_user == None:
        login_url=users.create_login_url(request.build_absolute_uri())

    return render_to_response("blog/entry_detail.html", {   
                'object': entry_obj,
                'genre': entry_obj.genre,
                'login_url': login_url,
                'valid_user': valid_user,
                'more_entries': more_entries,
                'more_type': more_type,
                'status': status,
                },context_instance=RequestContext(request))

def get_all_paths():
    keys = []

    cur = Entry.all().fetch(1000)
    while len(cur) == 1000:
        keys.extend(cur)
        q = Entry.all(keys_only=True)
        q.filter('__key__ >', cur[-1])
        cur = q.fetch(1000)
    keys.extend(cur) 
    return [x.get_absolute_url() for x in keys]

def get_sitemap(request):
    paths = memcache.get("sitemappaths")
    if paths is None:
        paths = get_all_paths()
        memcache.add("sitemappaths", paths, 3600)
    return render_to_response("sitemap.xml", {  
        'paths': paths,
        }, mimetype='application/xml')

def show_rss(self):
    q = Entry.all()
    q = q.filter("genre !=", "blog")
    entries = q.fetch(500)
    return render_to_response("feeds/rss.html", {
        'entries': entries,
        }, mimetype='text/plain')

class LatestFeed(Feed):
    title_template = 'feeds/all_title.html'
    description_template = 'feeds/all_description.html'

    title = "Kelvin's Recent Entries"
    link = "/"
    description = "Kelvinism.com, a few notes about I.T. and Traveling. These are my ramblings."

    def items(self):
        genre = self.request.path.split("/")[2]
        mem_key = "entry %s -publish_date 10" % genre
        entries = memcache.get(mem_key)
        if entries is None:
            q = Entry.all()
            if genre != "all":
                q = q.filter("genre =", genre)
            q = q.order('-publish_date')
            entries = q.fetch(10)
            #memcache.add(mem_key, entries, 3600)
        return entries


class LatestTagFeed(Feed):
    title_template = 'feeds/tag_title.html'
    description_template = 'feeds/tag_description.html'
    """
    The most recent content with a particular tag.
    """

    def get_object(self, bits):
        """
        Fetch the Tag object.
        """
        if len(bits) != 1:
            raise ObjectDoesNotExist
        else:
            q = Tag.all()
            q = q.filter("name =", bits[0])
            tag_obj = q.get()
            return tag_obj

    def title(self, obj):
        """
        Set the feed title.
        """
        return "%s . tags . kelvinism" % obj.name

    def description(self, item):
        """
        Set the feed description.
        """
        return "the latest tagged %s" % item.name.lower()

    def item_pubdate(self, item):
        from datetime import datetime, time
        return datetime.combine(item.publish_date, time())

    def link(self, obj):
        """
        Set the feed link.
        """
        if not obj:
            raise FeedDoesNotExist
        return u'/tags/%s/' % obj.name

    def items(self, obj):
        """
        Fetch the latest 10 objects with a particular tag, which is passed as the `obj` argument.
        """
        # Pull all the items with that tag.
        taggeditem_list = obj.members
        # Loop through the tagged items and return just the items with a pub_date attribute
        #object_list = [i.object for i in taggeditem_list if getattr(i.object, 'publish_date', False)]
        # Now resort them by the pub_date attribute with the newest coming first
        #object_list.sort(key=lambda x: x.publish_date, reverse=True)
        # And return the first ten.
        return taggeditem_list[:10]

    def item_link(self, obj):
        """
        Set the URL for each tagged item, using the url attribute we have on each of our models.
        """
        if not obj:
            raise FeedDoesNotExist
        return obj.get_absolute_url()


def posts_by_country(request, slug):

    login_url = None
    valid_user = None

    q = Country.all()
    q.filter("slug =", slug)
    country_obj = q.get()

    mem_key = "entry %s -publish_date" % country_obj.slug
    object_list = memcache.get(mem_key)
    if object_list is None:
        q = Entry.all()
        q = q.filter("country =", country_obj)
        object_list = q.order('-publish_date')
        memcache.add(mem_key, object_list, 3600)

    status = get_blob_status()

    user = users.get_current_user()
    valid_user = verify_user(user)
    if valid_user == None:
        login_url=users.create_login_url(request.build_absolute_uri())

    more_type = "Related Entries in %s" % country_obj.title
    paginate_by = 5
    paginator = Paginator(object_list,  paginate_by)

    page = request.GET.get('page')

    about_text = "These are posts from <b>%s</b>" % country_obj.title

    q = Country.all()
    country_list = q.order("title")

    if page:
        entries = paginator.page(page)
    else:
        # If page is not an integer, deliver first page.
        entries = paginator.page(1)

    return render_to_response("blog/entry_list.html", {  
        'more_entries': object_list[:5], 
        'more_type': more_type,
        'login_url': login_url,
        'valid_user': valid_user,
        'country_obj': country_obj,
        'country_list': country_list,
        'about_text': about_text,
        'status': status,
        'entries': entries,
    },context_instance=RequestContext(request))

def get_tags_list(request, slug):
    from re import sub

    login_url = None

    slug = sub('-',' ',slug)

    q = Tag.all()
    q.filter("name =", slug)
    tag_obj = q.get()

    status = get_blob_status()

    user = users.get_current_user()
    valid_user = verify_user(user)
    if valid_user == None:
        login_url=users.create_login_url(request.build_absolute_uri())

    about_text = "These posts are tagged with <b>%s</b>." % slug
    if tag_obj:
        mem_key = tag_obj.name + " members"
        object_list = memcache.get(mem_key)
        if object_list is None:
            object_list = tag_obj.members #.order('-publish_date')
            memcache.add(mem_key, object_list, 3600)

        paginate_by = 5
        paginator = Paginator(object_list,  paginate_by)

        page = request.GET.get('page')

        if page:
            entries = paginator.page(page)
        else:
            # If page is not an integer, deliver first page.
            entries = paginator.page(1)
    else:
        object_list = None
        entries = None

    return render_to_response("blog/entry_list.html", {   
        'entries': entries,
        'status': status,
        'valid_user': valid_user,
        'login_url': login_url,
        'about_text': about_text,
        'more_entries': object_list[:5],
        'more_type': "Related Entries",
        'search_slug': slug,
    },context_instance=RequestContext(request))

def get_books_live(request):

    txt = memcache.get("recentbooks")
    if txt is not None:
        return HttpResponse(txt)
    else:
        import feedparser
        d = feedparser.parse("http://www.goodreads.com/")
        txt = ""
        book_list = d['items']
        for book in book_list:
            url = book['link']
            img = book['book_medium_image_url']
            title = book['title']
            prep_text = "<a href='%s'><img src='%s' alt='%s' class='book' /></a>" % (url, img, title)
            txt = txt + prep_text
        memcache.add("recentbooks", txt, 3600)
        return HttpResponse(txt)

#@decorator.oauth_aware
def get_google_plus(request):
        if (not decorator.has_credentials()):
            return HttpResponse('/login')

        http = decorator.http()
        people = service.people().get(userId='me').execute(http)
        import pprint

        logging.info(pprint.pformat(people))
        path = os.path.join(os.path.dirname(__file__), 'play.html')

        me = service.people().get(userId='me').execute(decorator.http())

        # Now I have my own id, I can do things unauth'd
        # I could continue using my authenticated service,
        # but for example we'll use a second unauth'd one.
        activities_doc = serviceUnauth.activities().list(userId=me['id'], collection='public').execute(httpUnauth)

        activities = []
        if 'items' in activities_doc:
            activities += activities_doc['items']

        top_activity_content = "No top activity content"

        if len(activities) > 0:
            activities_doc = serviceUnauth.activities().get(activityId=activities[0]['id']).execute(httpUnauth)

            top_activity_content = activities_doc['object']['content']

        self.response.out.write(
            template.render(path, {'me': me, 'activities': activities,
                                   'top_activity_content': top_activity_content}))
        
        return HttpResponse(top_activity)
    
def syncfeeds(request):
    import feedparser
    from datetime import datetime

    twitter_rss = feedparser.parse('http://twitter.com/')
    for i in twitter_rss['entries']:
        id=i.get('id')
        entry = Blob.get_or_insert(id)
        if entry.content == None:
            entry.content = i['title'].split("zephell: ")[1]
            entry.service_name = "Twitter"
            entry.link = i['link']
            t = i['updated_parsed']
            entry.publish_date = datetime(*t[:6])
            entry.put()

    return HttpResponse("OK")