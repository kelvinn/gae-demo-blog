from google.appengine.ext import db

class Country(db.Model):
    title = db.StringProperty()
    slug = db.StringProperty()
    map_url = db.StringProperty('Link to Map', default=None)

    def __unicode__(self):
        return u'%s' % self.title

    def __str__(self):
        return self.__unicode__()

class Tag(db.Model):
    name = db.StringProperty()

    @property
    def members(self):
      return Entry.gql("WHERE tags = :1 ORDER BY publish_date DESC", self.key())

class MyContact(db.Model):
    email = db.EmailProperty()

class Entry(db.Model):
    title = db.StringProperty()
    slug = db.StringProperty()
    map_url = db.StringProperty('Link to Map', default=None)
    publish_date = db.DateProperty()
    content = db.TextProperty()
    genre = db.StringProperty(
        choices=('blog', 'articles', 'projects', 'howtos'))
    enable_comments = db.BooleanProperty(default=True)
    country = db.ReferenceProperty(Country)
    core_topic = db.StringProperty()
    tags = db.ListProperty(db.Key)
    private = db.BooleanProperty(default=False)


    def __unicode__(self):
        return u'%s' % self.title

    def __str__(self):
        return self.__unicode__()

    def get_absolute_url(self):
        if self.genre == "blog":
            return '/%s/%s/%s/' % (self.genre, self.country.slug, self.slug)
        else:
            return '/%s/%s/' % (self.genre, self.slug)


class Blob(db.Model):
    content = db.TextProperty()
    service_name = db.StringProperty()
    link = db.LinkProperty()
    publish_date = db.DateTimeProperty()

    def __unicode__(self):
        return self.id

    class Meta:
        ordering = ['-published']
        verbose_name = 'Blob'
        verbose_name_plural = 'Blobs'

    def get_absolute_url(self):
        return "/"


