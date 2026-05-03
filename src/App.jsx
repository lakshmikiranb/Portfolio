import { useState, useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════
   DEFAULT DATA
══════════════════════════════════════════════════════════ */
const DEF = {
  hero: {
    name: 'Lakshmi Kiran B',
    title: 'IT Support Engineer',
    tagline: '1.5+ yrs · 100+ users · ITIL 4 Certified · Azure Entra ID',
    location: 'Bengaluru, Karnataka',
    email: 'lakshmi2000kiran@gmail.com',
    phone: '+91-8374056396',
    linkedin: 'linkedin.com/in/lakshmi-kiran-b-76a6581b5',
  },
  summary:
    'IT Support Engineer with 1.5+ years of experience supporting 100+ users in a Windows environment. Handle 25–40 tickets daily within SLA covering Active Directory, DNS/DHCP, endpoint issues, and remote support. Familiar with GPO, Azure Entra ID, and basic PowerShell. ITIL 4 Foundation certified.',
  skills: [
    {
      category: 'OS & Platforms',
      items: ['Windows 10/11', 'Windows Server 2019/2022'],
    },
    {
      category: 'Directory Services',
      items: [
        'Active Directory',
        'Azure Entra ID',
        'GPO',
        'OU Management',
        'User Provisioning',
      ],
    },
    {
      category: 'Networking',
      items: [
        'TCP/IP',
        'DNS',
        'DHCP',
        'IP Configuration',
        'LAN/WAN Troubleshooting',
      ],
    },
    {
      category: 'ITSM',
      items: [
        'Incident Management',
        'SLA Adherence',
        'Root Cause Analysis',
        'Escalation Management',
      ],
    },
    {
      category: 'Remote Support',
      items: ['AnyDesk', 'TightVNC', 'UltraViewer', 'MS Outlook'],
    },
    {
      category: 'Scripting & Security',
      items: ['PowerShell (Basic)', 'Kaspersky Endpoint Security'],
    },
  ],
  experience: [
    {
      role: 'IT Support Engineer',
      company: 'Athena BPO Pvt. Ltd.',
      location: 'Bengaluru',
      period: 'Nov 2024 – Present',
      points: [
        'Resolved 25–40 tickets daily (hardware, software, network) within SLA for 100+ users.',
        'Managed Active Directory — created users, reset passwords, unlocked accounts, updated group memberships.',
        'Fixed DNS and DHCP/IP issues; updated SOPs to prevent recurring problems.',
        'Set up Windows 10/11 laptops — OS, software, Outlook email, and GPO settings for new users.',
        'Used PowerShell for bulk AD tasks; remote support via AnyDesk, TightVNC, and UltraViewer.',
      ],
    },
    {
      role: 'Associate Software Developer – App Support',
      company: 'Mphasis',
      location: 'Bengaluru',
      period: 'Jun 2022 – Nov 2022',
      points: [
        'Handled L1/L2 application support tickets within SLA; root-caused repeat issues.',
        'Raised high-priority issues with logs, steps to reproduce, and user impact details.',
        'Collaborated with dev team during patch releases to fix and close defects on time.',
      ],
    },
    {
      role: 'Technical Intern',
      company: 'VLSIGuru Training Institute',
      location: 'Bengaluru',
      period: 'Feb 2023 – Nov 2023',
      points: [
        'Ran simulation tests and debugged digital design modules.',
        'Maintained test logs and defect reports with structured documentation.',
      ],
    },
  ],
  projects: [
    {
      title: 'Windows Server Home Lab — AD & GPO Environment',
      description:
        'Built a Windows Server 2019 lab with Active Directory: domain (company.local), OUs, user accounts, groups (RBAC). Applied GPOs for desktop lockdown, password rules, and drive mapping. Tested with gpupdate /force, gpresult, nslookup, and ping.',
      tags: ['Windows Server 2019', 'Active Directory', 'GPO', 'RBAC', 'NTFS'],
    },
  ],
  education: [
    {
      degree: 'B.Tech – Electronics & Communication Engineering',
      institution: '',
      cgpa: '7.5 / 10.0',
      year: '',
    },
  ],
  certifications: [
    { name: 'ITIL 4 Foundation', issuer: '', year: '2026' },
    {
      name: 'Data Analytics Masterclass',
      issuer: 'NoviTech R&D Pvt. Ltd.',
      year: 'Dec 2025',
    },
  ],
  resumeFileName: '',
  resumeBase64: '',
};

const PWD = 'LKAdmin@2026';

/* ── Colour palette ── */
const C = {
  bg: '#07090f',
  surface: '#0e1420',
  surfaceHover: '#131c2e',
  border: 'rgba(99,179,237,.15)',
  borderHover: 'rgba(99,179,237,.4)',
  accent: '#63b3ed',
  accentGlow: 'rgba(99,179,237,.18)',
  accentDim: 'rgba(99,179,237,.08)',
  text: '#e2e8f0',
  muted: '#718096',
  danger: '#fc8181',
  success: '#68d391',
};

/* ══════════════════════════════════════════════════════
   STORAGE HOOK
══════════════════════════════════════════════════════════ */
function useStore() {
  const [d, setD] = useState(DEF);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    (async () => {
      try {
        const r = await window.storage?.get('lkb_pf_v6');
        if (r?.value) setD(JSON.parse(r.value));
      } catch (_) {}
    })();
  }, []);

  const save = useCallback(async (next) => {
    setD(next);
    try {
      await window.storage?.set('lkb_pf_v6', JSON.stringify(next));
    } catch (_) {}
  }, []);

  return [d, save];
}

