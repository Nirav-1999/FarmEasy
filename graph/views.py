from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd

# Create your views here.
class RainfallYearView(APIView):
    def post(self,request):
        data = pd.read_csv('./data/rainfall.csv')
        search = request.query_params["region"]
        data = data.loc[data['SUBDIVISION'] == search]
        data = data['ANNUAL'][-15:]
        return Response({'Rainfall_2001-2015':list(data)})

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



    

