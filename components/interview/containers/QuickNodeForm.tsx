'use client';

import { useState } from 'react';
import ActionButton from '../components/ActionButton';

export default function QuickNodeForm() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="">
      {showForm && <div>Form</div>}
      <div className="absolute bottom-2 right-2 mr-8">
        <ActionButton onClick={() => setShowForm(!showForm)} />
      </div>
    </div>
  );
}