/* ══════════════════════════════════════════════════════
   SHARED UI PRIMITIVES
══════════════════════════════════════════════════════════ */
function Modal({ title, onClose, children, wide }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 18,
          width: '100%',
          maxWidth: wide ? 640 : 480,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: `0 0 100px ${C.accentGlow}, 0 32px 64px rgba(0,0,0,.6)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderBottom: `1px solid ${C.border}`,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              color: C.accent,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            {title}
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: C.muted,
              fontSize: 20,
              cursor: 'pointer',
              lineHeight: 1,
              padding: '2px 6px',
              borderRadius: 4,
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div style={{ overflowY: 'auto', padding: '20px 24px 24px', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

const INP_STYLE = {
  width: '100%',
  background: C.bg,
  border: `1px solid ${C.border}`,
  borderRadius: 8,
  color: C.text,
  padding: '9px 13px',
  fontSize: 13,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  transition: 'border-color .15s',
};
const LBL_STYLE = {
  display: 'block',
  fontSize: 10,
  color: C.muted,
  letterSpacing: 1.5,
  marginBottom: 5,
  fontFamily: 'monospace',
};

function Field({ label, value, onChange, rows, placeholder, type = 'text' }) {
  const [focus, setFocus] = useState(false);
  const style = {
    ...INP_STYLE,
    borderColor: focus ? C.accent : C.border,
    resize: rows ? 'vertical' : undefined,
  };
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={LBL_STYLE}>{label.toUpperCase()}</label>}
      {rows ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          style={style}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={style}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      )}
    </div>
  );
}

function Btn({
  children,
  onClick,
  variant = 'primary',
  disabled,
  style: sx,
  fullWidth,
}) {
  const [hover, setHover] = useState(false);
  const base = {
    border: 'none',
    borderRadius: 8,
    padding: '10px 22px',
    fontSize: 13,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: 0.5,
    transition: 'all .15s',
    opacity: disabled ? 0.4 : 1,
    width: fullWidth ? '100%' : undefined,
  };
  const variants = {
    primary: {
      background: hover ? '#7ec8f7' : C.accent,
      color: '#07090f',
    },
    ghost: {
      background: hover ? C.accentDim : 'transparent',
      border: `1px solid ${hover ? C.borderHover : C.border}`,
      color: hover ? C.text : C.muted,
    },
    danger: {
      background: hover ? 'rgba(252,129,129,.12)' : 'transparent',
      border: `1px solid ${hover ? C.danger : C.danger + '55'}`,
      color: C.danger,
    },
    outline: {
      background: hover ? C.accentDim : 'transparent',
      border: `2px solid ${C.accent}`,
      color: C.accent,
    },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...sx }}
    >
      {children}
    </button>
  );
}

function BtnRow({ children }) {
  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>{children}</div>
  );
}

/* ══════════════════════════════════════════════════════
   ADMIN MODALS
══════════════════════════════════════════════════════════ */
function LoginModal({ onClose, onSuccess }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const submit = () => {
    if (pw === PWD) {
      onSuccess();
      onClose();
    } else {
      setErr(true);
      setShake(true);
      setTimeout(() => setShake(false), 420);
      setTimeout(() => setErr(false), 2500);
    }
  };

  return (
    <Modal title="ADMIN LOGIN" onClose={onClose}>
      <div
        style={{
          textAlign: 'center',
          padding: '10px 0 20px',
          animation: shake ? 'shake .4s ease' : 'none',
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: C.accentDim,
            border: `2px solid ${err ? C.danger : C.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            margin: '0 auto 16px',
            transition: 'border-color .2s',
          }}
        >
          🔐
        </div>
        <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>
          Enter admin password to unlock editing
        </p>
      </div>
      <div style={{ position: 'relative' }}>
        <Field
          label="Password"
          value={pw}
          onChange={setPw}
          type={showPw ? 'text' : 'password'}
          placeholder="••••••••••••"
        />
        <button
          onClick={() => setShowPw((v) => !v)}
          style={{
            position: 'absolute',
            right: 12,
            top: 26,
            background: 'none',
            border: 'none',
            color: C.muted,
            cursor: 'pointer',
            fontSize: 12,
            fontFamily: 'monospace',
          }}
        >
          {showPw ? 'HIDE' : 'SHOW'}
        </button>
      </div>
      {err && (
        <p
          style={{
            color: C.danger,
            fontSize: 12,
            marginTop: -6,
            marginBottom: 12,
            textAlign: 'center',
          }}
        >
          ✕ Incorrect password
        </p>
      )}
      <BtnRow>
        <Btn onClick={submit}>Unlock Admin →</Btn>
        <Btn variant="ghost" onClick={onClose}>
          Cancel
        </Btn>
      </BtnRow>
    </Modal>
  );
}

function HeroModal({ data, onSave, onClose }) {
  const [f, setF] = useState({ ...data });
  const ch = (k) => (v) => setF((p) => ({ ...p, [k]: v }));
  return (
    <Modal title="EDIT HERO SECTION" onClose={onClose}>
      {[
        ['name', 'Full Name'],
        ['title', 'Job Title'],
        ['tagline', 'Tagline'],
        ['location', 'Location'],
        ['email', 'Email'],
        ['phone', 'Phone'],
        ['linkedin', 'LinkedIn URL'],
      ].map(([k, l]) => (
        <Field key={k} label={l} value={f[k]} onChange={ch(k)} />
      ))}
      <BtnRow>
        <Btn
          onClick={() => {
            onSave(f);
            onClose();
          }}
        >
          Save Changes
        </Btn>
        <Btn variant="ghost" onClick={onClose}>
          Cancel
        </Btn>
      </BtnRow>
    </Modal>
  );
}

function SummaryModal({ data, onSave, onClose }) {
  const [v, setV] = useState(data);
  return (
    <Modal title="EDIT ABOUT SUMMARY" onClose={onClose}>
      <Field label="Professional Summary" value={v} onChange={setV} rows={7} />
      <BtnRow>
        <Btn
          onClick={() => {
            onSave(v);
            onClose();
          }}
        >
          Save Changes
        </Btn>
        <Btn variant="ghost" onClick={onClose}>
          Cancel
        </Btn>
      </BtnRow>
    </Modal>
  );
}

