#!/usr/bin/env python3
# -*- coding: utf-8 -*-


import pandas as pd
import pickle
result_lst=[]
# result_lst = pd.DataFrame(['SUBDIVISION','YEAR','JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC','months','rainfall'])
print(result_lst)

months = { '0':'JAN',
          '1':'FEB',
          '2':'MAR',
          '3':'APR',
          '4':'MAY',
          '5':'JUN',
          '6':'JUL',
          '7':'AUG',
          '8':'SEP',
          '9':'OCT',
          '10':'NOV',
          '11':'DEC'
        }

dataset = pd.read_csv('../data/rainfall.csv')
dataset['months'] = ""
dataset['rainfall'] = ""

for i in range(1,4117):

  lower = dataset.iloc[i-1:i,:]
  for j in range(12):
    if j==0:
      lower['months'][j+i-1]=months[str(j)]
      lower['rainfall'][j+i-1] = lower[months[str(j)]][i-1]
  
      # print(lower)
    else:
      # import pdb; pdb.set_trace()
      # if(i==2):
      #   import pdb; pdb.set_trace()
      some = lower.iloc[0:1,:]
      
      #lower['JAN'][0]
      some['months'] = months[str(j)]
      some['rainfall'] = lower[months[str(j)]]
      # print("=============================================")
      # print(some)
      # print(months[str(j)])
      # print(some['months'])
      # print("=============================================")
      lower = lower.append(some,ignore_index=True)
  lower['months'][0] = "JAN"

  
  print(i)
  # print("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
  result_lst.append(lower)
  # print(result_lst)
    # result_lst = pd.concat([result_lst,lower], ignore_index = True)

# result_lst.drop(['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],axis=1,inplace=True)

x = len(result_lst)

while(x>0):
  if( x%2 != 0):
    result_lst[-1] = pd.concat([result_lst[-1],result_lst[-2]],ignore_index=True)
    x-=1
  if(x==2):
    break
  print(x)
  i=0
  new_lst=[]
  while(i<x):

    new_lst.append(pd.concat([result_lst[i],result_lst[i+1]],ignore_index=True))
    
    i+=2
  
  
  result_lst = new_lst
  x=x//2

result_lst = [pd.concat([result_lst[0],result_lst[1]])]

with open('resultant_data','ab') as data:
    pickle.dump(result_lst,data)