"""Markers urls."""

from django.urls import path
from django.conf.urls import url
from .views import MarkersMapView

app_name = "markers"

urlpatterns = [
    path("", MarkersMapView.as_view()),
]