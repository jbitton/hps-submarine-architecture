import React, { Component } from 'react';
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
      probes: [1, 4, 7],
    };
  }

  // TODO: have a function that talks to the server for game stats

  render() {
    return (
      <div>
        <SubmarineAppBar/>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <Donut start={this.state.redRegion}/>
          <Submarine pos={this.state.position}/>
          {this.state.probes.map(position => <Probe pos={position}/>)}
          <StatsTable {...this.state}/>
        </div>
      </div>
    );
  }
}

export default App;
