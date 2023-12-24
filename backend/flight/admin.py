from django.contrib import admin
from .models import Flight, Airport, City, Country

# Register your models here.


admin.site.register(Flight)
admin.site.register(Airport)
admin.site.register(City)
admin.site.register(Country)
