import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import TetrisBackground from "../components/background-animations/tetris-background";
import "../index.css";
import WelcomeTitle from "../components/main-page/welcome-title";
import { useInView } from '../hooks/use-in-views'; 
import ThemeSwitcher from '../components/main-page/theme-switcher';
import { themes } from '../components/background-animations/themes';
import WelcomeSection from '../components/sections/welcome-section';
import RecruitmentPhaseSection from '../components/sections/recruitment-phase-section';
import InitialTestSection from '../components/sections/initial-test-section';
import RegistrationSection from '../components/sections/registration-section';
import AssistantBenefitsSection from '../components/sections/assistant-benefits-section';
import ContactUsSection from '../components/sections/contact-us-section';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => {
    const defaultTheme = themes[Math.floor(Math.random() * themes.length)].name;
    return defaultTheme;
  });
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [pageTransition, setPageTransition] = useState(''); 
  const [isBackgroundTransitioning, setIsBackgroundTransitioning] = useState(false);
  const [isExiting, setIsExiting] = useState(false); 
  const [isGameTransitioning, setIsGameTransitioning] = useState(false);
  const [isFalling, setIsFalling] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [isOnWelcomeSection, setIsOnWelcomeSection] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const [section1Ref, section1InView, section1Triggered] = useInView({}, 'Welcome Section');
  const [section2Ref, section2InView, section2Triggered] = useInView({}, 'Recruitment Phase');
  const [section3Ref, section3InView, section3Triggered] = useInView({}, 'Initial Test');
  const [section4Ref, section4InView, section4Triggered] = useInView({}, 'Registration');
  const [section5Ref, section5InView, section5Triggered] = useInView({}, 'Contact Us');
  const [section6Ref, section6InView, section6Triggered] = useInView({}, 'Assistant Benefits');

  const navigate = useNavigate();

  const handleClick = () => {
    setIsExploding(true);
    setIsExiting(true);
    
    setTimeout(() => {
      setIsExploding(false);
      
      setTimeout(() => {
        setPageTransition('animate-zoom-in-fade');
        setIsBackgroundTransitioning(true);
        setIsBlurred(true);
        setShowWelcome(true);
        setShowThemeSwitcher(true);
        
        setTimeout(() => {
          setPageTransition('animate-zoom-out-fade');
          setIsBackgroundTransitioning(false);
        }, 500);
      }, 500);
    }, 500);
  };

  const scrollToWelcome = () => {
    const container = document.querySelector('.snap-y');
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setCurrentTheme(newTheme);
  };

  const handleGameClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsGameTransitioning(true);
    
    const logo = document.querySelector('.slc-logo') as HTMLElement;
    if (logo) {
      logo.classList.add('animate-logo-expand-smooth');
    }
    
    setTimeout(() => {
      navigate('/game');
    }, 1500);
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector('.snap-y');
      if (container) {
        setIsOnWelcomeSection(container.scrollTop < window.innerHeight / 2);
      }
    };

    const container = document.querySelector('.snap-y');
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [showWelcome]);

  useEffect(() => {
    if (isTransitioning) {
      const container = document.querySelector('.snap-y');
      if (container) {
        container.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  }, [isTransitioning]);

  const handleWheel = (e: WheelEvent) => {
    if (section5InView && e.deltaY > 0 && !isScrolling) {
      setIsScrolling(true);
      scrollToWelcome();
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [section5InView, isScrolling]);

  return (
    <div
      className="w-full h-screen flex flex-col items-center bg-black justify-center font-game relative"
      onClick={!showWelcome ? handleClick : undefined}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      
      {showThemeSwitcher && (
        <ThemeSwitcher currentTheme={currentTheme} onThemeChange={handleThemeChange} />
      )}
      <TetrisBackground 
        selectedTheme={currentTheme} 
        isBlurred={isBlurred}
        isFalling={isFalling}
        isInteractive={!showWelcome} 
        isTransitioning={isBackgroundTransitioning}
        isExploding={isExploding}
      />
    
      <div className={`relative z-10 w-full ${pageTransition}`}>
        {showWelcome ? (
          <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory relative pointer-events-auto space-y-8 md:space-y-0">
            
            <WelcomeSection
              sectionRef={section1Ref}
              isGameTransitioning={isGameTransitioning}
              handleGameClick={handleGameClick}
            />
            
            <RecruitmentPhaseSection
              sectionRef={section2Ref}
              sectionInView={section2InView}
              hasTriggered={section2Triggered}
            />
            
            <InitialTestSection
              sectionRef={section3Ref}
              sectionInView={section3InView}
              hasTriggered={section3Triggered}
              scrollToTop={scrollToWelcome}
            />
            
            <div className="h-40 md:hidden"></div> 
            
            <RegistrationSection
              sectionRef={section4Ref}
              hasTriggered={section4Triggered}
            />
            
            <div className="h-40 md:hidden"></div> 
            <AssistantBenefitsSection
              sectionRef={section6Ref}
              sectionInView={section6InView}
              hasTriggered={section6Triggered}
            />
            
            <div className="h-40 md:hidden"></div> 
            <div className="h-40 md:hidden"></div> 
            
            <ContactUsSection
              sectionRef={section5Ref}
              sectionInView={section5InView}
              hasTriggered={section5Triggered}
              scrollToTop={scrollToWelcome}
            />

          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
            <WelcomeTitle isExiting={isExiting} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;