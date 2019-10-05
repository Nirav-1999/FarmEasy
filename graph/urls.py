from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('regions/',views.GetRegions.as_view(),name='regions'),

    path('monthly_rainfall',views.MonthlyRainfallAccToRegion.as_view(),name='monthly_rainfall'),

    path('yearly_rain/',views.RainfallYearView.as_view(),name = 'yearly-rain'),

    path('predicted_rain/',views.PredictedResultView.as_view(),name='predictions'),

]