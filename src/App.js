import sound from './assets/Whistle.m4a';
import './App.css';
import { useReducer, useEffect } from 'react';

const SET_BREAK = 'set_break';
const START_NEW_SESSION = 'start_new_session';
const RESET_SESSION_AND_BREAK = 'reset_session_and_break';
const INCREMENT_SESSION_LENGTH = 'increment_session_length';
const DECREMENT_SESSION_LENGTH = 'decrement_session_length';
const TIME_START_TOGGLE = 'time_start_toggle';
const DECREMENT_BREAK_LENGTH = 'decrement_break_length';
const INCREMENT_BREAK_LENGTH = 'increment_break_length';
const DECREMENT_TIME = 'decrement_time';

const minute = 60000;

function reducer(state, action) {
  switch (action.type) {
    case SET_BREAK:
      return {
        ...state,
        onBreak: true,
        tally: state.tally + 1,
        time: state.breakLength,
      };
    case START_NEW_SESSION:
      return {
        ...state,
        onBreak: false,
        tally: state.tally,
        time: state.sessionLength,
      };
    case RESET_SESSION_AND_BREAK:
      return {
        ...state,
        time: minute * 25,
        sessionLength: minute * 25,
        breakLength: minute * 5,
      };
    case INCREMENT_SESSION_LENGTH:
      return {
        ...state,
        sessionLength: state.sessionLength + minute,
        time: state.time + minute,
      };
    case DECREMENT_SESSION_LENGTH:
      return {
        ...state,
        sessionLength: state.sessionLength - minute,
        time: state.time - minute,
      };
    case TIME_START_TOGGLE: {
      return {
        ...state,
        timeStart: action.payload,
      };
    }

    case DECREMENT_BREAK_LENGTH:
      return {
        ...state,
        breakLength: state.breakLength - minute,
      };
    case INCREMENT_BREAK_LENGTH:
      return {
        ...state,
        breakLength: state.breakLength + minute,
      };
    case DECREMENT_TIME:
      return {
        ...state,
        time: action.payload,
      };
    default:
      return state;
  }
}

function App() {
  // const [time, setTime] = useState(minute * 25);
  // const [timeStart, setTimeStart] = useState(false);
  // const [sessionLength, setSessionLength] = useState(minute * 25);
  // const [breakLength, setBreakLength] = useState(minute * 5);
  // const [onBreak, setOnBreak] = useState(false);
  // const [tally, setTally] = useState(0);

  const [state, dispatch] = useReducer(reducer, {
    time: minute * 25,
    timeStart: false,
    sessionLength: minute * 25,
    breakLength: minute * 5,
    onBreak: false,
    tally: 0,
  });

  function playAudioAlert() {
    new Audio(sound).play();
  }

  if (state.time === 0) {
    playAudioAlert();
    // setOnBreak(true);
    // setTally(state.tally + 1);
    // setTime(state.breakLength);
    dispatch({
      type: SET_BREAK,
    });
  }

  if (state.time === 0 && state.onBreak) {
    playAudioAlert();
    // setOnBreak(false);
    // setTally(state.tally);
    // setTime(state.sessionLength);
    dispatch({
      type: START_NEW_SESSION,
    });
  }

  function resetToDefault() {
    // setTime(minute * 25);
    // setSessionLength(minute * 25);
    // setBreakLength(minute * 5);
    dispatch({
      type: RESET_SESSION_AND_BREAK,
    });
  }

  function incrementSessionLength() {
    if (state.sessionLength >= minute * 59) {
      return;
    } else {
      dispatch({
        type: INCREMENT_SESSION_LENGTH,
      });
      // setSessionLength(state.sessionLength + minute);
      // setTime(state.time + minute);
    }
  }

  function decrementSessionLength() {
    if (state.sessionLength <= minute) {
      return;
    } else {
      dispatch({
        type: DECREMENT_SESSION_LENGTH,
      });
      // setSessionLength(state.sessionLength - minute);
      // setTime(state.time - minute);
    }
  }

  function decrementBreakLength() {
    if (state.breakLength <= minute) {
      return;
    } else {
      // setBreakLength(state.breakLength - minute);
      dispatch({
        type: DECREMENT_BREAK_LENGTH,
      });
    }
  }

  function incrementBreakLength() {
    if (state.breakLength >= minute * 59) {
      return state.breakLength === minute * 59;
    } else {
      // setBreakLength(state.breakLength + minute);
      dispatch({
        type: INCREMENT_BREAK_LENGTH,
      });
    }
  }

  //TODO How do I work with useEffect in conjunction with a reducer?
  useEffect(() => {
    let interval;
    if (state.timeStart) {
      interval = setInterval(() => {
        // dispatch({
        //   type: DECREMENT_TIME,
        //   payload: state.time - 10,
        // });
        // setTime((prevTime) => prevTime - 10);
      }, 10);
    } else if (!state.timeStart) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [state.timeStart, state.time]);

  return (
    <div className='App'>
      <h2>
        <span className='pomodoroHeadline'>Pomodoro </span>Timer
      </h2>
      <div
        className='remote'
        style={{
          backgroundColor: state.onBreak
            ? 'var(--secondary)'
            : 'var(--primary)',
        }}
      >
        {' '}
        <div className='clock'>
          {state.onBreak ? <p>On Break</p> : <p>In Session</p>}
          <div className='timeCounter'>
            <span>
              {('0' + (Math.floor(state.time / minute) % 60)).slice(-2)}:
            </span>
            <span>
              {('0' + (Math.floor(state.time / 1000) % 60)).slice(-2)}
            </span>
          </div>
        </div>
        <h4 className='tally-heading'>Tally</h4>
        <div className='tally'>
          <p>{state.tally}</p>
        </div>
        <div className='startPauseReset'>
          <button
            className='startPauseResetButtons'
            style={{
              backgroundColor: state.onBreak
                ? 'var(--primary)'
                : 'var(--secondary)',
            }}
            onClick={() =>
              dispatch({
                type: TIME_START_TOGGLE,
                payload: true,
              })
            }
          >
            Start
          </button>
          <button
            className='startPauseResetButtons'
            style={{
              backgroundColor: state.onBreak
                ? 'var(--primary)'
                : 'var(--secondary)',
            }}
            onClick={() =>
              dispatch({
                type: TIME_START_TOGGLE,
                payload: false,
              })
            }
          >
            Pause
          </button>
          <button
            className='startPauseResetButtons'
            style={{
              backgroundColor: state.onBreak
                ? 'var(--primary)'
                : 'var(--secondary)',
            }}
            onClick={resetToDefault}
          >
            Reset
          </button>
        </div>
        <div className='breakSession'>
          <div>
            <h4>Break</h4>
            <button
              className='breakSessionButtons'
              onClick={incrementBreakLength}
            >
              +
            </button>
            <span>
              {('0' + (Math.floor(state.breakLength / minute) % 60)).slice(-2)}:
            </span>
            <span>
              {('0' + (Math.floor(state.breakLength / 1000) % 60)).slice(-2)}
            </span>

            <button
              className='breakSessionButtons'
              onClick={decrementBreakLength}
            >
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
              {('0' + (Math.floor(state.sessionLength / minute) % 60)).slice(
                -2
              )}
              :
            </span>
            <span>
              {('0' + (Math.floor(state.sessionLength / 1000) % 60)).slice(-2)}
            </span>
            <button
              className='breakSessionButtons'
              onClick={decrementSessionLength}
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
