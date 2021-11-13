"""Markers models."""

from django.contrib.gis.db.models import PointField
from django.db import models

class Marker(models.Model):
  """
  A marker with name and location.
  """
  name = models.CharField(max_length=255)
  description = models.TextField(default='marker description')
  picture = models.ImageField(null=True, blank=True)
  location = PointField()

  def __str__(self):
    return self.name

  @property
  def picture_url(self):
    return self.picture.url if self.picture else None