import React, { useState, useEffect } from 'react';

const Timer = ({isActive, seconds, setSeconds}) => {
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
      <>
        {seconds}s
      </>
  );
};

export default Timer;