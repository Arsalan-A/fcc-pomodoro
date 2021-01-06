import React from 'react';
import { BsCaretUpFill } from 'react-icons/bs';
import { BsCaretDownFill } from 'react-icons/bs';

function Pomodoro() {
  return (
    <div className='bg-container'>
      <div className='container'>
        <div className='timer-container'>
          <label id='timer-label' htmlFor='timer'>
            Session
          </label>
          <input name='timer' type='text' value='25:00' disabled />
          <div className='btn-container'>
            <button id='start_stop'>Start</button>
            <button id='reset'>Reset</button>
          </div>
        </div>

        <div className='break-container'>
          <label htmlFor='break' id='break-label'>
            Break Length
          </label>
          <button id='break-increment'>
            <BsCaretUpFill />
          </button>
          <input name='break' type='text' value='5' disabled />
          <button id='break-decrement'>
            <BsCaretDownFill />
          </button>
        </div>

        <div className='session-container'>
          <label htmlFor='session-label'>Session Length</label>
          <button id='session-increment'>
            <BsCaretUpFill />
          </button>
          <input name='session' type='text' value='25' disabled />
          <button id='session-decrement'>
            <BsCaretDownFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
