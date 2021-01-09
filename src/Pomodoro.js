import React, { useState, useRef, useEffect } from 'react';
import { BsCaretUpFill } from 'react-icons/bs';
import { BsCaretDownFill } from 'react-icons/bs';

function Pomodoro() {
  let [breakValue, setBreakValue] = useState(5);
  let [sessionValue, setSessionValue] = useState(25);
  let [timerValue, setTimerValue] = useState('25:00');
  let [isTimerRunning, setIsTimerRunning] = useState(false);
  let [isSessionRunning, setIsSessionRunning] = useState(true);

  let sessionLbl = useRef(null);
  let toSeconds = useRef('25:00');
  let breakToSeconds = useRef(5);
  let interval = useRef(null);
  let beep = useRef();

  //Convert Minutes to Seconds
  const convertToSeconds = (m) => {
    return m * 60;
  };

  //Convert seconds to MM:SS Format
  const setTimer = (seconds) => {
    const test = (seconds - (seconds %= 60)) / 60;
    return (9 < test ? '' : '0') + test + (9 < seconds ? ':' : ':0') + seconds;
  };

  //Start the current running Interval
  const startSessionInterval = () => {
    toSeconds.current -= 1;
    setTimerValue(setTimer(toSeconds.current));
  };

  const startSession = () => {
    stopInterval(interval.current);
    toSeconds.current = convertToSeconds(sessionValue);
    setTimerValue(setTimer(toSeconds.current));
    interval.current = window.setInterval(startSessionInterval, 1000);
  };

  const startBreakInterval = () => {
    breakToSeconds.current -= 1;
    setTimerValue(setTimer(breakToSeconds.current));
  };

  //Break Function to set the break time
  const startBreak = () => {
    stopInterval(interval.current);
    breakToSeconds.current = convertToSeconds(breakValue);
    setTimerValue(setTimer(breakToSeconds.current));
    interval.current = window.setInterval(startBreakInterval, 1000);
  };

  //Stop the current running Interval
  const stopInterval = (interval) => {
    window.clearInterval(interval);
  };

  //Start or Pause the timer
  const startPause = (e) => {
    setIsTimerRunning(!isTimerRunning);

    if (!isTimerRunning) {
      if (toSeconds.current !== null) {
        interval.current = window.setInterval(startSessionInterval, 1000);
      } else {
        interval.current = window.setInterval(startBreakInterval, 1000);
      }
    } else {
      stopInterval(interval.current);
    }
  };

  const reset = () => {
    setBreakValue(5);
    setSessionValue(25);
    setTimerValue('25:00');
    setIsTimerRunning(false);
    setIsSessionRunning(true);
    toSeconds.current = convertToSeconds(sessionValue);
    breakToSeconds.current = convertToSeconds(breakValue);
    beep.current.pause();
    beep.current.currentTime = 0;

    stopInterval(interval.current);
  };

  const incrementBreak = () => {
    if (breakValue < 60 && !isTimerRunning) {
      setBreakValue((breakValue += 1));
    }
  };

  const decrementBreak = () => {
    if (breakValue > 1 && !isTimerRunning) {
      setBreakValue((breakValue -= 1));
    }
  };

  const incrementSession = () => {
    if (sessionValue < 60 && !isTimerRunning) {
      setSessionValue((sessionValue += 1));
    }
  };

  const decrementSession = () => {
    if (sessionValue > 1 && !isTimerRunning) {
      setSessionValue((sessionValue -= 1));
    }
  };

  //Run only for tracking toSeconds
  useEffect(() => {
    if (toSeconds.current === 0) {
      setIsSessionRunning(false);
      beep.current.play();

      toSeconds.current = null;
      startBreak();
    }

    if (breakToSeconds.current === 0) {
      beep.current.play();
      setIsSessionRunning(true);
      breakToSeconds.current = null;
      startSession();
    }
  }, [startBreak, startSession, timerValue]);

  useEffect(() => {
    if (isSessionRunning) {
      //set the toSeconds to the converted sessionValue seconds
      toSeconds.current = convertToSeconds(sessionValue);

      //set timer to the formatted seconds
      setTimerValue(setTimer(toSeconds.current));
    }
  }, [sessionValue, isSessionRunning]);

  useEffect(() => {
    //set the toSeconds to the converted sessionValue seconds
    if (!isSessionRunning) {
      breakToSeconds.current = convertToSeconds(breakValue);

      //set timer to the formatted seconds
      setTimerValue(setTimer(breakToSeconds.current));
    }
  }, [breakValue, isSessionRunning]);

  return (
    <div className='bg-container'>
      <p>
        <span className='line'></span>Pomodoro Clock
        <span className='line'></span>
      </p>
      <div className='container'>
        {/* Timer value */}
        <div className='timer-container'>
          <label id='timer-label' htmlFor='timer' ref={sessionLbl}>
            {isSessionRunning ? 'Session' : 'Break'}
          </label>
          <p id='time-left'>{timerValue}</p>

          <audio
            id='beep'
            ref={beep}
            src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
          ></audio>
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
          <input
            id='break-length'
            name='break'
            type='text'
            value={breakValue}
            disabled
          />
          <button id='break-decrement' onClick={decrementBreak}>
            <BsCaretDownFill />
          </button>
        </div>

        {/* Session Length Values */}
        <div className='session-container'>
          <label id='session-label' htmlFor='session-label'>
            Session Length
          </label>
          <button id='session-increment' onClick={incrementSession}>
            <BsCaretUpFill />
          </button>
          <input
            id='session-length'
            name='session'
            type='text'
            value={sessionValue}
            disabled
          />
          <button id='session-decrement' onClick={decrementSession}>
            <BsCaretDownFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
