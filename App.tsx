import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Heart, 
  Users, 
  Home, 
  Music, 
  BookOpen, 
  Mic2, 
  Image as ImageIcon,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  MapPin,
  Mail,
  Phone,
  Sparkles,
  Play
} from 'lucide-react';

// --- Custom Hooks ---

const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { threshold });

    const current = domRef.current;
    if (current) observer.observe(current);
    
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [threshold]);

  return { isVisible, domRef };
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-6 left-6 right-6 z-50 transition-all duration-500 ${isScrolled ? 'top-4 scale-95' : 'top-6 scale-100'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 flex justify-between items-center shadow-2xl">
          <div className="flex items-center">
            <img src="input_file_0.png" alt="SMFLX Logo" className="h-8 md:h-10 w-auto object-contain" />
          </div>

          <div className="hidden lg:flex items-center space-x-10 text-[11px] uppercase tracking-[0.2em] font-bold text-white/90">
            <a href="#about" className="hover:text-white transition-colors text-white">About</a>
            <a href="#resources" className="hover:text-white transition-colors text-white">Resources</a>
            <a href="#articles" className="hover:text-white transition-colors text-white">Articles</a>
            <a href="#events" className="hover:text-white transition-colors text-white">Events</a>
          </div>

          <div className="hidden md:flex items-center">
            <button className="bg-white text-black text-[11px] uppercase tracking-widest font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-all flex items-center space-x-2">
              <span>Contact us</span>
            </button>
          </div>

          <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-4 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 space-y-6 flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <a href="#about" className="text-white text-xl font-clash" onClick={() => setIsOpen(false)}>About</a>
            <a href="#resources" className="text-white text-xl font-clash" onClick={() => setIsOpen(false)}>Resources</a>
            <a href="#articles" className="text-white text-xl font-clash" onClick={() => setIsOpen(false)}>Articles</a>
            <a href="#events" className="text-white text-xl font-clash" onClick={() => setIsOpen(false)}>Events</a>
            <button className="w-full bg-white text-black py-4 rounded-full font-bold">Contact us</button>
          </div>
        )}
      </div>
    </nav>
  );
};

