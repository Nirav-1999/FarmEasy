from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd
import json
from django.views.decorators.csrf import csrf_exempt
from . import regions
import pdfkit as pdf
import os
import pickle
import numpy as np
import pdfkit as pdf
import os
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


# class pdfformat(APIView):
#     def post(self,request):
#         fromyear=request.data['from']
#         toyear=request.data['to']
#         df=pd.read_csv('./data/rainfall.csv')
#         df=df[df['YEAR']>=int(fromyear)]
#         df=df[df['YEAR']<=int(toyear)]
#         dir_path = os.path.dirname(os.path.realpath(__file__))
#         dir_path=dir_path[0:-5]
#         dir_path+='data\\pdfPrintOut.pdf'
#         df.to_html('./data/test.html')
#         pdfpath='D:\Projects\hackathons\material-dashboard-react-master (1)\material-dashboard-react-master\src\assets'
#         PdfFilename=pdfpath
#         config = pdf.configuration(wkhtmltopdf="C:\Program Files\wkhtmltopdf\\bin\wkhtmltopdf.exe")
#         pdf.from_file('./data/test.html', PdfFilename,configuration=config)
#         return Response(
#             {
#                 'filepath':dir_path
#             }
#         )

# D:\Projects\hackathons\material-dashboard-react-master (1)\material-dashboard-react-master\src\assets