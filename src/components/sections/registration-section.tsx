import React from 'react';
import ScrollIndicator from '../main-page/scroll-indicator';

const RegistrationSection = ({ sectionRef }) => (
  <section
    ref={sectionRef}
    className="w-full h-screen min-h-[800px] snap-start relative flex items-center justify-center pointer-events-auto bg-black/50 mb-20"
  >
    <div className="w-full max-w-6xl px-8">
      <h1 className="text-5xl font-bold text-white mb-12 text-center text-shadow-glow animate-slideDown">
        <span className="inline-block animate-float-title">REGISTRATION</span>
      </h1>

      <div className="relative">
        <div className="flex justify-between mb-20 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-blue-500/50"></div>
          
          {[
            { date: "14 Jan 2024", event: "Registration Opens", icon: "🚀", status: "past" },
            { date: "20 Mar 2024", event: "Registration Closes", icon: "🔒", status: "future" },
            { date: "27 Mar 2024", event: "Initial Test", icon: "✨", status: "future" }
          ].map((item, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center group">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center 
                ${item.status === 'current' ? 'bg-black border-2 border-cyan-500' :
                 item.status === 'past' ? 'bg-black border-2 border-purple-500' :
                 'bg-black border border-white'}
                relative`}>
                <span className="text-2xl">{item.icon}</span>
                {item.status === 'current' && (
                  <div className="absolute inset-0 rounded-full bg-cyan-500/30 animate-ping"></div>
                )}
              </div>
              <div className={`mt-4 text-center transform transition-all duration-300
                ${item.status === 'current' ? 'scale-110' : 'group-hover:scale-110'}`}>
                <p className="text-2xl font-bold text-white/90">{item.date}</p>
                <p className="text-xl text-white/70">{item.event}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 relative">
          <div className="flex flex-col items-center space-y-8">
            <h2 className="text-3xl mb-4" id="hero-text-static">Requirements</h2>
            <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
              {[
                { text: "Active BINUS Student", icon: "🎓", desc: "Currently enrolled in BINUS University" },
                { text: "2 Year Commitment", icon: "📝", desc: "Willing to sign a contract" },
                { text: "Grade B in Algorithm and Programming / Introduction to Programming", icon: "💯", desc: "*Except for first semester students" },
                { text: "SoCS/SoIS/DP/MTP", icon: "🏫", desc: "Students from eligible majors" }
              ].map((req, idx) => (
                <div key={idx} className="flex items-center gap-2 group/item">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 
                                flex items-center justify-center flex-shrink-0
                                group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                    <span className="text-2xl">{req.icon}</span>
                  </div>
                  <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                    <h3 className="text-xl text-white/90 mb-1">{req.text}</h3>
                    <p className="text-sm text-white/60">{req.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://bluejack.binus.ac.id/nar/home/registration"
              className="relative group mt-8"
            >
              <div className="absolute -inset-1 via-purple-500 to-cyan-500 
                            rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
              <button className="relative px-12 py-4 rounded-lg leading-none flex items-center divide-x divide-gray-600">
                <span className="text-3xl pr-6" id="hero-text-static">Register Now</span>
                <span className="text-2xl pl-6 group-hover:translate-x-2 text-white transition-transform duration-300">→</span>
              </button>
            </a>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan-500/30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
    <ScrollIndicator text="Assistant Benefits" />
  </section>
);

export default RegistrationSection;