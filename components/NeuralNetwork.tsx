"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function NeuralNetwork() {
  const [nodes, setNodes] = useState<{ x: number; y: number }[]>([]);
  const [connections, setConnections] = useState<{ start: number; end: number }[]>([]);

  useEffect(() => {
    const newNodeList = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    
    const newConnections: { start: number; end: number }[] = [];
    for (let i = 0; i < newNodeList.length; i++) {
      for (let j = i + 1; j < newNodeList.length; j++) {
        const dist = Math.sqrt(
          Math.pow(newNodeList[i].x - newNodeList[j].x, 2) +
          Math.pow(newNodeList[i].y - newNodeList[j].y, 2)
        );
        if (dist < 15) {
          newConnections.push({ start: i, end: j });
        }
      }
    }
    
    setNodes(newNodeList);
    setConnections(newConnections);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {connections.map((conn, idx) => (
          <motion.line
            key={`conn-${idx}`}
            x1={nodes[conn.start].x}
            y1={nodes[conn.start].y}
            x2={nodes[conn.end].x}
            y2={nodes[conn.end].y}
            stroke="url(#grad1)"
            strokeWidth="0.05"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.1, 0.4, 0.1] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        {nodes.map((node, idx) => (
          <motion.circle
            key={`node-${idx}`}
            cx={node.x}
            cy={node.y}
            r="0.15"
            fill="#8b5cf6"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
