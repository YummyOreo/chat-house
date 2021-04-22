import requests

BASE = "http://127.0.0.1:5000/"

token = requests.put(BASE + "/make_bot/name")
token = token.json()
token = token['token']
print(token)


response1 = requests.put(BASE + f"/room/{str(token)}", {"room": "1"})
response2 = requests.get(BASE + f"/room/{str(token)}")

print(response1.json())
print(response2.json())
