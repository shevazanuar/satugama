"use client";

import { useState } from "react";
import { CharacterCustomizer } from "@/components/character-customizer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  Gamepad2,
  ShieldCheck,
  Send,
  Loader2,
  Mail,
  MapPin,
  Flame,
  Zap,
  Target,
  Compass,
  ArrowRight,
  Monitor,
  Menu,
  X
} from "lucide-react";

// Portfolio assets list
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    category: "ui",
    title: "Last Signal Glitch Pack",
    desc: "UI kit futuristik lengkap dengan efek glitch, ikon sci-fi retro, dan efek suara (SFX) sintetis untuk game party multiplayer.",
    price: "Rp 149.000",
    badge: "UI & Audio",
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#1b1236" />
        <g transform="translate(10, 10)">
          <text x="140" y="80" fill="#ff007a" fontSize="26" fontFamily="Outfit, sans-serif" fontWeight="900" textAnchor="middle">LAST SIGNAL</text>
          <text x="140" y="105" fill="#00f0ff" fontSize="13" fontFamily="monospace" textAnchor="middle">GLITCH ASSET PACK</text>
          <line x1="20" y1="120" x2="260" y2="120" stroke="#bd00ff" strokeWidth="2" />
          <rect x="75" y="135" width="130" height="22" rx="6" fill="rgba(0,240,255,0.1)" stroke="#00f0ff" strokeWidth="1" />
          <text x="140" y="149" fill="#00f0ff" fontSize="10" fontFamily="monospace" textAnchor="middle">8-BIT / UI / SFX</text>
        </g>
      </svg>
    )
  },
  {
    id: 2,
    category: "2d",
    title: "Retro Dungeon 16-Bit Tileset",
    desc: "Paket tileset 2D lengkap bertema kastil gelap. Termasuk sprite dinding, pintu jebakan, peti harta karun beranimasi, dan rintangan mematikan.",
    price: "Rp 99.000",
    badge: "Pixel Art",
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#111" />
        <g stroke="#333" strokeWidth="1">
          <line x1="0" y1="50" x2="300" y2="50" />
          <line x1="0" y1="100" x2="300" y2="100" />
          <line x1="0" y1="150" x2="300" y2="150" />
          <line x1="50" y1="0" x2="50" y2="200" />
          <line x1="100" y1="0" x2="100" y2="200" />
          <line x1="150" y1="0" x2="150" y2="200" />
          <line x1="200" y1="0" x2="200" y2="200" />
          <line x1="250" y1="0" x2="250" y2="200" />
        </g>
        <g transform="translate(125, 75)">
          <rect x="0" y="10" width="50" height="35" rx="3" fill="#8b4513" stroke="#ffd700" strokeWidth="2" />
          <rect x="0" y="5" width="50" height="12" rx="3" fill="#a0522d" stroke="#ffd700" strokeWidth="2" />
          <rect x="22" y="12" width="6" height="10" rx="1" fill="#ffd700" />
          <circle cx="25" cy="17" r="1.5" fill="#111" />
          <polygon points="10,0 12,-4 14,0 18,2 14,4 12,8 10,4 6,2" fill="#00f0ff" />
          <polygon points="40,25 41,22 42,25 45,26 42,27 41,30 40,27 37,26" fill="#ffd700" />
        </g>
      </svg>
    )
  },
  {
    id: 3,
    category: "3d",
    title: "Low-Poly Sci-Fi Starfighters",
    desc: "Model 3D kendaraan luar angkasa dengan jumlah poligon rendah, optimal untuk game seluler atau PC. Tersedia dalam format FBX dan OBJ.",
    price: "Rp 199.000",
    badge: "3D Models",
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#0c1b2b" />
        <g stroke="#00f0ff" strokeWidth="1.5" fill="none">
          <polygon points="150,40 100,140 150,120" />
          <polygon points="150,40 200,140 150,120" />
          <polygon points="100,140 50,160 100,150" />
          <polygon points="200,140 250,160 200,150" />
          <line x1="150" y1="120" x2="150" y2="170" />
          <polygon points="145,170 150,195 155,170" stroke="#ff007a" fill="rgba(255,0,122,0.3)" />
        </g>
      </svg>
    )
  }
];

