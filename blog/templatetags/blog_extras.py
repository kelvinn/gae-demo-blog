from django import template
from google.appengine.api import memcache
from blog.models import *
from myhelpers import lookup_isbn
from myhelpers import lookup_book

register = template.Library()

def list_countries():
	all_countries = Country.objects.all().order_by('country')
	return {'all_countries': all_countries}
register.inclusion_tag('blog/list_countries.html')(list_countries)

def list_tags():
    all_tags = Tag.objects.all()
    return {'all_tags': all_tags}
register.inclusion_tag('blog/list_tags.html')(list_tags)

def get_tweet():
    #tweet = Blob.objects.filter(service_name="Twitter")
    #return {'tweet': tweet[0]}
    return {'tweet': "Success"}
register.inclusion_tag('blog/get_tweet.html')(get_tweet)

def generate_books(format_string):
    book_results = memcache.get(format_string)
    if book_results is not None:
        return {"book_results": book_results, }
    else:
        book_results = lookup_book(format_string)
        memcache.add(format_string, book_results, 3600)
        return {"book_results": book_results, }
register.inclusion_tag('blog/list_books.html')(generate_books)

def generate_id():
    import random
    id = ""
    for x in xrange(1, 7):
        id = id + str(int(random.uniform(400, 900)))
    id = id + "8"
    return {'obj': id}
register.inclusion_tag('blog/generate_id.html')(generate_id)