const Hero = () => {
  const slides = [
    {
      title: "Being Single Eyed",
      desc: "Preparing singles willing and ready to engage the purpose and plan of God for their lives.",
      img: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Marriage Xpression",
      desc: "For every married couple who wants to express life the way God intends.",
      img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "A Godly Family Life",
      desc: "God sets the solitary in families so that they can fulfill purpose together.",
      img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black p-4">
      <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] group">
        {slides.map((slide, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === current ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={slide.img} 
              alt={slide.title} 
              className="w-full h-full object-cover opacity-60 scale-105 group-hover:scale-100 transition-transform duration-[15s] ease-linear" 
            />
            <div className="absolute inset-0 flex items-center md:items-end pb-32 px-10 md:px-24">
              <div className="max-w-4xl text-white">
                <div className={`transition-all duration-1000 transform ${idx === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-clash font-bold leading-[1] mb-10 text-balance tracking-tighter">
                    {slide.title.split(' ').map((word, i) => (
                      <span key={i} className={i === 1 ? "inline-block italic font-light opacity-80" : "mr-4"}>
                        {word}
                      </span>
                    ))}
                  </h2>
                  <div className="flex flex-col md:flex-row md:items-center gap-10">
                    <button className="bg-white text-black px-12 py-5 rounded-full font-bold flex items-center space-x-4 w-fit hover:bg-gray-200 transition-all hover:scale-105">
                      <span className="text-sm uppercase tracking-widest">Explore Move</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <p className="max-w-sm text-white/60 text-lg leading-relaxed font-light border-l border-white/20 pl-6">
                      {slide.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const AboutSection = () => {
  const { isVisible, domRef } = useScrollReveal();

  return (
    <section id="about" className="py-40 px-6 md:px-24 bg-white overflow-hidden" ref={domRef}>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <div className={`space-y-12 order-2 lg:order-1 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
            <div className="flex items-center space-x-6">
              <div className="w-16 h-[2px] bg-black"></div>
              <span className="text-[10px] uppercase tracking-[0.5em] font-extrabold text-black/40">GENESIS & VISION</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-clash leading-[1] tracking-tighter text-gray-900 text-balance">
              SMFLX is a light in <br /><span className="italic font-light">this generation.</span>
            </h2>
            
            <div className="space-y-8 max-w-xl">
              <p className="text-xl text-gray-600 leading-tight font-light">
                SMFLX is not a program or a gathering for excitement. It is a holy interruption—a summons to obedience, alignment, and surrender.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                In a world trapped in vanity, God answers darkness with light. Through worship, prayer, and the Word, He restores identity and awakens purpose in every family unit.
              </p>
            </div>

            <div className="pt-8">
              <button className="group relative bg-red-600 text-white px-12 py-6 rounded-full overflow-hidden transition-all hover:bg-red-700 shadow-2xl">
                <span className="relative z-10 font-bold tracking-widest uppercase text-xs">Our Full Story</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>

          <div className={`relative order-1 lg:order-2 flex justify-center lg:justify-end items-center transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gray-50 rounded-full blur-[120px] opacity-40"></div>
            
            <div className="relative z-10 w-full max-w-[550px] group">
              <div className="aspect-[4/5] bg-gray-200 overflow-hidden rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] transition-all duration-1000 group-hover:rounded-[1rem]">
                <img 
                  src="input_file_2.png" 
                  alt="Worship and Prayer" 
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-1000"
                />
              </div>

              <div className="absolute -bottom-16 -left-16 bg-white p-12 rounded-[2.5rem] shadow-2xl z-20 max-w-xs hidden xl:block border border-gray-100 animate-float">
                 <div className="space-y-4">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                       <Sparkles className="text-white w-5 h-5" />
                    </div>
                    <p className="font-clash text-2xl font-bold leading-none tracking-tight">"A sacred move back to the Father."</p>
                    <div className="w-12 h-1 bg-gray-100"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VehicleSection = () => {
  const { isVisible, domRef } = useScrollReveal();

  return (
    <section className="py-32 px-6 md:px-24 bg-gray-50 rounded-[4rem] mx-4 my-10" ref={domRef}>
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-24">
        <div className={`w-full md:w-1/2 relative group transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="overflow-hidden rounded-3xl">
            <img 
              src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto=format&fit=crop" 
              className="w-full aspect-[4/5] object-cover rounded-3xl group-hover:scale-105 transition-transform duration-700"
              alt="Training"
            />
          </div>
          <div className="absolute -bottom-12 -right-12 w-2/3 hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop" 
              className={`w-full aspect-[4/3] object-cover rounded-2xl border-[12px] border-white shadow-2xl transition-all duration-1000 delay-500 transform ${isVisible ? 'scale-100' : 'scale-50 opacity-0'}`}
              alt="Nature"
            />
          </div>
        </div>
        <div className={`w-full md:w-1/2 space-y-10 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          <div className="flex items-center space-x-6">
            <div className="w-16 h-[2px] bg-black"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">THE VEHICLE OF OBEDIENCE</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-clash leading-[1] tracking-tighter">
            Reshaping <br />the <span className="italic">Soul.</span>
          </h2>
          <p className="text-xl text-gray-500 leading-relaxed font-light">
            SMFLX is where God conveys His thoughts, reshapes desires, and trains men to live according to His intention for mankind. 
          </p>
          <p className="text-lg text-gray-400 leading-relaxed italic">
            "Obedience was never meant to be a struggle... it is a training ground where the Holy Spirit fashions men against vanity."
          </p>
          <button className="bg-red-600 text-white px-10 py-5 rounded-full flex items-center space-x-4 hover:bg-red-700 transition-all shadow-xl group">
            <span className="uppercase text-xs tracking-widest font-bold">Explore Training</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

const Ministries = () => {
  const { isVisible, domRef } = useScrollReveal();
  const cards = [
    {
      title: "Way of the Heart Camp Meeting",
      tag: "Sacred Gathering",
      img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Marriageable Singles Ingathering",
      tag: "Quarterly Appointment",
      img: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "WOTH Teens & Young Adults",
      tag: "Youth Empowerment",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Family Life Xpression",
      tag: "Divine Architecture",
      img: "https://images.unsplash.com/photo-1536640712247-c45474d6128c?q=80&w=1925&auto=format&fit=crop"
    }
  ];

  return (
    <section id="events" className="py-40 px-6 md:px-24 bg-white" ref={domRef}>
      <div className="container mx-auto">
        <div className={`flex flex-col md:flex-row justify-between items-end mb-24 gap-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="space-y-8 max-w-2xl">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-[2px] bg-black"></div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold">OUR MINISTRIES</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-clash leading-[1] tracking-tighter">
              Divine <br /><span className="italic">Appointments.</span>
            </h2>
          </div>
          <p className="max-w-md text-gray-400 text-lg leading-relaxed font-light">
            We specialize in transforming lives through spiritual alignment. Explore our diverse meetings crafted with divine precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className={`group cursor-pointer transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="relative overflow-hidden aspect-[10/14] rounded-2xl shadow-lg">
                <img src={card.img} alt={card.title} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 group-hover:rotate-1 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                   <span className="text-white/60 text-[10px] uppercase tracking-widest font-bold mb-2">{card.tag}</span>
                   <h3 className="text-white text-2xl font-clash font-bold leading-none">{card.title}</h3>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-start">
                 <h3 className="font-clash text-xl font-bold max-w-[80%]">{card.title}</h3>
                 <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  const { isVisible, domRef } = useScrollReveal();

  return (
    <section className="mx-6 mb-6 rounded-[3rem] overflow-hidden relative min-h-[85vh] flex items-center bg-black" ref={domRef}>
      <img 
        src="https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2070&auto=format&fit=crop" 
        className={`absolute inset-0 w-full h-full object-cover opacity-40 transition-all duration-[3s] ${isVisible ? 'scale-100' : 'scale-125'}`}
        alt="Joining"
      />
      <div className="relative container mx-auto px-10 md:px-24 text-white py-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className={`space-y-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-clash font-bold leading-[1] tracking-tighter text-balance">
              Join the <br /><span className="italic font-light opacity-80">Move.</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <button className="bg-white text-black px-12 py-6 rounded-full font-bold flex items-center justify-center space-x-4 hover:scale-105 transition-all shadow-2xl">
                <span className="uppercase text-xs tracking-[0.2em]">Join Us Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border border-white/20 text-white px-12 py-6 rounded-full font-bold hover:bg-white/10 transition-all uppercase text-xs tracking-[0.2em]">
                Partner With Us
              </button>
            </div>
          </div>
          <div className={`max-w-lg lg:ml-auto transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
             <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 space-y-6">
                <p className="text-white/70 text-xl leading-relaxed font-light">
                    "No matter your background, if you belong to Him, you belong here. Experience His power, purpose, and presence as part of the great army of God."
                </p>
                <div className="flex items-center space-x-4 pt-4">
                   <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                        <img key={i} src={`https://picsum.photos/seed/${i+40}/40/40`} className="w-12 h-12 rounded-full border-2 border-black" alt="Partner" />
                      ))}
                   </div>
                   <span className="text-white/40 text-xs font-bold uppercase tracking-widest">+5,000 PARTNERS</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Resources = () => {
  const { isVisible, domRef } = useScrollReveal();
  const resourceItems = [
    { title: "Messages", icon: <Mic2 className="w-6 h-6 text-white/40" />, gradient: "from-[#ff6d2c] to-[#48c3b5]", height: "h-[320px]" },
    { title: "Transcripts", icon: <BookOpen className="w-6 h-6 text-white/40" />, gradient: "from-[#ff6d2c] to-[#48c3b5]", height: "h-[480px]" },
    { title: "Gallery", icon: <ImageIcon className="w-6 h-6 text-white/40" />, gradient: "from-[#48c3b5] to-[#3170b7]", height: "h-[380px]" },
    { title: "Podcasts", icon: <Play className="w-6 h-6 text-white/40" />, gradient: "from-[#3170b7] to-[#1c3a5e]", height: "h-[280px]" },
  ];

  return (
    <section id="resources" className="bg-[#1c1210] py-32 px-6 md:px-24 overflow-hidden relative" ref={domRef}>
      <div className="container mx-auto relative z-10">
        <div className={`flex flex-col lg:flex-row justify-between items-start mb-20 gap-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="max-w-md">
                <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
                    From deep-dive teachings to transforming encounters and spiritual archives — we've got something for every believer who seeks alignment.
                </p>
            </div>
            <div className="lg:text-right">
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-clash font-bold text-white leading-tight tracking-tight">
                    Let's Discover Your <br />
                    <span className="text-[#ff6d2c]">Favorite Archives</span>
                </h2>
            </div>
        </div>

        <div className="flex flex-col md:flex-row items-end gap-6 lg:gap-8">
            {resourceItems.map((item, idx) => (
                <div 
                    key={idx} 
                    className={`relative w-full md:flex-1 rounded-[2.5rem] p-6 sm:p-10 bg-gradient-to-t ${item.gradient} ${item.height} flex flex-col justify-between group cursor-pointer hover:scale-[1.02] shadow-2xl overflow-hidden transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                >
                    <div className="relative z-10 p-4 bg-black/10 w-fit rounded-2xl backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform">
                        {item.icon}
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-clash font-bold leading-tight tracking-tight break-words">
                            {item.title}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-20 px-6 md:px-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
            <div className="flex flex-col space-y-4">
                <img src="input_file_0.png" alt="SMFLX Logo" className="h-12 w-auto object-contain self-start" />
                <p className="text-sm text-gray-400 max-w-xs">
                    Singles Married Family Life Xpression. Experience the love of the Father; encounter the voice of Jesus anew and immerse in the atmosphere of the indwelling presence and power of the Holy Ghost.
                </p>
            </div>
            <div className="text-center md:text-center w-full md:w-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-clash font-bold text-gray-100 uppercase leading-none tracking-tighter opacity-50">WANNA JOIN THE</h2>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-clash font-bold text-black uppercase leading-none tracking-tighter">MOVE OF GOD?</h2>
            </div>
            <div className="space-y-6 md:text-right">
                <h3 className="font-clash text-xl font-bold">Get in touch</h3>
                <div className="space-y-2 text-sm text-gray-500">
                    <p className="flex md:justify-end items-center gap-2"><MapPin className="w-4 h-4" /> Global Ministry HQ, Lagos, Nigeria</p>
                    <p className="flex md:justify-end items-center gap-2"><Mail className="w-4 h-4" /> contact@smflx.org</p>
                    <p className="flex md:justify-end items-center gap-2"><Phone className="w-4 h-4" /> +234 123 456 7890</p>
                </div>
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center py-10 border-t border-gray-100 gap-8">
            <div className="flex space-x-6">
                <Instagram className="w-5 h-5 text-gray-400 cursor-pointer hover:text-black transition-colors" />
                <Facebook className="w-5 h-5 text-gray-400 cursor-pointer hover:text-black transition-colors" />
                <Twitter className="w-5 h-5 text-gray-400 cursor-pointer hover:text-black transition-colors" />
                <Linkedin className="w-5 h-5 text-gray-400 cursor-pointer hover:text-black transition-colors" />
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-300">
                © 2025 SMFLX MINISTRIES. ALL RIGHTS RESERVED.
            </p>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <VehicleSection />
        <Ministries />
        <CTA />
        <Resources />
      </main>
      <Footer />
      
      <div className="fixed bottom-10 right-10 z-40 hidden md:block">
         <div className="flex flex-col items-center space-y-4">
            <span className="text-[10px] uppercase tracking-[0.5em] rotate-90 origin-right font-black text-black/20 mb-12">SCROLL</span>
            <div className="w-[1px] h-16 bg-black/10 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1/2 bg-black animate-scroll-indicator"></div>
            </div>
         </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes scroll-indicator {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scroll-indicator {
          animation: scroll-indicator 2s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default App;