// Team profiles ("Kelompok 1")
const TEAM_MEMBERS = [
  {
    name: "Biges",
    nim: "05",
    role: "CEO & Business Strategist",
    desc: "Bertanggung jawab atas strategi pengembangan bisnis startup SatuGama, menyusun pitch deck, dan mengelola kemitraan strategis.",
    avatar: "B",
    stats: [
      { label: "Leadership", val: "94%" },
      { label: "Business Strategy", val: "95%" }
    ],
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/30"
  },
  {
    name: "Dai",
    nim: "17",
    role: "Lead Software Architect",
    desc: "Merancang arsitektur web aplikasi SatuGama, mengintegrasikan core customizer, dan memastikan performa coding yang optimal.",
    avatar: "D",
    stats: [
      { label: "Coding & Logic", val: "98%" },
      { label: "System Design", val: "92%" }
    ],
    color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30"
  },
  {
    name: "Ravie",
    nim: "19",
    role: "Lead 3D Modeler (Blender)",
    desc: "Menghasilkan model 2D/3D berkualitas tinggi menggunakan software Blender untuk berbagai kebutuhan visualisasi dan aset game.",
    avatar: "R",
    stats: [
      { label: "Blender Modeling", val: "96%" },
      { label: "Visual Aesthetic", val: "91%" }
    ],
    color: "from-purple-500/20 to-pink-500/20 border-purple-500/30"
  },
  {
    name: "Sheva",
    nim: "22",
    role: "UI/UX & Frontend Engineer",
    desc: "Mendesain interface landing page SatuGama yang premium dan responsif, serta mengoptimalkan alur interaksi pengguna.",
    avatar: "S",
    stats: [
      { label: "UI/UX Design", val: "93%" },
      { label: "Frontend Dev", val: "95%" }
    ],
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30"
  }
];

