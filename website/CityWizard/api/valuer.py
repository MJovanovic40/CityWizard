import pandas as pd
from math import sqrt
from api import house_pricing as hp
import os


def __load_cities():
    cities = pd.read_csv("api/datasets/california.csv")
    cities.dataframeName = "california.csv"
    city_list = cities.drop(["city_ascii", "state_id", "state_name", "county_fips", "county_fips_all",
                             "county_name_all", "source", "military", "incorporated", "timezone", "ranking", "zips", "id"], axis=1)
    return city_list


def __form_final_list(cities, prices, country):
    # Ovo je kinda disgusting
    data = []
    city_count = len(cities)
    city_counter = 0
    for city in cities:
        min_distance = 1000000
        city_name = ""
        right_price = []
        city_counter += 1
        for price in prices:
            current_distance = sqrt(
                (city[2] - price[1]) ** 2 + (city[3] - price[0]) ** 2)
            print("[" + str(city_counter) + "/" + str(city_count) + "] - " + city[0] + " dist from site: " + str(
                current_distance))
            if current_distance < min_distance:
                print("Nova minimalna razdaljina")
                min_distance = current_distance
                city_name = city[0]
                right_price = price
                if city[4] > 0:
                    right_price[4] = city[4]
        right_price_list = right_price.tolist()
        right_price_list.append(city_name)
        data.append(right_price_list)
    print(data)

    df = pd.DataFrame(data)
    df.to_csv("api/datasets/house_test.csv", index=False)
    indeksi_vrednosti = hp.predikcija(
        "api/models/finalized_model_hp.sav", "api/datasets/house_test.csv")

    scores = []
    for i in indeksi_vrednosti:
        scores.append((i / max(indeksi_vrednosti)) * 10)  # scoring
    # print(indeksi_vrednosti)

    cities_list = []
    for i in cities:
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
    # print(finalna_lista)

    final_df = pd.DataFrame(finalna_lista)
    filename = "api/value_indexes/value_indexes_" + country + ".csv"
    final_df.to_csv(filename, index=False, header=False)


def __load_housing_by_coordinates(koordinate, state):
    house_prices = pd.read_csv("api/datasets/housing.csv")
    house_prices.dataframeName = "housing.csv"
    prices_list = house_prices.drop(
        ["total_bedrooms", "ocean_proximity"], axis=1)
    # We would need much more data to better represent this.
    cene = prices_list.to_numpy()

    gradovi = []
    coordinate_list = []
    if state == 1:
        cities = pd.read_csv("api/datasets/california.csv")
        cities.dataframeName = "california.csv"
        important_data = cities.drop(
            ["city_ascii", "state_id", "county_fips", "county_fips_all", "county_name_all", "source",
             "military", "incorporated", "timezone", "ranking", "zips", "id"], axis=1)
        coordinate_list = important_data.drop(
            ["county_name", "density"], axis=1)
        gradovi = coordinate_list.to_numpy()
    else:
        cities = pd.read_csv("api/datasets/worldcities.csv")
        cities.dataframeName = "worldcities.csv"
        coordinate_list = cities.drop(
            ["city_ascii", "iso2", "iso3", "admin_name", "capital", "id"], axis=1)
        gradovi = coordinate_list.to_numpy()
        for grad in gradovi:
            temp = grad[3]
            grad[3] = grad[2]
            grad[2] = grad[1]
            grad[1] = temp

    up = float(koordinate[0][0])
    left = float(koordinate[0][1])
    down = float(koordinate[1][0])
    right = float(koordinate[1][1])
    in_rectangle_cities = []
    for grad in gradovi:
        if up > float(grad[2]) > down and left < float(grad[3]) < right:
            in_rectangle_cities.append(grad)

    __form_final_list(in_rectangle_cities, cene)


def __load_housing_by_country(country):
    house_prices = pd.read_csv("api/datasets/housing.csv")
    house_prices.dataframeName = "housing.csv"
    prices_list = house_prices.drop(
        ["total_bedrooms", "ocean_proximity"], axis=1)
    # We would need much more data to better represent this.
    cene = prices_list.to_numpy()

    cities = pd.read_csv("api/datasets/worldcities.csv")
    cities.dataframeName = "worldcities.csv"
    coordinate_list = cities.drop(
        ["city_ascii", "iso2", "iso3", "admin_name", "capital", "id"], axis=1)
    gradovi = coordinate_list.to_numpy()
    for grad in gradovi:
        temp = grad[3]
        grad[3] = grad[2]
        grad[2] = grad[1]
        grad[1] = temp

    in_country_cities = []
    for grad in gradovi:
        if grad[1] == country:
            in_country_cities.append(grad)

    __form_final_list(in_country_cities, cene, country)


def make_city_list_from_coordinates(koordinate):
    tacka1 = koordinate[0]
    tacka2 = koordinate[1]
    print("Top left: " + str(tacka1))
    print("Bottom right: " + str(tacka2))
    __load_housing_by_coordinates(koordinate, 0)


def make_city_list_from_countries(country):
    print("Country: " + country)
    filename = "api/value_indexes/value_indexes_" + country + ".csv"
    if os.path.isfile(filename):
        print("Already done")
    else:
        print("Calculating...")
        __load_housing_by_country(country)
        print("Done")


#make_city_list_from_coordinates([["45.29796572030068", "19.54361186540114"], ["44.20081106786184", "21.529494679356073"]])
#make_city_list_from_countries("Trinidad And Tobago")
