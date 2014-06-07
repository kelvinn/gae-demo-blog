#!/usr/bin/python
import sys, os, socket
from time import sleep
sys.path.append('/home/vhosts/kelvinism.com/kelvinism/')

from django.core.management import setup_environ
import settings
setup_environ(settings)


from blog.models import *
from myhelpers import *

try:
    if sys.argv[1] == 'all':
        book_list = Book.objects.all()
    else:
        book_list = Book.objects.filter(isbn=sys.argv[1])
    for book in book_list:
        sleep(1)
        try:
            book_dict = lookup_isbn(book.isbn, "medium")
            book.url = book_dict['book_link']
            book.image = book_dict['book_img']
            book.title = book_dict['book_title']
            book.save()
            print "%s: Success!" % book.isbn
        except:
            print "%s: No URL or Image" % book.isbn
            continue
except:
    print "Usage: reload_books.py [ all | isbn ]"

