"use client";

import {
  Activity,
  BarChart3,
  BookOpen,
  BriefcaseMedical,
  ClipboardList,
  FileText,
  HeartPulse,
  Moon,
  Save,
  ShieldAlert,
  Stethoscope,
  Sun,
} from "lucide-react";
import { useState } from "react";

import { adminRows, caseHistory, demoCase, demoResponse } from "@/lib/demo-data";

type AppMode = "clinician" | "admin";
type ThemeMode = "light" | "dark";
type RationaleTab = "rationale" | "evidence" | "safety";

export default function Home() {
  const [appMode, setAppMode] = useState<AppMode>("clinician");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [tab, setTab] = useState<RationaleTab>("rationale");

  return (
    <main className={theme === "dark" ? "app dark" : "app"}>
      <Sidebar appMode={appMode} setAppMode={setAppMode} />
      <section className="workspace">
        <TopBar appMode={appMode} theme={theme} setTheme={setTheme} />
        {appMode === "clinician" ? (
          <ClinicianWorkspace tab={tab} setTab={setTab} />
        ) : (
          <AdminDashboard />
        )}
      </section>
    </main>
  );
}

function Sidebar({
  appMode,
  setAppMode,
}: {
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
}) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <HeartPulse size={34} />
        <div>
          <strong>CardioBot v2</strong>
          <span>AI Workbench for Cardiology</span>
        </div>
      </div>

      <nav className="nav">
        <button className={appMode === "clinician" ? "active" : ""} onClick={() => setAppMode("clinician")}>
          <BriefcaseMedical size={18} /> Case Workspace
        </button>
        <button>
          <Activity size={18} /> ECG Review
        </button>
        <button>
          <ClipboardList size={18} /> Medication Dosing
        </button>
        <button>
          <FileText size={18} /> History
        </button>
        <button className={appMode === "admin" ? "active" : ""} onClick={() => setAppMode("admin")}>
          <BarChart3 size={18} /> Admin Quality
        </button>
      </nav>

      <div className="sidebarFooter">
        <div className="avatar">JO</div>
        <div>
          <strong>Justin</strong>
          <span>Demo workspace</span>
        </div>
      </div>
    </aside>
  );
}

