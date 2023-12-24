import requests

endpoint = 'http://127.0.0.1:8000/api/flightsearch/'

get_response = requests.get(endpoint, {
    "departure_airport": "Esenboga",
    "arrival_airport": "Istanbul Airport",
    "departure_time": "2023-12-28T15:00:00+03:00",
    # "arrival_time": "2023-12-28T15:45:00+03:00",
    # "duration": "0h 45m"
})

print(get_response.json())
