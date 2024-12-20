import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import TetrisBackground from "../components/background-animations/tetris-background";
import "../index.css";
import HeroComponent from "../components/main-page/HeroComponent";
import { useInView } from '../hooks/useInView';
import ThemeSwitcher from '../components/main-page/ThemeSwitcher';

const ScrollIndicator = ({ text = "Scroll Down", onClick }) => (
  <div className="absolute bottom-8 right-8 flex flex-col items-center text-white/70 animate-bounce" onClick={onClick}>
    <p className="mb-2 text-sm">{text}</p>
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  </div>
);

function Home() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => {
    const themes = ['cyberpunk', 'midnight', 'neon', 'synthwave'];
    return themes[Math.floor(Math.random() * themes.length)];
  });
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);
  
  const [section1Ref, section1InView] = useInView();
  const [section2Ref, section2InView] = useInView();
  const [section3Ref, section3InView] = useInView();
  const [section4Ref, section4InView] = useInView();
  const [section5Ref, section5InView] = useInView();
  const [section6Ref, section6InView] = useInView();

  const handleClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowWelcome(true);
      setShowThemeSwitcher(true);
      setIsTransitioning(false);
    }, 1000);
  };

  const scrollToTop = () => {
    const container = document.querySelector('.snap-y');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setCurrentTheme(newTheme);
  };

  return (
    <div
      className=" w-full h-screen flex flex-col items-center justify-center font-game"
      onClick={!showWelcome ? handleClick : undefined}
    >
      {showThemeSwitcher && (
        <ThemeSwitcher currentTheme={currentTheme} onThemeChange={handleThemeChange} />
      )}
      <TetrisBackground selectedTheme={currentTheme} />
      <div className={`transition-all duration-1000 w-full ${isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}>
        {showWelcome ? (
          <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory">
            <section
              ref={section1Ref}
              className={`w-full h-screen snap-start relative flex items-center justify-center section-hidden
                         ${section1InView ? 'slide-from-left' : ''}`}
            >
              <div className="relative h-full flex items-center justify-center p-8">
                <div className="w-full max-w-7xl relative z-10">
                  <div className="w-full flex flex-row items-center justify-center text-center">
                    <div className="relative flex flex-1 items-center justify-center">
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          id="hero-logo"
                          className="max-w-3xl hover:scale-105 transition-transform duration-500 relative z-10"
                          src="./assets/images/logo.png"
                          alt="logo"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center gap-12">
                      <p className="mt-4 text-7xl" id="hero-text-static">
                        New Assistant Recruitment
                        <br />
                        25-2
                      </p>
                      <div className="flex gap-8">
                        {[
                          { 
                            to: '/game',
                            text: 'Play Game',
                            border: 'border-white/20',
                            glow: 'bg-white/10'
                          },
                          { 
                            to: 'https://bluejack.binus.ac.id/nar/home/registration',
                            text: 'Register Now',
                            border: 'border-white/20',
                            glow: 'bg-white/10'
                          }
                        ].map((button, index) => (
                          <Link
                            key={index}
                            to={button.to}
                            className="bg-black/30 px-12 py-6 rounded-lg backdrop-blur-sm 
                                     hover:scale-110 transition-all duration-300 
                                     border-2 group relative overflow-hidden"
                            style={{ borderColor: `rgb(255 255 255 / 0.2)` }}
                          >
                            <span className="text-4xl glitch-text relative z-10">
                              {button.text}
                            </span>
                            <div className="absolute inset-0 group-hover:opacity-100 opacity-0 
                                         transition-opacity duration-300 pointer-events-none
                                         bg-white/10 blur-sm" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ScrollIndicator text="Scroll for Phases" />
            </section>

            <section ref={section2Ref} className={`w-full h-screen snap-start relative flex items-center justify-center section-hidden
                         ${section2InView ? 'slide-from-right' : ''}`}>
  <div className="w-full max-w-7xl px-8">
    <h1 className="text-6xl font-bold text-white mb-8 text-center text-shadow-glow animate-slideDown relative group">
      <span className="inline-block animate-float-title transition-all duration-300">RECRUITMENT</span>
      <span className="inline-block animate-float-title-delayed mx-2">PHASE</span>
    </h1>

    <div className="relative h-[600px] px-4">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600">
        <path
          d="M100,300 C250,300 300,100 500,100 C700,100 750,500 900,500"
          fill="none"
          stroke="url(#roadGradient)"
          strokeWidth="40"
          className="drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        />
        
        <path
          d="M100,300 C250,300 300,100 500,100 C700,100 750,500 900,500"
          fill="none"
          stroke="rgba(6,182,212,0.5)"
          strokeWidth="2"
          strokeDasharray="10,10"
          className="animate-dash"
        />

        <defs>
          <linearGradient id="roadGradient" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(17,24,39,0.8)" />
            <stop offset="50%" stopColor="rgba(6,182,212,0.2)" />
            <stop offset="100%" stopColor="rgba(17,24,39,0.8)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0">
        {[
          {
            phase: "01",
            title: "Initial Test",
            isCurrent: true,
            position: "left-[10%] top-[45%]",
            steps: ["Aptitude Test", "Programming Test"]
          },
          {
            phase: "02",
            title: "Pre Training",
            position: "left-[40%] top-[15%]",
            steps: ["DS Using C", "OOP Using Java", "Database"]
          },
          {
            phase: "03",
            title: "Interview",
            position: "left-[60%] top-[15%]",
            steps: ["Resume", "Presentation"]
          },
          {
            phase: "04",
            title: "Core Training",
            position: "left-[85%] top-[80%]",
            steps: ["Learning Session", "Case Solving", "Presentation", "Evaluation"]
          }
        ].map((phase, index) => (
          <div key={index} 
               className={`absolute ${phase.position} transform -translate-x-1/2 -translate-y-1/2
                          ${phase.isCurrent ? 'z-20 scale-110' : 'z-10'}`}>
            <div className={`group flex flex-col items-center
                           ${phase.isCurrent ? 'animate-float' : ''}`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center
                             backdrop-blur-sm relative
                             ${phase.isCurrent 
                               ? 'bg-cyan-500/20 border-2 border-cyan-400 shadow-lg shadow-cyan-500/50' 
                               : 'bg-gray-900/50 border border-white/20'}`}>
                <span className="text-3xl" id="hero-text-static">{phase.phase}</span>
                
                {phase.isCurrent && (
                  <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping" />
                )}
              </div>

              <div className={`mt-4 text-center backdrop-blur-sm rounded-lg p-3
                             ${phase.isCurrent 
                               ? 'bg-cyan-500/10 border border-cyan-500/30' 
                               : 'bg-black/30'}`}>
                <h3 className="text-xl mb-2" id="hero-text-static">{phase.title}</h3>
                <div className="space-y-1">
                  {phase.steps.map((step, i) => (
                    <div key={i} 
                         className={`text-sm ${phase.isCurrent ? 'text-white' : 'text-white/70'}`}>
                      {step}
                    </div>
                  ))}
                </div>
                {phase.isCurrent && (
                  <div className="text-cyan-400 text-xs mt-2 animate-pulse">Current Phase</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  <ScrollIndicator text="Initial Test" />
</section>

            <section
              ref={section3Ref}
              className={`w-full h-screen snap-start relative flex items-center justify-center section-hidden
                         ${section3InView ? 'slide-from-left' : ''}`}
            >
              <div className="w-full max-w-7xl px-8">
                <h1 className="text-6xl font-bold text-white mb-16 text-center text-shadow-glow animate-slideDown relative group">
                  <span className="inline-block animate-float-title transition-all duration-300">INITIAL</span>
                  <span className="inline-block animate-float-title-delayed mx-2">TEST</span>
                  <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 group-hover:via-cyan-500/20 transition-all duration-500"></div>
                </h1>

                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-black/30 p-8 rounded-xl backdrop-blur-sm border border-cyan-500/20 group
                               hover:border-cyan-500/40 transition-all duration-300">
                    <h2 className="text-4xl mb-8" id="hero-text-static">Test Components</h2>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-2xl text-white/90">Aptitude Test</h3>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl text-white/90">Programming Test</h3>
                        <p className="text-white/70 text-lg pl-4">
                          You can use:<br/>
                          • C/C++<br/>
                          • Java<br/>
                          • Python
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Important Information */}
                  <div className="bg-black/30 p-8 rounded-xl backdrop-blur-sm border border-cyan-500/20 group
                               hover:border-cyan-500/40 transition-all duration-300">
                    <h2 className="text-4xl mb-8" id="hero-text-static">Important Information</h2>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-2xl text-white/90">Schedule</h3>
                        <p className="text-white/70 text-lg pl-4">
                          Date: 27 March 2024<br/>
                          Time: 08:00 - 11:00 (Batch 1)
                          Time: 13:00 - 16:00 (Batch 2)
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl text-white/90">Requirements</h3>
                        <p className="text-white/70 text-lg pl-4">
                          • Dress Politely<br/>
                          • Bring Binusian Card<br/>
                          • Arrive On Time
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ScrollIndicator text="Assistant Benefits" />
            </section>
            
            <section
              ref={section6Ref}
              className={`w-full h-screen snap-start relative flex items-center justify-center section-hidden
                         ${section6InView ? 'slide-from-right' : ''}`}
            >
              <div className="w-full max-w-7xl px-8">
                <h1 className="text-6xl font-bold text-white mb-16 text-center text-shadow-glow animate-slideDown relative group">
                  <span className="inline-block animate-float-title transition-all duration-300">ASSISTANT</span>
                  <span className="inline-block animate-float-title-delayed mx-2">BENEFITS</span>
                  <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 group-hover:via-cyan-500/20 transition-all duration-500"></div>
                </h1>
                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-black/30 p-8 rounded-lg backdrop-blur-sm border border-white/10">
                    <h2 className="text-4xl mb-6" id="hero-text-static">Soft Skills</h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {[
                        "Public Speaking",
                        "Time Management",
                        "Discipline",
                        "Networking",
                        "Leadership",
                        "Communication",
                        "Teamwork",
                        "Problem Solving",
                        "And Many More"
                      ].map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-cyan-500/20 rounded-full text-white/70 hover:text-white 
                                   hover:bg-cyan-500/30 transition-all duration-300 text-lg animate-float"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-black/30 p-8 rounded-lg backdrop-blur-sm border border-white/10">
                    <h2 className="text-4xl mb-6" id="hero-text-static">Hard Skills</h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {[
                        "C/C++",
                        "Java",
                        "Golang",
                        "Rust",
                        "Flutter",
                        "Unity",
                        "Database",
                        "React",
                        "Laravel",
                        "Docker",
                        "Kubenetes",
                        "Cisco",
                        "Javascript",
                        "Typescript",
                        "And Many More"
                      ].map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-500/20 rounded-full text-white/70 hover:text-white 
                                   hover:bg-blue-500/30 transition-all duration-300 text-lg animate-float"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-2 mt-8 bg-black/30 p-8 rounded-lg backdrop-blur-sm border border-white/10">
                    <h2 className="text-4xl mb-6" id="hero-text-static">Others</h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {[
                        "Salary",
                        "Health Benefit",
                        "Free Parking",
                        "Job Opportunities",
                        "Career Path",
                        "Second Family",
                        "And Many More"
                      ].map((benefit, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-purple-500/20 rounded-full text-white/70 hover:text-white 
                                   hover:bg-purple-500/30 transition-all duration-300 text-lg animate-float"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <ScrollIndicator text="Registration" />
            </section>

            <section
              ref={section4Ref}
              className={`w-full h-screen snap-start relative flex items-center justify-center section-hidden
                         ${section4InView ? 'slide-from-right' : ''}`}
            >
              <div className="w-full max-w-7xl px-8">
                <h1 className="text-6xl font-bold text-white mb-16 text-center text-shadow-glow animate-slideDown relative group">
                  <span className="inline-block animate-float-title transition-all duration-300">REGISTRATION</span>
                  <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 group-hover:via-cyan-500/20 transition-all duration-500"></div>
                </h1>

                <div className="grid grid-cols-2 gap-12">
                  <div className="bg-black/30 p-8 rounded-xl backdrop-blur-sm border border-cyan-500/20 group
                               hover:border-cyan-500/40 transition-all duration-300">
                    <h2 className="text-4xl mb-8" id="hero-text-static">Important Dates</h2>
                    <div className="space-y-6">
                      {[
                        { date: "14 Jan 2024", event: "Registration Opens" },
                        { date: "20 Mar 2024", event: "Registration Closes" },
                        { date: "27 Mar 2024", event: "Initial Test" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-6 group/item">
                          <div className="bg-cyan-500/20 px-4 py-2 rounded-lg text-xl text-white/70
                                      group-hover/item:bg-cyan-500/30 group-hover/item:text-white transition-all duration-300">
                            {item.date}
                          </div>
                          <span className="text-xl text-white/70 group-hover/item:text-white transition-colors duration-300">
                            {item.event}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-black/30 p-8 rounded-xl backdrop-blur-sm border border-cyan-500/20 group
                               hover:border-cyan-500/40 transition-all duration-300">
                    <h2 className="text-4xl mb-8" id="hero-text-static">Requirements</h2>
                    <div className="space-y-4">
                      {[
                        "Must be an active student of Binus University",
                        "Must be willing to sign a contract for 2 years",
                        "Minimum grade B in Algorithm and Programming / Introduction to Programming *Except for first semester student",
                        "Majors: SoCS (Computer Science), SoIS (Information System), DP (Double Program), MTP (Master Track Program)",
                      ].map((req, index) => (
                        <div key={index} className="flex items-start gap-4 group/item">
                          <span className="text-white/70 group-hover:text-white text-xl transition-colors">→</span>
                          <p className="text-xl text-white/70 group-hover/item:text-white transition-colors duration-300">
                            {req}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <Link
                    to="https://bluejack.binus.ac.id/nar/home/registration"
                    className="inline-block bg-black/30 px-12 py-6 rounded-lg backdrop-blur-sm 
                             hover:scale-110 transition-all duration-300 
                             border-2 border-cyan-500/20 group
                             relative overflow-hidden"
                  >
                    <span className="text-4xl glitch-text relative z-10" id="hero-text-static">
                      Register Now
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-transparent
                                opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </Link>
                </div>
              </div>
              <ScrollIndicator text="Contact Us" />
            </section>

            <section
              ref={section5Ref}
              className={`w-full h-screen snap-start relative flex items-center justify-center section-hidden
                         ${section5InView ? 'slide-from-left' : ''}`}
              onWheel={(e) => {
                if (e.deltaY > 0) { 
                  scrollToTop();
                }
              }}
            >
              <div className="w-full max-w-7xl px-8 flex flex-col items-center justify-center">
                <h1 className="text-6xl font-bold text-white mb-16 text-center text-shadow-glow animate-slideDown relative group">
                  <span className="inline-block animate-float-title transition-all duration-300">CONTACT</span>
                  <span className="inline-block animate-float-title-delayed mx-2">US</span>
                  <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 group-hover:via-cyan-500/20 transition-all duration-500"></div>
                </h1>

                <div className="flex flex-col items-center gap-16 w-full">
                  <div className="grid grid-cols-3 w-full gap-8">
                    {[
                      {
                        title: "Location",
                        icon: "📍",
                        content: ["Room 724", "BINUS Anggrek Campus", "Jakarta Barat"]
                      },
                      {
                        title: "Contact",
                        icon: "📞",
                        content: ["[021] 5345830", "Extension 1762"]
                      },
                      {
                        title: "RECSELS",
                        icon: "👥",
                        content: ["Gabriel", "Vito", "Rico"]
                      }
                    ].map((item, index) => (
                      <div key={index} 
                           className="group relative p-6 rounded-xl bg-black/30 backdrop-blur-sm
                                    border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                        <div className="relative z-10">
                          <span className="text-3xl mb-4 block">{item.icon}</span>
                          <h3 className="text-2xl mb-4" id="hero-text-static">{item.title}</h3>
                          {item.content.map((line, i) => (
                            <p key={i} className="text-white/70 text-xl leading-relaxed group-hover:text-white transition-colors">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="w-full max-w-2xl">
                    <h3 className="text-2xl mb-8 text-center" id="hero-text-static">Connect With Us</h3>
                    <div className="flex justify-center gap-12">
                      {[
                        { 
                          name: 'Instagram', 
                          icon: './assets/images/instagram.png', 
                          url: 'https://www.instagram.com/slcbinusuniv/' 
                        },
                        { 
                          name: 'Line', 
                          icon: './assets/images/line.png',
                          url: 'https://lin.ee/T8Zr5qu' 
                        },
                        { 
                          name: 'YouTube', 
                          icon: './assets/images/youtube.png',
                          url: 'https://www.youtube.com/@SoftwareLabCenter' 
                        }
                      ].map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col items-center gap-3 p-4 rounded-lg
                                   hover:bg-cyan-500/10 transition-all duration-300"
                        >
                          <img 
                            src={social.icon}
                            alt={social.name}
                            className="w-8 h-8 group-hover:scale-125 transition-transform duration-300 object-contain"
                          />
                          <span className="text-white/70 text-xl group-hover:text-white transition-colors">
                            {social.name}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <ScrollIndicator text="Back to Top" onClick={scrollToTop} />
            </section>

          </div>
        ) : (
          <HeroComponent />
        )}
      </div>
    </div>
  );
}

export default Home;