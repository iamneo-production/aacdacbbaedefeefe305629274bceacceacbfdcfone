import React, { Component } from 'react';
import './Stopwatch.css';


class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      startTime: 0,
      currentTime: 0,
      laps: [],
    };
  }

  startStopwatch = () => {
    if (!this.state.isRunning) {
      const startTime = Date.now() - this.state.currentTime;
      this.setState({ isRunning: true, startTime });
      this.timer = setInterval(this.updateTime, 10);
    } else {
      clearInterval(this.timer);
      this.setState({ isRunning: false });
    }
  };

  updateTime = () => {
    const currentTime = Date.now() - this.state.startTime;
    this.setState({ currentTime });
  };

  resetStopwatch = () => {
    clearInterval(this.timer);
    this.setState({
      isRunning: false,
      startTime: 0,
      currentTime: 0,
      laps: [],
    });
  };

  addLap = () => {
    const { laps, currentTime } = this.state;
    this.setState({ laps: [...laps, currentTime] });
  };

  render() {
    const { isRunning, currentTime, laps } = this.state;
    const formattedTime = this.formatTime(currentTime);

    return (
      <div className="stopwatch-container">
        <h2 className="stopwatch-title">Stopwatch</h2>
        <div className="time-display">{formattedTime}</div>
        <div className="button-container">
          <button
            className={`action-button start-button ${isRunning ? 'disabled' : ''}`}
            onClick={this.startStopwatch}
          >
            Start
          </button>
          <button
            className={`action-button stop-button ${!isRunning ? 'disabled' : ''}`}
            onClick={this.addLap}
          >
            Add Lap
          </button>
          <button
            className="action-button reset-button"
            onClick={this.resetStopwatch}
            disabled={isRunning}
          >
            Reset
          </button>
        </div>
        <ul className="lap-list">
          {laps.map((lapTime, index) => (
            <li key={index} className="lap-item">
              {this.formatTime(lapTime)}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  formatTime = (milliseconds) => {
    const centiseconds = String(Math.floor((milliseconds / 10) % 100)).padStart(2, '0');
    const seconds = String(Math.floor((milliseconds / 1000) % 60)).padStart(2, '0');
    const minutes = String(Math.floor((milliseconds / 60000) % 60)).padStart(2, '0');
    return `${minutes}:${seconds}.${centiseconds}`;
  };
}

export default Stopwatch;