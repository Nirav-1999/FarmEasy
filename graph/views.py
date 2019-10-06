from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd
import json
from django.views.decorators.csrf import csrf_exempt
from . import regions
import pdfkit as pdf
import os

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
        return Response({
            'Monthly_Rain': df
        })


class webhookTest(APIView):
    def post(self,request):
        query=request.data["queryResult"]
        print(query['parameters'])
        if 'state' in str(query['parameters']):
            state=str(query['parameters']['state'])
            state=state.upper()
            print(state)
            year=str(query['parameters']['date-period']['startDate'])
            year=year[:4]
            print(year)
            df=pd.read_csv('./data/rainfall.csv')
            reg_list=df['SUBDIVISION'].unique()
            for i in reg_list:
                if state in i:
                    state=i
            df=df.loc[df['SUBDIVISION']==state]
            df=df.loc[df['YEAR']==int(year)]
            df.reset_index(inplace=True)     
            x=df.loc[0,'ANNUAL']
            result="It was " + str(x) + "mm"
            my_result={
    "fulfillmentText": result,
    
    }  
            return Response(my_result)
        if 'details' in str(query['parameters']):
            crop=query['parameters']['crop_entity']
            crop=crop.lower()
            crop=crop[:1].upper()+crop[1:]
            max_temp,min_temp,max_rain,min_rain=regions.get_details(crop)
            result="Temperature range should be between "+ str(min_temp) + " to " + str(max_temp) + " Degree Celsius. Rainfall should vary between " +str(min_rain) + " and " + str(max_rain) + " mm"
            my_result={
            "fulfillmentText": result,

                        }  
            return Response(my_result)
        if 'rain' in str(query['parameters']):
            temp=query['parameters']['temperature']
            crop=query['parameters']['crop_entity']
            temp=temp.lower()
            crop=crop.lower()
            if temp=='max' or temp=='maximum':
                crop=crop[:1].upper()+crop[1:]
                t=regions.get_maxrainfall(crop)
                print(t)
                result="Maximum rainfall is "+ str(t) + " mm"
                my_result={
                "fulfillmentText": result,

                            }  
                return Response(my_result)
            else:
                crop=crop[:1].upper()+crop[1:]
                t=regions.get_minrainfall(crop)
                print(t)
                result="Minimum Rainfall is "+ str(t) + " mm"
                my_result={
                "fulfillmentText": result,

                            }  
                return Response(my_result)

        if 'crop_entity' in str(query['parameters']):
            temp=query['parameters']['temperature']
            crop=query['parameters']['crop_entity']
            temp=temp.lower()
            crop=crop.lower()
            if temp=='max' or temp=='maximum':
                
                crop=crop[:1].upper()+crop[1:]
                t=regions.get_maxtemp(crop)
                print(t)
                result="Maximum Temperature is "+ str(t) + " Degree Celsius"
                my_result={
                "fulfillmentText": result,

                            }  
                return Response(my_result)
            else:
                crop=crop[:1].upper()+crop[1:]
                t=regions.get_mintemp(crop)
                print(t)
                result="Minimum Temperature is "+ str(t) + " Degree Celsius"
                my_result={
                "fulfillmentText": result,

                            }  
                return Response(my_result)






      


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
        

class pdfformat(APIView):
    def post(self,request):
        fromyear=request.data['from']
        toyear=request.data['to']
        df=pd.read_csv('./data/rainfall.csv')
        df=df[df['YEAR']>=int(fromyear)]
        df=df[df['YEAR']<=int(toyear)]
        dir_path = os.path.dirname(os.path.realpath(__file__))
        dir_path=dir_path[0:-5]
        dir_path+='data\\pdfPrintOut.pdf'
        df.to_html('./data/test.html')
        PdfFilename='./data/pdfPrintOut.pdf'
        config = pdf.configuration(wkhtmltopdf="C:\Program Files\wkhtmltopdf\\bin\wkhtmltopdf.exe")
        pdf.from_file('./data/test.html', PdfFilename,configuration=config)
        return Response(
            {
                'filepath':dir_path
            }
        )


    

