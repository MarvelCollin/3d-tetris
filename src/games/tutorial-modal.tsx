import React, { useEffect, useState, useCallback } from 'react';

interface TutorialModalProps {
  onClose: () => void;
}

interface Particle {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  color: string;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [particles, setParticles] = useState<Particle[]>([]);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Add animation direction state
  const [slideDirection, setSlideDirection] = useState<'right' | 'left'>('right');

  // Modified navigation handlers
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setSlideDirection('right');
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setSlideDirection('left');
      setCurrentStep(Math.max(1, currentStep - 1));
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl text-white font-semibold mb-4 drop-shadow-glow">Basic Controls</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'W', action: 'Rotate piece' },
                { key: 'A', action: 'Move left' },
                { key: 'S', action: 'Move down' },
                { key: 'D', action: 'Move right' },
                { key: 'Space', action: 'Hard drop' },
                { key: 'R', action: 'Swap piece' },
              ].map((control) => (
                <div key={control.key} className="flex items-center space-x-3 bg-gray-800/50 p-3 rounded-lg backdrop-blur-sm">
                  <kbd className="px-3 py-1.5 bg-cyan-500/30 text-white border border-cyan-400 rounded-lg font-mono shadow-glow">
                    {control.key}
                  </kbd>
                  <span className="text-white text-shadow-bright">{control.action}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl text-white font-semibold mb-4 drop-shadow-glow">Special Features</h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Dynamic Camera',
                  description: 'Experience the game from different angles with automatic camera rotation',
                  icon: '🎥'
                },
                {
                  title: 'Target Mode',
                  description: 'Hit the circular targets to clear lines and score points',
                  icon: '🎯'
                },
                {
                  title: 'Visual Effects',
                  description: 'Enjoy stunning particle effects and visual feedback',
                  icon: '✨'
                }
              ].map((feature) => (
                <div key={feature.title} className="flex items-start space-x-4 bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm hover:bg-gray-800/70 transition-colors">
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <h4 className="text-cyan-200 font-medium text-shadow-glow">{feature.title}</h4>
                    <p className="text-gray-100 text-shadow-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl text-white font-semibold mb-4 drop-shadow-glow">Ready to Play?</h3>
            <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm text-center">
              <p className="text-white text-lg mb-4 text-shadow-bright">
                Clear lines, score points, and enjoy the immersive 3D Tetris experience!
              </p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95"
              >
                Start Game
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentStep < totalSteps) setCurrentStep(currentStep + 1);
      if (e.key === 'ArrowLeft' && currentStep > 1) setCurrentStep(currentStep - 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, onClose]);

  useEffect(() => {
    const particlesArray: Particle[] = [];
    for (let i = 0; i < 120; i++) {
      particlesArray.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 4 + 1,
        color: `hsla(${180 + Math.random() * 60}, 100%, 70%, ${0.4 + Math.random() * 0.3})`
      });
    }
    setParticles(particlesArray);
  }, []);

  const animateParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    const gradient = ctx.createRadialGradient(
      window.innerWidth / 2, window.innerHeight / 2, 0,
      window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2
    );
    gradient.addColorStop(0, 'rgba(0, 40, 80, 0.8)');
    gradient.addColorStop(0.5, 'rgba(0, 20, 40, 0.9)');
    gradient.addColorStop(1, 'rgba(0, 10, 20, 0.95)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((particle, index) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x > window.innerWidth) particle.x = 0;
      if (particle.x < 0) particle.x = window.innerWidth;
      if (particle.y > window.innerHeight) particle.y = 0;
      if (particle.y < 0) particle.y = window.innerHeight;

      const shimmer = Math.sin(Date.now() * 0.003 + index * 0.1) * 0.2 + 0.8;
      const particleGradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3
      );

      const baseColor = particle.color.match(/hsla\(([^)]+)\)/)?.[1].split(',') || [];
      const [h, s, l] = baseColor;
      particleGradient.addColorStop(0, `hsla(${h}, ${s}, ${l}, ${shimmer})`);
      particleGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = particleGradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach((particle2, j) => {
        if (index !== j) {
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            const opacity = (1 - distance/120) * 0.2 * shimmer;
            ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
            ctx.lineWidth = (1 - distance/120) * 2;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        }
      });
    });
  }, [particles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId: number;

    const animate = () => {
      animateParticles(ctx);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [animateParticles]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="fixed inset-0">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: 'rgba(2, 6, 23, 0.95)' }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-cyan-500/20 to-purple-600/30" />
        
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 255, 255, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 255, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
            animation: 'grid-move 15s linear infinite',
          }}
        />

        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `
                linear-gradient(45deg, transparent 48%, rgba(0, 255, 255, 0.1) 50%, transparent 52%),
                linear-gradient(-45deg, transparent 48%, rgba(0, 255, 255, 0.1) 50%, transparent 52%)
              `,
              backgroundSize: '60px 60px',
              animation: 'pattern-move 20s linear infinite',
            }}
          />
        </div>

        <div className="absolute w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-blue-400/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-spin-slow" />
        </div>
      </div>

      <div className="relative">
        <div className="relative bg-gray-900/80 border-2 border-cyan-400/50 rounded-xl p-8 max-w-3xl w-full mx-auto backdrop-blur-md animate-slideUp">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 opacity-50 animate-pulse" />
          
          <div className="relative bg-gray-900/90 p-8 rounded-lg overflow-hidden">
            <div className="absolute -top-4 -right-4 animate-bounce-slow">
              <button
                onClick={onClose}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center focus:outline-none transition-all duration-300 transform hover:scale-110 hover:rotate-180 active:scale-95"
              >
                ×
              </button>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-center text-shadow-glow animate-slideDown">
              3D Tetris Tutorial
            </h2>

            <div className="text-white text-shadow-sm">
              <div
                key={currentStep}
                className={`transition-all duration-500 transform ${
                  slideDirection === 'right' ? 'animate-slideInRight' : 'animate-slideInLeft'
                }`}
              >
                {renderStep()}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between animate-fadeIn">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg text-white font-medium transform transition-all duration-300 ${
                  currentStep === 1
                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95'
                }`}
              >
                Previous
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 transform hover:scale-150 ${
                      i + 1 === currentStep ? 'bg-cyan-400 animate-ping-slow' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="px-6 py-2 text-white rounded-lg font-medium bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95"
              >
                {currentStep === totalSteps ? 'Start' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = `
  @keyframes grid-move {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 30px 30px;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-20px) scale(1.1);
    }
  }

  @keyframes float-delayed {
    0%, 100% {
      transform: translateY(0) scale(1.1);
    }
    50% {
      transform: translateY(-25px) scale(1);
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float-delayed 7s ease-in-out infinite;
  }

  .drop-shadow-glow {
    filter: drop-shadow(0 0 10px rgba(99, 255, 255, 0.5));
  }

  .text-shadow-glow {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5),
                 0 0 20px rgba(99, 255, 255, 0.3),
                 0 0 30px rgba(99, 255, 255, 0.2);
  }

  .text-shadow-bright {
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
  }

  .text-shadow-sm {
    text-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
  }

  .shadow-glow {
    box-shadow: 0 0 10px rgba(99, 255, 255, 0.3);
  }

  @keyframes pattern-move {
    0% { background-position: 0 0; }
    100% { background-position: 60px 60px; }
  }

  @keyframes pulse-slow {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.2); }
  }

  @keyframes float-slow {
    0%, 100% { transform: translateY(0) scale(1.1); }
    50% { transform: translateY(-30px) scale(1); }
  }

  @keyframes spin-slow {
    from { transform: rotate(0deg) scale(1); }
    to { transform: rotate(360deg) scale(1.2); }
  }

  .animate-pulse-slow {
    animation: pulse-slow 8s ease-in-out infinite;
  }

  .animate-float-slow {
    animation: float-slow 10s ease-in-out infinite;
  }

  .animate-spin-slow {
    animation: spin-slow 15s linear infinite;
  }

  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes slideDown {
    from { transform: translateY(-50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes slideInRight {
    from { transform: translateX(50px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes ping-slow {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .animate-slideUp {
    animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .animate-slideDown {
    animation: slideDown 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .animate-slideInRight {
    animation: slideInRight 0.4s ease-out forwards;
  }

  .animate-slideInLeft {
    animation: slideInLeft 0.4s ease-out forwards;
  }

  .animate-fadeIn {
    animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .animate-ping-slow {
    animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  .animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default TutorialModal;
