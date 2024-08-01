'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Node from './Node';
import { useState } from 'react';

export type Node = {
  id: string;
  label: string;
  type: string;
};

export const NodeTransition = ({
  children,
  delay,
  exit = false,
}: {
  children: React.ReactNode;
  delay: number;
  exit?: boolean;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: '20%' }}
    animate={{ opacity: 1, y: 0, scale: 1, transition: { delay } }}
    exit={{ opacity: 0, scale: 0, transition: { duration: exit ? 0.4 : 0 } }}
  >
    {children}
  </motion.div>
);

export default function NodeList({ items }: { items: Node[] }) {
  const [stagger] = useState(true);

  return (
    <motion.div className="flex flex-row">
      <AnimatePresence mode="sync">
        {items.map((node, index) => (
          <NodeTransition key={node.id} delay={stagger ? index * 0.05 : 0}>
            <Node type={node.type} key={node.id} label={node.label} />
          </NodeTransition>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
