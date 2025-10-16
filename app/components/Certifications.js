"use client";
import React, { useState } from 'react';
import { FaTimes, FaAward, FaFilePdf, FaDownload, FaExternalLinkAlt, FaEye } from 'react-icons/fa';
import { SiNextdotjs, SiReact, SiVercel } from 'react-icons/si';

const Certifications = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  const certifications = [
    {
      id: 1,
      title: "React Foundations Certificate",
      issuer: "Vercel / Next.js",
      date: "2024",
      file: "/react-foundations-certificate.pdf",
      description: "Core React concepts, components, hooks, and modern patterns",
      icon: SiReact,
      color: "from-blue-600 to-cyan-600",
      skills: ["React Hooks", "Components", "State Management", "Modern Patterns"]
    },
    {
      id: 2,
      title: "Next.js App Router Certificate",
      issuer: "Vercel / Next.js",
      date: "2024",
      file: "/app-router-certificate.pdf",
      description: "Advanced certification in Next.js 13+ App Router architecture and features",
      icon: SiNextdotjs,
      color: "from-red-600 to-gray-800",
      skills: ["App Router", "Server Components", "Next.js 13+", "React Server Components"]
    },
    {
      id: 3,
      title: "Next.js Pages Router Certificate",
      issuer: "Vercel / Next.js",
      date: "2024",
      file: "/pages-router-certificate.pdf",
      description: "Proficiency in Next.js Pages Router and server-side rendering",
      icon: SiNextdotjs,
      color: "from-green-800 to-gray-900",
      skills: ["Pages Router", "SSR", "SSG", "API Routes"]
    }
  ];

  const handleViewPdf = (cert) => {
    setSelectedPdf(cert);
  };

  const handleOpenNewTab = (file) => {
    window.open(file, '_blank');
  };

  const handleCloseModal = () => {
    setSelectedPdf(null);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleDownload = (cert) => {
    const link = document.createElement('a');
    link.href = cert.file;
    link.download = `${cert.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="certifications-section">
      <div className="flex items-center gap-3 mb-8">
        <FaAward size={28} className="text-yellow-500" />
        <div>
          <h2 className="text-2xl font-bold">Professional Certifications</h2>
          <p className="text-sm text-slate-400">Industry-recognized credentials and achievements</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => {
          const IconComponent = cert.icon;
          return (
            <div
              key={cert.id}
              className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20"
            >
              {/* Icon Header */}
              <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${cert.color} rounded-t-xl opacity-20`}></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${cert.color} rounded-lg`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <span className="text-xs px-3 py-1 bg-gray-700 rounded-full text-slate-300">
                    {cert.date}
                  </span>
                </div>

                {/* Certificate Info */}
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-sm text-slate-400 mb-1 flex items-center gap-2">
                  <SiVercel size={14} />
                  {cert.issuer}
                </p>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">{cert.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.map((skill, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-700/50 rounded-full text-slate-300">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewPdf(cert)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    <FaEye size={14} />
                    View
                  </button>
                  <button
                    onClick={() => handleOpenNewTab(cert.file)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    title="Open in new tab"
                  >
                    <FaExternalLinkAlt size={14} />
                  </button>
                  <button
                    onClick={() => handleDownload(cert)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    title="Download"
                  >
                    <FaDownload size={14} />
                  </button>
                </div>
              </div>

              {/* PDF Badge */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FaFilePdf size={60} className="text-red-500" />
              </div>
            </div>
          );
        })}
      </div>

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 backdrop-blur-sm p-2 sm:p-4"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-gray-900 rounded-lg max-w-full sm:max-w-3xl lg:max-w-5xl xl:max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col shadow-2xl border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-3 sm:p-4 border-b border-gray-800 bg-gray-800/50">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <FaFilePdf className="text-red-500 text-lg sm:text-2xl flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-lg lg:text-xl font-bold truncate">{selectedPdf.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 truncate">{selectedPdf.issuer} • {selectedPdf.date}</p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white transition-colors p-1.5 sm:p-2 hover:bg-gray-700 rounded-lg flex-shrink-0"
                aria-label="Close modal"
              >
                <FaTimes size={20} className="sm:hidden" />
                <FaTimes size={24} className="hidden sm:block" />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-auto bg-gray-800">
              <iframe
                src={selectedPdf.file}
                className="w-full h-full min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh]"
                title={selectedPdf.title}
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 border-t border-gray-800 bg-gray-800/50 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 sm:gap-3">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleDownload(selectedPdf)}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                >
                  <FaDownload size={14} />
                  <span className="sm:inline">Download PDF</span>
                </button>
                <button
                  onClick={() => handleOpenNewTab(selectedPdf.file)}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                >
                  <FaExternalLinkAlt size={14} />
                  <span className="hidden sm:inline">Open in New Tab</span>
                  <span className="sm:hidden">Open</span>
                </button>
              </div>
              <button
                onClick={handleCloseModal}
                className="px-4 sm:px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certifications;
