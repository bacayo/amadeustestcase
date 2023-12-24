from rest_framework import serializers, status
from .models import Flight, Airport, Country, City


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'country_name', 'country_code']


class CitySerializer(serializers.ModelSerializer):
    country = CountrySerializer()

    class Meta:
        model = City
        fields = ['id', 'city_name', "country"]


class AirportSerializer(serializers.ModelSerializer):
    city = CitySerializer()

    class Meta:
        model = Airport
        fields = ['id', 'airport_name', 'airport_code', "city"]


class FlightSerializer(serializers.ModelSerializer):
    # duration = serializers.SerializerMethodField()
    duration = serializers.CharField(source='get_duration')
    duration_number = serializers.CharField(source='get_duration_number')
    departure_airport = serializers.StringRelatedField()
    arrival_airport = serializers.StringRelatedField()

    class Meta:
        model = Flight
        fields = ['id', 'departure_airport', 'arrival_airport', 'departure_time', 'arrival_time', "duration", "price",
                  "duration_number"]
