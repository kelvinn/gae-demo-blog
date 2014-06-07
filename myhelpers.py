import xml.dom.minidom
import base64, hashlib, hmac, time
from urllib import urlencode, quote_plus, urlopen, quote
from google.appengine.api.labs import taskqueue
from google.appengine.ext import db
from django.template.defaultfilters import slugify
from django.http import HttpResponseRedirect, HttpResponse
from blog.models import Entry, Country, Tag, MyContact

AWS_ACCESS_KEY_ID = 'ACCESSKEY'
AWS_SECRET_ACCESS_KEY = 'SECRET'
AWS_ASSOCIATE_TAG = 'TAG'

def lookup_isbn(isbn, img_size):
    base_url = "http://ecs.amazonaws.com/onca/xml"
    url_params = dict(
        Service='AWSECommerceService',
        Operation='ItemLookup',
        IdType='ISBN',
        ItemId=isbn,
        SearchIndex='Books',
        AWSAccessKeyId=AWS_ACCESS_KEY_ID,
        AssociateTag=AWS_ASSOCIATE_TAG,
        ResponseGroup='Images,ItemAttributes,EditorialReview,SalesRank')

    #Can add Version='2009-01-06'. What is it BTW? API version?


    # Add a ISO 8601 compliant timestamp (in GMT)
    url_params['Timestamp'] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

    # Sort the URL parameters by key
    keys = url_params.keys()
    keys.sort()
    # Get the values in the same order of the sorted keys
    values = map(url_params.get, keys)

    # Reconstruct the URL parameters and encode them
    url_string = urlencode(zip(keys,values))

    #Construct the string to sign
    string_to_sign = "GET\necs.amazonaws.com\n/onca/xml\n%s" % url_string

    # Sign the request
    signature = hmac.new(
        key=AWS_SECRET_ACCESS_KEY,
        msg=string_to_sign,
        digestmod=hashlib.sha256).digest()

    # Base64 encode the signature
    signature = base64.encodestring(signature).strip()

    # Make the signature URL safe
    urlencoded_signature = quote_plus(signature)
    url_string += "&Signature=%s" % urlencoded_signature
    url = "%s?%s" % (base_url, url_string)
    result_xmlstr = urlopen(url).read()

    dom = xml.dom.minidom.parseString(result_xmlstr)

    book_title = None

    try:
        first_book_item = dom.getElementsByTagName("Item")[0]
        book_title = first_book_item.getElementsByTagName("Title")[0].firstChild.data
        book_link =  first_book_item.getElementsByTagName("DetailPageURL")[0].firstChild.data

        if img_size == "small":
            book_img_item =  first_book_item.getElementsByTagName("SmallImage")[0]
        else:
            book_img_item =  first_book_item.getElementsByTagName("MediumImage")[0]

        book_img = book_img_item.getElementsByTagName('URL')[0].firstChild.data
    except:
        book_img = None
        book_link = None
        
    return {"book_img": book_img,
           "book_link" : book_link, "book_title": book_title
           }

def lookup_book(search_string):

    base_url = "http://ecs.amazonaws.com/onca/xml"
    url_params = dict(
        Service='AWSECommerceService',
        Operation='ItemSearch',
        SearchIndex='Books',
        Keywords=quote_plus(search_string),
        Sort='relevancerank',
        AWSAccessKeyId=AWS_ACCESS_KEY_ID,
        AssociateTag=AWS_ASSOCIATE_TAG,
        ResponseGroup='Images,ItemAttributes,SalesRank')

    #Can add Version='2009-01-06'. What is it BTW? API version?


    # Add a ISO 8601 compliant timestamp (in GMT)
    url_params['Timestamp'] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

    # Sort the URL parameters by key
    keys = url_params.keys()
    keys.sort()
    # Get the values in the same order of the sorted keys
    values = map(url_params.get, keys)

    # Reconstruct the URL parameters and encode them
    url_string = urlencode(zip(keys,values))

    #Construct the string to sign
    string_to_sign = "GET\necs.amazonaws.com\n/onca/xml\n%s" % url_string

    # Sign the request
    signature = hmac.new(
        key=AWS_SECRET_ACCESS_KEY,
        msg=string_to_sign,
        digestmod=hashlib.sha256).digest()

    # Base64 encode the signature
    signature = base64.encodestring(signature).strip()

    # Make the signature URL safe
    urlencoded_signature = quote_plus(signature)
    url_string += "&Signature=%s" % urlencoded_signature
    url = "%s?%s" % (base_url, url_string)

    result_xmlstr = urlopen(url).read()
    
    dom = xml.dom.minidom.parseString(result_xmlstr)

    book_items = dom.getElementsByTagName("Item")
    book_list = []
    for x in xrange(0,4):
        try:
            book_link =  book_items[x].getElementsByTagName("DetailPageURL")[0].firstChild.data
            book_img_item =  book_items[x].getElementsByTagName("MediumImage")[0]
            book_img = book_img_item.getElementsByTagName('URL')[0].firstChild.data
            book_list.append({"book_img": book_img, "book_link" : book_link,})
        except:
            continue
    return book_list


def verify_fb_auth(user):
    if user.is_authenticated():
        fb_profile = request.user.facebookprofile_set
        fb_uid = fb_profile.values()[0]['uid']
        args = {"type":"client_cred", "client_id":"ID","client_secret":"ABCD"}
        response = cgi.parse_qs(urllib.urlopen("https://graph.facebook.com/oauth/access_token?" +urllib.urlencode(args)).read())
        access_token = response["access_token"][-1];
        qurl = "https://graph.facebook.com/UID/friends?access_token=%s" % access_token
        response = urllib.urlopen(qurl).read()
        if response.find(fb_uid) < 0 and fb_uid != "UID":
            to_abbrv = False
    else:
        to_abbrv = True
    return to_abbrv

def clean_gae():
   query = Entry.all()
   entries =query.fetch(1000)
   db.delete(entries)

   query = Country.all()
   countries = query.fetch(1000)
   db.delete(countries)

   query = Tag.all()
   tags = query.fetch(1000)
   db.delete(tags)

def synccontacts(request):
    import vobject
    
    f = open("list.vcf")
    a = vobject.readComponents(f)

    for b in a:
      if 'email' in b.contents:
        contact = MyContact.get_or_insert(b.email.value)
        if None:
            contact.email = b.email.value
            contact.put()
     
    f.close()
    return HttpResponse("OK.")

def run_tasks(request, tasktype):
    import os
    DEV = os.environ['SERVER_SOFTWARE'].startswith('Development')

    if tasktype == "cleangae" and DEV:
        clean_gae()

    if tasktype == "syncfeeds":
        taskqueue.add(url='/syncfeeds/')

    elif tasktype == "synccontacts":
        taskqueue.add(url='synccontacts')
    return HttpResponse("OK")



