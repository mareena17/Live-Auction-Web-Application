import React, { Component } from "react";
import ReactDOM from "react-dom";
import Countdown from "react-countdown-now";
import CountdownTimer from "react-component-countdown-timer";
const Completionist = () => <span>You are good to go!</span>;

class Calendar extends React.Component {
  state = { time: new Date().toLocaleTimeString() };

  componentDidMount() {
    setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
    }, 1000);
  }
  render() {
    var settings = {
      count: 480,
      border: false,
      showTitle: true,
      noPoints: true
    };
    return (
      <div className="time">
        <div className="container">
          <figure className="grid-figure">
            <img
              className="grid-photo"
              src="alg.jpeg"
              width="330px"
              alt="icon"
            />
          </figure>
        </div>
        <CountdownTimer {...settings} />
        <button style={{ background: "alice-blue", width: 280 }}>
          The time is :{this.state.time}
        </button>
        <button style={{ background: "green", width: 120, color: "white" }}>
          Place Bid
        </button>
      </div>
    );
  }
}

export default Calendar;
