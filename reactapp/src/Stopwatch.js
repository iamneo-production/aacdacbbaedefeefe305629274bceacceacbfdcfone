
import React, { Component } from 'react';
import './Stopwatch.css';

class Stopwatch extends Component {

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

  // ... Rest of the JavaScript code remains the same as in the previous response
}

export default Stopwatch;
