import time
import os
import random
from flask import Flask, request
from flask_restful import Api, Resource, reqparse

app = Flask(__name__)
api = Api(app)

serverID = os.environ['serverID']

bots = {}
rooms = {"1": {"users": ["HEY", "2"]}}

get_room = reqparse.RequestParser()
get_room.add_argument("room", type=str, help="404 | Invalid Room", required=True)

patch_room = reqparse.RequestParser()
patch_room.add_argument("room", type=str, help="404 | Invalid Room", required=True)

server = reqparse.RequestParser()
server.add_argument("rooms", required=True)

add_room = reqparse.RequestParser()
add_room.add_argument("room", type=str, help="404 | Invalid Room", required=True)

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
        return {"token": id}

class delete_bot(Resource):

    def delete(self, token):
        if token not in bots:
            return {"Status": '404 | Invalid Token'}
        del bots[token]

    def patch(self, token):
        args = patch_room.parse_args()
        if token not in bots:
            return {"Status": '404 | Invalid Token'}
        if args['room'] not in rooms:
            return {"Status": '404 | Invalid Room'}
        bots[token]['rooms'].pop(bots[token]['rooms'].index(args['room']))


class Add_Room(Resource):
    def put(self, token):
        args = add_room.parse_args()
        if token not in bots:
            return {"Status": '404 | Invalid Token'}
        if args['room'] not in rooms:
            return {"Status": '404 | Invalid Room'}
        bots[token]['rooms'].append(args['room'])
        return {"Status": '200'}
    def get(self, token):
        if token not in bots:
            return {"Rooms": '404 | Invalid Token'}
        return {"Rooms": bots[token]['rooms']}

class stats_room(Resource):
    def get(self, token):
        args = get_room.parse_args()
        if (token not in bots):
            return {"users": '404 | Invalid Token'}
        if (args['room'] not in rooms):
            return {"users": '404 | Invalid Room'}
        if (args[room] not in rooms[token]['rooms']):
            return {"users": '404 | Not Access'}
        return {"users": rooms[room].users}

class stats_all(Resource):
    def get(self, token):
        args = get_room.parse_args()
        users = 0
        for i in rooms:
            users += 1
        return {"users": users}

class only_server(Resource):
    def put(self, id):
        if str(id) != str(serverID):
            return 404
        args = server.parse_args()
        rooms = args['rooms']

api.add_resource(Make_Bot, "/make_bot/<string:name>")
api.add_resource(Add_Room, "/room/<string:token>")
api.add_resource(stats_room, "/stats_room/<string:token>")
api.add_resource(stats_all, "/stats_all/<string:token>")
api.add_resource(delete_bot, "/manage_bot/<string:token>")
api.add_resource(delete_bot, "/manage_bot/<string:token>")

# Only For SERVER (Will have a password that will be changed when IM DONE)

api.add_resource(only_server, f"/add_to_server_{serverID}/<int:id>")

if __name__ == '__main__':
    app.run(debug=True)
