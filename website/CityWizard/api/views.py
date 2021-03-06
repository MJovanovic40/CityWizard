from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from api.models import User
import jwt
from api import tfidf
import requests
import os
from api import valuer
import math


TOKEN_SECRET = "~k47?6KM3WLS.8M%"
# Create your views here.


def createToken(userid):
    return jwt.encode({"userid": userid}, TOKEN_SECRET, algorithm="HS256")


def validateRequest(request):
    token_userid = jwt.decode(
        request.META.get('Authorization'), TOKEN_SECRET, algorithms=["HS256"])['userid']

    if token_userid == request.data['userid']:
        return True
    return False


@api_view(['POST'])
def register(request):
    data = request.data

    email = data['email']
    password = data['password']

    duplicate_emails = list(User.objects.filter(email=email))
    if len(duplicate_emails) > 0:
        return Response("Email already exists.")

    user = User.objects.create(
        email=email,
        password=password,
        previous_searches="",
        saved_cities="",
        token="",
    )

    user.token = createToken(user.id)
    user.save()
    return Response("OK")


@api_view(['POST'])
def login(request):
    data = request.data

    try:
        user = User.objects.get(email=data['email'])
    except:
        return Response("Invalid email or password", status=status.HTTP_401_UNAUTHORIZED)
    if data['password'] == user.password:
        return Response({"userid": user.id, "email": user.email, "previous_searches": user.previous_searches, "saved_cities": user.saved_cities, "token": user.token}, status=status.HTTP_200_OK)
    else:
        return Response("Invalid email or password", status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def getWiki(request):
    params = request.query_params
    city = params['city']

    with open("api/summaries/summaries.txt", "r", encoding="utf-8") as f:
        lines = f.readlines()
        lines = [x.strip() for x in lines]
        if city in lines:
            with open(f"api/summaries/{city}.txt", "r", encoding="utf-8") as b:
                text = b.read()
                return Response(text)

    wiki = requests.get(
        f"https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&exintro&titles={city}&redirects=").json()

    try:
        text = wiki["query"]['pages'][list(
            wiki["query"]['pages'].keys())[0]]['extract']
    except:
        text = ""

    print(os.getcwd())

    with open(f"api/articles/{city}.txt", "w", encoding="utf-8") as f:
        f.write(text)

    tfidf.Summary(city)

    with open(f"api/summaries/{city}.txt", "r", encoding="utf-8") as f:
        lines = f.read()
        with open("api/summaries/summaries.txt", "a", encoding="utf-8") as b:
            b.write(city + "\n")
        return Response(lines)


@api_view(['GET'])
def getResults(request):
    params = request.query_params
    country = params['country']
    # valuer.make_city_list([["37.97391117994576", "-122.72789113562834"],
    # ["37.20401516337056", "-121.70921629477917"]])
    # valuer.make_city_list_from_countries(country)
    resp = {}
    with open(f"api/value_indexes/value_indexes_{country}.csv", "r", encoding="utf-8") as f:
        lines = f.readlines()
        lines = [x.strip() for x in lines]
        for count, i in enumerate(lines):
            line = i.split(",")
            try:
                resp[int(count+1)] = {'city': line[0],
                                      'rating': math.floor(float(line[1])*10)}
            except:
                resp[int(count+1)] = {'city': line[0]+line[1],
                                      'rating': math.floor(float(line[2])*10)}
    return Response(resp)


@api_view(['POST'])
def getSearches(request):
    data = request.data
    search = data['search']
    searches = []

    files = os.listdir("api/value_indexes")
    resp = []
    for i in files:
        file = i.split("_")[-1].split(".")[0]
        if file.find(search) != -1:
            resp.append(file)

    return Response(resp)
