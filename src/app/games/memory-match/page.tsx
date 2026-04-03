'use client';

import React, { useState, useEffect, useCallback } from 'react';
import HamburgerMenu from '../../../components/HamburgerMenu/HamburgerMenu';
import Link from 'next/link';
import './memory-match.css';

// Card symbols (coding related)
const symbols = [
  { id: 'html', icon: '<>' },
  { id: 'css', icon: '#{}' },
  { id: 'js', icon: '()=>' },
  { id: 'react', icon: '</>'},
  { id: 'node', icon: '{}' },
  { id: 'git', icon: '/*' },
  { id: 'api', icon: '[]' },
  { id: 'db', icon: '==' },
];

// Game card interface
interface Card {
  id: string;
  symbol: string;
  symbolId: string;
  flipped: boolean;
  matched: boolean;
}

// Custom hook for safe client-side operations
function useClientSideState<T>(initialState: T): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
  const [state, setState] = useState<T>(initialState);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return [state, setState, isClient];
}

export default function MemoryMatchGame() {
  // Use empty arrays for initial SSR render to prevent hydration mismatch
  const [cards, setCards, isClient] = useClientSideState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number | null>(null);
  
  // Prepare card deck - memoized to prevent recreating on every render
  const prepareCardDeck = useCallback(() => {
    const gameDeck: Card[] = [];
    
    // Create pairs of cards
    symbols.forEach((symbol) => {
      for (let i = 0; i < 2; i++) {
        gameDeck.push({
          id: `${symbol.id}-${i}`,
          symbol: symbol.icon,
          symbolId: symbol.id,
          flipped: false,
          matched: false
        });
      }
    });
    
    // Shuffle the deck on client only
    return [...gameDeck].sort(() => Math.random() - 0.5);
  }, []);
  
  // Initialize game
  const initializeGame = useCallback(() => {
    if (!isClient) return;
    
    const shuffledDeck = prepareCardDeck();
    
    setCards(shuffledDeck);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameOver(false);
    setTimer(0);
    setGameStarted(true);
  }, [isClient, prepareCardDeck]);
  
  // Load best score from localStorage on client mount
  useEffect(() => {
    if (isClient) {
      try {
        const savedBestScore = localStorage.getItem('memoryMatchBestScore');
        if (savedBestScore) {
          setBestScore(parseInt(savedBestScore));
        }
      } catch (error) {
        console.error('Failed to load best score:', error);
      }
    }
  }, [isClient]);
  
  // Handle card click
  const handleCardClick = (index: number) => {
    // Prevent clicking if two cards are already flipped or clicking the same card
    if (flippedCards.length === 2 || flippedCards.includes(index) || cards[index]?.matched) {
      return;
    }
    
    // Flip the card
    const updatedCards = [...cards];
    updatedCards[index].flipped = true;
    setCards(updatedCards);
    
    // Add to flipped cards
    const updatedFlippedCards = [...flippedCards, index];
    setFlippedCards(updatedFlippedCards);
    
    // If two cards are flipped, check for a match
    if (updatedFlippedCards.length === 2) {
      setMoves(prevMoves => prevMoves + 1);
      
      const [firstIndex, secondIndex] = updatedFlippedCards;
      
      // Check if the cards match
      if (cards[firstIndex].symbolId === cards[secondIndex].symbolId) {
        // Mark cards as matched
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[firstIndex].matched = true;
          updatedCards[secondIndex].matched = true;
          setCards(updatedCards);
          
          // Increment matched pairs
          const updatedMatchedPairs = matchedPairs + 1;
          setMatchedPairs(updatedMatchedPairs);
          
          // Check if all pairs are matched
          if (updatedMatchedPairs === symbols.length) {
            setGameOver(true);
            
            // Update best score
            if (bestScore === null || moves + 1 < bestScore) {
              setBestScore(moves + 1);
              try {
                localStorage.setItem('memoryMatchBestScore', (moves + 1).toString());
              } catch (error) {
                console.error('Failed to save best score:', error);
              }
            }
          }
          
          setFlippedCards([]);
        }, 500);
      } else {
        // If no match, flip cards back
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[firstIndex].flipped = false;
          updatedCards[secondIndex].flipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };
  
  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameStarted && !gameOver && isClient) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, gameOver, isClient]);
  
  // Format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="memory-match-screen">
      <HamburgerMenu />
      
      <div className="memory-match-container">
        <header className="memory-match-header">
          <Link href="/games" className="back-button">← Back to Games</Link>
          <h1>Memory Match</h1>
          <p>Match pairs of coding symbols to win the game!</p>
        </header>
        
        {!gameStarted ? (
          <div className="game-start-container">
            <div className="game-rules">
              <h2>How to Play</h2>
              <ul>
                <li>Click cards to reveal coding symbols</li>
                <li>Find matching pairs of symbols</li>
                <li>Complete the game with as few moves as possible</li>
                <li>Try to beat your best score!</li>
              </ul>
            </div>
            <button 
              className="start-button" 
              onClick={initializeGame}
              disabled={!isClient}
            >
              Start Game
            </button>
          </div>
        ) : (
          <>
            <div className="game-info">
              <div className="info-item">
                <span className="info-label">Moves:</span>
                <span className="info-value">{moves}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Time:</span>
                <span className="info-value">{formatTime(timer)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Pairs Found:</span>
                <span className="info-value">{matchedPairs} / {symbols.length}</span>
              </div>
              {bestScore !== null && isClient && (
                <div className="info-item">
                  <span className="info-label">Best Score:</span>
                  <span className="info-value">{bestScore} moves</span>
                </div>
              )}
            </div>
            
            <div className="memory-match-board">
              {cards.map((card, index) => (
                <div 
                  key={card.id}
                  className={`memory-card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="memory-card-inner">
                    <div className="memory-card-back">
                      <div className="code-symbol">?</div>
                    </div>
                    <div className="memory-card-front">
                      <div className={`code-symbol symbol-${card.symbolId}`}>
                        {card.symbol}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {gameOver && (
              <div className="game-over-container">
                <div className="game-over-content">
                  <h2>Game Completed!</h2>
                  <div className="game-stats">
                    <p>You completed the game in {moves} moves</p>
                    <p>Time: {formatTime(timer)}</p>
                    {bestScore === moves && <p className="new-record">New Best Score!</p>}
                  </div>
                  <div className="game-over-buttons">
                    <button className="play-again-button" onClick={initializeGame}>
                      Play Again
                    </button>
                    <Link href="/games" className="games-menu-button">
                      Games Menu
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            <div className="game-controls">
              <button className="restart-button" onClick={initializeGame}>
                Restart Game
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 