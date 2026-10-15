
from django.urls import path

from .views import health_check, create_interview

urlpatterns = [
    path("health/", health_check, name="health-check"),
    path("interviews/", create_interview, name="create-interview"),
]