export default function Home() {
  // Mobile Nav Toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Portfolio Filter State
  const [activeFilter, setActiveFilter] = useState("all");

  // Contact Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [style, setStyle] = useState("2d-pixel");
  const [budget, setBudget] = useState("under-500k");
  const [message, setMessage] = useState("");
  
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | "loading" | null;
    text: string;
  }>({ type: null, text: "" });

  // Handle Form Submit
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: "loading", text: "Mengirim request penawaran..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, style, budget, message }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          text: `Terima kasih ${name}! Request penawaran Anda mengenai gaya "${
            style === "2d-pixel" ? "2D Pixel Art" : 
            style === "2d-vector" ? "2D Vector Art" : 
            style === "3d-lowpoly" ? "3D Low-Poly Models" : 
            style === "3d-stylized" ? "3D Stylized Models" : "UI Design & Audio SFX"
          }" telah terkirim. Kami akan menghubungi Anda di ${email}.`,
        });
        // Clear input
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setSubmitStatus({
          type: "error",
          text: data.error || "Gagal mengirim request penawaran. Coba lagi.",
        });
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus({
        type: "error",
        text: "Terjadi kesalahan jaringan. Mohon coba beberapa saat lagi.",
      });
    }
  };

  // Filter Items
  const filteredPortfolio = PORTFOLIO_ITEMS.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  return (
    <div className="bg-[#030014] text-slate-100 min-h-screen relative font-sans antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-cyan-700/10 blur-[100px] md:blur-[180px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-violet-700/10 blur-[100px] md:blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-fuchsia-700/5 blur-[100px] md:blur-[180px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-900 bg-[#030014]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-white group">
            <span className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-slate-950 font-extrabold group-hover:scale-105 transition-all">S</span>
            SATU<span className="text-cyan-400 group-hover:text-violet-400 transition-colors">GAMA</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-slate-300 hover:text-cyan-400 text-sm font-medium transition-colors">Home</a>
            <a href="#features" className="text-slate-300 hover:text-cyan-400 text-sm font-medium transition-colors">Fitur</a>
            <a href="#customizer" className="text-slate-300 hover:text-cyan-400 text-sm font-medium transition-colors">Customizer</a>
            <a href="#projects" className="text-slate-300 hover:text-cyan-400 text-sm font-medium transition-colors">Katalog</a>
            <a href="#team" className="text-slate-300 hover:text-cyan-400 text-sm font-medium transition-colors">Tim Kami</a>
            <a href="#pricing" className="text-slate-300 hover:text-cyan-400 text-sm font-medium transition-colors">Lisensi</a>
            <a href="#contact" className="text-slate-300 hover:text-cyan-400 text-sm font-medium transition-colors">Kontak</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="#customizer" className="inline-flex items-center justify-center h-8 gap-1.5 px-3.5 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-slate-950 font-semibold rounded-xl text-xs transition-all active:translate-y-px cursor-pointer">
              <Sparkles className="h-3.5 w-3.5 mr-1" /> Mulai Buat
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-slate-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#030014] border-b border-slate-900 px-6 py-4 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
            <a 
              href="#home" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white text-base py-1"
            >
              Home
            </a>
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white text-base py-1"
            >
              Fitur
            </a>
            <a 
              href="#customizer" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white text-base py-1"
            >
              Customizer
            </a>
            <a 
              href="#projects" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white text-base py-1"
            >
              Katalog
            </a>
            <a 
              href="#team" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white text-base py-1"
            >
              Tim Kami
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white text-base py-1"
            >
              Lisensi
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white text-base py-1"
            >
              Kontak
            </a>
            <a href="#customizer" onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center justify-center h-9 gap-1.5 px-4 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-slate-950 font-semibold rounded-xl text-sm transition-all active:translate-y-px w-full mt-2 cursor-pointer">
              <Sparkles className="h-4 w-4 mr-2" /> Mulai Buat
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 md:py-28 relative">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-950/20 px-3 py-1 font-mono uppercase tracking-wide gap-1.5">
              <Flame className="h-3.5 w-3.5 fill-cyan-400 text-cyan-400" /> Technopreneurship Project
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Wujudkan Game Impian dengan <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">Aset Premium</span>
            </h1>
            
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
              SatuGama adalah studio game asset maker inovatif yang didirikan oleh tim kreatif Kelompok 1 mahasiswa Teknik Informatika Politeknik Negeri Semarang. Kami menyediakan aset 2D, 3D (Blender), UI/UX, dan audio berkualitas tinggi untuk mempercepat proses pengembangan game Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a href="#customizer" className="inline-flex items-center justify-center h-10 gap-1.5 px-5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-xl text-sm transition-all active:translate-y-px cursor-pointer">
                Coba Customizer <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a href="#projects" className="inline-flex items-center justify-center h-10 gap-1.5 px-5 border border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white rounded-xl text-sm transition-all active:translate-y-px cursor-pointer">
                Lihat Portofolio
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-900 max-w-md">
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-white">26+</div>
                <div className="text-xs text-slate-500 font-mono mt-1 uppercase">Proyek Aset</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-white">4</div>
                <div className="text-xs text-slate-500 font-mono mt-1 uppercase">Expert Creators</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-white">100%</div>
                <div className="text-xs text-slate-500 font-mono mt-1 uppercase">Original Assets</div>
              </div>
            </div>
          </div>

          {/* Hero Visual Right Side */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Visual background circle glow */}
            <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-cyan-500 to-violet-600 opacity-20 blur-[80px] -z-10" />
            
            <div className="w-full aspect-square max-w-[400px] bg-slate-950 border border-slate-900 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#111124_1px,transparent_1px),linear-gradient(to_bottom,#111124_1px,transparent_1px)] bg-[size:15px_15px] opacity-20" />
              
              {/* Synthwave/Glitchy scene SVG */}
              <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_0_20px_rgba(6,182,212,0.15)]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0f0729" />
                    <stop offset="100%" stopColor="#120626" />
                  </linearGradient>
                </defs>
                <rect width="400" height="400" fill="url(#skyGrad)" rx="16" />
                
                {/* Sun Grid */}
                <circle cx="200" cy="150" r="70" fill="none" stroke="#ff007a" strokeWidth="3" strokeDasharray="10 5" />
                <circle cx="200" cy="150" r="64" fill="#1b0c36" />
                
                {/* Perspective lines */}
                <path d="M 200,200 L 0,400 M 200,200 L 80,400 M 200,200 L 160,400 M 200,200 L 240,400 M 200,200 L 320,400 M 200,200 L 400,400" stroke="#00f0ff" strokeWidth="1.5" opacity="0.3" />
                <path d="M 0,280 H 400 M 0,310 H 400 M 0,345 H 400 M 0,385 H 400" stroke="#00f0ff" strokeWidth="1" opacity="0.2" />
                
                {/* City lines */}
                <path d="M 0,220 V 170 H 40 V 190 H 80 V 150 H 120 V 180 H 150 V 130 H 210 V 190 H 250 V 160 H 300 V 185 H 340 V 150 H 400 V 220 Z" fill="#080312" opacity="0.9" />
                
                <rect x="90" y="160" width="6" height="10" fill="#00f0ff" opacity="0.6" />
                <rect x="100" y="175" width="6" height="10" fill="#ff007a" opacity="0.6" />
                <rect x="170" y="140" width="8" height="15" fill="#ffd700" opacity="0.5" />
                <rect x="190" y="150" width="8" height="15" fill="#00f0ff" opacity="0.6" />
                <rect x="360" y="170" width="10" height="10" fill="#ff007a" opacity="0.7" />
                
                <polygon points="0,220 100,120 180,220" fill="none" stroke="#bd00ff" strokeWidth="2" opacity="0.7" />
                <polygon points="120,220 250,90 350,220" fill="none" stroke="#ff007a" strokeWidth="2" opacity="0.6" />
                
                <g transform="translate(160, 210)">
                  <rect x="0" y="0" width="80" height="80" rx="15" fill="rgba(8,5,18,0.85)" stroke="#00f0ff" strokeWidth="2" />
                  <text x="40" y="52" fontFamily="sans-serif" fontSize="34" textAnchor="middle">🎮</text>
                  <line x1="10" y1="22" x2="70" y2="22" stroke="#ff007a" strokeWidth="2" opacity="0.8" />
                  <line x1="5" y1="58" x2="65" y2="58" stroke="#00f0ff" strokeWidth="2" opacity="0.8" />
                </g>
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* Jenis Bisnis & CORE Values Section */}
      <section id="features" className="py-20 md:py-28 border-t border-slate-950 bg-slate-950/40 relative">
        <div className="container mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge variant="outline" className="border-violet-500/30 text-violet-400 bg-violet-950/20 px-3 py-1 font-mono uppercase tracking-wide">
              Jenis Bisnis & Value
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Model Bisnis Jasa & Nilai Utama Kami
            </h2>
            <p className="text-slate-400">
              SatuGama bergerak di bidang jasa pembuatan desain model 2D dan 3D menggunakan software Blender untuk melayani berbagai kebutuhan digital seperti game asset, visualisasi produk, dan karakter berkualitas tinggi.
            </p>
          </div>

          {/* C-O-R-E Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
            
            {/* C - Creative */}
            <Card className="bg-slate-900/50 border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 group rounded-2xl relative overflow-hidden flex flex-col justify-between">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-cyan-950/50 border border-cyan-800 flex items-center justify-center text-cyan-400 font-extrabold text-lg font-mono">
                  C
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">Creative</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Menghasilkan desain model dan karakter yang kreatif, unik, serta memiliki nilai seni visual berkualitas tinggi yang menonjol.
                </p>
              </CardContent>
            </Card>

            {/* O - Optimized */}
            <Card className="bg-slate-900/50 border-slate-800/80 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-1 group rounded-2xl relative overflow-hidden flex flex-col justify-between">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-violet-950/50 border border-violet-800 flex items-center justify-center text-violet-400 font-extrabold text-lg font-mono">
                  O
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors">Optimized</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Membantu developer mengelola biaya produksi game secara lebih efisien dengan performa mesh 2D/3D yang teroptimasi dengan baik.
                </p>
              </CardContent>
            </Card>

            {/* R - Rapid */}
            <Card className="bg-slate-900/50 border-slate-800/80 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1 group rounded-2xl relative overflow-hidden flex flex-col justify-between">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-pink-950/50 border border-pink-800 flex items-center justify-center text-pink-400 font-extrabold text-lg font-mono">
                  R
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors">Rapid</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Mempercepat proses pengembangan game klien melalui penyediaan aset visual siap pakai (ready-to-use) dan alur kerja yang tangkas.
                </p>
              </CardContent>
            </Card>

            {/* E - Expert */}
            <Card className="bg-slate-900/50 border-slate-800/80 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 group rounded-2xl relative overflow-hidden flex flex-col justify-between">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-950/50 border border-emerald-800 flex items-center justify-center text-emerald-400 font-extrabold text-lg font-mono">
                  E
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Expert</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Memberikan pelayanan profesional yang responsif, terpercaya, dan sepenuhnya selaras dengan kebutuhan konsep visual klien.
                </p>
              </CardContent>
            </Card>

          </div>

        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="py-20 md:py-28 border-t border-slate-950 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Title & Visi */}
            <div className="lg:col-span-5 space-y-6">
              <Badge variant="outline" className="border-pink-500/30 text-pink-400 bg-pink-950/20 px-3 py-1 font-mono uppercase tracking-wide">
                Visi & Misi
              </Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Komitmen Kami untuk Masa Depan Game Asset
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Kami berkomitmen memberikan fondasi grafis terbaik agar game indie di Indonesia maupun global memiliki daya saing visual yang tinggi.
              </p>
              
              {/* Visi Card */}
              <div className="p-6 bg-gradient-to-br from-violet-950/30 to-slate-950 border border-violet-900/40 rounded-2xl shadow-xl flex gap-4 items-start relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[80px] h-[80px] bg-violet-500/10 rounded-full blur-xl" />
                <Target className="h-6 w-6 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-2 text-base font-mono uppercase tracking-wider">VISI</h4>
                  <p className="text-slate-300 text-sm leading-relaxed font-semibold">
                    "Menjadi penyedia jasa desain 2D dan 3D kreatif yang terpercaya."
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col: Misi Grids */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Misi 1 */}
              <div className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl hover:border-cyan-500/30 transition-all flex gap-3.5">
                <div className="h-8 w-8 rounded-lg bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center font-mono font-bold text-cyan-400 text-sm shrink-0">
                  01
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm mb-1.5">Kreatif & Berkualitas</h5>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Menyediakan layanan desain 2D dan 3D yang kreatif serta berkualitas unggul untuk game.
                  </p>
                </div>
              </div>

              {/* Misi 2 */}
              <div className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl hover:border-violet-500/30 transition-all flex gap-3.5">
                <div className="h-8 w-8 rounded-lg bg-violet-950/60 border border-violet-800/60 flex items-center justify-center font-mono font-bold text-violet-400 text-sm shrink-0">
                  02
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm mb-1.5">Pelayanan Profesional</h5>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Memberikan pelayanan profesional dan responsif terhadap ekspektasi serta konsep dari klien.
                  </p>
                </div>
              </div>

              {/* Misi 3 */}
              <div className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl hover:border-pink-500/30 transition-all flex gap-3.5">
                <div className="h-8 w-8 rounded-lg bg-pink-950/60 border border-pink-800/60 flex items-center justify-center font-mono font-bold text-pink-400 text-sm shrink-0">
                  03
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm mb-1.5">Kreativitas Tim</h5>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Meningkatkan kemampuan keahlian teknis dan kreativitas seni dari setiap anggota tim.
                  </p>
                </div>
              </div>

              {/* Misi 4 */}
              <div className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl hover:border-emerald-500/30 transition-all flex gap-3.5">
                <div className="h-8 w-8 rounded-lg bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center font-mono font-bold text-emerald-400 text-sm shrink-0">
                  04
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm mb-1.5">Identitas Digital</h5>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Membangun branding dan identitas digital SatuGama secara konsisten dan kreatif di industri.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Interactive Customizer Section */}
      <section id="customizer" className="py-20 md:py-28 border-t border-slate-950 bg-slate-950/40 relative">
        <div className="container mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-950/20 px-3 py-1 font-mono uppercase tracking-wide">
              Demo Editor Interaktif
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Kustomisasi Karakter Anda
            </h2>
            <p className="text-slate-400">
              Eksperimen langsung dengan salah satu ide startup kami. Kustomisasi sprite karakter RPG retro, ubah perlengkapan, dan download format SVG secara instan.
            </p>
          </div>

          {/* Customizer component inject */}
          <CharacterCustomizer />

        </div>
      </section>

      {/* Portfolio Showcase Catalog */}
      <section id="projects" className="py-20 md:py-28 border-t border-slate-950 relative">
        <div className="container mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <Badge variant="outline" className="border-violet-500/30 text-violet-400 bg-violet-950/20 px-3 py-1 font-mono uppercase tracking-wide">
              Katalog Aset Pack
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Portofolio & Showcase Karya
            </h2>
            <p className="text-slate-400">
              Koleksi paket aset yang telah kami buat, termasuk aset khusus dari game andalan kami, Last Signal.
            </p>
          </div>

          {/* Catalog Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <Button
              size="sm"
              variant={activeFilter === "all" ? "default" : "outline"}
              onClick={() => setActiveFilter("all")}
              className={`rounded-xl ${activeFilter === "all" ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold" : "border-slate-800 text-slate-400 hover:text-white"}`}
            >
              Semua Aset
            </Button>
            <Button
              size="sm"
              variant={activeFilter === "2d" ? "default" : "outline"}
              onClick={() => setActiveFilter("2d")}
              className={`rounded-xl ${activeFilter === "2d" ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold" : "border-slate-800 text-slate-400 hover:text-white"}`}
            >
              2D & Pixel Art
            </Button>
            <Button
              size="sm"
              variant={activeFilter === "3d" ? "default" : "outline"}
              onClick={() => setActiveFilter("3d")}
              className={`rounded-xl ${activeFilter === "3d" ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold" : "border-slate-800 text-slate-400 hover:text-white"}`}
            >
              3D Model
            </Button>
            <Button
              size="sm"
              variant={activeFilter === "ui" ? "default" : "outline"}
              onClick={() => setActiveFilter("ui")}
              className={`rounded-xl ${activeFilter === "ui" ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold" : "border-slate-800 text-slate-400 hover:text-white"}`}
            >
              UI Kit & Audio
            </Button>
          </div>

          {/* Catalog Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPortfolio.map((item) => (
              <Card key={item.id} className="bg-slate-950 border-slate-900 rounded-2xl overflow-hidden group hover:border-slate-800 transition-all duration-300">
                <div className="aspect-[3/2] w-full relative bg-slate-900 flex items-center justify-center overflow-hidden border-b border-slate-900">
                  <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                    {item.svg}
                  </div>
                  <Badge className="absolute top-4 left-4 bg-cyan-500 text-slate-950 hover:bg-cyan-500 font-semibold border-none">
                    {item.badge}
                  </Badge>
                </div>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed min-h-[72px]">{item.desc}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-white font-extrabold text-lg">{item.price}</span>
                    <a href="#contact" className="inline-flex items-center justify-center h-7 gap-1.5 px-3.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-cyan-400 font-medium rounded-lg text-xs transition-all active:translate-y-px cursor-pointer">
                      Pesan Sekarang
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Team Section (Kelompok 1) */}
      <section id="team" className="py-20 md:py-28 border-t border-slate-950 bg-slate-950/40 relative">
        <div className="container mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <Badge variant="outline" className="border-pink-500/30 text-pink-400 bg-pink-950/20 px-3 py-1 font-mono uppercase tracking-wide">
              Kreator Kelompok 1
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Anggota Tim SatuGama
            </h2>
            <p className="text-slate-400">
              Mahasiswa semester 4 Program Studi D3 Teknik Informatika Jurusan Teknik Elektro Politeknik Negeri Semarang kelas Kelompok 1.
            </p>
          </div>

          {/* Team Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
            {TEAM_MEMBERS.map((member) => (
              <Card key={member.name} className="bg-slate-950 border-slate-900 rounded-2xl hover:border-slate-800 transition-all duration-300 overflow-hidden flex flex-col justify-between relative group">
                {/* Visual Glow background on card */}
                <div className={`absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 ${member.color}`} />
                
                <CardContent className="p-6 space-y-5 z-10 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Header profile */}
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-slate-950 font-black text-lg">
                        {member.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base leading-none group-hover:text-cyan-300 transition-colors">{member.name}</h3>
                        <span className="text-slate-500 text-xs font-mono">NIM: {member.nim}</span>
                      </div>
                    </div>

                    <Badge variant="outline" className="border-slate-800 bg-slate-900/50 text-cyan-400 text-xs font-medium py-0.5 rounded-md">
                      {member.role}
                    </Badge>

                    <p className="text-slate-400 text-xs leading-relaxed">
                      {member.desc}
                    </p>
                  </div>

                  {/* Character Stats RPG Theme */}
                  <div className="pt-4 border-t border-slate-900 space-y-3.5">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">Gaming Skills:</span>
                    {member.stats.map((st) => (
                      <div key={st.label} className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-medium text-slate-300">
                          <span>{st.label}</span>
                          <span className="font-mono text-cyan-400">{st.val}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/40">
                          <div 
                            className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full" 
                            style={{ width: st.val }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Pricing / Business Model Section */}
      <section id="pricing" className="py-20 md:py-28 border-t border-slate-950 relative">
        <div className="container mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-950/20 px-3 py-1 font-mono uppercase tracking-wide">
              Skema Model Bisnis
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Pilihan Model Lisensi Aset
            </h2>
            <p className="text-slate-400">
              Pilih paket lisensi yang paling cocok dengan kebutuhan skala produksi pengembangan game Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Indie Pack */}
            <Card className="bg-slate-950 border-slate-900 rounded-2xl flex flex-col justify-between p-8 hover:border-slate-800 transition-all">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Indie Pack</h3>
                  <p className="text-slate-400 text-xs mt-1">Cocok untuk solo game developer pemula.</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-slate-400 text-sm font-semibold">Rp</span>
                  <span className="text-white text-4xl font-black">149k</span>
                  <span className="text-slate-500 text-xs ml-1">/ paket</span>
                </div>
                <ul className="space-y-3.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-400" /> Akses penuh ke 1 paket aset terpilih
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-400" /> Format file lengkap (PNG/SVG/OBJ)
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-400" /> Lisensi komersial (1 Proyek Game)
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-400" /> Free update gratis selamanya
                  </li>
                </ul>
              </div>
              <a href="#contact" className="inline-flex items-center justify-center h-9 gap-1.5 px-4 border border-slate-800 bg-slate-900 text-slate-300 hover:text-white rounded-xl w-full mt-8 text-sm transition-all active:translate-y-px cursor-pointer">
                Pilih Paket
              </a>
            </Card>

            {/* Pro Subscription */}
            <Card className="bg-slate-950 border-cyan-500/30 rounded-2xl flex flex-col justify-between p-8 hover:border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.05)] relative overflow-hidden transition-all scale-105">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-500 to-violet-600 text-slate-950 font-bold font-mono text-[9px] px-3.5 py-1 rounded-bl-lg uppercase tracking-wider">
                Populer
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-1.5">Pro Subscription <Zap className="h-4 w-4 fill-cyan-400 text-cyan-400" /></h3>
                  <p className="text-slate-400 text-xs mt-1">Akses tak terbatas untuk tim studio game.</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-slate-400 text-sm font-semibold">Rp</span>
                  <span className="text-white text-4xl font-black">299k</span>
                  <span className="text-slate-500 text-xs ml-1">/ bulan</span>
                </div>
                <ul className="space-y-3.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-400" /> Akses ke seluruh pustaka aset SatuGama
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-400" /> Kustomisasi tak terbatas di web editor
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-400" /> Lisensi komersial tanpa batas game
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-400" /> Akses prioritas aset baru setiap minggu
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-400" /> Dukungan teknis Discord 24/7
                  </li>
                </ul>
              </div>
              <a href="#contact" className="inline-flex items-center justify-center h-9 gap-1.5 px-4 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-slate-950 font-semibold rounded-xl w-full mt-8 text-sm transition-all active:translate-y-px cursor-pointer">
                Berlangganan
              </a>
            </Card>

            {/* Custom Commission */}
            <Card className="bg-slate-950 border-slate-900 rounded-2xl flex flex-col justify-between p-8 hover:border-slate-800 transition-all">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Custom Commission</h3>
                  <p className="text-slate-400 text-xs mt-1">Aset eksklusif yang dibuat khusus sesuai konsep Anda.</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-slate-400 text-sm font-semibold">Mulai</span>
                  <span className="text-white text-4xl font-black">500k</span>
                  <span className="text-slate-500 text-xs ml-1">/ request</span>
                </div>
                <ul className="space-y-3.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-400" /> 100% aset eksklusif (tidak dijual kembali)
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-400" /> Pengerjaan menggunakan software Blender
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-400" /> Hingga 3x revisi pengerjaan
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-400" /> Hak cipta penuh milik Anda
                  </li>
                </ul>
              </div>
              <a href="#contact" className="inline-flex items-center justify-center h-9 gap-1.5 px-4 border border-slate-800 bg-slate-900 text-slate-300 hover:text-white rounded-xl w-full mt-8 text-sm transition-all active:translate-y-px cursor-pointer">
                Hubungi Kami
              </a>
            </Card>

          </div>

        </div>
      </section>

      {/* Contact & Form Section */}
      <section id="contact" className="py-20 md:py-28 border-t border-slate-950 bg-slate-950/40 relative">
        <div className="container mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-950/20 px-3 py-1 font-mono uppercase tracking-wide">
              Hubungi Kami
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Mulai Proyek Game Anda
            </h2>
            <p className="text-slate-400">
              Punya pertanyaan mengenai lisensi, request aset kustom Blender, atau kerja sama? Isi formulir di bawah ini dan kami akan membalas secepatnya.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
            
            {/* Info Cards Col */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: Email */}
              <div className="p-6 bg-slate-950 border border-slate-900 rounded-2xl flex gap-4 hover:border-slate-800 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-cyan-950/50 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Kirim Email</h4>
                  <a href="mailto:satugama.studio@gmail.com" className="text-slate-400 text-xs hover:text-cyan-400 block transition-colors">
                    satugama.studio@gmail.com
                  </a>
                  <a href="mailto:halimahadi@student.polines.ac.id" className="text-slate-500 text-xs hover:text-cyan-400 block transition-colors">
                    halimahadi@student.polines.ac.id
                  </a>
                </div>
              </div>

              {/* Card 2: Address */}
              <div className="p-6 bg-slate-950 border border-slate-900 rounded-2xl flex gap-4 hover:border-slate-800 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-violet-950/50 border border-violet-800 flex items-center justify-center text-violet-400 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Lokasi Studio</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Jurusan Teknik Elektro, Gedung D3 Teknik Informatika
                  </p>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Politeknik Negeri Semarang, Jl. Prof. Sudarto, Tembalang, Semarang
                  </p>
                </div>
              </div>

              {/* Card 3: Github */}
              <div className="p-6 bg-slate-950 border border-slate-900 rounded-2xl flex gap-4 hover:border-slate-800 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-emerald-950/50 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0">
                  <Monitor className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Referensi Project</h4>
                  <a 
                    href="https://github.com/HalimaHadiAl/laggy-but-lucky.git" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-400 text-xs hover:text-emerald-400 block transition-colors"
                  >
                    github.com/HalimaHadiAl/laggy-but-lucky
                  </a>
                </div>
              </div>

            </div>

            {/* Form Col */}
            <div className="lg:col-span-7 p-8 bg-slate-950 border border-slate-900 rounded-3xl relative overflow-hidden shadow-xl">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Nama Lengkap</label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Masukkan nama Anda"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-100 rounded-xl px-4 py-2.5 h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Email</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-100 rounded-xl px-4 py-2.5 h-11"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <div className="space-y-2">
                    <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Gaya Desain Aset</label>
                    <Select value={style} onValueChange={(val) => setStyle(val || "2d-pixel")}>
                      <SelectTrigger className="bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-100 rounded-xl h-11 px-4">
                        <SelectValue placeholder="Pilih gaya aset" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-800 text-slate-300">
                        <SelectItem value="2d-pixel">2D Pixel Art</SelectItem>
                        <SelectItem value="2d-vector">2D Vector Art</SelectItem>
                        <SelectItem value="3d-lowpoly">3D Low-Poly Models</SelectItem>
                        <SelectItem value="3d-stylized">3D Stylized Models</SelectItem>
                        <SelectItem value="ui-sound">UI Design & Audio SFX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Perkiraan Budget</label>
                    <Select value={budget} onValueChange={(val) => setBudget(val || "under-500k")}>
                      <SelectTrigger className="bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-100 rounded-xl h-11 px-4">
                        <SelectValue placeholder="Pilih budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-800 text-slate-300">
                        <SelectItem value="under-500k">&lt; Rp 500.000</SelectItem>
                        <SelectItem value="500k-2m">Rp 500.000 - Rp 2.000.000</SelectItem>
                        <SelectItem value="2m-5m">Rp 2.000.000 - Rp 5.000.000</SelectItem>
                        <SelectItem value="above-5m">&gt; Rp 5.000.000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Deskripsi Kebutuhan Game Aset</label>
                  <Textarea
                    id="message"
                    required
                    placeholder="Jelaskan secara detail jenis aset, jumlah, tema visual, dan tenggat waktu proyek game Anda..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-100 rounded-xl px-4 py-3 min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitStatus.type === "loading"}
                  className="bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-slate-950 font-bold rounded-xl w-full h-11 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitStatus.type === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Kirim Request Penawaran
                    </>
                  )}
                </Button>

                {submitStatus.type && (
                  <div 
                    className={`p-4 rounded-xl text-sm leading-relaxed border animate-in fade-in duration-200 ${
                      submitStatus.type === "success" 
                        ? "bg-emerald-950/20 border-emerald-800/40 text-emerald-400" 
                        : submitStatus.type === "error"
                        ? "bg-rose-950/20 border-rose-800/40 text-rose-400"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    {submitStatus.text}
                  </div>
                )}

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-950 bg-slate-950/80 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-white">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-slate-950 font-black">S</span>
            SATU<span className="text-cyan-400">GAMA</span>
          </div>
          
          <div className="text-slate-500 text-xs text-center">
            &copy; 2026 SatuGama Studio. Kelompok 1 Technopreneurship Polines. All rights reserved.
          </div>
          
          <div className="flex gap-4">
            <a href="#home" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Home</a>
            <a href="#features" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Fitur</a>
            <a href="#customizer" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Customizer</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
