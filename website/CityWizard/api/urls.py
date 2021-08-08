from django.urls import path
from api import views as views

urlpatterns = [
    path('register/', views.register, name="register"),
    #path('test/', views.test, name="test"),
    path('login/', views.login, name="login"),
    path('getwiki/', views.getWiki, name="getWiki"),
    path('getresults/', views.getResults, name="getResults"),
    path('getsearches/', views.getSearches, name="getSearches"),
]
