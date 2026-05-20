"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Download, Shuffle, Sword, Shield, User, Settings, Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Option lists
const CLASSES = [
  { id: "warrior", name: "Warrior" },
  { id: "mage", name: "Mage" },
  { id: "ranger", name: "Ranger" },
  { id: "cyber", name: "Cyber" }
];

const WEAPONS = [
  { id: "sword", name: "Pedang" },
  { id: "staff", name: "Tongkat" },
  { id: "bow", name: "Busur" },
  { id: "none", name: "Tangan Kosong" }
];

const ACCESSORIES = [
  { id: "shield", name: "Perisai" },
  { id: "cape", name: "Jubah" },
  { id: "both", name: "Keduanya" },
  { id: "none", name: "Polos" }
];

const ARMORS = [
  { id: "iron", name: "Besi" },
  { id: "gold", name: "Emas" },
  { id: "cloth", name: "Kain" },
  { id: "obsidian", name: "Obsidian" }
];

const COLORS = [
  { name: "Gold", hex: "#ffd700" },
  { name: "Pink", hex: "#ff007a" },
  { name: "Cyan", hex: "#00f0ff" },
  { name: "Violet", hex: "#bd00ff" },
  { name: "Green", hex: "#4caf50" }
];

// Styles mappings
const hairStyles: Record<string, string> = {
  warrior: "M39,26 L42,16 L45,26 L48,15 L52,26 L55,16 L58,26 L61,20 L58,28 H40 Z", // spiky warrior hair
  mage: "M34,26 L50,4 L66,26 L58,28 Q50,29 42,28 Z", // wizard hat shape
  ranger: "M38,26 C36,12 64,12 62,26 L64,40 L60,40 L58,30 H42 L40,40 L36,40 Z", // hood/long ranger hair
  cyber: "M36,25 H64 V33 H36 Z" // cyber helmet/visor
};

const skins: Record<string, string> = {
  warrior: "#ffdbac", // Tan human
  mage: "#ffd1a9", // Light human
  ranger: "#e0ac69", // Olive human
  cyber: "#4ef2d2" // Neon cyan Android skin
};

const armorStyles: Record<string, { chest: string; shoulders: string }> = {
  iron: { chest: "#708090", shoulders: "#506070" },
  gold: { chest: "#ffd700", shoulders: "#c5a000" },
  cloth: { chest: "#4a3f75", shoulders: "#322956" },
  obsidian: { chest: "#1e1435", shoulders: "#110a21" }
};

