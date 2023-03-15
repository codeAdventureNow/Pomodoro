import { useState, useEffect } from 'react';
import sound from './assets/Whistle.m4a';

function Clock({ onBreak, time, minute }) {
  return (
    <div className='clock'>
      {onBreak ? <p>On Break</p> : <p>In Session</p>}
      <div className='timeCounter'>
        <span>{('0' + (Math.floor(time / minute) % 60)).slice(-2)}:</span>
        <span>{('0' + (Math.floor(time / 1000) % 60)).slice(-2)}</span>
      </div>
    </div>
  );
}

function StartPauseReset({ setTimeStart, onBreak, resetToDefault }) {
  return (
    <div className='startPauseReset'>
      <button
        className='startPauseResetButtons'
        style={{
          backgroundColor: onBreak ? 'var(--primary)' : 'var(--secondary)',
        }}
        onClick={() => setTimeStart(true)}
      >
        Start
      </button>
      <button
        className='startPauseResetButtons'
        style={{
          backgroundColor: onBreak ? 'var(--primary)' : 'var(--secondary)',
        }}
        onClick={() => setTimeStart(false)}
      >
        Pause
      </button>
      <button
        className='startPauseResetButtons'
        style={{
          backgroundColor: onBreak ? 'var(--primary)' : 'var(--secondary)',
        }}
        onClick={resetToDefault}
      >
        Reset
      </button>
    </div>
  );
}

function BreakSession({
  incrementBreakLength,
  breakLength,
  minute,
  decrementBreakLength,
  incrementSessionLength,
  sessionLength,
  decrementSessionLength,
}) {
  return (
    <div className='breakSession'>
      <div>
        <h4>Break</h4>
        <button className='breakSessionButtons' onClick={incrementBreakLength}>
          +
        </button>
        <span>
          {('0' + (Math.floor(breakLength / minute) % 60)).slice(-2)}:
        </span>
        <span>{('0' + (Math.floor(breakLength / 1000) % 60)).slice(-2)}</span>

        <button className='breakSessionButtons' onClick={decrementBreakLength}>
          -
        </button>
      </div>
      <div>
        <h4>Session</h4>
        <button
          className='breakSessionButtons'
          onClick={incrementSessionLength}
        >
          +
        </button>
        <span>
          {('0' + (Math.floor(sessionLength / minute) % 60)).slice(-2)}:
        </span>
        <span>{('0' + (Math.floor(sessionLength / 1000) % 60)).slice(-2)}</span>
        <button
          className='breakSessionButtons'
          onClick={decrementSessionLength}
        >
          -
        </button>
      </div>
    </div>
  );
}

export default function Remote() {
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
    <div
      className='remote'
      style={{
        backgroundColor: onBreak ? 'var(--secondary)' : 'var(--primary)',
      }}
    >
      <Clock onBreak={onBreak} time={time} minute={minute}></Clock>
      <StartPauseReset
        setTimeStart={setTimeStart}
        onBreak={onBreak}
        resetToDefault={resetToDefault}
      ></StartPauseReset>
      <BreakSession
        incrementBreakLength={incrementBreakLength}
        breakLength={breakLength}
        minute={minute}
        decrementBreakLength={decrementBreakLength}
        incrementSessionLength={incrementSessionLength}
        sessionLength={sessionLength}
        decrementSessionLength={decrementSessionLength}
      ></BreakSession>
    </div>
  );
}
