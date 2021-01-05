import React from 'react';

function Pomodoro() {
  return (
    <div className='container'>
      <div className='timer-container'>
        <label id='timer-label' htmlFor='timer'>
          Session
        </label>
        <input name='timer' type='text' value='25:00' disabled />
      </div>

      <div className='btn-container'>
        <button id='start_stop'>Start</button>
        <button id='reset'>Reset</button>
      </div>

      <div className='break-container'>
        <label htmlFor='break' id='break-label'>
          Break Length
        </label>
        <button id='break-increment'>Increment</button>
        <input name='break' type='text' value='5' disabled />
        <button id='break-decrement'>Decrement</button>
      </div>

      <div className='session-container'>
        <label htmlFor='session-label'>Session Length</label>
        <button id='session-increment'>Increment</button>
        <input name='session' type='text' value='25' disabled />
        <button id='session-decrement'>Decrement</button>
      </div>
    </div>
  );
}

export default Pomodoro;
