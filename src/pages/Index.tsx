import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import MemoryGame from '@/components/MemoryGame';
import CelebrationScene from '@/components/CelebrationScene';

type GameState = 'landing' | 'playing' | 'celebration';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('landing');

  const startQuest = () => {
    setGameState('playing');
  };

  const completeGame = () => {
    setGameState('celebration');
  };

  const resetGame = () => {
    setGameState('landing');
  };

  return (
    <main className="min-h-screen">
      {gameState === 'landing' && (
        <LandingPage onStartQuest={startQuest} />
      )}
      
      {gameState === 'playing' && (
        <div className="quest-background min-h-screen flex items-center justify-center">
          <MemoryGame onComplete={completeGame} />
        </div>
      )}
      
      {gameState === 'celebration' && (
        <CelebrationScene onReset={resetGame} />
      )}
    </main>
  );
};

export default Index;
