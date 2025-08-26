"use client";
import { useEffect, useMemo, useRef, useState } from "react";

// Simple chat message type
type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTED_SECTIONS = [
  "Project Scope",
  "GIS Inputs",
  "Bill of Quantities (BoQ)",
  "Compliance",
  "Timeline & Milestones",
  "Costing & Budget",
  "Risk Assessment",
  "Procurement Strategy",
  "Approvals & Clearances",
  "Sustainability & Environment",
];

export default function Page() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hello! I can help generate a Detailed Project Report (DPR). Tell me the project name, location, and key objectives to begin." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q) return;
    setInput("");
    setBusy(true);
    const next = [...messages, { role: "user", content: q } as Msg];
    setMessages(next);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.a || "Noted." }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I couldn't fetch a response. Please try again." },
      ]);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  // Create a lightweight DPR from collected chat context
  const dpr = useMemo(() => {
    const all = messages.map((m) => `${m.role === "user" ? "User" : "AI"}: ${m.content}`).join("\n");
    const extract = (kw: string) => {
      const lines = all.split(/\n/).filter((l) => l.toLowerCase().includes(kw.toLowerCase()));
      return lines.map((l) => l.replace(/^\w+:\s*/, "")).join("\n");
    };
    return {
      title: "Draft DPR",
      scope: extract("scope"),
      gis: extract("gis"),
      boq: extract("boq"),
      compliance: extract("compliance"),
      timeline: extract("timeline"),
      costing: extract("cost"),
      risk: extract("risk"),
      procurement: extract("procure"),
      approvals: extract("approval"),
      sustainability: extract("environment") || extract("sustainability"),
    };
  }, [messages]);

  return (
    <div className="container">
      <div className="card" style={{ marginBottom: 12 }}>
        <h2>AI DPR Generation</h2>
        <p className="muted">A full chat-based workflow capturing all DPR elements. Use quick prompts to structure inputs.</p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr)", gap: "1rem" }}>
        {/* Chat panel */}
        <div className="card" style={{ display: "flex", flexDirection: "column", minHeight: 520 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Chat</div>

          {/* Quick prompts */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
            {SUGGESTED_SECTIONS.map((s) => (
              <button
                key={s}
                className="badge"
                style={{ cursor: "pointer", border: "1px solid var(--border)" }}
                onClick={() => send(`Let's capture ${s.toLowerCase()}: `)}
                disabled={busy}
                aria-label={`Add ${s}`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflow: "auto", border: "1px solid var(--border)", borderRadius: 10, padding: ".75rem", background: "var(--panel-2)" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", margin: "6px 0" }}>
                <div
                  style={{
                    maxWidth: "80%",
                    padding: ".5rem .65rem",
                    borderRadius: 10,
                    background: m.role === "user" ? "#0ea5e9" : "white",
                    color: m.role === "user" ? "white" : "var(--text)",
                    border: m.role === "user" ? "none" : "1px solid var(--border)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <input
              ref={inputRef}
              className="search"
              placeholder="Type your message, e.g., 'Project scope: 10 km urban road upgrade in Bhopal with 4 bridges'"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) send();
              }}
            />
            <button className="btn" onClick={() => send()} disabled={busy}>Send</button>
          </div>
        </div>

        {/* DPR Outline and Preview */}
        <div className="card" style={{ minHeight: 520, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontWeight: 600 }}>DPR Outline</div>
          <ol style={{ margin: 0, paddingLeft: "1.25rem" }}>
            <li>Executive Summary</li>
            <li>Project Scope</li>
            <li>GIS Inputs</li>
            <li>Bill of Quantities (BoQ)</li>
            <li>Compliance</li>
            <li>Timeline & Milestones</li>
            <li>Costing & Budget</li>
            <li>Risk Assessment</li>
            <li>Procurement Strategy</li>
            <li>Approvals & Clearances</li>
            <li>Sustainability & Environment</li>
          </ol>

          <div className="card" style={{ background: "var(--panel-2)" }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Draft Preview</div>
            <div style={{ fontSize: 14 }}>
              <strong>Project Scope</strong>
              <div className="muted" style={{ whiteSpace: "pre-wrap" }}>{dpr.scope || "—"}</div>

              <strong>GIS Inputs</strong>
              <div className="muted" style={{ whiteSpace: "pre-wrap" }}>{dpr.gis || "—"}</div>

              <strong>Bill of Quantities (BoQ)</strong>
              <div className="muted" style={{ whiteSpace: "pre-wrap" }}>{dpr.boq || "—"}</div>

              <strong>Compliance</strong>
              <div className="muted" style={{ whiteSpace: "pre-wrap" }}>{dpr.compliance || "—"}</div>

              <strong>Timeline & Milestones</strong>
              <div className="muted" style={{ whiteSpace: "pre-wrap" }}>{dpr.timeline || "—"}</div>

              <strong>Costing & Budget</strong>
              <div className="muted" style={{ whiteSpace: "pre-wrap" }}>{dpr.costing || "—"}</div>

              <strong>Risk Assessment</strong>
              <div className="muted" style={{ whiteSpace: "pre-wrap" }}>{dpr.risk || "—"}</div>

              <strong>Procurement Strategy</strong>
              <div className="muted" style={{ whiteSpace: "pre-wrap" }}>{dpr.procurement || "—"}</div>

              <strong>Approvals & Clearances</strong>
              <div className="muted" style={{ whiteSpace: "pre-wrap" }}>{dpr.approvals || "—"}</div>

              <strong>Sustainability & Environment</strong>
              <div className="muted" style={{ whiteSpace: "pre-wrap" }}>{dpr.sustainability || "—"}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="btn"
              onClick={() => {
                const blob = new Blob([
                  `DPR (Draft)\n\n` +
                    `Project Scope\n${dpr.scope || "-"}\n\n` +
                    `GIS Inputs\n${dpr.gis || "-"}\n\n` +
                    `BoQ\n${dpr.boq || "-"}\n\n` +
                    `Compliance\n${dpr.compliance || "-"}\n\n` +
                    `Timeline\n${dpr.timeline || "-"}\n\n` +
                    `Costing\n${dpr.costing || "-"}\n\n` +
                    `Risk\n${dpr.risk || "-"}\n\n` +
                    `Procurement\n${dpr.procurement || "-"}\n\n` +
                    `Approvals\n${dpr.approvals || "-"}\n\n` +
                    `Sustainability\n${dpr.sustainability || "-"}\n`,
                ], { type: "text/plain" });
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = "DPR-draft.txt";
                a.click();
                URL.revokeObjectURL(a.href);
              }}
            >
              Download Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}