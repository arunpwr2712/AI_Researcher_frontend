"use client";

interface Summary {
  title: string;
  summary: string;
}

interface SummaryEditorProps {
  summary: Summary;
}

export default function SummaryEditor({ summary }: SummaryEditorProps) {
  return (
    <div className="border p-2 my-2 rounded">
      <h3 className="font-bold">{summary.title}</h3>
      <p>{summary.summary}</p>
    </div>
  );
}
