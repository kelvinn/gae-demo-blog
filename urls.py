from django.conf.urls.defaults import *
from blog.views import *
from blog.models import *
from myhelpers import run_tasks, synccontacts
from rss.views import *
#from rss.feeds import *

feeds = {
    'blog': LatestFeed,
    'articles': LatestFeed,
    'all': LatestFeed,
}

urlpatterns = patterns('',
    (r'^$', get_index),
    (r'^blog/$', get_post_list, {'genre': "blog"}),
    (r'^articles/$', get_post_list, {'genre': "articles"}),
    (r'^tech-blog/$', redirect_this, {'slug': None}),
    (r'^projects/$', get_post_list, {'genre': "projects"}),
    (r'^howtos/$', get_post_list, {'genre': "howtos"}),
    (r'^blog/([-\w]+)/(?P<slug>[-\w]+)/$', get_post_detail),
    (r'^tech-blog/(?P<slug>[-\w]+)/$', redirect_this),
    (r'^articles/(?P<slug>[-\w]+)/$', get_post_detail),
    (r'^howtos/(?P<slug>[-\w]+)/$', get_post_detail),
    (r'^projects/(?P<slug>[-\w]+)/$', get_post_detail),
    (r'^tags/(?P<slug>[-\w]+)/$', get_tags_list),
    (r'^country/(?P<slug>[-\w]+)/$', posts_by_country),
    (r'^about-me/$', about_me),
    (r'^press/$', show_press),
    (r'^ajax/books/$', get_books_live),
    (r'^travelmap/$', travelmap),
    (r'^feeds/dev/$', show_rss),
    #(r'^feeds/all/(?P<url>.*)/', 'rss.views.feed', {'feed_dict': feeds}),
    (r'^sitemap.xml$', get_sitemap),
    (r'^tasks/(?P<tasktype>[-\w]+)/$', run_tasks),
    (r'^synccontacts/$', synccontacts),
    (r'^syncfeeds/$', syncfeeds),
    (r'^engagement/$', engagement),
)
