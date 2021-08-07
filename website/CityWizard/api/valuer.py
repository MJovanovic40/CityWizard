import numpy as np
import pandas as pd
from math import sqrt
from api import house_pricing as hp


def __load_cities():
    cities = pd.read_csv("api/california.csv")
    cities.dataframeName = "california.csv"
    city_list = cities.drop(["city_ascii", "state_id", "state_name", "county_fips", "county_fips_all",
                             "county_name_all", "source", "military", "incorporated", "timezone", "ranking", "zips", "id"], axis=1)
    return city_list


def __load_housing(koordinate):
    house_prices = pd.read_csv("api/housing.csv")
    house_prices.dataframeName = "housing.csv"
    prices_list = house_prices.drop(
        ["total_bedrooms", "ocean_proximity"], axis=1)

    cities = pd.read_csv("api/california.csv")
    cities.dataframeName = "california.csv"
    important_data = cities.drop(
        ["city_ascii", "state_id", "state_name", "county_fips", "county_fips_all", "county_name_all", "source",
         "military", "incorporated", "timezone", "ranking", "zips", "id"], axis=1)
    coordinate_list = important_data.drop(
        ["county_name", "population", "density"], axis=1)

    gradovi = coordinate_list.to_numpy()
    cene = prices_list.to_numpy()

    up = float(koordinate[0][0])
    left = float(koordinate[0][1])
    down = float(koordinate[1][0])
    right = float(koordinate[1][1])
    in_rectangle_cities = []
    for grad in gradovi:
        if up > float(grad[1]) > down and left < float(grad[2]) < right:
            in_rectangle_cities.append(grad)

    in_rectangle_prices = []
    for cena in cene:
        if up > float(cena[1]) > down and left < float(cena[0]) < right:
            in_rectangle_prices.append(cena)

    # Ovo je kinda disgusting
    data = []
    city_count = len(in_rectangle_cities)
    city_counter = 1
    for city in in_rectangle_cities:
        min_distance = 1000000
        city_name = ""
        right_price = []
        city_counter += 1
        for price in in_rectangle_prices:
            current_distance = sqrt(
                (city[1]-price[1])**2+(city[2]-price[0])**2)
            print("[" + str(city_counter) + "/" + str(city_count) + "] - " +
                  city[0] + "dist from site: " + str(current_distance))
            if current_distance < min_distance:
                print("Nova minimalna razdaljina")
                min_distance = current_distance
                city_name = city[0]
                right_price = price
        right_price_list = right_price.tolist()
        right_price_list.append(city_name)
        data.append(right_price_list)
    # print(data)
    df = pd.DataFrame(data)
    df.to_csv("api/house_test.csv", index=False)  # Ovde fiksovati NaN
    indeksi_vrednosti = hp.predikcija(
        "api/models/finalized_model_hp.sav", "api/house_test.csv")

    scores = []
    for i in indeksi_vrednosti:
        scores.append((i / max(indeksi_vrednosti)) * 10)  # scoring
    # print(indeksi_vrednosti)

    cities_list = []
    for i in in_rectangle_cities:
        cities_list.append(i[0])

    finalna_lista = []
    finalna_lista.append(cities_list)
    finalna_lista.append(scores)

    finalna_lista = list(zip(finalna_lista[0], finalna_lista[1]))

    for i in range(len(finalna_lista)):
        for j in range(len(finalna_lista)):
            if finalna_lista[i][1] > finalna_lista[j][1]:
                temp = finalna_lista[i]
                finalna_lista[i] = finalna_lista[j]
                finalna_lista[j] = temp
    print(finalna_lista)

    final_df = pd.DataFrame(finalna_lista)
    final_df.to_csv("api/value_indexes.csv", index=False, header=False)


def make_city_list(koordinate):
    tacka1 = koordinate[0]
    tacka2 = koordinate[1]
    housing_coordinates = __load_cities()
    print("Top left: " + str(tacka1))
    print("Bottom right: " + str(tacka2))

    __load_housing(koordinate)
    #city_housing_list = hp.get_prediction(housing_coordinates)


#make_city_list([["37.97391117994576", "-122.72789113562834"], ["37.20401516337056", "-121.70921629477917"]])
