from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd
import pickle
import numpy as np

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
    
        df.drop('Jan-Feb',axis=1,inplace=True)
        df.drop('Mar-May',axis=1,inplace=True)
        df.drop('Jun-Sep',axis=1,inplace=True)
        df.drop('Oct-Dec',axis=1,inplace=True)
        return Response({
            'Monthly_Rainfall': df
        })





    
class PredictedResultView(APIView):
    def post(self,request):
        with open("./data/model","rb") as f:
            model = pickle.load(f)
        with open("./data/standard_scalar","rb") as f:
            some = pickle.load(f)
        sc_X=some[0]
        sc_y = some[1]
        y_pred = {}
        values = [
            'SUBDIVISION_ANDAMAN & NICOBAR ISLANDS',
            'SUBDIVISION_ARUNACHAL PRADESH',
            'SUBDIVISION_ASSAM & MEGHALAYA',
            'SUBDIVISION_BIHAR',
            'SUBDIVISION_CHHATTISGARH',
            'SUBDIVISION_COASTAL ANDHRA PRADESH',
            'SUBDIVISION_COASTAL KARNATAKA',
            'SUBDIVISION_EAST MADHYA PRADESH',
            'SUBDIVISION_EAST RAJASTHAN',
            'SUBDIVISION_EAST UTTAR PRADESH',
            'SUBDIVISION_GANGETIC WEST BENGAL',
            'SUBDIVISION_GUJARAT REGION',
            'SUBDIVISION_HARYANA DELHI & CHANDIGARH',
            'SUBDIVISION_HIMACHAL PRADESH',
            'SUBDIVISION_JAMMU & KASHMIR',
            'SUBDIVISION_JHARKHAND',
            'SUBDIVISION_KERALA',
            'SUBDIVISION_KONKAN & GOA',
            'SUBDIVISION_LAKSHADWEEP',
            'SUBDIVISION_MADHYA MAHARASHTRA',
            'SUBDIVISION_MATATHWADA',
            'SUBDIVISION_NAGA MANI MIZO TRIPURA',
            'SUBDIVISION_NORTH INTERIOR KARNATAKA',
            'SUBDIVISION_ORISSA',
            'SUBDIVISION_PUNJAB',
            'SUBDIVISION_RAYALSEEMA',
            'SUBDIVISION_SAURASHTRA & KUTCH',
            'SUBDIVISION_SOUTH INTERIOR KARNATAKA',
            'SUBDIVISION_SUB HIMALAYAN WEST BENGAL & SIKKIM',
            'SUBDIVISION_TAMIL NADU',
            'SUBDIVISION_TELANGANA',
            'SUBDIVISION_UTTARAKHAND',
            'SUBDIVISION_VIDARBHA',
            'SUBDIVISION_WEST MADHYA PRADESH',
            'SUBDIVISION_WEST RAJASTHAN',
            'SUBDIVISION_WEST UTTAR PRADESH',
            'months_APR',
            'months_AUG',
            'months_DEC',
            'months_FEB',
            'months_JAN',
            'months_JUL',
            'months_JUN',
            'months_MAR',
            'months_MAY',
            'months_NOV',
            'months_OCT',
            'months_SEP']
        pred_val = [0]*len(values)
        search = request.data["region"]
        for i in range(12):
            for j in range(len(values)):
                if values[j]==search:
                    pred_val[j] = 1
                    break
            pred_val[i+36] = 1
            y_pred[values[i+36]]=(sc_y.inverse_transform(model.predict(sc_X.transform(np.array(np.array([pred_val]))))))
            print(y_pred)

        return Response(y_pred)
