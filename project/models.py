from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Tag(models.Model):
    name = models.CharField(max_length=100)

    def __unicode__(self):
        return self.name


class Publisher(models.Model):
    name = models.CharField(max_length=100)

    def __unicode__(self):
        return self.name


class Developer(models.Model):
    name = models.CharField(max_length=100)

    def __unicode__(self):
        return self.name


class Platform(models.Model):
    name = models.CharField(max_length=100)

    def __unicode__(self):
        return self.name


class Game(models.Model):
    name = models.CharField(max_length=100)
    release_date = models.DateField(null=True, blank=True)
    rating = models.IntegerField(
        null=True, blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(5)])
    comment = models.TextField(null=True, blank=True)

    publisher = models.ForeignKey(Publisher, null=True, blank=True)
    developer = models.ForeignKey(Developer, null=True, blank=True)
    platform = models.ForeignKey(Platform, null=True, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ('name',)
