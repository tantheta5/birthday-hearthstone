import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface MemoryCardProps {
  id: number;
  image: string;
  fallbackImage?: string;
  alt: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const MemoryCard = ({ id, image, fallbackImage, alt, isFlipped, isMatched, onClick }: MemoryCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [src, setSrc] = useState(image);
  // reset src if the image prop changes (e.g., when cards are re-shuffled)
  React.useEffect(() => {
    setSrc(image);
  }, [image]);

  const handleClick = () => {
    if (!isFlipped && !isMatched && !isAnimating) {
      setIsAnimating(true);
      onClick();
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  return (
    <div
      className={cn(
        "memory-card relative aspect-square w-full max-w-24 mx-auto",
        isAnimating && "animate-card-flip",
        isMatched && "opacity-75 cursor-default",
        !isFlipped && !isMatched && "hover:scale-105"
      )}
      onClick={handleClick}
    >
      {/* Render back when not flipped */}
      {!isFlipped && !isMatched ? (
        <div className={cn(
          "w-full h-full rounded-2xl bg-gradient-to-br from-secondary via-secondary to-muted",
          "border-2 border-primary/30 flex items-center justify-center shadow-lg p-2"
        )}>
          <div className="text-2xl animate-bounce-gentle">🌿</div>
        </div>
      ) : (
        /* Render front (image) when flipped or matched */
        <div className={cn(
          "w-full h-full rounded-2xl bg-card border-2 border-accent/40 p-2",
          "flex items-center justify-center shadow-xl overflow-hidden"
        )}>
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain rounded-lg"
            draggable={false}
            onError={() => {
              if (fallbackImage && src !== fallbackImage) setSrc(fallbackImage);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MemoryCard;