function SkillsModal({ data, onSave, onClose }) {
  const [cats, setCats] = useState(
    data.map((c) => ({ ...c, items: [...c.items] }))
  );
  return (
    <Modal title="EDIT SKILLS" onClose={onClose} wide>
      {cats.map((c, i) => (
        <div
          key={i}
          style={{
            background: C.bg,
            borderRadius: 10,
            padding: 14,
            marginBottom: 12,
            border: `1px solid ${C.border}`,
          }}
        >
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <Field
                label="Category Name"
                value={c.category}
                onChange={(v) =>
                  setCats((p) =>
                    p.map((x, xi) => (xi === i ? { ...x, category: v } : x))
                  )
                }
              />
              <Field
                label="Skills (comma-separated)"
                value={c.items.join(', ')}
                onChange={(v) =>
                  setCats((p) =>
                    p.map((x, xi) =>
                      xi === i
                        ? {
                            ...x,
                            items: v
                              .split(',')
                              .map((s) => s.trim())
                              .filter(Boolean),
                          }
                        : x
                    )
                  )
                }
              />
            </div>
            <button
              onClick={() => setCats((p) => p.filter((_, xi) => xi !== i))}
              style={{
                background: 'none',
                border: `1px solid ${C.danger}55`,
                color: C.danger,
                borderRadius: 6,
                padding: '8px 10px',
                cursor: 'pointer',
                fontSize: 14,
                marginTop: 18,
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>
        </div>
      ))}
      <Btn
        variant="ghost"
        onClick={() =>
          setCats((p) => [...p, { category: 'New Category', items: ['Skill'] }])
        }
        fullWidth
        style={{ marginBottom: 14 }}
      >
        + Add Category
      </Btn>
      <BtnRow>
        <Btn
          onClick={() => {
            onSave(cats);
            onClose();
          }}
        >
          Save Changes
        </Btn>
        <Btn variant="ghost" onClick={onClose}>
          Cancel
        </Btn>
      </BtnRow>
    </Modal>
  );
}

function ExpModal({ data, onSave, onClose }) {
  const [exps, setExps] = useState(
    data.map((e) => ({ ...e, points: [...e.points] }))
  );
  const upd = (i, k, v) =>
    setExps((p) => p.map((e, ei) => (ei === i ? { ...e, [k]: v } : e)));
  return (
    <Modal title="EDIT EXPERIENCE" onClose={onClose} wide>
      {exps.map((e, i) => (
        <div
          key={i}
          style={{
            background: C.bg,
            borderRadius: 10,
            padding: 16,
            marginBottom: 14,
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 11,
                color: C.accent,
                letterSpacing: 1,
              }}
            >
              POSITION {i + 1}
            </span>
            <button
              onClick={() => setExps((p) => p.filter((_, ei) => ei !== i))}
              style={{
                background: 'none',
                border: `1px solid ${C.danger}55`,
                color: C.danger,
                borderRadius: 6,
                padding: '4px 12px',
                cursor: 'pointer',
                fontSize: 12,
                fontFamily: 'monospace',
              }}
            >
              Remove
            </button>
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}
          >
            <Field
              label="Role / Title"
              value={e.role}
              onChange={(v) => upd(i, 'role', v)}
            />
            <Field
              label="Company"
              value={e.company}
              onChange={(v) => upd(i, 'company', v)}
            />
            <Field
              label="Location"
              value={e.location}
              onChange={(v) => upd(i, 'location', v)}
            />
            <Field
              label="Period"
              value={e.period}
              onChange={(v) => upd(i, 'period', v)}
              placeholder="e.g. Nov 2024 – Present"
            />
          </div>
          <Field
            label="Bullet Points (one per line)"
            value={e.points.join('\n')}
            onChange={(v) =>
              upd(
                i,
                'points',
                v.split('\n').filter((s) => s.trim())
              )
            }
            rows={5}
          />
        </div>
      ))}
      <Btn
        variant="ghost"
        fullWidth
        onClick={() =>
          setExps((p) => [
            ...p,
            { role: '', company: '', location: '', period: '', points: [] },
          ])
        }
        style={{ marginBottom: 14 }}
      >
        + Add Position
      </Btn>
      <BtnRow>
        <Btn
          onClick={() => {
            onSave(exps);
            onClose();
          }}
        >
          Save Changes
        </Btn>
        <Btn variant="ghost" onClick={onClose}>
          Cancel
        </Btn>
      </BtnRow>
    </Modal>
  );
}

function ProjModal({ data, onSave, onClose }) {
  const [projs, setProjs] = useState(
    data.map((p) => ({ ...p, tags: [...(p.tags || [])] }))
  );
  const upd = (i, k, v) =>
    setProjs((p) => p.map((pr, pi) => (pi === i ? { ...pr, [k]: v } : pr)));
  return (
    <Modal title="EDIT PROJECTS" onClose={onClose} wide>
      {projs.map((pr, i) => (
        <div
          key={i}
          style={{
            background: C.bg,
            borderRadius: 10,
            padding: 16,
            marginBottom: 14,
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 11,
                color: C.accent,
                letterSpacing: 1,
              }}
            >
              PROJECT {i + 1}
            </span>
            <button
              onClick={() => setProjs((p) => p.filter((_, pi) => pi !== i))}
              style={{
                background: 'none',
                border: `1px solid ${C.danger}55`,
                color: C.danger,
                borderRadius: 6,
                padding: '4px 12px',
                cursor: 'pointer',
                fontSize: 12,
                fontFamily: 'monospace',
              }}
            >
              Remove
            </button>
          </div>
          <Field
            label="Project Title"
            value={pr.title}
            onChange={(v) => upd(i, 'title', v)}
          />
          <Field
            label="Description"
            value={pr.description}
            onChange={(v) => upd(i, 'description', v)}
            rows={4}
          />
          <Field
            label="Tags (comma-separated)"
            value={(pr.tags || []).join(', ')}
            onChange={(v) =>
              upd(
                i,
                'tags',
                v
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
          />
        </div>
      ))}
      <Btn
        variant="ghost"
        fullWidth
        onClick={() =>
          setProjs((p) => [...p, { title: '', description: '', tags: [] }])
        }
        style={{ marginBottom: 14 }}
      >
        + Add Project
      </Btn>
      <BtnRow>
        <Btn
          onClick={() => {
            onSave(projs);
            onClose();
          }}
        >
          Save Changes
        </Btn>
        <Btn variant="ghost" onClick={onClose}>
          Cancel
        </Btn>
      </BtnRow>
    </Modal>
  );
}

function EduModal({ education, certifications, onSave, onClose }) {
  const [edu, setEdu] = useState(education.map((e) => ({ ...e })));
  const [certs, setCerts] = useState(certifications.map((c) => ({ ...c })));
  return (
    <Modal title="EDIT EDUCATION & CERTIFICATIONS" onClose={onClose} wide>
      <p
        style={{
          fontFamily: 'monospace',
          fontSize: 10,
          color: C.accent,
          letterSpacing: 1.5,
          marginBottom: 12,
        }}
      >
        EDUCATION
      </p>
      {edu.map((e, i) => (
        <div
          key={i}
          style={{
            background: C.bg,
            borderRadius: 10,
            padding: 14,
            marginBottom: 10,
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 8,
            }}
          >
            <div style={{ flex: 1 }}>
              <Field
                label="Degree / Qualification"
                value={e.degree}
                onChange={(v) =>
                  setEdu((p) =>
                    p.map((x, xi) => (xi === i ? { ...x, degree: v } : x))
                  )
                }
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 8,
                }}
              >
                <Field
                  label="Institution"
                  value={e.institution || ''}
                  onChange={(v) =>
                    setEdu((p) =>
                      p.map((x, xi) =>
                        xi === i ? { ...x, institution: v } : x
                      )
                    )
                  }
                />
                <Field
                  label="CGPA / Grade"
                  value={e.cgpa || ''}
                  onChange={(v) =>
                    setEdu((p) =>
                      p.map((x, xi) => (xi === i ? { ...x, cgpa: v } : x))
                    )
                  }
                />
                <Field
                  label="Year"
                  value={e.year || ''}
                  onChange={(v) =>
                    setEdu((p) =>
                      p.map((x, xi) => (xi === i ? { ...x, year: v } : x))
                    )
                  }
                />
              </div>
            </div>
            <button
              onClick={() => setEdu((p) => p.filter((_, xi) => xi !== i))}
              style={{
                background: 'none',
                border: `1px solid ${C.danger}55`,
                color: C.danger,
                borderRadius: 6,
                padding: '5px 10px',
                cursor: 'pointer',
                fontSize: 14,
                marginTop: 18,
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>
        </div>
      ))}
      <Btn
        variant="ghost"
        fullWidth
        onClick={() =>
          setEdu((p) => [
            ...p,
            { degree: '', institution: '', cgpa: '', year: '' },
          ])
        }
        style={{ marginBottom: 20 }}
      >
        + Add Education
      </Btn>

      <p
        style={{
          fontFamily: 'monospace',
          fontSize: 10,
          color: C.accent,
          letterSpacing: 1.5,
          marginBottom: 12,
        }}
      >
        CERTIFICATIONS
      </p>
      {certs.map((c, i) => (
        <div
          key={i}
          style={{
            background: C.bg,
            borderRadius: 10,
            padding: 14,
            marginBottom: 10,
            border: `1px solid ${C.border}`,
          }}
        >
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 8,
                }}
              >
                <Field
                  label="Certification Name"
                  value={c.name}
                  onChange={(v) =>
                    setCerts((p) =>
                      p.map((x, xi) => (xi === i ? { ...x, name: v } : x))
                    )
                  }
                />
                <Field
                  label="Issuer / Authority"
                  value={c.issuer || ''}
                  onChange={(v) =>
                    setCerts((p) =>
                      p.map((x, xi) => (xi === i ? { ...x, issuer: v } : x))
                    )
                  }
                />
                <Field
                  label="Year"
                  value={c.year || ''}
                  onChange={(v) =>
                    setCerts((p) =>
                      p.map((x, xi) => (xi === i ? { ...x, year: v } : x))
                    )
                  }
                />
              </div>
            </div>
            <button
              onClick={() => setCerts((p) => p.filter((_, xi) => xi !== i))}
              style={{
                background: 'none',
                border: `1px solid ${C.danger}55`,
                color: C.danger,
                borderRadius: 6,
                padding: '5px 10px',
                cursor: 'pointer',
                fontSize: 14,
                marginTop: 18,
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>
        </div>
      ))}
      <Btn
        variant="ghost"
        fullWidth
        onClick={() =>
          setCerts((p) => [...p, { name: '', issuer: '', year: '' }])
        }
        style={{ marginBottom: 14 }}
      >
        + Add Certification
      </Btn>
      <BtnRow>
        <Btn
          onClick={() => {
            onSave({ education: edu, certifications: certs });
            onClose();
          }}
        >
          Save Changes
        </Btn>
        <Btn variant="ghost" onClick={onClose}>
          Cancel
        </Btn>
      </BtnRow>
    </Modal>
  );
}

function ResumeModal({ onSave, onClose, current }) {
  const [file, setFile] = useState(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const ref = useRef();

  const validate = (f) => {
    if (!f) return;
    if (f.type !== 'application/pdf') {
      setErr('Only PDF files are accepted.');
      return false;
    }
    if (f.size > 5 * 1024 * 1024) {
      setErr('File size must be under 5 MB.');
      return false;
    }
    setErr('');
    return true;
  };

  const pick = (e) => {
    const f = e.target.files[0];
    if (validate(f)) setFile(f);
  };

  const drop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (validate(f)) setFile(f);
  };

  const upload = () => {
    if (!file) return;
    setLoading(true);
    const r = new FileReader();
    r.onload = (ev) => {
      onSave({ fileName: file.name, base64: ev.target.result.split(',')[1] });
      setLoading(false);
      onClose();
    };
    r.onerror = () => {
      setErr('Failed to read file. Please try again.');
      setLoading(false);
    };
    r.readAsDataURL(file);
  };

  const clear = (e) => {
    e.stopPropagation();
    setFile(null);
    setErr('');
    if (ref.current) ref.current.value = '';
  };

  return (
    <Modal title="UPLOAD RESUME PDF" onClose={onClose}>
      {current && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: C.accentDim,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            padding: '8px 14px',
            marginBottom: 14,
          }}
        >
          <span style={{ fontSize: 14 }}>📎</span>
          <span style={{ fontSize: 12, color: C.muted, flex: 1 }}>
            Current:{' '}
          </span>
          <span
            style={{ fontSize: 12, color: C.accent, fontFamily: 'monospace' }}
          >
            {current}
          </span>
        </div>
      )}

      <div
        onClick={() => ref.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={drop}
        style={{
          border: `2px dashed ${
            file ? C.success : dragOver ? C.accent : C.border
          }`,
          borderRadius: 12,
          padding: '40px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          background: file
            ? 'rgba(104,211,145,.06)'
            : dragOver
            ? C.accentDim
            : C.bg,
          marginBottom: 14,
          transition: 'all .2s',
        }}
      >
        <div style={{ fontSize: 44, marginBottom: 12 }}>
          {file ? '✅' : '📄'}
        </div>
        {file ? (
          <>
            <p
              style={{
                color: C.success,
                fontSize: 14,
                margin: '0 0 6px',
                fontWeight: 600,
              }}
            >
              {file.name}
            </p>
            <p style={{ color: C.muted, fontSize: 12, margin: '0 0 12px' }}>
              {(file.size / 1024).toFixed(0)} KB · PDF
            </p>
            <button
              onClick={clear}
              style={{
                background: 'none',
                border: `1px solid ${C.border}`,
                color: C.muted,
                borderRadius: 6,
                padding: '5px 14px',
                cursor: 'pointer',
                fontSize: 11,
                fontFamily: 'monospace',
              }}
            >
              Remove
            </button>
          </>
        ) : (
          <>
            <p style={{ color: C.muted, fontSize: 14, margin: 0 }}>
              Click to select or drag & drop PDF
            </p>
            <p
              style={{
                color: C.muted,
                fontSize: 11,
                margin: '6px 0 0',
                opacity: 0.7,
              }}
            >
              Maximum 5 MB
            </p>
          </>
        )}
        <input
          ref={ref}
          type="file"
          accept=".pdf,application/pdf"
          style={{ display: 'none' }}
          onChange={pick}
        />
      </div>

      {err && (
        <div
          style={{
            background: 'rgba(252,129,129,.08)',
            border: `1px solid ${C.danger}55`,
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 12,
          }}
        >
          <p style={{ color: C.danger, fontSize: 12, margin: 0 }}>⚠ {err}</p>
        </div>
      )}

      <BtnRow>
        <Btn onClick={upload} disabled={!file || loading}>
          {loading ? 'Uploading…' : 'Upload & Save'}
        </Btn>
        <Btn variant="ghost" onClick={onClose}>
          Cancel
        </Btn>
      </BtnRow>
    </Modal>
  );
}

/* ══════════════════════════════════════════════════════
   ADMIN PANEL COMPONENTS
══════════════════════════════════════════════════════════ */
function EditChip({ onClick, label = 'Edit' }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? C.accentDim : 'transparent',
        border: `1px solid ${hover ? C.borderHover : C.border}`,
        color: hover ? C.accent : C.muted,
        borderRadius: 6,
        padding: '4px 12px',
        fontSize: 11,
        cursor: 'pointer',
        fontFamily: 'monospace',
        letterSpacing: 0.5,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        transition: 'all .15s',
      }}
    >
      ✎ {label}
    </button>
  );
}

