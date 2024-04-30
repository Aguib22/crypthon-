from django.contrib import admin
from .models import Departement, Membres, Stock

# Register your models here.
admin.site.register(Departement)
admin.site.register(Membres)
admin.site.register(Stock)

