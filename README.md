# hps-submarine-architecture

Hello guys! This is the architecture for the submarine problem.

There are multiple parts to this project:
* The Submarine Alert UI to go with the game
* The actual server/client code that plays the game

## Setup Client / Server Code

1. This project uses `python3.6`. If you haven't already, please install it.
2. Download the SocketServer/SocketClient code: `pip install --user hps-nyu` (only external dependency)
3. `cd` into this project on your machine and run `python3.6 run_game.py`

You should see some output that looks similar to this:
```
sub {'m': 10, 'L': 4, 'pos': 78}
trench {'d': 36, 'y': 6, 'r': 6, 'm': 10, 'L': 4, 'p': 2}
The trench manager's final cost is: 120. The safety condition was satisfied.
Your final cost is: 120. The safety condition was satisfied.
```

If you do not, try to debug what's wrong on your side. If problems persist, please reach out.

## Including Your Client Code

Under the `clients` folder you will find three files. You should only care about two of them:
* `submarine_captain_client.py`: You will insert your submarine client code in the `your_algorithm()` function. You don't need to touch _anything else_. Follow the instructions detailed in the docstring.
* `trench_manager_client.py`: You will split up your trench client code into two functions: `send_probes` and `choose_alert`. I split it up into two separate functions for modularity purposes and the fact that they do have different logic. You don't need to touch _anything else_. Follow the instructions detailed in each docstring.

## Modifying the Initial Game State

If you want to test out various initial game state values, you only need to modify one line of code.

In `run_game.py` on line 24, I initialize `controller = GameServer()`. To change the game state, inject any of the following parameters into `GameServer`: `d, y, r, m, L, p, and/or gui`.

```
controller = GameServer(d=45, y=10, r=50, m=3, L=10, p=3, gui=False)
```

## Running the Web Application

Okay, so you want to see the awesome UI. It's stored under the `submarine-vis` folder. However, you do need to install some packages (it's written in `React.js`):

1. Install `Node.js`: for Macs with homebrew installed, it's as easy as: `brew install node`. Or, you can visit the node website: https://nodejs.org/en/download/
2. Install `yarn`: for Macs with homebrew installed, it's as easy as `brew install yarn`. Or, you can visit the yarn website: https://yarnpkg.com/lang/en/docs/install
3. `cd` into `submarine-vis`
4. Run `yarn install`. This will install all of the needed node dependencies
5. Afterwards, run `yarn start` and the app should open up in a new tab. It's hosted on `localhost:3000`
6. To have the GameServer provide an endpoint pass `True` to the gui optional parameter. ie. `GameServer(gui=True)`. This will provide an endpoint on `localhost:8000`

**TIPS**:
The players will not be allowed to connect until the gui has connected to the GameServer. This means you should change your `run_server.py` to sleep for a longer amount of time prior to connecting to the game server.

You will manually have to open the gui in a browser by going to the address `localhost:8000`... assuming you're running the react app on your computer. You could also run both of your clients independantly and connect to the game server after you connect the gui.

**NOTE**: Zach fixed the connection. You're most welcome. :turtle:
