import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Alert, AlertTitle } from '@/components/ui/alert';

const REEL_HEIGHT = 112;
const ICON_HEIGHT = 112;
const NUM_ICONS = 9;
const FIRST_REEL_DURATION = 2100;
const ADDITIONAL_REEL_DELAY = 200;

const items = [
  { src: 'assets/images/awm.png', name: 'AWM', rarity: 'legendary', category: 'weapon', color: '#ffd700' },
  { src: 'assets/images/scar-l.png', name: 'SCAR-L', rarity: 'rare', category: 'weapon', color: '#5e98d9' },
  { src: 'assets/images/ump45.png', name: 'UMP45', rarity: 'common', category: 'weapon', color: '#b0c3d9' },
  { src: 'assets/images/med-kit.png', name: 'MedKit', rarity: 'legendary', category: 'consumable', color: '#ffd700' },
  { src: 'assets/images/adrenaline-syringe.png', name: 'Adrenaline', rarity: 'rare', category: 'consumable', color: '#5e98d9' },
  { src: 'assets/images/bandages.png', name: 'Bandages', rarity: 'common', category: 'consumable', color: '#b0c3d9' },
  { src: 'assets/images/ghillie-suit.png', name: 'Ghillie', rarity: 'legendary', category: 'equipment', color: '#ffd700' },
  { src: 'assets/images/lv3-helmet.png', name: 'Lv3Helmet', rarity: 'rare', category: 'equipment', color: '#5e98d9' },
  { src: 'assets/images/apple.png', name: 'Apple', rarity: 'common', category: 'equipment', color: '#b0c3d9' }
];

const SlotMachine = () => {
  const [balance, setBalance] = useState(100); // Set initial balance to 100
  const [bet, setBet] = useState(5);
  const [isSpinning, setIsSpinning] = useState(false);
  const [indexes, setIndexes] = useState([0, 0, 0]);
  const [rewards, setRewards] = useState([]);
  const [showWinAlert, setShowWinAlert] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const reelsRef = useRef([]);
  const spinIntervalsRef = useRef([]);
  const spinAudioRef = useRef(new Audio('assets/audio/spin.mp3')); // Audio for spin effect

  useEffect(() => {
    reelsRef.current = reelsRef.current.slice(0, 3);
    return () => {
      spinIntervalsRef.current.forEach(interval => clearInterval(interval));
    };
  }, []);

  const startContinuousSpin = (reelIndex) => {
    const reel = reelsRef.current[reelIndex];
    let offset = 0;

    if (spinIntervalsRef.current[reelIndex]) {
      clearInterval(spinIntervalsRef.current[reelIndex]);
    }

    spinIntervalsRef.current[reelIndex] = setInterval(() => {
      offset -= ICON_HEIGHT;
      if (Math.abs(offset) >= NUM_ICONS * ICON_HEIGHT) {
        offset = 0;
      }
      reel.style.transition = 'transform 50ms linear';
      reel.style.transform = `translateY(${offset}px)`;
    }, 50);
  };

  const stopReel = (reelIndex, finalIndex) => {
    return new Promise(resolve => {
      const reel = reelsRef.current[reelIndex];

      if (spinIntervalsRef.current[reelIndex]) {
        clearInterval(spinIntervalsRef.current[reelIndex]);
      }

      reel.style.transition = `transform 500ms cubic-bezier(.41,-0.01,.63,1.09)`;
      reel.style.transform = `translateY(${-finalIndex * ICON_HEIGHT}px)`;

      setTimeout(() => {
        resolve();
      }, 500);
    });
  };

  const roll = async (reelIndex) => {
    startContinuousSpin(reelIndex);

    const finalIndex = Math.floor(Math.random() * NUM_ICONS);

    await new Promise(resolve => setTimeout(resolve, reelIndex === 0 ? FIRST_REEL_DURATION : ADDITIONAL_REEL_DELAY));
    await stopReel(reelIndex, finalIndex);

    return finalIndex;
  };

  const spin = async () => {
    if (balance < bet || isSpinning) return;

    spinAudioRef.current.play(); // Play spin audio
    setIsSpinning(true);
    setBalance(prev => prev - bet); // Deduct the bet from the balance
    setRewards([]);
    setShowWinAlert(false);

    [0, 1, 2].forEach(i => startContinuousSpin(i));

    const newIndexes = [];
    for (let i = 0; i < 3; i++) {
        const index = await roll(i);
        newIndexes[i] = index;
        setIndexes(prev => {
            const next = [...prev];
            next[i] = index;
            return next;
        });
    }

    calculateWinnings(newIndexes);
    setIsSpinning(false);
  };

  const calculateWinnings = (spinResult) => {
    const spinItems = spinResult.map(index => items[index]);

    const hasAllLegendary = spinItems.every(item => item.rarity === 'legendary');
    const hasLegendary = spinItems.some(item => item.rarity === 'legendary');
    const hasRare = spinItems.some(item => item.rarity === 'rare');
    const hasCommon = spinItems.every(item => item.rarity === 'common');

    let message = '';

    if (hasAllLegendary) {
      message = 'Jackpot! You hit 3 legendary items!';
      setBalance(prev => prev + (bet * 2)); // Add 2 times the bet amount to balance
    } else if (hasLegendary) {
      message = 'Wow! You just won a legendary item!';
    } else if (hasRare && spinItems.filter(item => item.rarity === 'rare').length === 3) {
      message = 'Impressive, you just won 3 rare items!';
    } else if (hasRare) {
      message = 'Hurray! You just got a rare item!';
    } else if (hasCommon) {
      message = 'Spin again for bigger rewards!';
    }

    // Update rewards to show the message
    setRewards([{ text: message, color: '#f7b84b' }]);

    // Control alert visibility
    if (message) {
      setShowWinAlert(true);
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 4000); // Hide alert after 4 seconds
    } else {
      setShowWinAlert(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 relative">
      <Card className="w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl bg-gradient-to-b from-[#2d3741] to-[#1a1f24] rounded-lg overflow-hidden border-2 border-[#f7b84b] p-4 sm:p-6 md:p-8 relative">
        <div className="p-4 sm:p-6 relative">
          {alertVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg animate-fade-in">
                <Alert className="m-0" variant="success">
                  <AlertTitle>You won!</AlertTitle>
                  {rewards.map((reward, index) => (
                    <div key={index} style={{ color: reward.color }}>
                      {reward.text}
                    </div>
                  ))}
                </Alert>
              </div>
            </div>
          )}

          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#f7b84b] tracking-wider mb-2">
              SLOT MACHINE
            </h1>
            <div className="text-[#e6c577] text-lg sm:text-xl font-bold">
              Balance: ${balance.toLocaleString()}
            </div>
          </div>
          
          <div className="bg-[#1a1f24] p-4 rounded-lg mb-6 shadow-inner border border-[#465058]">
            <div className="flex justify-center gap-2 flex-wrap">
              {[0, 1, 2].map((reelIndex) => (
                <div 
                  key={reelIndex}
                  className="relative flex-shrink-0 w-1/3 max-w-[120px] h-32 bg-[#2d3741] rounded-lg overflow-hidden border-2 border-[#f7b84b] shadow-xl"
                >
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-[#2d3741] transform -translate-y-full"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#2d3741] transform translate-y-full"></div>
                  
                  <div
                    ref={el => reelsRef.current[reelIndex] = el}
                    className="absolute left-0 right-0 flex flex-col items-center"
                    style={{ 
                      transform: `translateY(${-indexes[reelIndex] * ICON_HEIGHT}px)`,
                      top: 0
                    }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <React.Fragment key={i}>
                        {items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-center justify-center"
                            style={{ 
                              height: `${ICON_HEIGHT}px`,
                              width: '100%',
                              color: item.color
                            }}
                          >
                            <img 
                              src={item.src} 
                              alt={item.name} 
                              className="h-full w-full object-contain"
                            />
                          </div>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <Button onClick={() => setBet(bet - 5)} disabled={bet <= 5}>
                <ArrowLeft />
              </Button>
              <span className="mx-2">Bet: ${bet}</span>
              <Button onClick={() => setBet(bet + 5)} disabled={bet >= balance}>
                <ArrowRight />
              </Button>
            </div>
            <Button onClick={spin} disabled={isSpinning}>
              Spin
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SlotMachine;
