import sound from './assets/Whistle.m4a';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [sessionLength, setSessionLength] = useState(1500000);
  const [time, setTime] = useState(1500000);
  const [running, setRunning] = useState(false);
  const [breakLength, setBreakLength] = useState(300000);
  const [takeBreak, setTakeBreak] = useState(false);

  function play() {
    new Audio(sound).play();
  }

  if (time === 0) {
    play();
    setTakeBreak(true);
    setTime(breakLength);
  }

  if (time === 0 && takeBreak) {
    play();
    setTakeBreak(false);
    setTime(sessionLength);
  }

  function resetToDefault() {
    setTime(1500000);
    setSessionLength(1500000);
    setBreakLength(300000);
  }

  function incrementSessionLength() {
    if (sessionLength >= 3540000) {
      return sessionLength === 3540000;
    } else {
      setSessionLength(sessionLength + 60000);
      setTime(time + 60000);
    }
  }

  function decrementSessionLength() {
    if (sessionLength <= 60000) {
      return;
    } else {
      setSessionLength(sessionLength - 60000);
      setTime(time - 60000);
    }
  }

  function decrementBreakLength() {
    if (breakLength <= 60000) {
      return;
    } else {
      setBreakLength(breakLength - 60000);
    }
  }

  function incrementBreakLength() {
    if (breakLength >= 3540000) {
      return breakLength === 3540000;
    } else {
      setBreakLength(breakLength + 60000);
    }
  }

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className='App'>
      <div
        className='remote'
        style={{
          backgroundColor: takeBreak ? '#96DED1' : '#ecffdc',
        }}
      >
        {takeBreak ? <h5>On Break</h5> : <h5>In Session</h5>}
        <div className='clock'>
          <span>{('0' + (Math.floor(time / 60000) % 60)).slice(-2)}:</span>
          <span>{('0' + (Math.floor(time / 1000) % 60)).slice(-2)}</span>
        </div>
        <div className='start-pause-reset'>
          <button
            style={{
              backgroundColor: takeBreak ? '#ecffdc' : '#96DED1',
            }}
            className='middleButtons'
            onClick={() => setRunning(true)}
          >
            Start
          </button>
          <button
            style={{
              backgroundColor: takeBreak ? '#ecffdc' : '#96DED1',
            }}
            className='middleButtons'
            onClick={() => setRunning(false)}
          >
            Pause
          </button>
          <button
            style={{
              backgroundColor: takeBreak ? '#ecffdc' : '#96DED1',
            }}
            className='middleButtons'
            onClick={resetToDefault}
          >
            Reset
          </button>
        </div>

        <div className='break-session'>
          <div>
            <h4>Break</h4>
            <button
              onClick={incrementBreakLength}
              className='break-session-buttons'
            >
              +
            </button>
            <span>
              {('0' + (Math.floor(breakLength / 60000) % 60)).slice(-2)}:
            </span>
            <span>
              {('0' + (Math.floor(breakLength / 1000) % 60)).slice(-2)}
            </span>

            <button
              onClick={decrementBreakLength}
              className='break-session-buttons'
            >
              -
            </button>
          </div>
          <div>
            <h4>Session</h4>
            <button
              onClick={incrementSessionLength}
              className='break-session-buttons'
            >
              +
            </button>
            <span>
              {('0' + (Math.floor(sessionLength / 60000) % 60)).slice(-2)}:
            </span>
            <span>
              {('0' + (Math.floor(sessionLength / 1000) % 60)).slice(-2)}
            </span>
            <button
              onClick={decrementSessionLength}
              className='break-session-buttons'
            >
              -
            </button>
            {/* <button onClick={play}>Sound</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
