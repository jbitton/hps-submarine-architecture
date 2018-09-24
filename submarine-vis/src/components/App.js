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
      redRegion: 0,
      position: 0,
      isSafetyConditionAchieved: true,
      submarineRegion: 'red',
      trenchAlert: 'red',
      probes: [],
    };
  }

  handleData(data) {
    let result = JSON.parse(data);
    console.log(result)
    this.setState({
      redRegion: result.red_region,
      position: result.position,
      isSafetyConditionAchieved: result.is_safety_condition_achieved,
      submarineRegion: result.submarine_region,
      trenchAlert: result.trench_alert,
      probes: result.probes,
    });
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
