from django.urls import path
from api import views as views

urlpatterns = [
    path('getresults/', views.getresults, name="getResults"),
]
