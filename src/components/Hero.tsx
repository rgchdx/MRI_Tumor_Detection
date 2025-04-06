import React, { useState, useRef } from 'react';
import { CloudUpload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero: React.FC = () => {
  const [dragging, setDragging] = useState(false);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.relatedTarget === null || (dropRef.current && !dropRef.current.contains(e.relatedTarget as Node))) {
      setDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => { //change this later on when implementing the ML model
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = e.dataTransfer.files;
    console.log('Dropped files:', files);
    // Handle files here
  };

  return (
    <>
      <motion.div
        className="p-10 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
            Welcome to MRI Bonanza
        </h1>
        <p className="mt-3 text-lg text-gray-300 hover:text-white transition duration-300">
            Drop an image file of your MRI scan
        </p>

      </motion.div>

      <AnimatePresence>
        {dragging && (
          <motion.div
            ref={dropRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="border-4 border-dashed border-white/50 rounded-2xl p-12 text-white text-center bg-white/10 backdrop-blur-md"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mb-4 flex justify-center"
              >
                <CloudUpload size={64} />
              </motion.div>
              <div className="text-3xl font-bold">Drop files here</div>
              <p className="text-sm text-white/70 mt-2">Ready to scan 🔍</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transparent area to catch drag enter */}
      <div
        onDragEnter={handleDragEnter}
        className="fixed inset-0 z-40"
      />
    </>
  );
};

export default Hero;