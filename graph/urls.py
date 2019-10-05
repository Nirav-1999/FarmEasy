from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('regions/',views.GetRegions.as_view(),name='regions'),
    path('monthly_rainfall',views.MonthlyRainfallAccToRegion.as_view(),name='monthly_rainfall'),
]