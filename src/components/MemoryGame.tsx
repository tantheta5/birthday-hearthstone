import { useState, useEffect } from 'react';
import MemoryCard from './MemoryCard';
import confetti from 'canvas-confetti';

// Import Hunter x Hunter character images
import gonImage from '@/assets/gon.png';
import killuaImage from '@/assets/killua.png';
import kurapikaImage from '@/assets/kurapika.png';
import hisokaImage from '@/assets/hisoka.png';
import allukaImage from '@/assets/alluka.png';
import meruemImage from '@/assets/meruem.png';

interface Card {
  id: number;
  image: string; // primary URL (can be public path)
  fallback?: string; // bundler-imported fallback
  alt: string;
  pairId: number;
}

/*
  We prefer images from the `public/images/` folder so you can drop
  your provided files directly into `public/images/` (no build step).
  If a public image is missing or fails to load the `MemoryCard` will
  automatically fall back to the bundled images imported above.
*/
// Use bundled assets as the primary images so the game always has visible
// card faces even if the public images are not present. If you want to
// override with your own files in `public/images/`, change the paths here.
const characters = [
  { image: gonImage, fallback: gonImage, alt: 'Gon Freecss' },
  { image: killuaImage, fallback: killuaImage, alt: 'Killua Zoldyck' },
  { image: kurapikaImage, fallback: kurapikaImage, alt: 'Kurapika' },
  { image: hisokaImage, fallback: hisokaImage, alt: 'Hisoka' },
  { image: allukaImage, fallback: allukaImage, alt: 'Alluka' },
  { image: meruemImage, fallback: meruemImage, alt: 'Meruem' },
];

interface MemoryGameProps {
  onComplete: () => void;
}

const MemoryGame = ({ onComplete }: MemoryGameProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [moves, setMoves] = useState(0);

  // Initialize cards
  useEffect(() => {
    const gameCards: Card[] = [];
    characters.forEach((char, index) => {
      // Create two cards for each character (pairs)
      gameCards.push(
        {
          id: index * 2,
          image: char.image,
          fallback: char.fallback,
          alt: char.alt,
          pairId: index,
        },
        {
          id: index * 2 + 1,
          image: char.image,
          fallback: char.fallback,
          alt: char.alt,
          pairId: index,
        }
      );
    });
    
    // Shuffle cards
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, []);

  // Handle card click
  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || isChecking) return;
    
    setFlippedCards(prev => [...prev, cardId]);
    
    if (flippedCards.length === 1) {
      setMoves(prev => prev + 1);
    }
  };

  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      
      const [first, second] = flippedCards;
      const firstCard = cards.find(card => card.id === first);
      const secondCard = cards.find(card => card.id === second);
      
      if (firstCard?.pairId === secondCard?.pairId) {
        // Match found!
        setMatchedCards(prev => [...prev, first, second]);
        setFlippedCards([]);
        setIsChecking(false);
        
        // Small celebration for each match
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#89CDA9', '#F4D35E', '#ffffff']
        });
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
        }, 1500);
      }
    }
  }, [flippedCards, cards]);

  // Check if game is complete
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [matchedCards, cards, onComplete]);

  const isCardFlipped = (cardId: number) => 
    flippedCards.includes(cardId) || matchedCards.includes(cardId);
  
  const isCardMatched = (cardId: number) => 
    matchedCards.includes(cardId);

  const progress = cards.length > 0 ? (matchedCards.length / cards.length) * 100 : 0;
  const pairsLeft = (cards.length - matchedCards.length) / 2;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Memory Vault Challenge
        </h2>
        <p className="text-muted-foreground mb-4">
          Match the Hunter x Hunter character pairs to unlock your surprise!
        </p>
        
        {/* Progress */}
        <div className="bg-muted rounded-full h-3 mb-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-center gap-6 text-sm text-muted-foreground">
          <span>Moves: {moves}</span>
          <span>Pairs left: {pairsLeft}</span>
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-lg mx-auto">
        {cards.map((card) => (
          <MemoryCard
            key={card.id}
            id={card.id}
            image={card.image}
            fallbackImage={card.fallback}
            alt={card.alt}
            isFlipped={isCardFlipped(card.id)}
            isMatched={isCardMatched(card.id)}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      
      {pairsLeft === 0 && cards.length > 0 && (
        <div className="text-center mt-8 animate-scale-in">
          <p className="text-lg text-primary font-semibold">
            🎉 Amazing! Preparing your birthday surprise... 🎉
          </p>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;