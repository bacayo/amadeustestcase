from django.urls import path
from . import views

urlpatterns = [
    path('country/', views.CountryListView.as_view()),
    path('country/<str:country_name>/', views.CountryDetailView.as_view()),
    path('city/', views.CityListView.as_view()),
    path('city/<int:pk>/', views.CityViewDetail.as_view()),
    path('airport/', views.AirportListView.as_view()),
    path('flight/', views.FlightListView.as_view()),
    path('airports/<str:country_name>/', views.CustomAirportListView.as_view()),
    
]
