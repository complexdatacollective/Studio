'use client';

import { motion } from 'framer-motion';
import MarkdownLabel from '../Fields/MarkdownLabel';

/**
 * Building block for Prompt component
 * renders a single prompt
 */

export default function Prompt({ id, text }: { id: number; text: string }) {
  return (
    <motion.div title={text} key={id}>
      <MarkdownLabel label={text} className="text-3xl" />
    </motion.div>
  );
}
