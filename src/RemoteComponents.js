export function Clock({ onBreak, time, minute }) {
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

export function StartPauseReset({ setTimeStart, onBreak, resetToDefault }) {
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

export function BreakSession({
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