function SectionHeading({ id, label, isAdmin, onEdit }) {
  return (
    <div
      id={id}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        marginBottom: 36,
        paddingTop: 90,
      }}
    >
      <h2
        style={{
          fontFamily: 'monospace',
          fontSize: 11,
          color: C.accent,
          letterSpacing: 3,
          margin: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {label.toUpperCase()}
      </h2>
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(90deg,${C.border},transparent)`,
        }}
      />
      {isAdmin && <EditChip onClick={onEdit} />}
    </div>
  );
}

function AdminBar() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 8000,
        background: `linear-gradient(90deg,${C.accentDim},transparent)`,
        borderBottom: `1px solid ${C.border}`,
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <span style={{ fontSize: 14 }}>⚡</span>
      <span
        style={{
          fontFamily: 'monospace',
          fontSize: 11,
          color: C.accent,
          letterSpacing: 2,
          fontWeight: 700,
        }}
      >
        ADMIN MODE ACTIVE
      </span>
      <span style={{ color: C.muted, fontSize: 11 }}>
        · Click the ✎ Edit buttons next to each section to make changes
      </span>
    </div>
  );
}

/* Floating Action Button */
function FAB({ isAdmin, onLogin, onLogout, onResume }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 9000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 10,
      }}
    >
      {isAdmin && open && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            alignItems: 'flex-end',
          }}
        >
          {[
            {
              icon: '📤',
              label: 'Upload Resume',
              fn: () => {
                onResume();
                setOpen(false);
              },
            },
            {
              icon: '🚪',
              label: 'Log Out',
              fn: () => {
                onLogout();
                setOpen(false);
              },
            },
          ].map(({ icon, label, fn }) => (
            <button
              key={label}
              onClick={fn}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: C.surface,
                border: `1px solid ${C.border}`,
                color: C.text,
                borderRadius: 40,
                padding: '10px 18px 10px 14px',
                fontSize: 13,
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,.5)',
                fontFamily: 'monospace',
                whiteSpace: 'nowrap',
              }}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}

      {!isAdmin && (
        <button
          onClick={onLogin}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: C.surface,
            border: `1px solid ${C.border}`,
            color: C.muted,
            borderRadius: 40,
            padding: '10px 18px',
            fontSize: 12,
            fontFamily: 'monospace',
            boxShadow: '0 4px 20px rgba(0,0,0,.4)',
            cursor: 'pointer',
          }}
        >
          🔐 Admin Login
        </button>
      )}

      {isAdmin && (
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: open ? C.danger : C.accent,
            border: 'none',
            color: '#07090f',
            fontSize: 20,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 4px 24px ${C.accentGlow}`,
            transition: 'all .2s',
          }}
        >
          {open ? '✕' : '⚙'}
        </button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════════════════ */
