import React, { Component } from 'react';
import '../assets/css/App.css';

const CircularTrench = (props) => (
  <svg className="donut" width="51.5%" height="51.5%" viewBox="0 0 42 42">
    <circle
      className="donut-hole"
      cx="21"
      cy="21"
      r="15.91549430918954" 
      fill="#fff"
    />
    <circle
      className="donut-ring" 
      cx="21"
      cy="21"
      r="15.91549430918954"
      fill="transparent" 
      stroke="#ef0e0e" 
      strokeWidth="3"
    />
    <circle
      className="donut-segment"
      cx="21"
      cy="21" 
      r="15.91549430918954" 
      fill="transparent" 
      stroke="#efdc0e" 
      strokeWidth="3"
      strokeDasharray="95 5" 
      strokeDashoffset={20 + (100 - props.start)}
    />
  </svg>
);

const Submarine = () => (
  <div className="sea" style={{left: 27.5, top: 60}}>
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
        <CircularTrench start={0}/>
        <Submarine/>
      </div>
    );
  }
}

export default App;
