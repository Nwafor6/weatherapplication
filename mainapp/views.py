from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import requests
from decouple import config

# Create your views here.
API_KEY=config("API_KEY")
print(API_KEY)
@csrf_exempt
def index(request):
    if request.method=="POST":
        url = "http://api.openweathermap.org/data/2.5/weather?q={}&units=imperial&appid=%s" %API_KEY
        city=request.POST["city"]
        city_weather = requests.get(url.format(city)).json() #request the API data and convert the JSON to Python data types
        print(city_weather)
        weather = {
        'city' : city,
        "country":city_weather['sys']['country'],
        'cor':city_weather['coord'],
        'temperature' : city_weather['main']['temp'],
        'description' : city_weather['weather'][0]['description'],
        'icon' : city_weather['weather'][0]['icon']
    }
        print(weather)
        return JsonResponse({"data":weather})
    return render(request, 'index.html')
