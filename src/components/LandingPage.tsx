import { Button } from '@/components/ui/button';

interface LandingPageProps {
  onStartQuest: () => void;
}

const LandingPage = ({ onStartQuest }: LandingPageProps) => {
  return (
    <div className="quest-background min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce-gentle opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {['🌿', '✨', '🌸', '🦋', '💫'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center animate-fade-in">
        {/* Main Title */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 drop-shadow-lg">
            Welcome to
          </h1>
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">
              The Memory Vault
            </h2>
            <div className="text-3xl animate-bounce-gentle">🌿</div>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
          A Birthday Quest Awaits You...
        </p>

        {/* Description */}
        <div className="message-card mx-auto mb-12 max-w-lg">
          <p className="text-lg text-card-foreground leading-relaxed">
            Step into a world of memories and surprises crafted just for you. 
            A special challenge awaits, and at its end lies a treasure more 
            precious than any Hunter could discover. 
            <br /><br />
            <span className="font-semibold text-primary">
              Are you ready to begin your birthday adventure?
            </span>
          </p>
        </div>

        {/* Start Button */}
        <Button
          onClick={onStartQuest}
          size="lg"
          className="quest-button text-xl px-12 py-6 animate-scale-in"
        >
          🎯 Start Quest 🎯
        </Button>

        {/* Footer hint */}
        <p className="text-sm text-muted-foreground mt-8 opacity-75">
          Hint: Match the pairs to unlock your surprise...
        </p>
      </div>
    </div>
  );
};

export default LandingPage;