import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Upload, 
  Box, 
  Settings, 
  Play, 
  Download, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronLeft,
  Cpu,
  Smartphone,
  Layers,
  CheckCircle2,
  Loader2,
  Undo,
  Redo,
  Lock,
  Mail,
  LogIn,
  Chrome,
  Wand2,
  Mic,
  Sparkles,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './lib/utils';
import { ModelViewer } from './components/ModelViewer';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// --- Types ---
interface Project {
  id: string;
  name: string;
  model_url: string;
  config: any;
  status: 'draft' | 'building' | 'completed';
}

// --- Components ---

const BackgroundAnimations = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 90, 0],
        x: [0, 100, 0],
        y: [0, 50, 0]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full"
    />
    <motion.div 
      animate={{ 
        scale: [1, 1.3, 1],
        rotate: [0, -90, 0],
        x: [0, -100, 0],
        y: [0, -50, 0]
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full"
    />
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
  </div>
);

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
      <BackgroundAnimations />
      
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md glass p-10 rounded-[2.5rem] border-white/10 relative z-10 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(var(--secondary-rgb),0.3)]"
          >
            <Cpu className="text-black w-10 h-10" />
          </motion.div>
          <h1 className="text-4xl font-display font-bold tracking-tight">AR Studio</h1>
          <p className="text-white/40 text-sm mt-2 font-medium">The future of augmented reality</p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Email Address</label>
            <div className="group relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-secondary transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:border-secondary/50 focus:bg-white/[0.05] outline-none transition-all placeholder:text-white/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Password</label>
              <button className="text-[10px] font-bold text-secondary/60 hover:text-secondary uppercase tracking-wider transition-colors">Forgot Password?</button>
            </div>
            <div className="group relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-secondary transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:border-secondary/50 focus:bg-white/[0.05] outline-none transition-all placeholder:text-white/10"
              />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onLogin}
            className="w-full bg-secondary text-black py-4 rounded-2xl font-bold text-lg shadow-[0_10px_20px_rgba(var(--secondary-rgb),0.2)] hover:shadow-[0_15px_30px_rgba(var(--secondary-rgb),0.3)] transition-all flex items-center justify-center gap-2 mt-4"
          >
            <LogIn size={20} /> Sign In
          </motion.button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.2em]"><span className="bg-black/50 backdrop-blur-xl px-4 text-white/20">Secure Login</span></div>
          </div>

          <motion.button 
            whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            onClick={onLogin}
            className="w-full bg-white/[0.03] border border-white/10 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3"
          >
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <Chrome size={14} className="text-black" />
            </div>
            Continue with Google
          </motion.button>
        </div>

        <p className="text-center mt-10 text-xs text-white/30 font-medium">
          New to the platform? <button className="text-secondary font-bold hover:text-white transition-colors">Create an account</button>
        </p>
      </motion.div>
    </div>
  );
};

const Sidebar = ({ activeTab, setActiveTab, onSignOut }: { activeTab: string, setActiveTab: (t: string) => void, onSignOut: () => void }) => (
  <div className="w-64 h-screen border-r border-white/10 flex flex-col p-4 gap-2">
    <div className="flex items-center gap-2 px-4 py-6 mb-4">
      <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
        <Cpu className="text-black w-5 h-5" />
      </div>
      <span className="font-display font-bold text-xl text-white">AR Studio</span>
    </div>
    
    <div className="flex-1 flex flex-col gap-2">
      {[
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'projects', icon: Box, label: 'My Projects' },
        { id: 'settings', icon: Settings, label: 'Settings' },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left",
            activeTab === item.id ? "bg-secondary/20 text-secondary" : "hover:bg-white/5 text-white/60"
          )}
        >
          <item.icon size={20} />
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
    </div>

    <button
      onClick={onSignOut}
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-white/60 hover:bg-red-500/10 hover:text-red-500 mt-auto"
    >
      <LogOut size={20} />
      <span className="font-medium">Sign Out</span>
    </button>
  </div>
);

