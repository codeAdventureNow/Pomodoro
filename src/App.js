import './App.css';
import Remote from './Remote';

function Pomodoro() {
  return (
    <div className='App'>
      <h2>
        <span className='pomodoroHeadline'>Pomodoro </span>Timer
      </h2>
      <Remote></Remote>
    </div>
  );
}

export default Pomodoro;