function Nav({ name }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      document
        .getElementById(id.toLowerCase())
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  const links = [
    'About',
    'Skills',
    'Experience',
    'Projects',
    'Education',
    'Contact',
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 7000,
        background: scrolled ? 'rgba(7,9,15,.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.border}` : 'none',
        transition: 'all .3s',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 60,
          padding: '0 5%',
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              color: C.accent,
              fontSize: 15,
              letterSpacing: 2,
              fontWeight: 700,
            }}
          >
            {initials}
            <span style={{ color: C.muted }}>_dev</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 28 }}>
          {links.map((l) => (
            <NavLink key={l} onClick={() => go(l)}>
              {l}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ children, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'monospace',
        fontSize: 13,
        letterSpacing: 0.5,
        color: hover ? C.text : C.muted,
        transition: 'color .15s',
        position: 'relative',
      }}
    >
      {children}
      {hover && (
        <span
          style={{
            position: 'absolute',
            bottom: -2,
            left: 0,
            right: 0,
            height: 1,
            background: C.accent,
          }}
        />
      )}
    </button>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE SECTIONS
══════════════════════════════════════════════════════════ */
function Hero({ d, isAdmin, onEdit, onDownload }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 0 80px',
        position: 'relative',
      }}
    >
      {/* Glow orb */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '-8%',
          width: 560,
          height: 560,
          background: `radial-gradient(circle,${C.accentGlow} 0%,transparent 65%)`,
          pointerEvents: 'none',
          borderRadius: '50%',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
        <p
          style={{
            fontFamily: 'monospace',
            color: C.accent,
            fontSize: 12,
            letterSpacing: 3,
            marginBottom: 16,
            opacity: 0.9,
          }}
        >
          HELLO, I'M
        </p>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(38px, 7vw, 78px)',
            fontWeight: 800,
            color: C.text,
            lineHeight: 1.04,
            margin: '0 0 12px',
            letterSpacing: -2,
          }}
        >
          {d.hero.name}
        </h1>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(17px, 3vw, 27px)',
            fontWeight: 600,
            color: C.accent,
            margin: '0 0 20px',
          }}
        >
          {d.hero.title}
        </h2>
        <p
          style={{
            color: C.muted,
            fontSize: 15,
            maxWidth: 540,
            lineHeight: 1.85,
            marginBottom: 40,
          }}
        >
          {d.hero.tagline}
        </p>

        <div
          style={{
            display: 'flex',
            gap: 14,
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: 36,
          }}
        >
          <HeroBtn href="#contact" label="Get in Touch →" variant="outline" />
          {d.resumeBase64 && (
            <HeroBtn
              onClick={onDownload}
              label="⬇ Download Resume"
              variant="filled"
            />
          )}
          {isAdmin && <EditChip onClick={onEdit} label="Edit Hero" />}
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { icon: '📍', val: d.hero.location, href: null },
            { icon: '📧', val: d.hero.email, href: `mailto:${d.hero.email}` },
            { icon: '📱', val: d.hero.phone, href: `tel:${d.hero.phone}` },
          ].map(({ icon, val, href }) => (
            <ContactPill key={val} icon={icon} val={val} href={href} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroBtn({ href, onClick, label, variant }) {
  const [hover, setHover] = useState(false);
  const base = {
    display: 'inline-block',
    padding: '13px 30px',
    borderRadius: 8,
    fontFamily: 'monospace',
    fontSize: 13,
    letterSpacing: 1,
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: 700,
    transition: 'all .15s',
    border: 'none',
  };
  const styles = {
    outline: {
      background: hover ? C.accentDim : 'transparent',
      border: `2px solid ${C.accent}`,
      color: C.accent,
    },
    filled: { background: hover ? '#7ec8f7' : C.accent, color: '#07090f' },
  };

  if (href) {
    return (
      <a
        href={href}
        style={{ ...base, ...styles[variant] }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {label}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      style={{ ...base, ...styles[variant] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label}
    </button>
  );
}

function ContactPill({ icon, val, href }) {
  const [hover, setHover] = useState(false);
  const el = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        background: hover && href ? C.surfaceHover : C.surface,
        border: `1px solid ${hover && href ? C.borderHover : C.border}`,
        borderRadius: 20,
        padding: '6px 14px',
        color: hover && href ? C.text : C.muted,
        fontSize: 12,
        fontFamily: 'monospace',
        transition: 'all .15s',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span>{icon}</span> {val}
    </div>
  );
  if (href)
    return (
      <a href={href} style={{ textDecoration: 'none' }}>
        {el}
      </a>
    );
  return el;
}

function About({ d, isAdmin, onEdit }) {
  const stats = [
    { val: '25–40', label: 'Tickets/Day' },
    { val: '100+', label: 'Users' },
    { val: '1.5+', label: 'Years Exp.' },
    { val: 'ITIL 4', label: 'Certified' },
  ];
  return (
    <>
      <SectionHeading
        id="about"
        label="About Me"
        isAdmin={isAdmin}
        onEdit={onEdit}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 48,
          alignItems: 'start',
        }}
      >
        <p
          style={{
            color: C.muted,
            fontSize: 15,
            lineHeight: 1.95,
            maxWidth: 660,
          }}
        >
          {d.summary}
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            minWidth: 220,
          }}
        >
          {stats.map(({ val, label }) => (
            <div
              key={label}
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: '16px 12px',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 20,
                  color: C.accent,
                  margin: '0 0 4px',
                }}
              >
                {val}
              </p>
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: 9,
                  color: C.muted,
                  letterSpacing: 1.5,
                  margin: 0,
                }}
              >
                {label.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Skills({ d, isAdmin, onEdit }) {
  return (
    <>
      <SectionHeading
        id="skills"
        label="Skills"
        isAdmin={isAdmin}
        onEdit={onEdit}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: 16,
        }}
      >
        {d.skills.map((cat, i) => (
          <SkillCard key={i} cat={cat} />
        ))}
      </div>
    </>
  );
}

