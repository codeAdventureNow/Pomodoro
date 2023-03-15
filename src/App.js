import sound from './assets/Whistle.m4a';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const minute = 60000;
  const [time, setTime] = useState(minute * 25);
  const [timeStart, setTimeStart] = useState(false);
  const [sessionLength, setSessionLength] = useState(minute * 25);
  const [breakLength, setBreakLength] = useState(minute * 5);
  const [onBreak, setOnBreak] = useState(false);

  function playAudioAlert() {
    new Audio(sound).play();
  }

  if (time === 0) {
    playAudioAlert();
    setOnBreak(true);
    setTime(breakLength);
  }

  if (time === 0 && onBreak) {
    playAudioAlert();
    setOnBreak(false);
    setTime(sessionLength);
  }

  function resetToDefault() {
    setTime(minute * 25);
    setSessionLength(minute * 25);
    setBreakLength(minute * 5);
  }

  function incrementSessionLength() {
    if (sessionLength >= minute * 59) {
      return;
    } else {
      setSessionLength(sessionLength + minute);
      setTime(time + minute);
    }
  }

  function decrementSessionLength() {
    if (sessionLength <= minute) {
      return;
    } else {
      setSessionLength(sessionLength - minute);
      setTime(time - minute);
    }
  }

  function decrementBreakLength() {
    if (breakLength <= minute) {
      return;
    } else {
      setBreakLength(breakLength - minute);
    }
  }

  function incrementBreakLength() {
    if (breakLength >= minute * 59) {
      return breakLength === minute * 59;
    } else {
      setBreakLength(breakLength + minute);
    }
  }

  useEffect(() => {
    let interval;
    if (timeStart) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 10);
      }, 10);
    } else if (!timeStart) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeStart]);

  return (
    <div className='App'>
      <h2>
        <span className='pomodoroHeadline'>Pomodoro </span>Timer
      </h2>
      <div
        className='remote'
        style={{
          backgroundColor: onBreak ? '#96DED1' : '#ecffdc',
        }}
      >
        {' '}
        <div className='clock'>
          {onBreak ? <p>On Break</p> : <p>In Session</p>}
          <div className='timeCounter'>
            <span>{('0' + (Math.floor(time / minute) % 60)).slice(-2)}:</span>
            <span>{('0' + (Math.floor(time / 1000) % 60)).slice(-2)}</span>
          </div>
        </div>
        <div className='startPauseReset'>
          <button
            style={{
              backgroundColor: onBreak ? '#ecffdc' : '#96DED1',
            }}
            className='startPauseResetButtons'
            onClick={() => setTimeStart(true)}
          >
            Start
          </button>
          <button
            style={{
              backgroundColor: onBreak ? '#ecffdc' : '#96DED1',
            }}
            className='startPauseResetButtons'
            onClick={() => setTimeStart(false)}
          >
            Pause
          </button>
          <button
            style={{
              backgroundColor: onBreak ? '#ecffdc' : '#96DED1',
            }}
            className='startPauseResetButtons'
            onClick={resetToDefault}
          >
            Reset
          </button>
        </div>
        <div className='breakSession'>
          <div>
            <h4>Break</h4>
            <button
              onClick={incrementBreakLength}
              className='breakSessionButtons'
            >
              +
            </button>
            <span>
              {('0' + (Math.floor(breakLength / minute) % 60)).slice(-2)}:
            </span>
            <span>
              {('0' + (Math.floor(breakLength / 1000) % 60)).slice(-2)}
            </span>

            <button
              onClick={decrementBreakLength}
              className='breakSessionButtons'
            >
              -
            </button>
          </div>
          <div>
            <h4>Session</h4>
            <button
              onClick={incrementSessionLength}
              className='breakSessionButtons'
            >
              +
            </button>
            <span>
              {('0' + (Math.floor(sessionLength / minute) % 60)).slice(-2)}:
            </span>
            <span>
              {('0' + (Math.floor(sessionLength / 1000) % 60)).slice(-2)}
            </span>
            <button
              onClick={decrementSessionLength}
              className='breakSessionButtons'
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
