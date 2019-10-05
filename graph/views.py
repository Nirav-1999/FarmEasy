from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd

# Create your views here.
class RainfallYearView(APIView):
    def post(self,request):
        data = pd.read_csv('../data/rainfall.csv')
        search = request.query_params["region"]
        data = data.loc[data['SUBDIVISION'] == search]
        data = data['ANNUAL'][-15:]
        return Response({'Rainfall_2001-2015':list(data)})

# Create your views here.
class GetRegions(APIView):
    def get(self, request):
        df=pd.read_csv('./data/rainfall in india 1901-2015.csv')
        reg_list=df['SUBDIVISION'].unique()
        return Response({
            'Regions': reg_list
        })


class MonthlyRainfallAccToRegion(APIView):
    def post(self,request):
        region=request.data['Region']
        year=request.data['Year']
        df=pd.read_csv('./data/rainfall in india 1901-2015.csv')
        df=df.loc[df['SUBDIVISION']==region]
        df=df.loc[df['YEAR']==year]
        df.drop('ANNUAL',axis=1,inplace=True)
        df.drop('Jan-Feb',axis=1,inplace=True)
        df.drop('Mar-May',axis=1,inplace=True)
        df.drop('Jun-Sep',axis=1,inplace=True)
        df.drop('Oct-Dec',axis=1,inplace=True)
        return Response({
            'Monthly_Rainfall': df
        })





    