function SkillCard({ cat }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${hover ? C.borderHover : C.border}`,
        borderRadius: 12,
        padding: '18px 20px',
        transition: 'all .2s',
        transform: hover ? 'translateY(-3px)' : 'none',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p
        style={{
          fontFamily: 'monospace',
          fontSize: 10,
          color: C.accent,
          letterSpacing: 2,
          marginBottom: 14,
        }}
      >
        {cat.category.toUpperCase()}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {cat.items.map((item, j) => (
          <span
            key={j}
            style={{
              background: C.accentDim,
              border: `1px solid ${C.border}`,
              color: C.text,
              borderRadius: 20,
              padding: '4px 12px',
              fontSize: 12,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Experience({ d, isAdmin, onEdit }) {
  return (
    <>
      <SectionHeading
        id="experience"
        label="Experience"
        isAdmin={isAdmin}
        onEdit={onEdit}
      />
      <div style={{ position: 'relative', paddingLeft: 30 }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 8,
            bottom: 8,
            width: 2,
            background: `linear-gradient(180deg,${C.accent},${C.border})`,
            borderRadius: 2,
          }}
        />
        {d.experience.map((exp, i) => (
          <ExpCard key={i} exp={exp} />
        ))}
      </div>
    </>
  );
}

function ExpCard({ exp }) {
  return (
    <div style={{ position: 'relative', marginBottom: 46 }}>
      <div
        style={{
          position: 'absolute',
          left: -37,
          top: 8,
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: C.accent,
          boxShadow: `0 0 0 4px ${C.accentDim}`,
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10,
          marginBottom: 12,
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: C.text,
              margin: '0 0 5px',
            }}
          >
            {exp.role}
          </h3>
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: 12,
              color: C.accent,
              margin: 0,
            }}
          >
            {exp.company}
            {exp.location ? ` · ${exp.location}` : ''}
          </p>
        </div>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 11,
            color: C.muted,
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 20,
            padding: '5px 14px',
            whiteSpace: 'nowrap',
            alignSelf: 'flex-start',
          }}
        >
          {exp.period}
        </span>
      </div>
      <ul style={{ paddingLeft: 18, margin: 0 }}>
        {exp.points.map((pt, j) => (
          <li
            key={j}
            style={{
              color: C.muted,
              fontSize: 14,
              lineHeight: 1.85,
              marginBottom: 5,
            }}
          >
            {pt}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Projects({ d, isAdmin, onEdit }) {
  return (
    <>
      <SectionHeading
        id="projects"
        label="Projects"
        isAdmin={isAdmin}
        onEdit={onEdit}
      />
      {d.projects.length === 0 ? (
        <p style={{ color: C.muted, fontSize: 14 }}>No projects added yet.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20,
          }}
        >
          {d.projects.map((p, i) => (
            <ProjectCard key={i} p={p} />
          ))}
        </div>
      )}
    </>
  );
}

function ProjectCard({ p }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${hover ? C.borderHover : C.border}`,
        borderRadius: 14,
        padding: 24,
        transition: 'all .2s',
        transform: hover ? 'translateY(-4px)' : 'none',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ fontSize: 28, marginBottom: 12 }}>⚙️</div>
      <h3
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 16,
          fontWeight: 700,
          color: C.text,
          marginBottom: 12,
          lineHeight: 1.4,
        }}
      >
        {p.title}
      </h3>
      <p
        style={{
          color: C.muted,
          fontSize: 13,
          lineHeight: 1.85,
          marginBottom: 18,
        }}
      >
        {p.description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {(p.tags || []).map((t, j) => (
          <span
            key={j}
            style={{
              fontFamily: 'monospace',
              fontSize: 10,
              background: C.accentDim,
              border: `1px solid ${C.border}`,
              color: C.accent,
              borderRadius: 4,
              padding: '3px 10px',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Education({ d, isAdmin, onEdit }) {
  return (
    <>
      <SectionHeading
        id="education"
        label="Education & Certifications"
        isAdmin={isAdmin}
        onEdit={onEdit}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div>
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: 10,
              color: C.accent,
              letterSpacing: 2,
              marginBottom: 14,
            }}
          >
            EDUCATION
          </p>
          {d.education.map((e, i) => (
            <div
              key={i}
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: 20,
                marginBottom: 12,
              }}
            >
              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: C.text,
                  margin: '0 0 8px',
                  lineHeight: 1.4,
                }}
              >
                {e.degree}
              </p>
              {e.institution && (
                <p style={{ color: C.muted, fontSize: 13, margin: '0 0 5px' }}>
                  {e.institution}
                </p>
              )}
              {e.cgpa && (
                <p
                  style={{
                    fontFamily: 'monospace',
                    color: C.accent,
                    fontSize: 12,
                    margin: '0 0 4px',
                  }}
                >
                  CGPA: {e.cgpa}
                </p>
              )}
              {e.year && (
                <p style={{ color: C.muted, fontSize: 12, margin: 0 }}>
                  {e.year}
                </p>
              )}
            </div>
          ))}
          {d.education.length === 0 && (
            <p style={{ color: C.muted, fontSize: 13 }}>
              No education entries.
            </p>
          )}
        </div>
        <div>
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: 10,
              color: C.accent,
              letterSpacing: 2,
              marginBottom: 14,
            }}
          >
            CERTIFICATIONS
          </p>
          {d.certifications.map((c, i) => (
            <div
              key={i}
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: 18,
                marginBottom: 12,
                display: 'flex',
                gap: 14,
              }}
            >
              <span style={{ fontSize: 24, flexShrink: 0 }}>🎖️</span>
              <div>
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    color: C.text,
                    margin: '0 0 4px',
                  }}
                >
                  {c.name}
                </p>
                {c.issuer && (
                  <p
                    style={{ color: C.muted, fontSize: 12, margin: '0 0 4px' }}
                  >
                    {c.issuer}
                  </p>
                )}
                <p
                  style={{
                    fontFamily: 'monospace',
                    color: C.accent,
                    fontSize: 11,
                    margin: 0,
                    letterSpacing: 1,
                  }}
                >
                  {c.year}
                </p>
              </div>
            </div>
          ))}
          {d.certifications.length === 0 && (
            <p style={{ color: C.muted, fontSize: 13 }}>
              No certifications added.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

function Contact({ d }) {
  const items = [
    {
      icon: '📧',
      label: 'Email',
      val: d.hero.email,
      href: `mailto:${d.hero.email}`,
    },
    {
      icon: '📱',
      label: 'Phone',
      val: d.hero.phone,
      href: `tel:${d.hero.phone}`,
    },
    {
      icon: '🔗',
      label: 'LinkedIn',
      val: d.hero.linkedin,
      href: `https://${d.hero.linkedin.replace(/^https?:\/\//, '')}`,
    },
    { icon: '📍', label: 'Location', val: d.hero.location, href: null },
  ];
  return (
    <>
      <SectionHeading id="contact" label="Get In Touch" isAdmin={false} />
      <p
        style={{
          color: C.muted,
          fontSize: 15,
          maxWidth: 480,
          marginBottom: 32,
          lineHeight: 1.8,
        }}
      >
        Available for new opportunities. Feel free to reach out — I typically
        respond within 24 hours.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16,
        }}
      >
        {items.map(({ icon, label, val, href }) => (
          <ContactCard
            key={label}
            icon={icon}
            label={label}
            val={val}
            href={href}
          />
        ))}
      </div>
    </>
  );
}

