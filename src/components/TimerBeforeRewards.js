import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';



function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = '0' + num;
  return num;
}

function getTimeRemaining() {
  let endtime = new Date();
  endtime.setUTCHours(0, 0, 0, 0);
  endtime = endtime.getTime() + 24 * 60 * 60 * 1000;

  const total = endtime - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    'total': total,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}


function TimerBeforeRewards() {
  const [intervalId, setIntervalId] = useState(null);
  const [timer, setTimer] = useState({ 'total': -1, 'days': 0, 'hours': 0, 'minutes': 0, 'seconds': 0, });
  const updateClock = () => {
    let timer = getTimeRemaining();
    setTimer(timer);
  }

  useEffect(() => {
    updateClock();
    const iId = setInterval(() => {
      updateClock();
    }, 1000);
    setIntervalId(iId);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (timer.total > 0)
    return (
      <span>
        {pad(timer.hours, 2)}
        :{pad(timer.minutes, 2)}
        :{pad(timer.seconds, 2)}
      </span>
    );

  return (<span>00:00:00</span>);
}

export default hot(module)(TimerBeforeRewards);
