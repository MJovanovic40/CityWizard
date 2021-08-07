from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from api.models import User
import jwt


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
