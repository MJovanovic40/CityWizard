import math

import numpy as np  # linear algebra
import pandas as pd  # data processing, CSV file I/O (e.g. pd.read_csv)
import matplotlib as mpl
import matplotlib.pyplot as plt
import sklearn
import seaborn as sns
import pickle
from sklearn.metrics import r2_score
from sklearn.preprocessing import StandardScaler


def predikcija(model_name, df):

    filename = model_name
    model = pickle.load(open(filename, 'rb'))

    df = pd.read_csv(df)
    df = df.drop(["8"], axis=1)
    scaler = StandardScaler(copy=True, with_mean=True, with_std=True)
    scaled_df = scaler.fit_transform(df)

    predicted = model.predict(scaled_df)
    predicted_array = predicted.tolist()

    return_data = []
    return_data.append(predicted_array)
    return_data.append(df["6"])
    return_data = list(zip(return_data[0], return_data[1]))

    odnos = []
    for i in range(len(return_data)):
        odnos.append(return_data[i][0]/return_data[i][1])

    odnos_average = sum(odnos)/len(odnos)
    #print("Average: " + str(odnos_average))

    indeksi_vrednosti = []
    for i in odnos:
        indeksi_vrednosti.append(i*(math.e**(1/(abs(i-odnos_average)))))
        if indeksi_vrednosti[-1] < 0:
            indeksi_vrednosti[-1] = 0

    max_index = max(indeksi_vrednosti)
    #print("Max Index: " + str(max_index))
    #print("Min Index: " + str(min(indeksi_vrednosti)))

    '''for indeks in indeksi_vrednosti:
        print(indeks)'''

    return indeksi_vrednosti


# predikcija(model_name="api/models/finalized_model_hp.sav",df="api/house_test.csv")
