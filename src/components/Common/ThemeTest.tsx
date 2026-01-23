"use client";
import { useTheme } from "@/app/context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const ThemeTest = () => {
  const { theme } = useTheme();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-dark dark:text-gray-100">
          Theme Test Component
        </h2>
        <ThemeToggle />
      </div>
      
      <div className="space-y-2">
        <p className="text-dark-3 dark:text-gray-300">
          Mevcut tema: <span className="font-bold">{theme}</span>
        </p>
        <p className="text-dark-3 dark:text-gray-300">
          HTML class: <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {typeof window !== 'undefined' ? document.documentElement.className : 'N/A'}
          </span>
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
          <p className="text-sm text-dark dark:text-gray-200">Light/Dark Test 1</p>
        </div>
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
          <p className="text-sm text-dark dark:text-gray-200">Light/Dark Test 2</p>
        </div>
      </div>
    </div>
  );
};

export default ThemeTest;
