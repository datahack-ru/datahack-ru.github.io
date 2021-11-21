import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { useTranslation } from 'react-i18next';
import { Container, Segment, Header } from 'semantic-ui-react';
//import { startTime } from '../constants/index';
import './Timer.scss';




function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
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


function Timer(props) {
  const startTime = props.startTime;
  const { t } = useTranslation();

  const [intervalId, setIntervalId] = useState(null);
  const [timer, setTimer] = useState({ 'total': -1, 'days': 0, 'hours': 0, 'minutes': 0, 'seconds': 0, });
  const updateClock = () => {
    let timer = getTimeRemaining(startTime);
    setTimer(timer);

    if (new Date(startTime).getTime() <= Date.now()) {
      clearInterval(intervalId);
      return;
    };
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

  if (timer.total > 0) {
    return (
      <Segment textAlign='center' basic >
        <Container className='timer'>
          <Header as='h2'>
            {t('Before the start of farming remains')}:
          </Header>
          <Header as='h2' color='green'>
            {timer.days} {t('days')} {timer.hours} {t('hours')} {timer.minutes} {t('minutes')} {timer.seconds} {t('seconds')}
          </Header>
        </Container>
      </Segment>
    );
  }

  return null;
}

export default hot(module)(Timer);
