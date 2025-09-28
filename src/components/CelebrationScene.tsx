import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';

const birthdayMessages = [
  {
    title: "The Legend of the Birthday Hero 🌟",
    content: "In a realm where friendship blooms like the rarest flower, there exists a hero whose kindness lights up even the darkest paths. Today marks another year of adventures conquered, dreams pursued, and hearts touched by your incredible spirit. Like Gon's unwavering determination, your courage inspires everyone around you. May this new year bring you quests filled with joy, discoveries that spark wonder, and moments that become treasured memories. Happy Birthday, dear friend! 🎂✨"
  },
  {
    title: "A Hunter's Birthday Blessing 🎯",
    content: "Just as hunters seek the most precious treasures, the universe found something truly special when it brought you into this world. Your laughter is more valuable than any rare gem, your friendship more powerful than any nen ability. Today we celebrate not just your birthday, but the incredible person you've become and all the amazing adventures still waiting for you. May your path be filled with exciting discoveries, loyal companions, and all the happiness your heart can hold! 🎈🌿"
  },
  {
    title: "The Memory Vault's Secret Message 💝",
    content: "Hidden within the depths of friendship lies the most precious treasure of all – the memories we've created together. Like pieces of a beautiful puzzle, each moment with you has been a gift that makes life brighter. On this special day, may new memories bloom like spring flowers, may laughter echo through your days like music, and may every wish you make come true with the magic that only birthdays can bring. Here's to another year of being absolutely wonderful! 🎊🦋"
  }
];

interface CelebrationSceneProps {
  onReset: () => void;
}

const CelebrationScene = ({ onReset }: CelebrationSceneProps) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Grand celebration confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#89CDA9', '#F4D35E', '#ffffff', '#A8E6CF', '#FFE156'];
    let rafId: number | null = null;
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        rafId = requestAnimationFrame(frame);
      }
    };

    // start the frame loop
    rafId = requestAnimationFrame(frame);

    // Show floating hearts
    const hearts = () => {
      confetti({
        particleCount: 10,
        spread: 70,
        origin: { y: 0.6 },
        shapes: ['heart'],
        colors: ['#ff69b4', '#ff1493', '#ff6347']
      });
    };

  const heartInterval = setInterval(hearts, 1000);
  // stop the heart interval after the same duration as the main celebration
  const heartTimeout = setTimeout(() => clearInterval(heartInterval), duration);
    
    // Show message after celebration starts
    setTimeout(() => {
      setShowMessage(true);
    }, 1500);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearInterval(heartInterval);
      clearTimeout(heartTimeout);
    };
  }, []);

  const generateNewMessage = () => {
    const newIndex = (currentMessage + 1) % birthdayMessages.length;
    setCurrentMessage(newIndex);
    
    // Small celebration for new message
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#89CDA9', '#F4D35E', '#ffffff']
    });
  };

  return (
    <div className="celebration-background min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Floating elements background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce-gentle opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            {['🎈', '🎊', '✨', '🌟', '💖', '🦋'][Math.floor(Math.random() * 6)]}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {showMessage && (
          <div className="animate-celebration-zoom">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 drop-shadow-lg">
              🎉 Surprise! 🎉
            </h1>
            
            {/* Message Card */}
            <div className="message-card mx-auto mb-8 animate-scale-in">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                {birthdayMessages[currentMessage].title}
              </h2>
              <p className="text-lg leading-relaxed text-card-foreground">
                {birthdayMessages[currentMessage].content}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={generateNewMessage}
                variant="default"
                className="quest-button bg-accent hover:bg-accent/80 text-accent-foreground"
                size="lg"
              >
                ✨ Generate Another Surprise ✨
              </Button>
              
              <Button
                onClick={onReset}
                variant="outline"
                className="quest-button bg-secondary/80 hover:bg-secondary"
                size="lg"
              >
                🎮 Play Again
              </Button>
            </div>

            {/* Birthday blessing */}
            <div className="mt-8 text-center">
              <p className="text-xl font-semibold text-primary drop-shadow-md">
                🌿 Happy Birthday, Beautiful Soul! 🌿
              </p>
              <p className="text-muted-foreground mt-2">
                May your year be filled with endless adventures and joy!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CelebrationScene;