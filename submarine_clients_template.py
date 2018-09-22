import json
from abc import abstractclassmethod
from random import randint, choice

from hps.clients import SocketClient

HOST = '127.0.0.1'
PORT = 5000

class Player(object):
    def __init__(self, name, is_trench_manager):
        self.name = name
        self.is_trench_manager = is_trench_manager
        self.client = SocketClient(HOST, PORT)
        self.client.send_data(json.dumps({'name': self.name, 'is_trench_manager': self.is_trench_manager}))

    @abstractclassmethod
    def play_game(self):
        pass


class SubmarineCaptain(Player):
    def __init__(self, name):
        super(SubmarineCaptain, self).__init__(name=name, is_trench_manager=False)
        game_info = json.loads(self.client.receive_data())
        print('sub', game_info)
        self.m = game_info['m']
        self.L = game_info['L']
        self.position = game_info['pos']

    def play_game(self):
        while True:
            self.client.send_data(json.dumps({"move": randint(-1,1)}))
            response = json.loads(self.client.receive_data())
            if 'game_over' in response:
                print(f"The trench manager's final cost is: {response['trench_cost']}. " +
                      f"The safety condition {'was' if response['was_condition_achieved'] else 'was not'} satisfied.")
                exit(0)


class TrenchManager(Player):
    def __init__(self, name):
        super(TrenchManager, self).__init__(name=name, is_trench_manager=True)
        game_info = json.loads(self.client.receive_data())
        print('trench', game_info)
        self.d = game_info['d']
        self.y = game_info['y']
        self.r = game_info['r']
        self.m = game_info['m']
        self.L = game_info['L']
        self.p = game_info['p']

    def play_game(self):
        while True:
            self.client.send_data(json.dumps({"probes": [randint(0,99), randint(0,99), randint(0,99)]}))
            response = json.loads(self.client.receive_data())
            self.client.send_data(json.dumps({"region": choice(['red', 'yellow'])}))
            response = json.loads(self.client.receive_data())
            if 'game_over' in response:
                print(f"Your final cost is: {response['trench_cost']}. " +
                      f"The safety condition {'was' if response['was_condition_achieved'] else 'was not'} satisfied.")
                exit(0)
