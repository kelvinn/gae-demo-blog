import os

# 'project' refers to the name of the module created with django-admin.py
ROOT_URLCONF = 'urls'

DEBUG = os.getenv('SERVER_SOFTWARE').split('/')[0] == "Development" if os.getenv('SERVER_SOFTWARE') else False

#DEBUG = True


MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
#    'django.contrib.sessions.middleware.SessionMiddleware',
#    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.middleware.doc.XViewMiddleware',
)

INSTALLED_APPS = (
#    'django.contrib.auth',
    'django.contrib.contenttypes',
#    'django.contrib.sessions',
    'blog',
    'rss',
    #'django.contrib.sites',
)

TEMPLATE_CONTEXT_PROCESSORS = (
  "django.core.context_processors.request",
  "django.core.context_processors.auth",)

FILE_UPLOAD_HANDLERS = ('django.core.files.uploadhandler.MemoryFileUploadHandler',)
FILE_UPLOAD_MAX_MEMORY_SIZE = 2621440 # the django default: 2.5MB

# This is for Google's APIs
CLIENT_ID = 'CLIENTID.apps.googleusercontent.com'
CLIENT_SECRET = 'SECRET'
API_KEY = 'API_KEY'
DISCOVERY_DOCUMENT = "https://www.googleapis.com/discovery/v1/apis/plus/v1/rest"

ROOT_PATH = os.path.dirname(__file__)
TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or
    # "C:/www/django/templates".  Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    ROOT_PATH + '/templates',
)
