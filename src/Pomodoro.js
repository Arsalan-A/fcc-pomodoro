import React, { useState, useRef, useEffect } from 'react';
import { BsCaretUpFill } from 'react-icons/bs';
import { BsCaretDownFill } from 'react-icons/bs';

function Pomodoro() {
  let [breakValue, setBreakValue] = useState(5);
  let [sessionValue, setSessionValue] = useState(25);
  let [timerValue, setTimerValue] = useState('25:00');
  let [isTimerRunning, setIsTimerRunning] = useState(false);

  let toSeconds = useRef(0);
  let interval = useRef(null);

  //Convert Minutes to Seconds
  const convertToSeconds = (m) => {
    return m * 60;
  };

  //Convert seconds to MM:SS Format
  const setTimer = (seconds) => {
    return (
      (seconds - (seconds %= 60)) / 60 + (9 < seconds ? ':' : ':0') + seconds
    );
  };

  //Stop the current running Interval
  const stopInterval = (interval) => {
    window.clearInterval(interval);
  };

  //Start or Pause the timer
  const startPause = (e) => {
    setIsTimerRunning(!isTimerRunning);

    if (!isTimerRunning) {
      interval.current = window.setInterval(() => {
        toSeconds.current -= 1;
        setTimerValue(setTimer(toSeconds.current));
        console.log(toSeconds.current);
        if (toSeconds.current === 0) {
          stopInterval(interval.current);
        }
      }, 1000);
    } else {
      stopInterval(interval.current);
    }
  };

  const reset = () => {
    setBreakValue(5);
    setSessionValue(25);
    setTimerValue('25:00');
    setIsTimerRunning(false);
    toSeconds.current = convertToSeconds(sessionValue);
    stopInterval(interval.current);
  };

  const incrementBreak = () => {
    if (breakValue < 60) {
      setBreakValue((breakValue += 1));
    }
  };

  const decrementBreak = () => {
    if (breakValue > 1) {
      setBreakValue((breakValue -= 1));
    }
  };

  const incrementSession = () => {
    if (sessionValue < 60) {
      setSessionValue((sessionValue += 1));
    }
  };

  const decrementSession = () => {
    if (sessionValue > 1) {
      setSessionValue((sessionValue -= 1));
    }
  };

  useEffect(() => {
    //set the toSeconds to the converted seconds
    toSeconds.current = convertToSeconds(sessionValue);

    //set timer to the formatted seconds
    setTimerValue(setTimer(toSeconds.current));
    console.log(toSeconds.current);
    console.log('useEffect');
  }, [sessionValue]);

  return (
    <div className='bg-container'>
      <div className='container'>
        {/* Timer value */}
        <div className='timer-container'>
          <label id='timer-label' htmlFor='timer'>
            Session
          </label>
          <input name='timer' type='text' value={timerValue} disabled />

          {/* START AND RESET */}
          <div className='btn-container'>
            <button id='start_stop' onClick={startPause}>
              {isTimerRunning ? 'Pause' : 'Start'}
            </button>
            <button id='reset' onClick={reset}>
              Reset
            </button>
          </div>
        </div>

        {/* Break Length values */}
        <div className='break-container'>
          <label htmlFor='break' id='break-label'>
            Break Length
          </label>
          <button id='break-increment' onClick={incrementBreak}>
            <BsCaretUpFill />
          </button>
          <input name='break' type='text' value={breakValue} disabled />
          <button id='break-decrement' onClick={decrementBreak}>
            <BsCaretDownFill />
          </button>
        </div>

        {/* Session Length Values */}
        <div className='session-container'>
          <label htmlFor='session-label'>Session Length</label>
          <button id='session-increment' onClick={incrementSession}>
            <BsCaretUpFill />
          </button>
          <input name='session' type='text' value={sessionValue} disabled />
          <button id='session-decrement' onClick={decrementSession}>
            <BsCaretDownFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
