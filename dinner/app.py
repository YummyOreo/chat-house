import time
import random
from flask import Flask, request
from flask_restful import Api, Resource, reqparse

app = Flask(__name__)
api = Api(app)

bots = {}
rooms = {"1": {"name": "HEY"}}

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


api.add_resource(Make_Bot, "/make_bot/<string:name>")
api.add_resource(Add_Room, "/room/<string:token>")

if __name__ == '__main__':
    app.run(debug=True)
