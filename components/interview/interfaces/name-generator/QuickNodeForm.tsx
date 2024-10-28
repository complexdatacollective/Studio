'use client';

import { useState } from 'react';
import ActionButton from '~/components/interview/ActionButton';
import Node from '~/components/Node';
import type { NodeType } from '~/schemas/protocol/entities';

export default function QuickNodeForm({ nodeType }: { nodeType: NodeType }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="absolute bottom-4 flex items-center ltr:right-2 rtl:left-2">
      {showForm && (
        <div className="relative mr-8 flex items-center">
          <form>
            <input
              type="text"
              placeholder="Type a label and press enter..."
              className="font-semibold rounded-full bg-input px-6 py-4 text-lg text-input-foreground placeholder-input-foreground"
              onBlur={() => setShowForm(false)}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            />
          </form>
          <Node label="" onClick={() => setShowForm(false)} />
        </div>
      )}
      {!showForm && (
        <div className="mr-8" id="data-wizard-task-step-3">
          <ActionButton
            onClick={() => setShowForm(true)}
            color={nodeType.color}
            iconName={nodeType.icon}
          />
        </div>
      )}
    </div>
  );
}
