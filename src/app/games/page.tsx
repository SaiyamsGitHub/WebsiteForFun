'use client';

import { useState, useEffect, useCallback } from 'react';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import Link from 'next/link';
import './games.css';

// Game card interface
interface GameCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  path: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Puzzle' | 'Arcade' | 'Interactive' | 'Memory' | '3D';
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

// Game data
const gamesList: GameCard[] = [
  {
    id: 'memory-match',
    title: 'Memory Match',
    description: 'Test your memory by matching pairs of cards with coding symbols.',
    imageUrl: '/images/games/memory-match.jpg',
    path: '/games/memory-match',
    difficulty: 'Easy',
    category: 'Memory'
  },
  {
    id: 'code-snake',
    title: 'Code Snake',
    description: 'Control a snake to collect code snippets and grow longer.',
    imageUrl: '/images/games/code-snake.jpg',
    path: '/games/code-snake',
    difficulty: 'Medium',
    category: 'Arcade'
  },
  {
    id: 'puzzle-solver',
    title: 'Puzzle Solver',
    description: 'Solve coding puzzles by arranging blocks of code in the correct order.',
    imageUrl: '/images/games/puzzle-solver.jpg',
    path: '/games/puzzle-solver',
    difficulty: 'Hard',
    category: 'Puzzle'
  },
  {
    id: '3d-maze',
    title: '3D Maze',
    description: 'Navigate through a three-dimensional maze using WebGL.',
    imageUrl: '/images/games/3d-maze.jpg',
    path: '/games/3d-maze',
    difficulty: 'Medium',
    category: '3D'
  },
  {
    id: 'interactive-timeline',
    title: 'Interactive Timeline',
    description: 'Explore a gamified timeline of coding history.',
    imageUrl: '/images/games/interactive-timeline.jpg',
    path: '/games/interactive-timeline',
    difficulty: 'Easy',
    category: 'Interactive'
  },
  {
    id: 'bug-hunter',
    title: 'Bug Hunter',
    description: 'Find and fix bugs in code snippets before time runs out!',
    imageUrl: '/images/games/bug-hunter.jpg',
    path: '/games/bug-hunter',
    difficulty: 'Hard',
    category: 'Puzzle'
  }
];

export default function GamesPage() {
  const [filter, setFilter, isClient] = useClientSideState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  
  // Filter games based on selected filters - memoized to avoid recalculation on renders
  const getFilteredGames = useCallback(() => {
    return gamesList.filter(game => {
      const categoryMatch = filter === 'all' || game.category.toLowerCase() === filter.toLowerCase();
      const difficultyMatch = difficultyFilter === 'all' || game.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
      return categoryMatch && difficultyMatch;
    });
  }, [filter, difficultyFilter]);
  
  const filteredGames = getFilteredGames();

  return (
    <div id="GamesScreen" className="games-screen">
      <HamburgerMenu />
      
      <div className="games-container">
        <header className="games-header">
          <h1>Interactive Games</h1>
          <p>Challenge yourself with these coding-themed games and puzzles</p>
        </header>

        <div className="games-filters">
          <div className="filter-group">
            <span className="filter-label">Category:</span>
            <div className="filter-options">
              <button 
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
                disabled={!isClient}
              >
                All
              </button>
              <button 
                className={filter === 'puzzle' ? 'active' : ''}
                onClick={() => setFilter('puzzle')}
                disabled={!isClient}
              >
                Puzzle
              </button>
              <button 
                className={filter === 'arcade' ? 'active' : ''}
                onClick={() => setFilter('arcade')}
                disabled={!isClient}
              >
                Arcade
              </button>
              <button 
                className={filter === 'memory' ? 'active' : ''}
                onClick={() => setFilter('memory')}
                disabled={!isClient}
              >
                Memory
              </button>
              <button 
                className={filter === '3d' ? 'active' : ''}
                onClick={() => setFilter('3d')}
                disabled={!isClient}
              >
                3D
              </button>
              <button 
                className={filter === 'interactive' ? 'active' : ''}
                onClick={() => setFilter('interactive')}
                disabled={!isClient}
              >
                Interactive
              </button>
            </div>
          </div>
          
          <div className="filter-group">
            <span className="filter-label">Difficulty:</span>
            <div className="filter-options">
              <button 
                className={difficultyFilter === 'all' ? 'active' : ''}
                onClick={() => setDifficultyFilter('all')}
                disabled={!isClient}
              >
                All
              </button>
              <button 
                className={difficultyFilter === 'easy' ? 'active' : ''}
                onClick={() => setDifficultyFilter('easy')}
                disabled={!isClient}
              >
                Easy
              </button>
              <button 
                className={difficultyFilter === 'medium' ? 'active' : ''}
                onClick={() => setDifficultyFilter('medium')}
                disabled={!isClient}
              >
                Medium
              </button>
              <button 
                className={difficultyFilter === 'hard' ? 'active' : ''}
                onClick={() => setDifficultyFilter('hard')}
                disabled={!isClient}
              >
                Hard
              </button>
            </div>
          </div>
        </div>

        <div className="games-grid">
          {isClient ? (
            filteredGames.length > 0 ? (
              filteredGames.map(game => (
                <Link href={game.path} key={game.id} className="game-card">
                  <div className="game-card-inner">
                    <div className="game-card-front">
                      <div 
                        className="game-image" 
                        style={{ 
                          backgroundColor: 'var(--highlight-bg)',
                          backgroundImage: `url(${game.imageUrl})`
                        }}
                      >
                        <div className="game-difficulty">{game.difficulty}</div>
                      </div>
                      <h3 className="game-title">{game.title}</h3>
                      <div className="game-category">{game.category}</div>
                    </div>
                    <div className="game-card-back">
                      <p className="game-description">{game.description}</p>
                      <div className="play-button">Play Now</div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="no-games-message">
                <p>No games match the selected filters. Try different options!</p>
              </div>
            )
          ) : (
            // Static server-side render placeholder for initial render
            <div className="loading-games">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="game-card-placeholder">
                  <div className="game-card-inner">
                    <div className="game-card-front">
                      <div className="game-image-placeholder"></div>
                      <div className="game-title-placeholder"></div>
                      <div className="game-category-placeholder"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="games-footer">
          <p>New games are added regularly. Check back soon for more challenges!</p>
          /*For animation demos*/
          <div className="animation-demos-link">
            <Link href="/animation-demos">
              Explore Animation Techniques
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 