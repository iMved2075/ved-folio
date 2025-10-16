"use client";

import { useState, useEffect } from 'react';
import { FaStar, FaCodeBranch, FaEye } from 'react-icons/fa';

export default function GitHubProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/github-projects');
        const data = await response.json();
        setProjects(data.repositories || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border border-slate-800 rounded-lg p-4 animate-pulse">
            <div className="h-6 w-48 bg-slate-700 rounded mb-3"></div>
            <div className="h-4 w-full bg-slate-700 rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-slate-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">GitHub Projects</h2>
      {projects.map((project) => (
        <div key={project.id} className="border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold">
              <a href={project.url} target="_blank" rel="noopener noreferrer" 
                 className="hover:text-blue-400 transition-colors">
                {project.name}
              </a>
            </h3>
            <div className="flex gap-4 text-sm text-slate-400">
              {project.stars > 0 && (
                <span className="flex items-center gap-1">
                  <FaStar size={14} /> {project.stars}
                </span>
              )}
              {project.forks > 0 && (
                <span className="flex items-center gap-1">
                  <FaCodeBranch size={14} /> {project.forks}
                </span>
              )}
            </div>
          </div>

          {project.description && (
            <p className="text-sm text-slate-300 mb-3">{project.description}</p>
          )}

          {/* Technologies/Languages */}
          {project.languages && project.languages.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                {project.languages.slice(0, 5).map((lang, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-slate-800 rounded-full">
                    {lang.name} {lang.percentage}%
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Topics */}
          {project.topics && project.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {project.topics.map((topic, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full">
                  #{topic}
                </span>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
            <div className="flex gap-3">
              {project.homepage && (
                <a href={project.homepage} target="_blank" rel="noopener noreferrer" 
                   className="text-blue-400 hover:underline">
                  Live Demo →
                </a>
              )}
              <a href={project.url} target="_blank" rel="noopener noreferrer" 
                 className="text-slate-400 hover:underline">
                GitHub →
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}