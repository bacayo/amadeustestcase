from django.db import models


# Create your models here.


class Country(models.Model):
    country_name = models.CharField(max_length=100, unique=True)
    country_code = models.CharField(max_length=5, unique=True)

    def __str__(self):
        return self.country_name


class City(models.Model):
    country = models.ForeignKey(
        Country, on_delete=models.CASCADE, related_name='country')
    city_name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.city_name


class Airport(models.Model):
    city = models.ForeignKey(
        City, on_delete=models.CASCADE, related_name='city')
    airport_name = models.CharField(max_length=200, unique=True)
    airport_code = models.CharField(max_length=5, unique=True)

    def __str__(self):
        return self.airport_name


class Flight(models.Model):
    departure_airport = models.ForeignKey(
        Airport, on_delete=models.CASCADE, related_name='departure_airport')
    arrival_airport = models.ForeignKey(
        Airport, on_delete=models.CASCADE, related_name='arrival_airport')
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=1000)

    def get_duration(self):
        duration = self.arrival_time - self.departure_time
        hours, remainder = divmod(duration.seconds, 3600)
        minutes, _ = divmod(remainder, 60)
        return f"{hours}h {minutes}m"

    def get_duration_number(self):
        duration = self.arrival_time - self.departure_time
        return duration
