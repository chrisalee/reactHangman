import React from 'react';

const WrongLetters = ({ wrongLetters }) => {
    return (
        <div className='wrong-letters__container'>
            {wrongLetters.length > 0 && <p>Wrong Letters</p>}
            {wrongLetters
                .map((letter, index) => <span key={index}>{letter}</span>)
                .reduce((prev, curr) => prev === null ? [curr] : [prev, ', ', curr], null)
            }
        </div>
    )
}

export default WrongLetters;
