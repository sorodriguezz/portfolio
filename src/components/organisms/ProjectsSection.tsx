"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionTitle } from "@/components/atoms";
import { ProjectCard } from "@/components/molecules";
import { projectsData } from "@/config/projects";
import { type ProjectData } from "@/types";
import Image from "next/image";
import {
  X,
  Github,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

interface ProjectsSectionProps {
  limit?: number;
  showViewAll?: boolean;
  centered?: boolean;
}

export function ProjectsSection({
  limit,
  showViewAll = true,
  centered = false,
}: ProjectsSectionProps) {
  const { t, language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null,
  );

  const displayedProjects = limit ? projectsData.slice(0, limit) : projectsData;

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <section
      id="proyectos"
      className={
        centered
          ? "snap-section py-12 sm:py-20 relative"
          : "py-12 sm:py-20 relative"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle={t.projects.subtitle} title={t.projects.title} />

        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-bg-card border border-border rounded-t-xl overflow-hidden mb-0"
        >
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-xs font-mono text-text-secondary">
              usr/bin/projects --list-all
            </span>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 bg-bg-dark/50 border border-t-0 border-border rounded-b-xl p-4 sm:p-6">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              language={language}
              onViewDetails={setSelectedProject}
              labels={{
                verDetalles: t.projects.verDetalles,
                verRepo: t.projects.verRepo,
                arquitectura: t.projects.arquitectura,
                ultimaActualizacion: t.projects.ultimaActualizacion,
              }}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between text-xs font-mono text-text-secondary">
          <span>
            {t.projects.totalProyectos}: {projectsData.length}
          </span>
          {showViewAll && limit && (
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-mono text-sm transition-colors"
            >
              {t.projects.verMas} <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center px-4 py-8"
            onClick={() => setSelectedProject(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-bg-dark/90 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-bg-card border border-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto glow-border mx-4"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-bg-dark/50 border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Header */}
              <div className="relative h-40 sm:h-56 overflow-hidden rounded-t-2xl">
                {/* Background color/gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${selectedProject.color}40, transparent 80%), linear-gradient(225deg, ${selectedProject.color}20, ${selectedProject.color}05)`,
                  }}
                />

                {/* Image or Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {selectedProject.image ? (
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="text-6xl sm:text-8xl"
                    >
                      {selectedProject.icon}
                    </motion.span>
                  )}
                </div>

                {/* Scrim for readability */}
                <div className="absolute inset-0 bg-linear-to-t from-bg-dark via-bg-dark/40 to-transparent" />

                {/* Project Info */}
                <div className="absolute bottom-4 left-6 z-10 drop-shadow-lg text-white">
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    {selectedProject.name}
                  </h2>
                  <div className="flex items-center gap-3 mt-1 text-white/90">
                    <span className="text-xs font-mono bg-bg-dark/50 px-2 py-0.5 rounded backdrop-blur-xs border border-white/10">
                      {selectedProject.version}
                    </span>
                    <span className="text-xs font-mono font-medium drop-shadow-sm">
                      · {selectedProject.architecture[language]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-sm font-mono text-primary uppercase tracking-widest mb-3">
                    {t.projects.descripcionCompleta}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {selectedProject.fullDescription[language]}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-sm font-mono text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                    <CheckCircle size={16} />
                    {t.projects.caracteristicas}
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.features[language].map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-start gap-3 text-text-secondary"
                      >
                        <span className="text-primary mt-1 text-xs">▸</span>
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Challenges */}
                <div>
                  <h3 className="text-sm font-mono text-warning uppercase tracking-widest mb-3 flex items-center gap-2">
                    <AlertTriangle size={16} />
                    {t.projects.desafios}
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.challenges[language].map(
                      (challenge, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-start gap-3 text-text-secondary"
                        >
                          <span className="text-warning mt-1 text-xs">▸</span>
                          <span className="text-sm">{challenge}</span>
                        </motion.li>
                      ),
                    )}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-white/5 border border-border rounded-full px-5 py-2.5 text-sm font-mono text-text-primary hover:border-primary hover:text-primary transition-all"
                  >
                    <Github size={16} />
                    {t.projects.verRepo}
                  </motion.a>
                  {selectedProject.demoUrl && (
                    <motion.a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-primary text-bg-dark rounded-full px-5 py-2.5 text-sm font-mono font-bold hover:bg-primary-dark transition-all"
                    >
                      <ExternalLink size={16} />
                      {t.projects.demoEnVivo}
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
