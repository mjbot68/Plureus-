'use client';

import { useMemo, useState } from 'react';

type Statement = {
  id: string;
  text: string;
  vLabelMin: string;
  vLabelMax: string;
};

const STACK_001: Statement[] = [
  {
    id: 's1',
    text: 'An election result is legitimate if it follows established rules, even when my preferred candidate loses.',
    vLabelMin: 'Not strongly held',
    vLabelMax: 'Very strongly held',
  },
  {
    id: 's2',
    text: 'I would accept outcomes I strongly disagree with if it meant preserving trust in the election process.',
    vLabelMin: 'Low willingness',
    vLabelMax: 'High willingness',
  },
  {
    id: 's3',
    text: 'I trust the election system more than political leaders to determine fair outcomes.',
    vLabelMin: 'Low trust',
    vLabelMax: 'High trust',
  },
];
STACK 001 — UPDATED TEST

  const statements = useMemo(() => STACK_001, []);
  const [step, setStep] = useState(0);

  // h = agreement, v = intensity
  const [answers, setAnswers] = useState(
    statements.map(() => ({ h: 0, v: 0 }))
  );

  const current = statements[step];
  const currentAns = answers[step];

  const canProceed = currentAns.h !== 0 && currentAns.v !== 0;

  function update(key: 'h' | 'v', value: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = { ...next[step], [key]: value };
      return next;
    });
  }

  function next() {
    if (!canProceed) return;
    if (step < statements.length - 1) {
      setStep(step + 1);
      return;
    }
    // For now: just confirm submission locally.
    // Later we’ll POST to /api/ballot and show a thank-you screen.
    alert('Thanks — your responses were recorded locally (MVP).');
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 flex items-start justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow p-6">
        <header className="mb-6">
          <h1 className="text-xl font-semibold text-center">
            Stack 001 Voting
          </h1>
          <div className="mt-2 text-center text-xs text-gray-500">
            Question {step + 1} of {statements.length}
          </div>
        </header>

        <section className="mb-6">
          <p className="text-gray-900 text-base leading-relaxed">
            {current.text}
          </p>
        </section>

        <section className="mb-6">
          <label className="block text-sm font-medium mb-2">Agreement</label>
          <input
            type="range"
            min={-100}
            max={100}
            value={currentAns.h}
            onChange={(e) => update('h', Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Strongly disagree</span>
            <span>Strongly agree</span>
          </div>
        </section>

        <section className="mb-8">
          <label className="block text-sm font-medium mb-2">Intensity</label>
          <input
            type="range"
            min={-100}
            max={100}
            value={currentAns.v}
            onChange={(e) => update('v', Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{current.vLabelMin}</span>
            <span>{current.vLabelMax}</span>
          </div>
        </section>

        <button
          disabled={!canProceed}
          onClick={next}
          className={`w-full py-2.5 rounded-lg font-medium ${
            canProceed
              ? 'bg-black text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {step < statements.length - 1 ? 'Next' : 'Submit'}
        </button>

        <p className="mt-4 text-center text-xs text-gray-400">
          Anonymous · Aggregated · No personal data collected
        </p>
      </div>
    </main>
  );
}
