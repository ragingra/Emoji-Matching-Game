import React from 'react';

import './Item.css'

const Item = ({ card, onCardOpen }) => {
    const clickHandler = () => {
        if (!card.open && !card.matched) {
          onCardOpen(card)
        }
      }
    
      const getCard = () => {
        if (card.matched) {
          return
        } else if (card.open) {
          return <div className='emoji'>{card.emoji.character}</div>
        }
    
        return <div className="not-opened">?</div>
      }
    
      return (
        <div className={"card" + (card.matched ? " matched" : "")} onClick={clickHandler}>
          {getCard()}
        </div>
      )
    }

  export default Item;