// Adjust brightness helper
function adjustColorBrightness(hex: string, percent: number): string {
  let R = parseInt(hex.substring(1, 3), 16);
  let G = parseInt(hex.substring(3, 5), 16);
  let B = parseInt(hex.substring(5, 7), 16);

  R = Math.round((R * (100 + percent)) / 100);
  G = Math.round((G * (100 + percent)) / 100);
  B = Math.round((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  R = R > 0 ? R : 0;
  G = G > 0 ? G : 0;
  B = B > 0 ? B : 0;

  const rHex = R.toString(16).padStart(2, "0");
  const gHex = G.toString(16).padStart(2, "0");
  const bHex = B.toString(16).padStart(2, "0");

  return `#${rHex}${gHex}${bHex}`;
}

export function CharacterCustomizer() {
  const [charClass, setCharClass] = useState("warrior");
  const [weapon, setWeapon] = useState("sword");
  const [accessory, setAccessory] = useState("shield");
  const [armor, setArmor] = useState("iron");
  const [primaryColor, setPrimaryColor] = useState("#ffd700");

  const svgRef = useRef<SVGSVGElement>(null);

  // Derive colors
  const skinColor = skins[charClass] || "#ffdbac";
  const hairPath = hairStyles[charClass] || hairStyles.warrior;
  
  let chestColor = armorStyles[armor]?.chest || "#708090";
  let shoulderColor = armorStyles[armor]?.shoulders || "#506070";
  if (armor === "cloth") {
    chestColor = primaryColor;
    shoulderColor = adjustColorBrightness(primaryColor, -20);
  }

  // Cyber styling overrides
  const hairFill = charClass === "cyber" ? "#00f0ff" : primaryColor;
  const hairStroke = charClass === "cyber" ? "#ff007a" : "none";
  const hairStrokeWidth = charClass === "cyber" ? "1" : "0";

  // Randomize configuration
  const handleRandomize = () => {
    const randomClass = CLASSES[Math.floor(Math.random() * CLASSES.length)].id;
    const randomWeapon = WEAPONS[Math.floor(Math.random() * WEAPONS.length)].id;
    const randomAccessory = ACCESSORIES[Math.floor(Math.random() * ACCESSORIES.length)].id;
    const randomArmor = ARMORS[Math.floor(Math.random() * ARMORS.length)].id;
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)].hex;

    setCharClass(randomClass);
    setWeapon(randomWeapon);
    setAccessory(randomAccessory);
    setArmor(randomArmor);
    setPrimaryColor(randomColor);
  };

  // Download SVG
  const handleDownloadSvg = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = `satugama_${charClass}_${weapon}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Visual Preview (40%) */}
      <div className="lg:col-span-5 flex flex-col justify-between items-center bg-slate-950/70 border border-slate-800 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md shadow-2xl">
        {/* Glow effect */}
        <div className="absolute w-[200px] h-[200px] -top-10 -left-10 rounded-full bg-violet-600/10 blur-[80px]" />
        <div className="absolute w-[200px] h-[200px] -bottom-10 -right-10 rounded-full bg-cyan-600/10 blur-[80px]" />
        
        <div className="w-full flex justify-between items-center mb-4 z-10">
          <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-950/30 gap-1.5 px-3 py-1 font-mono uppercase tracking-wide">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Live Preview
          </Badge>
          <div className="text-slate-400 text-xs font-mono">
            Scale: 100x100 SVG
          </div>
        </div>

        {/* Character Preview Box */}
        <div className="w-full aspect-square max-w-[280px] bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-center relative shadow-inner mb-6 z-10 group">
          {/* Futuristic grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:20px_20px] opacity-10 rounded-2xl" />
          
          <svg
            ref={svgRef}
            className="w-full h-full max-h-[250px] drop-shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all duration-300 group-hover:scale-105"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* BACKGROUND SHADOW */}
            <ellipse cx="50" cy="85" rx="20" ry="5" fill="#030206" opacity="0.4" />
            
            {/* CAPE BACKGROUND */}
            {(accessory === "cape" || accessory === "both") && (
              <g id="layer-cape">
                <path d="M36,44 L25,78 L45,82 L50,65 L55,82 L75,78 L64,44 Z" fill={primaryColor} opacity="0.85" />
                <path d="M38,44 L30,76 L45,80 L50,65 L55,80 L70,76 L62,44 Z" fill={adjustColorBrightness(primaryColor, -25)} opacity="0.9" />
              </g>
            )}

            {/* BODY BASE LAYER */}
            <g id="layer-body">
              {/* Head / Skin */}
              <rect x="42" y="25" width="16" height="16" rx="4" fill={skinColor} />
              
              {/* Eyes */}
              <rect x="46" y="31" width="2" height="3" fill="#333" />
              <rect x="52" y="31" width="2" height="3" fill="#333" />
              
              {/* Mouth */}
              <rect x="49" y="37" width="2" height="1" fill="#ffabab" />
              
              {/* Body Torso base */}
              <rect x="40" y="41" width="20" height="24" rx="4" fill="#333" />
              
              {/* Legs & Feet */}
              <rect x="43" y="65" width="4" height="15" fill="#222" />
              <rect x="53" y="65" width="4" height="15" fill="#222" />
              <rect x="41" y="78" width="6" height="4" rx="1" fill="#111" />
              <rect x="53" y="78" width="6" height="4" rx="1" fill="#111" />
            </g>
            
            {/* CLOTHES / ARMOR LAYER */}
            <g id="layer-armor">
              {/* Armor Torso Plate */}
              <path d="M40,41 h20 v20 r2 h-20 z" fill={chestColor} />
              <path d="M43,45 h14 v12 h-14 z" fill="#8a9a9a" opacity="0.5" />
              
              {/* Shoulder pads */}
              <rect x="36" y="41" width="5" height="5" rx="1" fill={shoulderColor} />
              <rect x="59" y="41" width="5" height="5" rx="1" fill={shoulderColor} />
            </g>
            
            {/* HAIR / HELMET LAYER */}
            <g id="layer-hair">
              <path
                d={hairPath}
                fill={hairFill}
                stroke={hairStroke}
                strokeWidth={hairStrokeWidth}
              />
            </g>
            
            {/* WEAPON LAYER */}
            <g id="layer-weapon">
              {/* Sword */}
              {weapon === "sword" && (
                <g id="weapon-sword" transform="translate(63, 30)">
                  <rect x="0" y="0" width="4" height="25" rx="1" fill="#e5e5e5" stroke="#ccc" strokeWidth="0.5" />
                  <rect x="1" y="2" width="2" height="20" fill={primaryColor} opacity="0.75" />
                  <rect x="-3" y="25" width="10" height="3" rx="1" fill="#ffd700" />
                  <rect x="1" y="28" width="2" height="6" fill="#8b4513" />
                  <circle cx="2" cy="35" r="1.5" fill="#ffd700" />
                </g>
              )}
              
              {/* Bow */}
              {weapon === "bow" && (
                <g id="weapon-bow" transform="translate(62, 38)">
                  <line x1="0" y1="-15" x2="0" y2="25" stroke="#eee" strokeWidth="0.5" strokeDasharray="2 1" />
                  <path d="M0,-15 C15,-5 15,15 0,25" fill="none" stroke="#8b4513" strokeWidth="2.5" strokeLinecap="round" />
                  <rect x="4" y="2" width="3" height="6" rx="1" fill={primaryColor} />
                </g>
              )}
              
              {/* Wizard Staff */}
              {weapon === "staff" && (
                <g id="weapon-staff" transform="translate(63, 26)">
                  <rect x="1" y="10" width="2.5" height="42" rx="1" fill="#5c4033" />
                  <path d="M-1,5 h6.5 v6 h-6.5 z" fill="#ffd700" />
                  <polygon points="2, -4 -2, 4 2, 8 6, 4" fill={primaryColor} stroke={adjustColorBrightness(primaryColor, -20)} strokeWidth="0.5" />
                  <circle cx="-3" cy="-1" r="1" fill="#00f0ff" />
                  <circle cx="7" cy="6" r="1" fill="#00f0ff" />
                </g>
              )}
            </g>
            
            {/* ACCESSORY LAYER (Shield on Left Hand) */}
            {(accessory === "shield" || accessory === "both") && (
              <g id="layer-accessory" transform="translate(25, 48)">
                <path d="M0,0 H12 V8 C12,15 6,19 6,19 C6,19 0,15 0,8 Z" fill="#b0c4de" stroke="#708090" strokeWidth="1" />
                <path d="M2,2 H10 V7 C10,12 6,15 6,15 C6,15 2,12 2,7 Z" fill={primaryColor} opacity={0.8} />
                <polygon points="6,4 4,8 8,8" fill="#ffd700" />
              </g>
            )}
          </svg>
        </div>

        {/* Quick Actions */}
        <div className="w-full grid grid-cols-2 gap-3 z-10">
          <Button
            variant="outline"
            className="border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white"
            onClick={handleRandomize}
          >
            <Shuffle className="mr-2 h-4 w-4" /> Acak
          </Button>
          <Button
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold"
            onClick={handleDownloadSvg}
          >
            <Download className="mr-2 h-4 w-4" /> Unduh SVG
          </Button>
        </div>
      </div>

      {/* Editor Controls (70%) */}
      <div className="lg:col-span-7 flex flex-col justify-start bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md">
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid grid-cols-3 bg-slate-950/80 border border-slate-800/80 rounded-xl p-1 mb-6">
            <TabsTrigger value="appearance" className="data-[state=active]:bg-slate-800 rounded-lg text-sm gap-1.5 py-2">
              <User className="h-4 w-4" /> Tampilan
            </TabsTrigger>
            <TabsTrigger value="equipment" className="data-[state=active]:bg-slate-800 rounded-lg text-sm gap-1.5 py-2">
              <Sword className="h-4 w-4" /> Senjata
            </TabsTrigger>
            <TabsTrigger value="color" className="data-[state=active]:bg-slate-800 rounded-lg text-sm gap-1.5 py-2">
              <Palette className="h-4 w-4" /> Warna
            </TabsTrigger>
          </TabsList>

          {/* Appearance Tab Content */}
          <TabsContent value="appearance" className="space-y-6 focus-visible:outline-none">
            <div className="space-y-4">
              <div>
                <label className="text-slate-300 font-medium text-sm flex items-center gap-1.5 mb-3">
                  <Settings className="h-4 w-4 text-cyan-400" /> Gaya Karakter
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {CLASSES.map((cls) => (
                    <button
                      key={cls.id}
                      onClick={() => setCharClass(cls.id)}
                      className={`py-3 px-4 rounded-xl border text-center font-medium transition-all text-sm ${
                        charClass === cls.id
                          ? "border-cyan-500 bg-cyan-950/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                          : "border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      {cls.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium text-sm flex items-center gap-1.5 mb-3">
                  <Shield className="h-4 w-4 text-purple-400" /> Bahan Armor
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {ARMORS.map((arm) => (
                    <button
                      key={arm.id}
                      onClick={() => setArmor(arm.id)}
                      className={`py-3 px-4 rounded-xl border text-center font-medium transition-all text-sm ${
                        armor === arm.id
                          ? "border-purple-500 bg-purple-950/30 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                          : "border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      {arm.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Equipment Tab Content */}
          <TabsContent value="equipment" className="space-y-6 focus-visible:outline-none">
            <div className="space-y-4">
              <div>
                <label className="text-slate-300 font-medium text-sm flex items-center gap-1.5 mb-3">
                  <Sword className="h-4 w-4 text-rose-400" /> Senjata Utama
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {WEAPONS.map((weap) => (
                    <button
                      key={weap.id}
                      onClick={() => setWeapon(weap.id)}
                      className={`py-3 px-4 rounded-xl border text-center font-medium transition-all text-sm ${
                        weapon === weap.id
                          ? "border-rose-500 bg-rose-950/30 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                          : "border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      {weap.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium text-sm flex items-center gap-1.5 mb-3">
                  <Shield className="h-4 w-4 text-emerald-400" /> Perisai & Aksesoris
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {ACCESSORIES.map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => setAccessory(acc.id)}
                      className={`py-3 px-4 rounded-xl border text-center font-medium transition-all text-sm ${
                        accessory === acc.id
                          ? "border-emerald-500 bg-emerald-950/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                          : "border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      {acc.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Color Tab Content */}
          <TabsContent value="color" className="space-y-6 focus-visible:outline-none">
            <div>
              <label className="text-slate-300 font-medium text-sm flex items-center gap-1.5 mb-4">
                <Palette className="h-4 w-4 text-amber-400" /> Warna Utama Aset
              </label>
              
              <div className="flex flex-wrap gap-4 items-center bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl">
                {COLORS.map((col) => (
                  <button
                    key={col.hex}
                    onClick={() => setPrimaryColor(col.hex)}
                    style={{ backgroundColor: col.hex }}
                    className={`h-11 w-11 rounded-full flex items-center justify-center transition-all focus:outline-none relative group ${
                      primaryColor === col.hex
                        ? "scale-110 ring-4 ring-slate-700 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        : "hover:scale-105"
                    }`}
                    title={col.name}
                  >
                    {primaryColor === col.hex && (
                      <span className="block h-3.5 w-3.5 rounded-full bg-slate-950/80 animate-ping absolute" />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-5 p-4 rounded-xl bg-slate-900/50 border border-slate-800/40 text-slate-400 text-xs leading-relaxed">
                Warna utama akan merubah warna visual rambut/helm, kilau mata pedang, warna tali busur, kristal tongkat sihir, jubah, dan logo perisai. Untuk baju zirah berbahan <span className="text-purple-400 font-medium">Kain</span>, warna utama juga akan mewarnai kain tersebut.
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
