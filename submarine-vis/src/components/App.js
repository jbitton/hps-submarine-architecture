import React, { Component } from 'react';
import Websocket from 'react-websocket';
import { Donut } from './Donut.react';
import { Submarine, Probe } from './Submarine.react';
import StatsTable from './StatsTable.react';
import SubmarineAppBar from './SubmarineAppBar.react';
import '../assets/css/App.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      redRegion: 5,
      position: 0,
      isSafetyConditionAchieved: true,
      submarineRegion: 'yellow',
      trenchAlert: 'red',
      probes: [],
      gamestates: [],
      interval: undefined,
    };
  }

  componentDidMount() {
    this.setState({
        interval: setInterval(() => {
          const gamestate = this.state.gamestates.shift()
          if (gamestate !== undefined) {
            this.setState({
              redRegion: gamestate.red_region,
              position: gamestate.position,
              isSafetyConditionAchieved: gamestate.is_safety_condition_achieved,
              submarineRegion: gamestate.submarine_region,
              trenchAlert: gamestate.trench_alert,
              probes: gamestate.probes,
            })
          }
        }, 1000)
    })
  }

  componentWillUnmount() {
    if (this.state.interval !== undefined) {
      clearInterval(this.state.interval)
    }
  }

  handleData(data) {
    const gamestate = JSON.parse(data)
    var gamestates = [...this.state.gamestates]
    gamestates.push(gamestate)
    this.setState({gamestates})
  }

  render() {
    return (
      <div>
        <SubmarineAppBar/>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <Donut start={this.state.redRegion}/>
          <Submarine pos={this.state.position}/>
          {this.state.probes.map(position => <Probe pos={position}/>)}
          <StatsTable {...this.state}/>
          <Websocket
            url='ws://localhost:8000'
            onMessage={this.handleData.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
