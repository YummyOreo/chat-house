import requests

BASE = "http://127.0.0.1:5000/"

token1 = requests.put(BASE + "/make_bot/name")
token = token1.json()
print(token)


response1 = requests.put(BASE + f"/room/{str(token)}", {"room": "1"})
response4 = requests.get(BASE + f"/room/{str(token)}")
response2 = requests.get(BASE + f"/stats_room/{str(token)}", {"room": "1"})
response3 = requests.get(BASE + f"/stats_all/{str(token)}")

response5 = requests.patch(BASE + f"/manage_bot/{str(token)}", {"room": "1"})
response6 = requests.get(BASE + f"/room/{str(token)}")
response7 = requests.delete(BASE + f"/manage_bot/{str(token)}")


#stats_all
print(f"{response7.json()} Add to room")
print(f"{response4.json()} get rooms")
print(f"{response2.json()} room stats")
print(f"{response3.json()} all")
print(f"{response5.json()} Delete Room")
print(f"{response6.json()} rooms")
print(f"{response7.json()} Delete")
