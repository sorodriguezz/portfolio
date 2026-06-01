"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/atoms";
import { Code, Cloud, Server, Shield, ArrowRight, Download } from "lucide-react";

const expertiseIcons = [
  <Code key="code" size={18} />,
  <Cloud key="cloud" size={18} />,
  <Server key="server" size={18} />,
  <Shield key="shield" size={18} />,
];

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="inicio" className="snap-section relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/3 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 font-mono text-xs tracking-wider">
                {t.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              {t.hero.title1}
              <br />
              <span className="gradient-text">{t.hero.title2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg mb-8 max-w-lg"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-10"
            >
              <Button variant="primary" size="lg" href="#proyectos">
                {t.hero.verProyectos} <ArrowRight size={18} />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/cv.pdf"
                download
              >
                {t.hero.descargarCV} <Download size={18} />
              </Button>
            </motion.div>

            {/* Expertise Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex items-center gap-3 sm:gap-4"
            >
              <span className="text-xs font-mono text-text-secondary tracking-widest">
                {"// "}{t.hero.expertise}
              </span>
              <div className="h-px flex-1 bg-border" />
              <div className="flex gap-3">
                {expertiseIcons.map((icon, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                    className="w-8 h-8 rounded-lg bg-bg-card border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/30 transition-all cursor-pointer"
                  >
                    {icon}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right - Terminal Card (kept as a dark code editor in both themes) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="dark hidden lg:block"
          >
            <div className="relative">
              {/* Floating Stats Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-bg-card border border-border rounded-xl p-4 z-10 glow-border"
              >
                <div className="text-xs font-mono text-text-secondary mb-1">Deployments</div>
                <div className="text-2xl font-bold text-primary">1,204</div>
                <div className="text-xs text-green-400 font-mono">+12% this week</div>
              </motion.div>

              {/* Main Terminal */}
              <div className="bg-bg-card border border-border rounded-xl overflow-hidden glow-border">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="p-6 font-mono text-sm space-y-2">
                  <div>
                    <span className="text-green-400">→</span>{" "}
                    <span className="text-text-secondary">const</span>{" "}
                    <span className="text-primary">engineer</span>{" "}
                    <span className="text-text-secondary">=</span>{" "}
                    <span className="text-accent">{"{"}                  </span>
                  </div>
                  <div className="pl-4">
                    <span className="text-yellow-400">name</span>
                    <span className="text-text-secondary">:</span>{" "}
                    <span className="text-green-400">&quot;Sebastián Rodríguez&quot;</span>
                    <span className="text-text-secondary">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-yellow-400">role</span>
                    <span className="text-text-secondary">:</span>{" "}
                    <span className="text-green-400">&quot;Software Engineer&quot;</span>
                    <span className="text-text-secondary">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-yellow-400">stack</span>
                    <span className="text-text-secondary">:</span>{" "}
                    <span className="text-accent">[</span>
                    <span className="text-green-400">&quot;∞&quot;</span>
                    <span className="text-accent">]</span>
                    <span className="text-text-secondary">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-yellow-400">coffee</span>
                    <span className="text-text-secondary">:</span>{" "}
                    <span className="text-secondary">Infinity</span>
                  </div>
                  <div>
                    <span className="text-accent">{"}"}</span>
                    <span className="text-text-secondary">;</span>
                  </div>
                  <div className="mt-3 flex items-center">
                    <span className="text-green-400">→</span>{" "}
                    <span className="text-text-secondary">engineer.</span>
                    <span className="text-yellow-400">build</span>
                    <span className="text-text-secondary">(</span>
                    <span className="text-green-400">&quot;future&quot;</span>
                    <span className="text-text-secondary">)</span>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-primary ml-1"
                    >
                      █
                    </motion.span>
                  </div>
                </div>

                {/* System Load Bar */}
                <div className="px-4 py-3 border-t border-border">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-text-secondary">System Load</span>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-xs font-mono text-text-secondary">CPU: 73%</span>
                    <div className="flex-1 bg-border rounded-full h-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "73%" }}
                        transition={{ duration: 2, delay: 1 }}
                        className="bg-primary h-full rounded-full"
                      />
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">
                      STABLE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
