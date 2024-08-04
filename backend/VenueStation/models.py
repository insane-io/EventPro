from django.db import models

class Venue(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    capacity = models.IntegerField(default=0, null=True, blank=True)

    class Meta:
        db_table = 'VenueStation_venue'