function TopBar({
  appMode,
  theme,
  setTheme,
}: {
  appMode: AppMode;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}) {
  return (
    <header className="topbar">
      <div>
        <span className="eyebrow">{appMode === "clinician" ? "Clinician Mode" : "Admin Mode"}</span>
        <h1>{appMode === "clinician" ? "Case Workspace" : "Admin Quality Dashboard"}</h1>
      </div>
      <div className="topbarActions">
        <button className="ghostButton">New Case</button>
        <button className="ghostButton">
          <Save size={16} /> Save Case
        </button>
        <button className="iconButton" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label="Toggle theme">
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
}

function ClinicianWorkspace({
  tab,
  setTab,
}: {
  tab: RationaleTab;
  setTab: (tab: RationaleTab) => void;
}) {
  return (
    <div className="content clinicianGrid">
      <section className="caseStrip">
        {[
          ["Case ID", demoCase.caseId],
          ["Age", demoCase.age],
          ["Sex", demoCase.sex],
          ["Weight", `${demoCase.weightKg} kg`],
          ["Setting", demoCase.setting],
          ["Chief Concern", demoCase.chiefConcern],
          ["Allergies", demoCase.allergies],
        ].map(([label, value]) => (
          <div className="caseField" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>

      <section className="questionPanel panel">
        <h2>Current Clinical Question</h2>
        <textarea defaultValue="What is the most likely diagnosis and immediate next steps?" />
        <button className="primaryButton">Ask</button>
      </section>

      <section className="agentPanel panel">
        <div className="panelHeader">
          <h2><Stethoscope size={20} /> Cardiology Consult Agent</h2>
          <span className="statusPill">Review Required</span>
        </div>
        <ResponseSection title="Clinical Impression" items={[demoResponse.clinicalImpression]} />
        <ResponseSection title="Immediate Actions" items={demoResponse.recommendedActions} ordered />
        <ResponseSection title="Missing Data" items={demoResponse.rationale.missingData} />
        <ResponseSection title="Safety Flags" items={demoResponse.safetyFlags} danger />
      </section>

      <aside className="rightRail">
        <section className="panel">
          <div className="tabs">
            <button className={tab === "rationale" ? "selected" : ""} onClick={() => setTab("rationale")}>Clinical Rationale</button>
            <button className={tab === "evidence" ? "selected" : ""} onClick={() => setTab("evidence")}>Guideline Evidence</button>
            <button className={tab === "safety" ? "selected" : ""} onClick={() => setTab("safety")}>Safety Review</button>
          </div>
          <TabContent tab={tab} />
        </section>

        <section className="panel historyPanel">
          <h2>Case History</h2>
          {caseHistory.map((item) => (
            <div className="historyRow" key={item.caseId}>
              <span>{item.caseId}</span>
              <small>{item.date}</small>
            </div>
          ))}
        </section>
      </aside>
    </div>
  );
}

function ResponseSection({
  title,
  items,
  ordered = false,
  danger = false,
}: {
  title: string;
  items: string[];
  ordered?: boolean;
  danger?: boolean;
}) {
  const List = ordered ? "ol" : "ul";
  return (
    <div className={danger ? "responseSection danger" : "responseSection"}>
      <h3>{title}</h3>
      <List>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </List>
    </div>
  );
}

function TabContent({ tab }: { tab: RationaleTab }) {
  if (tab === "evidence") {
    return (
      <div className="tabBody">
        <EvidenceCard title="ACS guideline excerpt" confidence="High" text="Early ECG and serial troponin testing are central to ACS evaluation." />
        <EvidenceCard title="Medication safety excerpt" confidence="Moderate" text="Antithrombotic therapy requires bleeding risk and contraindication review." />
      </div>
    );
  }

  if (tab === "safety") {
    return (
      <div className="tabBody">
        <h3><ShieldAlert size={18} /> Safety Review</h3>
        <p>Human clinician review is required before acting on recommendations.</p>
        <ul>
          {demoResponse.safetyFlags.map((flag) => (
            <li key={flag}>{flag}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="tabBody">
      <h3>Key Facts Considered</h3>
      <ul>{demoResponse.rationale.keyFacts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
      <h3>Differential Considerations</h3>
      <ul>{demoResponse.rationale.differentialConsiderations.map((item) => <li key={item}>{item}</li>)}</ul>
      <h3>Why Urgent ACS Evaluation</h3>
      <p>Chest pain in the ED is time-sensitive. The system prioritizes ruling out high-risk cardiac causes while identifying missing data.</p>
    </div>
  );
}

function EvidenceCard({ title, confidence, text }: { title: string; confidence: string; text: string }) {
  return (
    <article className="evidenceCard">
      <div>
        <strong>{title}</strong>
        <span>{confidence}</span>
      </div>
      <p>{text}</p>
    </article>
  );
}

function AdminDashboard() {
  return (
    <div className="content adminGrid">
      {[
        ["Clinical QA Eval Pass Rate", "94.1%"],
        ["Dosing Calculator Tests", "100%"],
        ["Safety Review Catch Rate", "98.7%"],
        ["Median Latency", "2.4s"],
      ].map(([label, value]) => (
        <section className="metricCard" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
          <small>Last 7 days</small>
        </section>
      ))}

      <section className="panel chartPanel">
        <h2>Eval Pass Rate by Agent</h2>
        <div className="lineChart" aria-hidden="true">
          <span style={{ height: "74%" }} />
          <span style={{ height: "82%" }} />
          <span style={{ height: "79%" }} />
          <span style={{ height: "88%" }} />
          <span style={{ height: "84%" }} />
          <span style={{ height: "91%" }} />
        </div>
      </section>

      <section className="panel safetyEvents">
        <h2>Recent Safety Events</h2>
        <SafetyEvent title="Blocked dosing request" severity="High" />
        <SafetyEvent title="Missing ECG image quality" severity="Medium" />
        <SafetyEvent title="Urgent escalation flag" severity="High" />
      </section>

      <section className="panel tablePanel">
        <h2>Failed or Review-Required Cases</h2>
        <table>
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Agent</th>
              <th>Failure Type</th>
              <th>Severity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {adminRows.map((row) => (
              <tr key={row.caseId}>
                <td>{row.caseId}</td>
                <td>{row.agent}</td>
                <td>{row.type}</td>
                <td>{row.severity}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function SafetyEvent({ title, severity }: { title: string; severity: string }) {
  return (
    <div className="safetyEvent">
      <ShieldAlert size={18} />
      <div>
        <strong>{title}</strong>
        <span>{severity}</span>
      </div>
    </div>
  );
}
