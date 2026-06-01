"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/atoms";
import { type ProjectData } from "@/types";
import { type Language } from "@/config/translations";
import { Github, ExternalLink, Eye } from "lucide-react";
import { getRelativeTime } from "@/utils/date";
import Image from "next/image";
import React from "react";

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  language: Language;
  onViewDetails: (project: ProjectData) => void;
  labels: {
    verDetalles: string;
    verRepo: string;
    arquitectura: string;
    ultimaActualizacion: string;
  };
}

export function ProjectCard({
  project,
  index,
  language,
  onViewDetails,
  labels,
}: ProjectCardProps) {
  const statusLabels: Record<string, string> = {
    deployed: language === "es" ? "DESPLEGADO" : "DEPLOYED",
    stable: language === "es" ? "ESTABLE" : "STABLE",
    legacy: "LEGACY",
    development: language === "es" ? "EN DESARROLLO" : "IN DEV",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 0 40px ${project.color}33`, // 20% opacity hex
        borderColor: project.color
      }}
      style={{ "--project-color": project.color } as React.CSSProperties}
      className="group bg-bg-card border border-border rounded-xl overflow-hidden transition-all duration-500 card-shine h-full flex flex-col"
    >
      {/* Image Header — kept dark-scoped so image overlays (version badge,
          hover icons) stay readable in both light and dark themes. */}
      <div className="dark relative h-48 overflow-hidden bg-linear-to-br from-bg-card to-bg-dark">
        <div
          className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${project.color}60, transparent 70%)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              width={800}
              height={500}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <span className="text-6xl group-hover:scale-110 transition-transform duration-700">{project.icon}</span>
          )}
        </div>
        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          <Badge
            text={statusLabels[project.status]}
            variant="status"
            status={project.status}
          />
        </div>
        {/* Version Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-mono font-bold text-white bg-bg-dark/90 backdrop-blur-xl border border-white/20 px-2.5 py-1 rounded shadow-2xl tracking-widest">
            {project.version}
          </span>
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-bg-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onViewDetails(project)}
            className="bg-(--project-color) text-bg-dark p-3 rounded-full cursor-pointer shadow-[0_0_15px_var(--project-color)]"
          >
            <Eye size={20} />
          </motion.button>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/10 text-white p-3 rounded-full border border-white/20 hover:border-(--project-color) hover:text-(--project-color) transition-colors"
          >
            <Github size={20} />
          </motion.a>
          {project.demoUrl && (
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white/10 text-white p-3 rounded-full border border-white/20 hover:border-(--project-color) hover:text-(--project-color) transition-colors"
            >
              <ExternalLink size={20} />
            </motion.a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-text-primary group-hover:text-(--project-color) transition-colors duration-300">
              {project.name}
            </h3>
            <p className="text-xs font-mono text-text-secondary mt-0.5">
              {project.architecture[language]} ·{" "}
              {project.architectureDetail[language]}
            </p>
          </div>
        </div>

        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {project.description[language]}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
          <span className="text-xs text-text-secondary font-mono">
            {getRelativeTime(project.lastUpdate, language)}
          </span>
          <button
            onClick={() => onViewDetails(project)}
            className="text-xs font-mono text-(--project-color) hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-1 font-bold"
          >
            {labels.verDetalles} →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
