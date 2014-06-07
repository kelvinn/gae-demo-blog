from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.api import users

from django import forms
from django.shortcuts import render_to_response
from django.template.defaultfilters import slugify
from google.appengine.ext.db import djangoforms
from blog.models import Entry, Country, Tag

from google.appengine.dist import use_library
use_library('django', '1.2')

import os
import re

import shlex
from datetime import date, datetime

import cgi

class CountryForm(djangoforms.ModelForm):
  class Meta:
    model = Country
    exclude = [ 'slug' ]

class EditCountryForm(djangoforms.ModelForm):
  class Meta:
    model = Country
    exclude = [ 'slug' ]

class EntryForm(djangoforms.ModelForm):
  class Meta:
    model = Entry
    exclude = [ 'slug' ]

class EditEntryForm(djangoforms.ModelForm):
  class Meta:
    model = Entry
    exclude = [ 'slug', 'tags', ]

class ViewPage(webapp.RequestHandler):
    def get(self):

        item_type = self.request.get('item')
        if item_type == "entry":
            object_list = Entry.all()
        elif item_type == "country":
            object_list = Country.all()
        else:
            item_type = None
            object_list = Entry.all()

        object_list = object_list.order('-publish_date')
        if users.get_current_user():
            url = users.create_logout_url(self.request.uri)
            url_linktext = 'Logout'
        else:
            url = users.create_login_url(self.request.uri)
            url_linktext = 'Login'

        template_values = {
            'object_list': object_list,
            'item_type': item_type,
            'url': url,
            'url_linktext': url_linktext,
        }

        path = os.path.join(os.path.dirname(__file__), 'templates/admin/view.html')
        self.response.out.write(template.render(path, template_values))

class AddPage(webapp.RequestHandler):
    def get(self):

        item_type = self.request.get('item_type')
        if item_type == "entry":
            form = EntryForm()
        else:
            form = CountryForm()

        if users.get_current_user():
            url = users.create_logout_url(self.request.uri)
            url_linktext = 'Logout'
        else:
            url = users.create_login_url(self.request.uri)
            url_linktext = 'Login'

        template_values = {
            'form': form,
            'item_type': item_type,
            'url': url,
            'url_linktext': url_linktext,
        }

        path = os.path.join(os.path.dirname(__file__), 'templates/admin/edit.html')
        self.response.out.write(template.render(path, template_values))

class EditPage(webapp.RequestHandler):
    def get(self):


        key = self.request.get('key')
        item_type = self.request.get('item_type')
        if item_type == "entry":
            entry = Entry.get(key)
            form = EditEntryForm(instance=entry)
        else:
            entry = Country.get(key)
            form = EditCountryForm(instance=entry)

        if users.get_current_user():
            url = users.create_logout_url(self.request.uri)
            url_linktext = 'Logout'
        else:
            url = users.create_login_url(self.request.uri)
            url_linktext = 'Login'

        template_values = {
            'form': form,
            'item_type': item_type,
            'key': key,
            'url': url,
            'url_linktext': url_linktext,
        }

        path = os.path.join(os.path.dirname(__file__), 'templates/admin/edit.html')
        self.response.out.write(template.render(path, template_values))

class SubmitPage(webapp.RequestHandler):
    def post(self):
        self.response.out.write('<html><body>You wrote:<pre>')
        key = self.request.get('id_key')
        title = self.request.get('title')
        slug = str(slugify(title))
        item_type = self.request.get('item_type')
        tag_list = None


        if item_type == "entry":
            content = self.request.get('content')
            genre = self.request.get('genre')
            enable_comments = self.request.get('enable_comments')
            country = self.request.get('country')
            core_topic = self.request.get('core_topic')
            tags = self.request.get('tags')
            private = self.request.get('private')
            publish_date = self.request.get('publish_date')
 
            if publish_date:
                publish_date = datetime.strptime(publish_date, '%Y-%m-%d').date()
            else:
                publish_date = datetime.today().date()
                
            if genre == "blog":
                country_obj = Country.get(country)
            else:
                country_obj = None

            if key:
                entry = Entry.get(key)
            else:
                entry = Entry()
            entry.title = title
            entry.slug = slug
            entry.content = content
            entry.genre = genre
            entry.country = country_obj
            entry.publish_date = publish_date
            if len(core_topic):
                entry.core_topic = core_topic
            if private == "on":
                b = bool("1")
            else:
                b = bool("")
            entry.private = b
            entry.put()

            if len(tags) > 0:
                tag_list = shlex.split(str(tags))
                if tag_list:
                  for tag in tag_list:
                      tag_obj = Tag.get_or_insert(str(tag))
                      if tag_obj.name == None:
                          tag_obj.name = str(tag)
                          tag_obj.put()
                      entry.tags.append(tag_obj.key())
                  entry.put()
        else:
            map_url = self.request.get('map_url')
            if key:
                country = Country.get(key)
            else:
                country = Country()
            country.title = title
            country.slug = slug
            country.map_url = map_url
            country.put()

        self.response.out.write(str("Key: %s<br />" % key))
        self.response.out.write(str("Title: %s<br />" % title))
        self.response.out.write(str("Slug: %s<br />" % slug))
        self.response.out.write(str("Type: %s<br />" % item_type))
        if tag_list:
          self.response.out.write(str("Tags: %s<br />" % tags))
       
        self.response.out.write('</pre></body></html>')


application = webapp.WSGIApplication([
  ('/admin/add/', AddPage),
  ('/admin/submit/', SubmitPage),
  ('/admin/edit/', EditPage),
  ('/admin/view/', ViewPage),
])


def main():
  run_wsgi_app(application)


if __name__ == '__main__':
  main()