function ContactCard({ icon, label, val, href }) {
  const [hover, setHover] = useState(false);
  const inner = (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${hover && href ? C.borderHover : C.border}`,
        borderRadius: 12,
        padding: 20,
        transition: 'all .2s',
        transform: hover && href ? 'translateY(-3px)' : 'none',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span style={{ fontSize: 24 }}>{icon}</span>
      <p
        style={{
          fontFamily: 'monospace',
          fontSize: 9,
          color: C.muted,
          letterSpacing: 2,
          margin: '10px 0 5px',
        }}
      >
        {label.toUpperCase()}
      </p>
      <p
        style={{
          color: hover && href ? C.accent : C.text,
          fontSize: 12,
          margin: 0,
          wordBreak: 'break-all',
          transition: 'color .15s',
        }}
      >
        {val}
      </p>
    </div>
  );
  if (href)
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : '_self'}
        rel="noreferrer"
        style={{ textDecoration: 'none' }}
      >
        {inner}
      </a>
    );
  return inner;
}

/* ══════════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════════════ */
export default function App() {
  const [d, saveD] = useStore();
  const [isAdmin, setIsAdmin] = useState(false);
  const [modal, setModal] = useState(null);

  const patch = (k, v) => saveD({ ...d, [k]: v });

  const downloadResume = () => {
    if (!d.resumeBase64) return;
    try {
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${d.resumeBase64}`;
      link.download = d.resumeFileName || 'Lakshmi_Kiran_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (_) {}
  };

  const closeModal = useCallback(() => setModal(null), []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:${C.bg};color:${C.text};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased;}
        ::-webkit-scrollbar{width:5px;background:${C.bg};}
        ::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px;}
        @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}
        a{color:inherit;text-decoration:none;}
        ul{list-style:disc;}
      `}</style>

      {/* Dot-grid background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: `radial-gradient(circle,${C.border} 1px,transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {isAdmin && <AdminBar />}
      <Nav name={d.hero.name} />

      <main
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 5%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Hero
          d={d}
          isAdmin={isAdmin}
          onEdit={() => setModal('hero')}
          onDownload={downloadResume}
        />
        <About d={d} isAdmin={isAdmin} onEdit={() => setModal('summary')} />
        <Skills d={d} isAdmin={isAdmin} onEdit={() => setModal('skills')} />
        <Experience
          d={d}
          isAdmin={isAdmin}
          onEdit={() => setModal('experience')}
        />
        <Projects d={d} isAdmin={isAdmin} onEdit={() => setModal('projects')} />
        <Education d={d} isAdmin={isAdmin} onEdit={() => setModal('eduCert')} />
        <Contact d={d} />

        <footer
          style={{
            textAlign: 'center',
            padding: '50px 0 30px',
            borderTop: `1px solid ${C.border}`,
            marginTop: 60,
          }}
        >
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: 11,
              color: C.muted,
              letterSpacing: 2,
            }}
          >
            © {new Date().getFullYear()} {d.hero.name.toUpperCase()} · ALL
            RIGHTS RESERVED
          </p>
        </footer>
      </main>

      <FAB
        isAdmin={isAdmin}
        onLogin={() => setModal('login')}
        onLogout={() => {
          setIsAdmin(false);
          setModal(null);
        }}
        onResume={() => setModal('resume')}
      />

      {/* Modals */}
      {modal === 'login' && (
        <LoginModal onClose={closeModal} onSuccess={() => setIsAdmin(true)} />
      )}
      {modal === 'hero' && isAdmin && (
        <HeroModal
          data={d.hero}
          onSave={(v) => patch('hero', v)}
          onClose={closeModal}
        />
      )}
      {modal === 'summary' && isAdmin && (
        <SummaryModal
          data={d.summary}
          onSave={(v) => patch('summary', v)}
          onClose={closeModal}
        />
      )}
      {modal === 'skills' && isAdmin && (
        <SkillsModal
          data={d.skills}
          onSave={(v) => patch('skills', v)}
          onClose={closeModal}
        />
      )}
      {modal === 'experience' && isAdmin && (
        <ExpModal
          data={d.experience}
          onSave={(v) => patch('experience', v)}
          onClose={closeModal}
        />
      )}
      {modal === 'projects' && isAdmin && (
        <ProjModal
          data={d.projects}
          onSave={(v) => patch('projects', v)}
          onClose={closeModal}
        />
      )}
      {modal === 'eduCert' && isAdmin && (
        <EduModal
          education={d.education}
          certifications={d.certifications}
          onSave={(v) => saveD({ ...d, ...v })}
          onClose={closeModal}
        />
      )}
      {modal === 'resume' && isAdmin && (
        <ResumeModal
          current={d.resumeFileName}
          onSave={(v) =>
            saveD({ ...d, resumeFileName: v.fileName, resumeBase64: v.base64 })
          }
          onClose={closeModal}
        />
      )}
    </>
  );
}
