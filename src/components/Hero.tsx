import React, { useState, useRef } from 'react';

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

    // Only reset if actually leaving the window
    if (e.relatedTarget === null || (dropRef.current && !dropRef.current.contains(e.relatedTarget as Node))) {
      setDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = e.dataTransfer.files;
    console.log("Dropped files:", files);
    // You can process files here
  };

  return (
    <>
      <div className="p-4 text-center">Hero</div>

      {/* Fullscreen overlay */}
      {dragging && (
        <div
          ref={dropRef}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-3xl font-bold z-50"
        >
          Drop here
        </div>
      )}

      {/* Invisible layer to detect drag enter */}
      <div
        onDragEnter={handleDragEnter}
        className="fixed inset-0 z-40"
      />
    </>
  );
};

export default Hero;