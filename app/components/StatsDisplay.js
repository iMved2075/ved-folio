"use client";

import React, { useState, useEffect } from 'react';
import { RiGitRepositoryLine } from "react-icons/ri";
import { LuGitCommitVertical } from "react-icons/lu";
import { MdPeopleAlt } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { BiGitCommit } from "react-icons/bi";

export default function StatsDisplay() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const response = await fetch('/api/github-stats');
      const data = await response.json();
      setStats(data);
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="github-stats w-full h-[69vh] rounded-lg border border-slate-800 bg-slate-900/40 p-6">
        {/* Header Skeleton */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <FaGithub size={28} />
            GitHub Activity
          </h2>
          <div className="h-4 w-40 bg-slate-700 rounded animate-pulse"></div>
        </div>

        {/* Main Stats Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-1">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="stat-card flex flex-col items-center p-4 rounded-lg bg-white/10">
              <div className="w-5 h-5 bg-slate-700 rounded animate-pulse mb-2"></div>
              <div className="h-8 w-16 bg-slate-700 rounded animate-pulse mb-2"></div>
              <div className="h-3 w-20 bg-slate-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Top Languages Skeleton */}
        <div className="mb-6 pt-3 rounded-lg">
          <div className="h-6 w-48 bg-slate-700 rounded animate-pulse mb-3"></div>
          <div className="space-y-2 px-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="h-4 w-24 bg-slate-700 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-slate-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return <p>Could not load stats.</p>;
  console.log(stats);

  return (
    <div className="github-stats w-full rounded-lg border border-slate-800 bg-slate-900/40 p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <FaGithub size={28} />
          GitHub Activity
        </h2>
        <p className="text-sm opacity-70">
          Member since {new Date(stats.accountCreated).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-1">
        <div className="stat-card flex flex-col items-center p-4 rounded-lg bg-opacity-10 bg-white/10">
          <div className="flex items-center gap-2 mb-2">
            <RiGitRepositoryLine size={20} className="opacity-70" />
          </div>
          <div className="text-2xl font-bold">{stats.totalRepos}</div>
          <div className="text-xs text-center opacity-70">Repositories</div>
        </div>

        <div className="stat-card flex flex-col items-center p-4 rounded-lg bg-opacity-10 bg-white/10">
          <div className="flex items-center gap-2 mb-2">
            <BiGitCommit size={20} className="opacity-70" />
          </div>
          <div className="text-2xl font-bold">{stats.totalCommits}</div>
          <div className="text-xs text-center opacity-70">Total Commits</div>
        </div>

        <div className="stat-card flex flex-col items-center p-4 rounded-lg bg-opacity-10 bg-white/10">
          <div className="flex items-center gap-2 mb-2">
            <LuGitCommitVertical size={20} className="opacity-70" />
          </div>
          <div className="text-2xl font-bold">{stats.contributionsLastYear}</div>
          <div className="text-xs text-center opacity-70">Contributions (2024)</div>
        </div>

        <div className="stat-card flex flex-col items-center p-4 rounded-lg bg-opacity-10 bg-white/10">
          <div className="flex items-center gap-2 mb-2">
            <MdPeopleAlt size={20} className="opacity-70" />
          </div>
          <div className="text-2xl font-bold">{stats.followers}</div>
          <div className="text-xs text-center opacity-70">Followers</div>
        </div>
      </div>

      {/* Top Languages */}
      <div className="mb-6 pt-3 rounded-lg bg-opacity-10">
        <h3 className="text-lg font-semibold mb-3">🔥 Most Used Languages</h3>
        <div className="space-y-2 px-3">
          {stats.topLanguages?.map((lang, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-medium">{lang.language}</span>
              <span className="text-sm opacity-70">{lang.count} repos</span>
            </div>
          ))}
        </div>
      </div>

      {/* Language Usage by Bytes */}
      {stats.topLanguagesByBytes && stats.topLanguagesByBytes.length > 0 && (
        <div className="rounded-lg bg-opacity-10 bg-white/10 p-4">
          <h3 className="text-lg font-semibold mb-3">📊 Language Distribution</h3>
          <div className="space-y-3">
            {stats.topLanguagesByBytes.map((lang, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{lang.language}</span>
                  <span className="text-sm opacity-70">{lang.percentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${lang.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}