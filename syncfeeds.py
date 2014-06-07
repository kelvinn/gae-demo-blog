import pytz
import feedparser
from datetime import datetime

from django.conf import settings
from blog.models import Blob

tz = pytz.timezone(settings.TIME_ZONE)

disqus_rss = feedparser.parse('http://disqus.com/zephell/latest.rss')
for comment in disqus_rss['entries']:
    if comment['author'] == 'zephell':
        id = comment.get('link')
        entry, created = Blob.objects.get_or_create(id=id)
        if created:
            entry.body = comment['summary']
            entry.service_name = "Disqus"
            entry.link = comment['link']
            t = comment['updated_parsed']
            entry.published = datetime(*t[:6]) 
        entry.save()
    
twitter_rss = feedparser.parse('http://twitter.com/statuses/user_timeline/5985472.rss')
for i in twitter_rss['entries']:
    entry, created = Blob.objects.get_or_create(id=i.get('id'))
    if created:
        entry.body = i['title'].split("zephell: ")[1]
        entry.service_name = "Twitter"
        entry.link = i['link']
        t = i['updated_parsed']
        entry.published = datetime(*t[:6]) 
    entry.save()
    
picasa_rss = feedparser.parse("http://picasaweb.google.com/data/feed/base/user/username")
for i in picasa_rss['entries']:
    entry, created = Blob.objects.get_or_create(id=i.get('id'))
    if created:    
        entry.body = "Uploaded photo %s" % i['media_description']
        entry.service_name = "Picasa"
        entry.link = i["link"]
        t = i['updated_parsed']
        entry.published = datetime(*t[:6]) 
    entry.save()
