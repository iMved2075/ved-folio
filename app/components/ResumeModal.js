"use client";

import React, { useState, useEffect } from 'react';
import { FaTimes, FaDownload, FaExternalLinkAlt, FaFilePdf, FaEye } from 'react-icons/fa';

const ResumeModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    window.open('/Resume.pdf', '_blank');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 backdrop-blur-sm p-2 sm:p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="bg-gray-900 rounded-lg max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col shadow-2xl border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-3 sm:p-4 border-b border-gray-800 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
          <div className="flex items-center gap-2 sm:gap-3">
            <FaFilePdf className="text-red-500 text-lg sm:text-2xl" />
            <div>
              <h3 id="resume-modal-title" className="text-base sm:text-xl font-bold">Resume</h3>
              <p className="text-xs sm:text-sm text-slate-400 hidden sm:block">View or download my resume</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1.5 sm:p-2 hover:bg-gray-700 rounded-lg"
            aria-label="Close modal"
          >
            <FaTimes size={20} className="sm:hidden" />
            <FaTimes size={24} className="hidden sm:block" />
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto bg-gray-800">
          <iframe
            src="/Resume.pdf"
            className="w-full h-full min-h-[60vh] sm:min-h-[70vh]"
            title="Resume PDF"
          />
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-gray-800 bg-gray-800/50 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 sm:gap-3">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
            >
              <FaDownload size={14} />
              <span className="sm:inline">Download</span>
            </button>
            <button
              onClick={handleOpenNewTab}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
            >
              <FaExternalLinkAlt size={14} />
              <span className="hidden sm:inline">Open in New Tab</span>
              <span className="sm:hidden">Open</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
