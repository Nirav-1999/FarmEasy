#!/usr/bin/env python3
# -*- coding: utf-8 -*-


# Artificial Neural Network

# Installing Theano
# pip install --upgrade --no-deps git+git://github.com/Theano/Theano.git

# Installing Tensorflow
# Install Tensorflow from the website: https://www.tensorflow.org/versions/r0.12/get_started/os_setup.html

# Installing Keras
# pip install --upgrade keras

# Part 1 - Data Preprocessing

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
from keras.layers.recurrent import LSTM
import pandas as pd
import os
import pickle
os.environ["CUDA_VISIBLE_DEVICES"]="-1"


# Importing the dataset
with open("resultant_data","rb") as f:
    dataset = pickle.load(f)
# import pdb; pdb.set_trace()
dataset = dataset[0]
dataset.drop(['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],axis=1,inplace=True)
dataset = dataset.dropna()

d={'JAN':1,'FEB':2,'MAR' :3,'APR':4,'MAY':5,'JUN':6,'JUL':7,'AUG':8,'SEP':9,
   'OCT':10,'NOV':11,'DEC':12}
dataset['months']=dataset['months'].map(d)

dataset = pd.get_dummies(dataset, columns=['SUBDIVISION'])

#import pdb; pdb.set_trace()
X = dataset.iloc[:, 1:].values
y = dataset.iloc[:, 0:1].values


# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)

# Feature Scaling
# Feature Scaling
from sklearn.preprocessing import StandardScaler
sc_X = StandardScaler()
sc_y = StandardScaler()
X = sc_X.fit_transform(X)
y = sc_y.fit_transform(y)
# Part 2 - Now let's make the ANN!

#X_train = np.reshape(X_train, (X_train.shape[0], 1, X_train.shape[1]))
#X_test = np.reshape(X_test, (X_test.shape[0], 1, X_test.shape[1]))

# Importing the Keras libraries and packages
import keras
from keras.models import Sequential
from keras.layers.core import Dense, Activation, Dropout

# Initialising the ANN    
classifier = Sequential()

# Adding the input layer and the first hidden layer
classifier.add(Dense(units = 19, kernel_initializer = 'uniform', activation = 'relu', input_dim = 38))

# Adding the second hidden layer
classifier.add(Dense(units = 19, kernel_initializer = 'uniform', activation = 'relu'))
classifier.add(Dense(units = 19, kernel_initializer = 'uniform', activation = 'relu'))

# Adding the output layer
classifier.add(Dense(units = 1, kernel_initializer = 'uniform', activation = 'sigmoid'))

# Compiling the ANN
#categorical_crossentropy for more than 2 output variables
classifier.compile(optimizer = 'adam', loss = 'mean_squared_error', metrics = ['mean_squared_error'])

# Fitting the ANN to the Training set
classifier.fit(X_train, y_train, batch_size = 10, epochs = 1000)

# Part 3 - Making the predictions and evaluating the model

## Predicting the Test set results
#y_pred = classifier.predict(X_test)
#y_pred = (y_pred > 0.5)
#
## Making the Confusion Matrix
#from sklearn.metrics import confusion_matrix
#cm = confusion_matrix(y_test, y_pred)