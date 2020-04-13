import React, { useEffect, useState } from 'react';
import Item from './Item'
import Timer from './Timer'

import './Board.css'

var randomEmoji = require('random-emoji');

const images = ['😀', '😂', '🐰', '🔥', '👍']


const Board = ({ pairs }) => {
  const pairVisibleInMilliseconds = 800
  const [loading, setLoading] = useState(true)

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const [Emojis, setEmojis] = useState([])

  const [turns, setTurns] = useState(0)
  const [pairsMatched, setPairsMatched] = useState(0)
  const [openedCards, setOpenedCards] = useState([])
  const [deck, setDeck] = useState([])

  useEffect(() => {
    setEmojis(randomEmoji.random({count: pairs}))
  }, [])

  useEffect(() => {
    if (Emojis.length === pairs) {
      generateCards()
      setLoading(false)
    }
  }, [Emojis])

  const openCard = (card) => {
    if (openedCards.length === 2) {
      return
    }

    let newDeck = [...deck]

    deck.forEach((element, index) => {
      if (element.number === card.number) {
        newDeck[index].open = true
        return
      }
    })

    setDeck(newDeck)

    let opened = openedCards
    opened.push(card)
    setOpenedCards(openedCards)

    if (opened.length === 2) {
      setTimeout(() => {
        handlePossibleMatch(opened)
      }, pairVisibleInMilliseconds)
    }
  }

  const handlePossibleMatch = (openedCards) => {
    let newDeck

    if (cardsMatch(openedCards)) {
      const openedCardNumbers = [openedCards[0].number, openedCards[1].number]
      newDeck = [...deck]

      deck.forEach((element, index) => {
        if (openedCardNumbers.includes(element.number)) {
          newDeck[index].open = false
          newDeck[index].matched = true
        }
      })

      setPairsMatched(pairsMatched + 1)
      setDeck(newDeck)
        if (pairsMatched + 1 === pairs) {
            setIsActive(false)
        }
    } else {
      closeCards()
    }

    setTurns(turns + 1)
    setOpenedCards([])
  }

  const cardsMatch = (cards) => {
    return cards[0].pair === cards[1].pair
  }

  const closeCards = () => {
    let closedDeck = []

    deck.forEach((card) => {
      card.open = false
      closedDeck.push(card)
    })

    setDeck(closedDeck)
  }

  const resetGame = () => {
    setEmojis(randomEmoji.random({count: pairs}))
    generateCards()
    setTurns(0)
    setPairsMatched(0)
    setSeconds(0)
    setIsActive(true)
  }

  const generateCards = () => {
    let cards = []
    let cardNumber = 0

    Emojis.forEach((emoji, key) => {
      for (let i = 0; i < 2; i++) {
        cardNumber += 1

        cards.push({
          number: cardNumber,
          pair: key,
          emoji: emoji,
          open: false,
          matched: false
        })
      }
    })

    setDeck(shuffleDeck(cards))
  }

  const shuffleDeck = (cards) => {
    return cards
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1])
  }

  return (
    <div className={"playfield"}>
      { loading && (
        <div className="spinner">
          <div>
            {/* <img src={spinner} /> */}
            spinner
          </div>
          <span>Loading game...</span>
        </div>
      )}

      {!loading && (
        <>
          <div className="statistics">
            <span>Turns: {turns}</span>
            <span>Pairs: {pairsMatched} of {pairs}</span>
            <span>Timer: <Timer isActive={isActive} seconds={seconds} setSeconds={setSeconds}/></span>

            {/* { pairsMatched === pairs && ( */}
              <button onClick={resetGame}>New game</button>
            {/* )} */}
          </div>

          { deck.map(card => {
              return <Item
                key={card.number}
                card={card}
                onCardOpen={openCard}
              />
            })
          }
        </>
      )}
    </div>
  )
}

export default Board