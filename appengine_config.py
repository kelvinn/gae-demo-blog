#def webapp_add_wsgi_middleware(app):
#   from google.appengine.ext.appstats import recording
#   app = recording.appstats_wsgi_middleware(app)
#   return app
import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings' 
from google.appengine.dist import use_library
use_library('django', '1.2')