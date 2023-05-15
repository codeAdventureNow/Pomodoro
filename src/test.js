import sound from './assets/Whistle.m4a';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const minute = 60000;
  const [time, setTime] = useState(minute * 25);
  const [timeStart, setTimeStart] = useState(false);
  const [sessionLength, setSessionLength] = useState(minute * 25);
  const [breakLength, setBreakLength] = useState(minute * 5);
  const [onBreak, setOnBreak] = useState(false);

  function playAudioAlert() {
    new Audio(sound).play();
  }

  if (time === 0) {
    playAudioAlert();
    setOnBreak(true);
    setTime(breakLength);
  }