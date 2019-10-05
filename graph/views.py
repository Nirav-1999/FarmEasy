from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd

# Create your views here.
class RainfallYearView(APIView):
    def post(self,request):
        data = pd.read_csv('./data/rainfall.csv')
        search = request.data["region"]
        print(search)
        data = data.loc[data['SUBDIVISION'] == search]
        data = data['ANNUAL'][-15:]
        return Response({'Rainfall':list(data)})

# Create your views here.
class GetRegions(APIView):
    def get(self, request):
        df=pd.read_csv('./data/rainfall.csv')
        reg_list=df['SUBDIVISION'].unique()
        return Response({
            'Regions': reg_list
        })


class MonthlyRainfallAccToRegion(APIView):
    def post(self,request):
        region=request.data['Region']
        year=request.data['Year']
        df=pd.read_csv('./data/rainfall.csv')
        df=df.loc[df['SUBDIVISION']==region]
        df=df.loc[df['YEAR']==int(year)]
        df.drop('SUBDIVISION',axis=1,inplace=True)
        df.drop('YEAR',axis=1,inplace=True)
        df.drop('Jan-Feb',axis=1,inplace=True)
        df.drop('Mar-May',axis=1,inplace=True)
        df.drop('Jun-Sep',axis=1,inplace=True)
        df.drop('Oct-Dec',axis=1,inplace=True)
        df.drop('ANNUAL',axis=1,inplace=True)
        return Response({
            'Monthly_Rain': df
        })

class Range(APIView):
    def get(self,request):
        df=pd.read_csv('./data/rainfall.csv')
        range0_500=[]
        range500_1000=[]
        range1000_1500=[]
        range1500=[]
        df=df[df['YEAR']>2010]
        df.reset_index(inplace=True)
        avg=0
        for i in range(180):
            
            if(i%5==4):
                avg=avg/4.0
                if(avg<500):
                    range0_500.append(df.loc[i,'SUBDIVISION'])
                    avg=0
                elif(avg>500 and avg<1000):
                    range500_1000.append(df.loc[i,'SUBDIVISION'])
                    avg=0
                elif(avg>1000 and avg<1500):
                    range1000_1500.append(df.loc[i,'SUBDIVISION'])
                    avg=0
                elif(avg>1500):
                    range1500.append(df.loc[i,'SUBDIVISION'])
                    avg=0

            else:
                avg=avg+df.loc[i,'ANNUAL']

            
        print(range0_500)
        print(range500_1000)
        print(range1000_1500)
        print(range1500)

        return Response({
        '0-500': list(range0_500),
        '500-1000':range500_1000,
        '1000-1500':range1000_1500,
        '1500':range1500
    })




    

