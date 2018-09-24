import React, { Component } from 'react';
import '../assets/css/App.css';
import { Donut } from '../assets/donut';


const Submarine = (props) => (
  <div className="sea" style={{left: (-115 + 375 - 45 + 30) + (375 - 28.125) * Math.cos(((props.pos - 25)/100) * 360 * Math.PI / 180), top: (-111 + 375 - 45 + 30) + (375 - 28.125) * Math.sin(((props.pos - 25)/100) * 360 * Math.PI / 180)}}>
    <div className="circle-wrapper">
      <div className="submarine-wrapper">
        <div className="submarine-body">
          <div className="window"></div>
          <div className="engine"></div>
          <div className="light"></div>
        </div>
        <div className="helix"></div>
        <div className="hat">
          <div className="leds-wrapper">
            <div className="periscope"></div>
            <div className="leds"></div>
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
