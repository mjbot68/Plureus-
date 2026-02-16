'use client';

import { useState } from 'react';

const statements = [
  {
    id: 1,
    text: 'An election result is legitimate if it follows established rules, even when my preferred candidate loses.',
    vLabelMin: 'Not strongly held',
    vLabelMax: 'Very strongly held',
  },
  {
    id: 2,
    text: 'I would accept outcomes I strongly disagree with if it meant preserving trust in the election process.',
    vLabelMin: 'Low willingness',
    vLabelMax: 'High willingness',
  },
  {
    id: 3,
    text: 'I trust the election system more than political leaders to determine fair outcomes.',
    vLabelMin: 'Low trust',
    vLabelMax: 'High trust',
  },
];

export default function Stack001() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState(
    statements.map(() => ({ h: 0, v: 0 }))
  );

  const current = statements[step];
  const currentResponse = responses[step];

  const canProceed = currentResponse.h !== 0 && currentResponse.v !== 0;

  const updateResponse = (key: 'h' | 'v', value: number) => {
    const updated = [...responses];
    updated[step] = { ...updated[step], [key]: value };
    setResponses(updated);
  };

  const next = () => {
    if (step < statements.length - 1) {
      setStep(step + 1);
    } else {
      alert('Thank you for participating in Plurius Stack 001.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Plurius · Stack 001
        </h1>

        <p className="mb-6 text-gray-800">{current.text}</p>

        {/* Horizontal slider */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Agreement
          </label>
          <input
            type="range"
            min={-100}
            max={100}
            value={currentResponse.h}
            onChange={(e) => updateResponse('h', Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Strongly disagree</span>
            <span>Strongly agree</span>
          </div>
        </div>

        {/* Vertical slider (simulated) */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Intensity
          </label>
          <input
            type="range"
            min={-100}
            max={100}
            value={currentResponse.v}
            onChange={(e) => updateResponse('v', Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{current.vLabelMin}</span>
            <span>{current.vLabelMax}</span>
          </div>
        </div>

        <button
          disabled={!canProceed}
          onClick={next}
          className={`w-full py-2 rounded ${
            canProceed
              ? 'bg-black text-white'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          {step < statements.length - 1 ? 'Next' : 'Submit'}
        </button>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Anonymous · Aggregated · No personal data collected
        </p>
      </div>
    </div>
  );
}
