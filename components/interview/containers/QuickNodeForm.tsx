'use client';

import { useState } from 'react';
import ActionButton from '../components/ActionButton';
import Node from '../components/Node';

export default function QuickNodeForm() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="absolute bottom-4 right-2 flex items-center">
      {showForm && (
        <div className="relative mr-8 flex items-center">
          <form>
            <input
              type="text"
              placeholder="Type a label and press enter..."
              className="w-80 rounded-full bg-white px-6 py-4 text-lg font-semibold text-charcoal"
            />
          </form>
          <div onClick={() => setShowForm(false)}>
            <Node label="" />
          </div>
        </div>
      )}
      {!showForm && (
        <div className="mr-8" data-id="name-generator-3">
          <ActionButton onClick={() => setShowForm(true)} />
        </div>
      )}
    </div>
  );
}
