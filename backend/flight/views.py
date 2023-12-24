from django.shortcuts import render
from rest_framework import generics
from .serializers import CountrySerializer, CitySerializer, FlightSerializer, AirportSerializer
from rest_framework import serializers, status

from flight.models import Country, City, Flight, Airport
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.

class CountryListView(generics.ListAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class CountryDetailView(generics.RetrieveAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    lookup_field = 'country_name'

    def get_object(self):
        country_name = self.kwargs['country_name']
        print("===========", country_name)
        obj = generics.get_object_or_404(Country, country_name__iexact=country_name)
        return obj


class CityListView(generics.ListAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class CityViewDetail(generics.RetrieveAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class FlightListView(generics.ListAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer


class AirportListView(generics.ListAPIView):
    queryset = Airport.objects.all()
    serializer_class = AirportSerializer


class CustomAirportListView(APIView):
    def get(self, request, country_name):
        try:
            airports = Airport.objects.filter(city__country__country_name__iexact=country_name)
            serializer = AirportSerializer(airports, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Country.DoesNotExist:
            return Response({'message': 'Country does not exist'}, status=status.HTTP_404_NOT_FOUND)
