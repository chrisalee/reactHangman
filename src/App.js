import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show } from './helpers/helpers';

const words = ['application', 'programming', 'interface', 'wizard', 'christopher', 'surface', 'holiday', 'television', 'photography', 'react', 'basketball', 'soccer', 'volleyball', 'baseball', 'coordination'];
let selectedWord = words[Math.floor(Math.random() * words.length)];


const App = () => {

  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, keyCode } = event;

      if(playable && keyCode > 64 && keyCode < 91) {
        const letter = key.toLowerCase();

        if(selectedWord.includes(letter)) {
          if(!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if(!wrongLetters.includes(letter)) {
            setWrongLetters(wrongLetters => [...wrongLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    } 

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [correctLetters, wrongLetters, playable]);

  const playAgain = () => {
    setPlayable(true);

    //Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <div className='app'>
      <Header />
      <div className="app__gameContainer">
        <Figure wrongLetters={wrongLetters}/>
        <WrongLetters wrongLetters={wrongLetters}/>
        <Word selectedWord={selectedWord} correctLetters={correctLetters}/>
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </div>
  )
}

export default App
