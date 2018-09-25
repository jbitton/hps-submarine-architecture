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
      turns: [],
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      let turn = this.state.turns.shift()
      if (turn !== undefined) {
        this.setState({
          redRegion: turn.red_region,
          position: turn.position,
          isSafetyConditionAchieved: turn.is_safety_condition_achieved,
          submarineRegion: turn.submarine_region,
          trenchAlert: turn.trench_alert,
          probes: turn.probes,
        })
      }
    }, 1000
  )}

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleData(data) {
    let turn = JSON.parse(data)
    console.log(turn)
    var turns = [...this.state.turns]
    turns.push(turn)
    this.setState({turns})
    console.log(turns)
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
