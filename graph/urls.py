from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('regions/',views.GetRegions.as_view(),name='regions'),
    path('yearly_rain/',views.RainfallYearView.as_view(),name = 'yearly-rain')
]