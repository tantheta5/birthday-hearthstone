import { useState } from 'react';
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
        "transform-gpu perspective-1000",
        isAnimating && "animate-card-flip",
        isMatched && "opacity-75 cursor-default",
        !isFlipped && !isMatched && "hover:scale-105"
      )}
      style={{ transformStyle: 'preserve-3d' }}
      onClick={handleClick}
    >
      {/* Card Back */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full rounded-2xl backface-hidden",
          "bg-gradient-to-br from-secondary via-secondary to-muted",
          "border-2 border-primary/30 flex items-center justify-center",
          "shadow-lg",
          isFlipped && "rotate-y-180"
        )}
      >
        <div className="text-2xl animate-bounce-gentle">🌿</div>
      </div>

      {/* Card Front */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full rounded-2xl backface-hidden rotate-y-180",
          "bg-card border-2 border-accent/40 p-2",
          "flex items-center justify-center shadow-xl",
          isFlipped && "rotate-y-0"
        )}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain rounded-lg"
          draggable={false}
          onError={() => {
            // If the public image fails to load, fall back to a bundled import (if provided)
            if (fallbackImage && src !== fallbackImage) setSrc(fallbackImage);
          }}
        />
      </div>
    </div>
  );
};

export default MemoryCard;