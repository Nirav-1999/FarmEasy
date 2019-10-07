# Regression Template

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import pickle

# Importing the dataset
with open("resultant_data","rb") as f:
    dataset = pickle.load(f)
# import pdb; pdb.set_trace()
dataset = dataset[0]
dataset.drop(['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],axis=1,inplace=True)
dataset = dataset.dropna()

dataset = pd.get_dummies(dataset, columns=['SUBDIVISION','months'])
cols = dataset.columns.tolist()
cols = cols[1:] + cols[:1]

dataset = dataset[cols] 
 
#import pdb; pdb.set_trace()
X = dataset.iloc[:, 1:].values
y = dataset.iloc[:, 0:1].values
#import pdb; pdb.set_trace()
#Categorical data
#from sklearn.preprocessing import LabelEncoder,OneHotEncoder
#labelencoder_X = LabelEncoder()
#X[:,0] = labelencoder_X.fit_transform(X[:,0])
#onehotencoder = OneHotEncoder(categorical_features = [0] )
#X = onehotencoder.fit_transform(X).toarray()
#
#X[:,1] = labelencoder_X.fit_transform(X[:,1])
#onehotencoder = OneHotEncoder(categorical_features = [1] )
#X = onehotencoder.fit_transform(X).toarray()

# Splitting the dataset into the Training set and Test set

X=X[:,2:]
X=X[:,:-2]
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)

# Feature Scaling
from sklearn.preprocessing import StandardScaler
sc_X = StandardScaler()
sc_y = StandardScaler()
X = sc_X.fit_transform(X)
y = sc_y.fit_transform(y)

# Fitting the SVR Model to the dataset
from sklearn.svm import SVR
regressor = SVR(kernel = 'rbf')
regressor.fit(X,y)

y_pred = sc_y.inverse_transform(regressor.predict(sc_X.transform(X_test)))


# Predicting a new result
#with open('model','ab') as data:
#    pickle.dump(regressor,data)
# Visualising the SVR results
#plt.scatter(X, y, color = 'red')
#plt.plot(X, regressor.predict(X), color = 'blue')
#plt.title('Truth or Bluff (SVR Model)')
#plt.xlabel('Position level')
#plt.ylabel('Salary')
#plt.show()

## Visualising the SVR results (for higher resolution and smoother curve)
#X_grid = np.arange(min(X), max(X), 0.1)
#X_grid = X_grid.reshape((len(X_grid), 1))
#plt.scatter(X, y, color = 'red')
#plt.plot(X_grid, regressor.predict(X_grid), color = 'blue')
#plt.title('Truth or Bluff (Regression Model)')
#plt.xlabel('Position level')
#plt.ylabel('Salary')
#plt.show()
import statsmodels.formula.api as sm
from sklearn import metrics
import statsmodels.regression.linear_model as sm

X = np.append(np.ones((49082,1)).astype(int), values = X, axis = 1)
X_opt = X[:,1:]
regressor_OLS = sm.OLS(endog = y, exog = X_opt).fit()
regressor_OLS.summary()
#def backwardElimination(x, sl):
#    numVars = len(x[0])
#    for i in range(0, numVars):
#        regressor_OLS = sm.OLS(y, x).fit()
#        maxVar = max(regressor_OLS.pvalues).astype(float)
#        if maxVar > sl:
#            for j in range(0, numVars - i):
#                if (regressor_OLS.pvalues[j].astype(float) == maxVar):
#                    x = np.delete(x, j, 1)
#    regressor_OLS.summary()
#    return x
# 
#SL = 0.05
#X_opt = backwardElimination(X, SL)