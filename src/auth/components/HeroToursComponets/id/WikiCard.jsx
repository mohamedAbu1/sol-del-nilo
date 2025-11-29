"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const WikiCard = ({ placeName }) => {
  const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(
    placeName
  )}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ padding: "10px" }}
        className="bg-white dark:bg-gray-900 shadow-2xl rounded-xl p-6 border border-gray-200 dark:border-gray-700 w-80"
      >
        <h3 className="text-lg font-bold mb-3 text-gray-800 dark:text-gray-100">
          {placeName}
        </h3>
        <p
          style={{ marginTop: "7px", marginBottom: "9px" }}
          className="text-sm text-gray-600 dark:text-gray-400 mb-5"
        >
          Click below to see more details about this place on Wikipedia.
        </p>
        <a
          href={wikiUrl}
          target="_blank"
          style={{padding:"5px"}}
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-yellow-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow hover:from-yellow-600 hover:to-blue-700 transition-all duration-300"
        >
          Go to Wikipedia
        </a>
      </motion.div>
    </AnimatePresence>
  );
};

export default WikiCard;
