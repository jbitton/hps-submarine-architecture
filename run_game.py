from multiprocessing import Process
from time import sleep

from submarine_server import GameServer
from submarine_clients_template import SubmarineCaptain, TrenchManager

def init_submarine_captain(name):
    sleep(1)
    player = SubmarineCaptain(name=name)
    player.play_game()

def init_trench_manager(name):
    sleep(1)
    player = TrenchManager(name=name)
    player.play_game()

def main():
    player_1 = Process(target=init_submarine_captain, args=('Captain Joe',))
    player_1.start()
    player_2 = Process(target=init_trench_manager, args=('Manager Zach',))
    player_2.start()

    controller = GameServer()

if __name__ == '__main__':
    main()
