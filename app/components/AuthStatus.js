'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { authService } from '../../lib/auth';
import { User, LogOut, Settings, Shield } from 'lucide-react';

export default function AuthStatus() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.signOut();
      setDropdownOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.auth-dropdown')) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownOpen]);

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-2 bg-gradient-to-r from-eduka-orange to-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-eduka-orange transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
      >
        <User className="w-4 h-4" />
        <span className="hidden sm:inline">Connexion</span>
      </Link>
    );
  }

  return (
    <div className="relative auth-dropdown">
      <button
        onClick={handleDropdownToggle}
        className="flex items-center gap-2 p-2 text-gray-700 hover:text-eduka-orange hover:bg-gray-100 rounded-lg transition-all duration-200"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-eduka-orange to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {authService.getDisplayName(user).charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:inline text-sm font-medium">
          {authService.getDisplayName(user)}
        </span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn">
          <div className="p-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">
              {authService.getDisplayName(user)}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          
          <div className="py-1">
            <Link
              href="/admin"
              onClick={closeDropdown}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Shield className="w-4 h-4" />
              Administration
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}