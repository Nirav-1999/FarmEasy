from django.shortcuts import render
from rest_framework.views import APIView,View
from rest_framework.response import Response
from rest_framework import serializers,generics
import pandas as pd 

# Create your views here.
class GetRegions(APIView):
    def get(self, request):
        df=pd.read_csv('./data/rainfall in india 1901-2015.csv')
        reg_list=df['SUBDIVISION'].unique()
        reg_dict={}
        reg_dict['Regions']=reg_list
        return Response({
            'Regions': reg_list
        })



    

