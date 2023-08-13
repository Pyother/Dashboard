import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

import django
from channels.routing import get_default_application
from channels.layers import get_channel_layer

django.setup()

# Application
application = get_default_application()

# Layers
channel_layer = get_channel_layer()