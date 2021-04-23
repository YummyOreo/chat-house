# Imports
import time
import os
import random
from flask import Flask, request
from flask_restful import Api, Resource, reqparse
from dotenv import dotenv_values

config = dotenv_values(".env")

""" 
Modules
from utils import ___
"""

# Inits the API
app = Flask(__name__)
api = Api(app)

# bots and rooms bars
bots = {}
rooms = {"1": {"users": ["HEY", "2"]}}

# For get stats for a room vars
get_room = reqparse.RequestParser()
# A room id str
get_room.add_argument("room", type=str, help="404 | Invalid Room", required=True)

# For get patch a room vars
patch_room = reqparse.RequestParser()
# A room id str
patch_room.add_argument("room", type=str, help="404 | Invalid Room", required=True)

# only server
server = reqparse.RequestParser()
# A rooms
server.add_argument("rooms", required=True)

# to add to a room
add_room = reqparse.RequestParser()
# A room id str
add_room.add_argument("room", type=str, help="404 | Invalid Room", required=True)

""" 
Making the bot

Name: from the URL, the name of the bot

"""

def ranId():
    id = random.randint(1, 10000000000)
    if id in bots:
        ranId()
    else:
        return id

class Make_Bot(Resource):
    def put(self, name):
        id = ranId()
        bots[str(id)] = {"name": name, "rooms": []}
        print(bots)
        return id

"""
Delete and remove from a room
"""
class delete_bot(Resource):
    """
    Delete a bot
    Toke: from the URL, the token of the bot
    """
    def delete(self, token):
        if token not in bots:
            return {"Status": '404 | Invalid Token'}
        del bots[token]
        return {"Status": '200'}
        
    """
    Patch/Remove from a room
    Token: from the URL, the token of the bot
    args['room']: the room id that they want the bot to be removed from
    """
    def patch(self, token):
        args = patch_room.parse_args()
        if token not in bots:
            return {"Status": '404 | Invalid Token'}
        if args['room'] not in rooms:
            return {"Status": '404 | Invalid Room'}
        bots[token]['rooms'].pop(bots[token]['rooms'].index(args['room']))
        return {"Status": '200'}

# add a bot to a room and get the rooms that the bots are in!
class Add_Room(Resource):
    """
    Add the bot to a room

    Token: from the URL, the token of the bot
    args['room']: the room you want to join

    """
    def put(self, token):
        args = add_room.parse_args()
        if token not in bots:
            return {"Status": '404 | Invalid Token'}
        if args['room'] not in rooms:
            return {"Status": '404 | Invalid Room'}
        bots[token]['rooms'].append(args['room'])
        return {"Status": '200'}

    """
    Gets all the rooms the the bot is in

    token: from the URL, the token of the bot

    """

    def get(self, token):
        if token not in bots:
            return {"Rooms": '404 | Invalid Token'}
        return {"Rooms": bots[token]['rooms']}

"""

Gets stats on a room

token: from the URL, the token of the bot
args['room']: the requested room

"""

class stats_room(Resource):
    def get(self, token):
        args = get_room.parse_args()
        if (token not in bots):
            return {"users": '404 | Invalid Token'}
        if (args['room'] not in rooms):
            return {"users": '404 | Invalid Room'}
        if (args['room'] not in bots[token]['rooms']):
            return {"users": '404 | Not Access'}
        return {"users": rooms[args['room']]['users']}

"""
Get the number of users in the hole chat

token: from the URL, the token of the bot

"""

class stats_all(Resource):
    def get(self, token):
        users = 0
        for i in rooms:
            users += 1
        return {"users": users}

"""
Only for the server updates the rooms var
"""

class only_server(Resource):
    def put(self, id):
        if str(id) != str(config['SERVERID']):
            return 404
        args = server.parse_args()
        rooms = args['rooms']

# adds all the urls to make requests
api.add_resource(Make_Bot, "/make_bot/<string:name>")
api.add_resource(Add_Room, "/room/<string:token>")
api.add_resource(stats_room, "/stats_room/<string:token>")
api.add_resource(stats_all, "/stats_all/<string:token>")
api.add_resource(delete_bot, "/manage_bot/<string:token>")

# Only For SERVER (Will have a password that will be changed when IM DONE)

api.add_resource(only_server, f"/add_to_server_{config['SERVERID']}/<int:id>")

# runs the app

if __name__ == '__main__':
    app.run(debug=True)
