import React, { Component } from 'react';
import '../assets/css/App.css';
import { Donut } from '../assets/donut';


const Submarine = (props) => (
  <div className="sea" style={{left: (-115 + 375 - 45 + 30) + (375 - 28.125) * Math.cos(((props.pos - 25)/100) * 360 * Math.PI / 180), top: (-111 + 375 - 45 + 30) + (375 - 28.125) * Math.sin(((props.pos - 25)/100) * 360 * Math.PI / 180)}}>
    <div class="circle-wrapper">
      <div class="bubble"></div>
      <div class="submarine-wrapper">
        <div class="submarine-body">
          <div class="window"></div>
          <div class="engine"></div>
          <div class="light"></div>
        </div>
        <div class="helix"></div>
        <div class="hat">
          <div class="leds-wrapper">
            <div class="periscope"></div>
            <div class="leds"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

class App extends Component {
  render() {
    return (
      <div>
        <Donut start={0}/>
        <Submarine pos={50}/>
      </div>
    );
  }
}

export default App;