const LandingPage = ({ onStart }: { onStart: () => void }) => (
  <div className="min-h-screen bg-black text-white selection:bg-secondary/30 relative overflow-hidden">
    <BackgroundAnimations />
    {/* Nav */}
    <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <Cpu className="text-secondary" />
        <span className="font-display font-bold text-2xl">AR Studio</span>
      </div>
      <div className="flex gap-8 items-center text-sm font-medium text-white/60">
        <a href="#" className="hover:text-white">Features</a>
        <a href="#" className="hover:text-white">Showcase</a>
        <a href="#" className="hover:text-white">Pricing</a>
        <button 
          onClick={onStart}
          className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-secondary transition-colors"
        >
          Get Started
        </button>
      </div>
    </nav>

    {/* Hero */}
    <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-7xl font-display font-bold leading-tight mb-6">
          Transform 3D Models Into <span className="text-secondary">AR Apps</span> Instantly
        </h1>
        <p className="text-xl text-white/60 mb-10 max-w-lg">
          A no-code cloud platform that converts 3D models into fully functional AR Android applications automatically.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={onStart}
            className="bg-secondary text-black px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2"
          >
            Start Building <ChevronRight size={20} />
          </button>
          <button className="border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/5 transition-colors">
            View Demo
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative aspect-square"
      >
        <div className="absolute inset-0 bg-secondary/20 blur-[120px] rounded-full" />
        <div className="relative glass rounded-3xl p-8 h-full flex flex-col items-center justify-center border-secondary/30">
           <Smartphone size={200} className="text-secondary/40 absolute" />
           <Box size={120} className="text-secondary animate-bounce" />
           <div className="mt-40 text-center">
              <div className="text-secondary font-mono text-sm mb-2">GENERATING APK...</div>
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-secondary"
                  animate={{ width: ['0%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
           </div>
        </div>
      </motion.div>
    </main>

    {/* Features */}
    <section className="bg-white/5 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">Powerful Features</h2>
          <p className="text-white/60">Everything you need to build professional AR apps.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: '3D Model Upload', desc: 'Support for GLB and OBJ formats with automatic validation.', icon: Upload },
            { title: 'Web 3D Preview', desc: 'Interactive Three.js viewer to inspect your models in real-time.', icon: Box },
            { title: 'Auto APK Generator', desc: 'One-click build pipeline that handles all the heavy lifting.', icon: Smartphone },
          ].map((f, i) => (
            <div key={i} className="glass p-8 rounded-2xl hover:border-secondary/50 transition-colors group">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <f.icon className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-white/60 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const Dashboard = ({ projects, onNewProject, onEditProject }: { projects: Project[], onNewProject: () => void, onEditProject: (p: Project) => void }) => (
  <div className="p-8 flex-1 overflow-y-auto">
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-display font-bold">My Projects</h1>
        <p className="text-white/60">Manage and build your AR applications.</p>
      </div>
      <button 
        onClick={onNewProject}
        className="bg-secondary text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
      >
        <Plus size={20} /> New Project
      </button>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p) => (
        <div key={p.id} className="glass rounded-2xl overflow-hidden group hover:border-secondary/30 transition-all">
          <div className="aspect-video bg-white/5 flex items-center justify-center relative">
            <Box size={48} className="text-white/20" />
            <div className="absolute top-4 right-4">
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                p.status === 'completed' ? "bg-accent/20 text-accent" : 
                p.status === 'building' ? "bg-secondary/20 text-secondary animate-pulse" : 
                "bg-white/10 text-white/60"
              )}>
                {p.status}
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{p.name}</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/40">Last edited 2h ago</span>
              <button 
                onClick={() => onEditProject(p)}
                className="text-secondary font-bold flex items-center gap-1 hover:gap-2 transition-all"
              >
                Open Studio <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {projects.length === 0 && (
        <div className="col-span-full py-20 flex flex-col items-center justify-center glass rounded-3xl border-dashed">
          <Box size={64} className="text-white/10 mb-4" />
          <h3 className="text-xl font-bold text-white/40">No projects yet</h3>
          <button onClick={onNewProject} className="text-secondary mt-2 font-bold">Create your first AR app</button>
        </div>
      )}
    </div>
  </div>
);

const Studio = ({ project, onBack, onSave }: { project: Project, onBack: () => void, onSave: (p: Project) => void }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(project.name);
  const [modelUrl, setModelUrl] = useState(project.model_url || 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb');
  const [isBuilding, setIsBuilding] = useState(project.status === 'building');
  const [buildProgress, setBuildProgress] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [isGeneratingModel, setIsGeneratingModel] = useState(false);

  const handleGenerateFromPrompt = async () => {
    if (!prompt.trim()) return;
    setIsGeneratingModel(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: [{ parts: [{ text: `The user wants to generate a 3D model based on this prompt: "${prompt}". Since I am a prototype, I will provide a sample model URL that best matches their description. Just acknowledge the prompt and say "Generating [description]..."` }] }],
      });
      console.log(response.text);
      // For the demo, we'll switch to a different sample model to show it "worked"
      const samples = [
        'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb',
        'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb',
        'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Binary/Lantern.glb'
      ];
      const randomModel = samples[Math.floor(Math.random() * samples.length)];
      setModelUrl(randomModel);
    } catch (error) {
      console.error("Prompt generation failed:", error);
    } finally {
      setIsGeneratingModel(false);
    }
  };

  const handleBuild = async () => {
    setIsBuilding(true);
    setBuildProgress(0);
    
    const interval = setInterval(() => {
      setBuildProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    await fetch(`/api/projects/${project.id}/build`, { method: 'POST' });
    
    setTimeout(() => {
      setIsBuilding(false);
      onSave({ ...project, status: 'completed' });
    }, 10000);
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Studio Header */}
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-lg text-white/60 hover:text-white">
            <ChevronLeft size={20} />
          </button>
          <div className="h-4 w-px bg-white/10" />
          <h2 className="font-bold">{name}</h2>
          <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/40 uppercase font-mono">Studio</span>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onSave({ ...project, name, model_url: modelUrl })}
            className="px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/5"
          >
            Save Draft
          </button>
          <button 
            onClick={handleBuild}
            disabled={isBuilding}
            className="bg-secondary text-black px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50"
          >
            {isBuilding ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} />}
            {isBuilding ? 'Building APK...' : 'Generate APK'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Config */}
        <div className="w-80 border-r border-white/10 flex flex-col p-6 gap-8 overflow-y-auto bg-surface">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3].map(s => (
              <div key={s} className={cn("flex-1 h-1 rounded-full", step >= s ? "bg-secondary" : "bg-white/10")} />
            ))}
          </div>

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Upload size={18} className="text-secondary" /> Model Upload</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Project Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-secondary outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Model URL (GLB/OBJ)</label>
                  <input 
                    type="text" 
                    value={modelUrl}
                    onChange={e => setModelUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-secondary outline-none text-sm"
                  />
                </div>
                <div className="p-8 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-secondary/50 cursor-pointer transition-colors">
                  <Upload size={32} className="text-white/20" />
                  <span className="text-sm text-white/40">Drag & Drop Model</span>
                </div>

                <div className="h-px bg-white/10 my-2" />

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-white/40 uppercase mb-2 block flex items-center gap-2">
                      <Wand2 size={14} className="text-secondary" /> AI Prompt Studio
                    </label>
                    <div className="relative">
                      <textarea 
                        placeholder="Describe the 3D model you want to generate... (e.g., 'A futuristic robotic arm with glowing blue joints')"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary outline-none text-sm min-h-[100px] resize-none"
                      />
                      <button 
                        onClick={handleGenerateFromPrompt}
                        disabled={isGeneratingModel || !prompt.trim()}
                        className="absolute bottom-3 right-3 p-2 bg-secondary/20 hover:bg-secondary/40 text-secondary rounded-lg transition-colors disabled:opacity-50"
                      >
                        {isGeneratingModel ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-white/40 uppercase mb-2 block flex items-center gap-2">
                      <Mic size={14} className="text-secondary" /> AI Voice Command
                    </label>
                    <button className="w-full bg-white/5 border border-white/10 rounded-xl py-4 flex items-center justify-center gap-3 hover:bg-secondary/10 hover:border-secondary/30 transition-all group">
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20">
                        <Mic size={20} className="text-secondary" />
                      </div>
                      <span className="text-sm font-medium text-white/60 group-hover:text-white">Tap to speak command</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Layers size={18} className="text-secondary" /> Interactions</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 glass rounded-xl">
                  <span className="text-sm font-medium">Pinch to Zoom</span>
                  <div className="w-10 h-5 bg-secondary rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full" /></div>
                </div>
                <div className="flex items-center justify-between p-4 glass rounded-xl">
                  <span className="text-sm font-medium">Rotate Gesture</span>
                  <div className="w-10 h-5 bg-secondary rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full" /></div>
                </div>
                <div className="flex items-center justify-between p-4 glass rounded-xl">
                  <span className="text-sm font-medium">Video Recording</span>
                  <div className="w-10 h-5 bg-white/10 rounded-full relative"><div className="absolute left-1 top-1 w-3 h-3 bg-white/40 rounded-full" /></div>
                </div>
                <div>
                  <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Zoom Limits</label>
                  <div className="flex gap-4">
                    <input type="number" placeholder="Min" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none" />
                    <input type="number" placeholder="Max" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Smartphone size={18} className="text-secondary" /> Build Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-white/40 uppercase mb-2 block">App Icon</label>
                  <div className="w-20 h-20 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                    <Plus size={24} className="text-white/20" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Package Name</label>
                  <input type="text" placeholder="com.arstudio.myapp" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none" />
                </div>
                <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-xl">
                   <div className="flex items-center gap-2 text-secondary text-sm font-bold mb-1">
                     <CheckCircle2 size={16} /> Ready to Build
                   </div>
                   <p className="text-xs text-secondary/60">All configurations are valid and optimized for Android ARCore.</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-auto flex gap-3">
            {step > 1 && (
              <button 
                onClick={() => setStep(s => s - 1)}
                className="flex-1 py-3 rounded-xl border border-white/10 font-bold flex items-center justify-center gap-2 hover:bg-white/5"
              >
                <ChevronLeft size={18} /> Back
              </button>
            )}
            {step < 3 ? (
              <button 
                onClick={() => setStep(s => s + 1)}
                className="flex-1 py-3 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
              >
                Next <ChevronRight size={18} />
              </button>
            ) : (
              <button 
                onClick={handleBuild}
                disabled={isBuilding}
                className="flex-1 py-3 rounded-xl bg-secondary text-black font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
              >
                Generate APK
              </button>
            )}
          </div>
        </div>

        {/* Main Area: Preview */}
        <div className="flex-1 bg-black relative p-8">
          <div className="absolute top-12 left-12 z-10">
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-xs font-mono text-white/60">LIVE PREVIEW</span>
            </div>
          </div>
          
          <div className="w-full h-full relative">
            <ModelViewer url={modelUrl} />
            
            {/* Overlay for build progress */}
            <AnimatePresence>
              {isBuilding && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50"
                >
                  <div className="w-64 text-center">
                    <div className="mb-8 relative">
                      <Smartphone size={80} className="text-secondary mx-auto" />
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Download size={32} className="text-white" />
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-2">Generating APK</h3>
                    <p className="text-white/40 text-sm mb-6">Injecting model into AR template and compiling for Android...</p>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-2">
                      <motion.div 
                        className="h-full bg-secondary"
                        initial={{ width: 0 }}
                        animate={{ width: `${buildProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-secondary">
                      <span>BUILDING...</span>
                      <span>{buildProgress}%</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Toolbar */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 bg-black/50 backdrop-blur p-2 rounded-2xl border border-white/10">
            <button className="p-3 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-colors"><Box size={20} /></button>
            <button className="p-3 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-colors"><Layers size={20} /></button>
            <button className="p-3 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-colors"><Smartphone size={20} /></button>
            <div className="w-px h-8 bg-white/10 my-auto" />
            <button className="p-3 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-colors"><Settings size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'login' | 'landing' | 'dashboard' | 'studio'>('login');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  const handleCreateProject = async () => {
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'New AR Project',
      model_url: '',
      config: {},
      status: 'draft'
    };
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject)
    });
    setProjects([newProject, ...projects]);
    setCurrentProject(newProject);
    setView('studio');
  };

  const handleSaveProject = async (p: Project) => {
    await fetch(`/api/projects/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p)
    });
    fetchProjects();
    setCurrentProject(p);
  };

  if (view === 'login') return <LoginPage onLogin={() => setView('landing')} />;
  if (view === 'landing') return <LandingPage onStart={() => setView('dashboard')} />;

  return (
    <div className="flex h-screen bg-black text-white relative">
      <div className="fixed top-4 right-4 z-[100] flex gap-2">
        <button className="p-2 glass rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all" title="Undo">
          <Undo size={20} />
        </button>
        <button className="p-2 glass rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all" title="Redo">
          <Redo size={20} />
        </button>
      </div>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onSignOut={() => setView('login')}
      />
      
      {view === 'dashboard' ? (
        <Dashboard 
          projects={projects} 
          onNewProject={handleCreateProject} 
          onEditProject={(p) => {
            setCurrentProject(p);
            setView('studio');
          }} 
        />
      ) : (
        currentProject && (
          <Studio 
            project={currentProject} 
            onBack={() => setView('dashboard')} 
            onSave={handleSaveProject} 
          />
        )
      )}
    </div>
  );
}
