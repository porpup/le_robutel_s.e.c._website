"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const imageLinks = [
  { id: "building0", src: "/assets/img/building0.png" },
  { id: "building1", src: "/assets/img/building1.png" },
  { id: "building2", src: "/assets/img/building2.png" },
  { id: "building3", src: "/assets/img/building3.png" },
  { id: "building4", src: "/assets/img/building4.png" },
];

const contentMap = {
  building0: {
    images: ["/assets/img/0_(basement).png"],
    description: "This is the basement of Building 0.",
  },
  building1: {
    images: ["/assets/img/1_1.png", "/assets/img/1_2.png"],
    description: "This is the interior of Building 1.",
  },
  building2: {
    images: ["/assets/img/2_1.png", "/assets/img/2_2.png"],
    description: "Different rooms in Building 2.",
  },
  building3: {
    images: ["/assets/img/3-13_1.png", "/assets/img/3-13_2.png"],
    description: "Layout details of Building 3.",
  },
  building4: {
    images: [
      "/assets/img/14_1.png",
      "/assets/img/14_2.png",
      "/assets/img/15_(roof).png",
    ],
    description: "Top floors and roof of Building 4.",
  },
};

const Design = () => {
  const [activeBuilding, setActiveBuilding] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full max-w-6xl mx-auto mt-8 px-4"
    >
      <h2 className="text-3xl font-bold uppercase text-center mb-6 text-gray-800">
        Design Viewer
      </h2>

      <div className="border-2 border-gray-300 rounded-lg bg-white shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: clickable images */}
          <div className="flex flex-col gap-0 w-full md:w-1/2">
            {[...imageLinks].reverse().map(({ id, src }) => {
              const isActive = activeBuilding === id;

              return (
                <motion.div
                  key={id}
                  animate={{ scale: isActive ? 1.03 : 1 }}
                  whileHover={!isActive ? { scale: 1.03 } : {}}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setActiveBuilding(id)}
                  className={`relative w-full overflow-hidden cursor-pointer ${
                    isActive ? "z-30" : "hover:z-20"
                  }`}
                  style={{
                    WebkitBackfaceVisibility: "hidden",
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                  }}
                >
                  {/* Green overlay only when clicked */}
                  <div
                    className="absolute inset-0 pointer-events-none z-10 transition-colors duration-300"
                    style={{
                      backgroundColor: isActive
                        ? "rgba(74, 222, 128, 0.2)" // green overlay
                        : "rgba(0, 0, 0, 0)", // no gray on hover anymore
                    }}
                  />
                  <img
                    src={src}
                    alt={id}
                    className="w-full h-auto object-cover relative z-0"
                    draggable={false}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Right: preview area */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBuilding || "default"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {activeBuilding ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                      {contentMap[activeBuilding].images.map((imgSrc, i) => (
                        <div
                          key={i}
                          className="w-full max-h-[300px] sm:max-h-[240px] overflow-hidden rounded"
                        >
                          <img
                            src={imgSrc}
                            alt={`detail ${i}`}
                            className="object-contain w-full h-full mx-auto"
                            style={{ maxHeight: "100%", maxWidth: "100%" }}
                            draggable={false}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      {contentMap[activeBuilding].description}
                    </p>
                  </>
                ) : (
                  <p className="text-black text-sm">
                    Select a building on the left to preview floorplans and
                    images.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Design;
