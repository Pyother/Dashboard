from django.db import models

class Measurement(models.Model):
    distance_angle_000 = models.FloatField()
    distance_angle_030 = models.FloatField()
    distance_angle_090 = models.FloatField()
    distance_angle_120 = models.FloatField()
    distance_angle_150 = models.FloatField()
    distance_angle_180 = models.FloatField()
    position_x = models.FloatField()
    position_y = models.FloatField()
    density = models.FloatField()
    time = models.FloatField()
