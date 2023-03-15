import { useState, useEffect } from 'react';
import sound from './assets/Whistle.m4a';
import { Clock, StartPauseReset, BreakSession } from './RemoteComponents';

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
