"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import {
    X, Eye, EyeOff, User, Mail, Phone, Lock, Stethoscope,
    UserCog, Shield, Heart, Activity, CheckCircle2, ArrowLeft,
    Building2, MapPin, Clock, FileText, GraduationCap,
} from "lucide-react";
import { useAuthModal } from "@/lib/context/auth-modal";
import { shakeField } from "@/lib/animations/auth";

type View = "signin" | "signup" | "doctor-onboarding";

/* ─────────────────────────────────────────────
   Logo
───────────────────────────────────────────── */
function Logo({ variant = "teal" }: { variant?: "teal" | "white" }) {
    const fill = variant === "white" ? "white" : "#228573";
    const rightFill = variant === "white" ? "rgba(255,255,255,0.28)" : "#e8e8e8";
    const rightStroke = variant === "white" ? "rgba(255,255,255,0.45)" : "#c8c8c8";
    const divider = variant === "white" ? "rgba(255,255,255,0.55)" : "#ffffff";
    const textColor = variant === "white" ? "white" : "#1f6f5a";
    return (
        <div className="flex flex-col items-center gap-0.5 shrink-0">
            <svg width="60" height="40" viewBox="0 0 68 46" fill="none">
                <circle cx="22" cy="8" r="2.8" fill={fill} />
                <circle cx="30" cy="3" r="3.8" fill={fill} />
                <circle cx="39" cy="5" r="2.4" fill={fill} />
                <circle cx="46" cy="11" r="1.8" fill={fill} opacity="0.75" />
                <path d="M34 18 H16 C9.373 18 4 23.373 4 30 C4 36.627 9.373 42 16 42 H34 Z" fill={fill} />
                <path d="M34 18 H52 C58.627 18 64 23.373 64 30 C64 36.627 58.627 42 52 42 H34 Z"
                    fill={rightFill} stroke={rightStroke} strokeWidth="1" />
                <line x1="34" y1="17" x2="34" y2="43" stroke={divider} strokeWidth="2" />
            </svg>
            <span className="font-extrabold tracking-widest uppercase"
                style={{ color: textColor, fontSize: "11px", letterSpacing: "0.18em" }}>
                AUSHADHAM
            </span>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Left-panel illustration (compact)
───────────────────────────────────────────── */
function PanelIllustration({ view }: { view: View }) {
    return (
        <svg viewBox="0 0 240 260" fill="none" className="w-full h-auto max-w-[210px]">
            <circle cx="120" cy="130" r="108" fill="white" opacity="0.05" />
            <circle cx="120" cy="130" r="78"  fill="white" opacity="0.04" />

            {/* Heart-rate line (universal) */}
            <path d="M22 155 L56 155 L70 127 L87 184 L102 143 L116 155 L218 155"
                stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />

            {view === "signin" && (
                <>
                    {/* Stethoscope */}
                    <path d="M79 60 C79 60 67 85 67 108 C67 128 79 138 95 138 C111 138 125 125 125 105 C125 83 111 68 111 68"
                        stroke="white" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.85" />
                    <circle cx="111" cy="61" r="11" fill="white" opacity="0.9" />
                    <circle cx="111" cy="61" r="6"  fill="#228573" />
                    <circle cx="79"  cy="60" r="5"  fill="white" opacity="0.7" />
                    <circle cx="83"  cy="46" r="5"  fill="white" opacity="0.7" />
                    {/* Shield / trust */}
                    <path d="M114 196 C114 196 97 189 97 204 C97 219 114 229 114 229 C114 229 131 219 131 204 C131 189 114 196 114 196Z"
                        fill="white" opacity="0.14" stroke="white" strokeWidth="1.5" />
                    <path d="M107 209 L112 215 L122 202" stroke="white" strokeWidth="2.2"
                        strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                </>
            )}

            {view === "signup" && (
                <>
                    {/* Person silhouette */}
                    <circle cx="120" cy="76" r="30" fill="white" opacity="0.11" stroke="white" strokeWidth="1.5" />
                    <circle cx="120" cy="68" r="18" fill="white" opacity="0.18" />
                    <path d="M87 111 C87 95 102 87 120 87 C138 87 153 95 153 111 L158 127 H82 Z"
                        fill="white" opacity="0.14" />
                    {/* Plus badge */}
                    <rect x="154" y="46" width="8"  height="30" rx="4" fill="white" opacity="0.55" />
                    <rect x="141" y="58" width="30" height="8"  rx="4" fill="white" opacity="0.55" />
                </>
            )}

            {view === "doctor-onboarding" && (
                <>
                    {/* Clipboard */}
                    <rect x="74"  y="45" width="92" height="112" rx="10" fill="white" opacity="0.09" stroke="white" strokeWidth="1.5" />
                    <rect x="94"  y="35" width="52" height="22"  rx="6"  fill="white" opacity="0.13" />
                    <path d="M89 79 h62 M89 94 h46 M89 109 h52 M89 124 h36"
                        stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.48" />
                    <text x="81" y="77" fontSize="9" fill="white" opacity="0.85"
                        fontFamily="Inter,sans-serif" fontWeight="700">Rx</text>
                    {/* Small stethoscope */}
                    <path d="M148 155 C148 155 138 168 138 178 C138 187 144 191 151 191 C158 191 164 185 164 176 C164 165 157 157 157 157"
                        stroke="white" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.7" />
                    <circle cx="157" cy="153" r="8" fill="white" opacity="0.8" />
                    <circle cx="157" cy="153" r="4" fill="#228573" />
                </>
            )}

            {/* Floating pill capsule (top-right) */}
            <rect x="155" y="25" width="57" height="23" rx="11.5" fill="white" opacity="0.11" stroke="white" strokeWidth="1.4" />
            <rect x="155" y="25" width="28" height="23" rx="11.5" fill="white" opacity="0.1" />
            <line x1="183" y1="25" x2="183" y2="48" stroke="white" strokeWidth="1.2" opacity="0.4" />

            {/* Floating dots (animated via GSAP) */}
            <circle cx="40"  cy="202" r="4" fill="white" opacity="0.2"  className="auth-float" />
            <circle cx="200" cy="218" r="6" fill="white" opacity="0.15" className="auth-float" />
            <circle cx="218" cy="93"  r="3" fill="white" opacity="0.18" className="auth-float" />
            <circle cx="28"  cy="100" r="5" fill="white" opacity="0.13" className="auth-float" />
        </svg>
    );
}

/* ─────────────────────────────────────────────
   Left decorative panel
───────────────────────────────────────────── */
function LeftPanel({ view }: { view: View }) {
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!panelRef.current) return;
        const blobs = Array.from(panelRef.current.querySelectorAll<HTMLElement>(".auth-float"));
        const tweens = blobs.map((el, i) =>
            gsap.to(el, {
                y: i % 2 === 0 ? -10 : 9,
                x: i % 3 === 0 ? 5 : -4,
                duration: 3.5 + i * 0.6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.4,
            })
        );
        return () => tweens.forEach(t => t.kill());
    }, []);

    const cfg: Record<View, { title: string; subtitle: string }> = {
        signin: { title: "Welcome back.", subtitle: "Your health journey continues here." },
        signup: { title: "Join 10,000+ users.", subtitle: "Access top doctors, anytime, anywhere." },
        "doctor-onboarding": { title: "Almost there.", subtitle: "Complete your profile to go live." },
    };
    const { title, subtitle } = cfg[view];

    return (
        <div
            ref={panelRef}
            className="hidden lg:flex w-[260px] shrink-0 flex-col items-center justify-between px-6 py-8"
            style={{ background: "linear-gradient(160deg, #065b4b 0%, #1a7a65 52%, #228573 100%)" }}
        >
            {/* Logo */}
            <Logo variant="white" />

            {/* Illustration + tagline */}
            <div className="flex flex-col items-center gap-5 flex-1 justify-center">
                <div className="auth-panel-text text-center">
                    <h2 className="text-[19px] font-extrabold text-white leading-tight mb-1.5">{title}</h2>
                    <p className="text-sm text-white/60 leading-relaxed">{subtitle}</p>
                </div>
                <PanelIllustration view={view} />
            </div>

            {/* Trust badges */}
            <div className="flex items-end justify-center gap-5">
                {([
                    { Icon: Shield,   value: "100%",  label: "Secure" },
                    { Icon: Heart,    value: "10K+",  label: "Users" },
                    { Icon: Activity, value: "4.9★",  label: "Rating" },
                ] as const).map(({ Icon, value, label }) => (
                    <div key={label} className="auth-panel-badge flex flex-col items-center gap-1">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "rgba(255,255,255,0.13)" }}>
                            <Icon size={12} className="text-white" />
                        </div>
                        <span className="text-white font-bold text-xs">{value}</span>
                        <span className="text-white/50 text-[10px]">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Shared input
───────────────────────────────────────────── */
function AuthInput({
    id, label, type = "text", placeholder, icon: Icon, rightSlot, required = true, value, onChange,
}: {
    id: string; label: string; type?: string; placeholder: string;
    icon: React.ElementType; rightSlot?: React.ReactNode; required?: boolean;
    value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="auth-field flex flex-col gap-1.5">
            <label htmlFor={id} className="text-sm font-semibold" style={{ color: "#065b4b" }}>
                {label}{required && <span className="ml-0.5" style={{ color: "#228573" }}>*</span>}
            </label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#228573" }}>
                    <Icon size={15} />
                </span>
                <input
                    id={id} name={id} type={type} placeholder={placeholder}
                    required={required} autoComplete={id}
                    value={value} onChange={onChange}
                    className="w-full pl-11 pr-12 py-3 rounded-full border text-sm outline-none transition-all duration-200"
                    style={{ borderColor: "#e5e7eb", color: "#065b4b", backgroundColor: "#fafffe" }}
                    onFocus={e => { e.currentTarget.style.borderColor = "#228573"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34,133,115,0.12)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
                />
                {rightSlot && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2">{rightSlot}</span>
                )}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Sign In view
───────────────────────────────────────────── */
function SignInView({ onSwitch }: { onSwitch: (v: View) => void }) {
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), 1500); // TODO: wire backend
    }

    return (
        <div>
            <div className="lg:hidden auth-logo flex justify-center mb-4">
                <Logo variant="teal" />
            </div>

            <h2 className="auth-field text-[20px] font-extrabold mb-1" style={{ color: "#065b4b" }}>
                Welcome back
            </h2>
            <p className="auth-field text-sm mb-5" style={{ color: "rgba(6,91,75,0.55)" }}>
                Sign in to your Aushadham account
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <AuthInput
                    id="identifier" label="Email or Phone" placeholder="you@example.com or +91…" icon={Mail}
                />
                <AuthInput
                    id="signin-password" label="Password"
                    type={showPw ? "text" : "password"} placeholder="Your password" icon={Lock}
                    rightSlot={
                        <button type="button" onClick={() => setShowPw(v => !v)}
                            className="text-gray-400 hover:text-[#228573] transition-colors"
                            aria-label={showPw ? "Hide password" : "Show password"}>
                            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    }
                />

                <div className="auth-field flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input type="checkbox" className="accent-[#228573] rounded" />
                        <span style={{ color: "rgba(6,91,75,0.6)" }}>Remember me</span>
                    </label>
                    <button type="button" className="font-semibold hover:underline"
                        style={{ color: "#228573" }}>
                        Forgot password?
                    </button>
                </div>

                <button
                    type="submit" disabled={loading}
                    className="auth-cta w-full py-3.5 rounded-full text-white font-bold text-sm mt-1 transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[rgba(34,133,115,0.28)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #065b4b 0%, #228573 100%)" }}
                >
                    {loading
                        ? <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                            Signing in…
                        </span>
                        : "Sign In"
                    }
                </button>
            </form>

            <p className="auth-footer-link text-center mt-4 text-sm" style={{ color: "rgba(6,91,75,0.6)" }}>
                Don&apos;t have an account?{" "}
                <button onClick={() => onSwitch("signup")}
                    className="font-bold hover:underline" style={{ color: "#228573" }}>
                    Sign up
                </button>
            </p>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Sign Up view
───────────────────────────────────────────── */
type Role = "patient" | "doctor";
const ROLES: { key: Role; label: string; icon: React.ElementType }[] = [
    { key: "patient", label: "Patient",           icon: User },
    { key: "doctor",  label: "Doctor / Dietitian", icon: Stethoscope },
];

function SignUpView({ onSwitch }: { onSwitch: (v: View) => void }) {
    const [role, setRole]         = useState<Role>("patient");
    const [showPw, setShowPw]     = useState(false);
    const [agreed, setAgreed]     = useState(false);
    const [loading, setLoading]   = useState(false);
    const [pw, setPw]             = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const pwMatch = confirmPw === "" || pw === confirmPw;
    const pillRef        = useRef<HTMLDivElement>(null);
    const roleSelectorRef = useRef<HTMLDivElement>(null);

    function handleRoleChange(newRole: Role) {
        if (newRole === role) return;
        const idx = ROLES.findIndex(r => r.key === newRole);
        if (pillRef.current && roleSelectorRef.current) {
            const totalW  = roleSelectorRef.current.offsetWidth;
            const padding = 4; // p-1 = 4px
            const pillW   = (totalW - padding * 2) / 2;
            gsap.to(pillRef.current, { x: idx * pillW, duration: 0.32, ease: "power2.inOut" });
        }
        setRole(newRole);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!agreed) {
            const el = document.querySelector<HTMLElement>(".auth-terms-row");
            if (el) shakeField(el);
            return;
        }
        if (!pwMatch || confirmPw === "") return;
        setLoading(true);
        if (role === "doctor") {
            setTimeout(() => { setLoading(false); onSwitch("doctor-onboarding"); }, 700);
        } else {
            setTimeout(() => setLoading(false), 1500); // TODO: wire backend
        }
    }

    return (
        <div>
            <div className="lg:hidden auth-logo flex justify-center mb-3">
                <Logo variant="teal" />
            </div>

            <h2 className="auth-field text-[20px] font-extrabold mb-1" style={{ color: "#065b4b" }}>
                Create your account
            </h2>
            <p className="auth-field text-sm mb-4" style={{ color: "rgba(6,91,75,0.55)" }}>
                Join Aushadham – your health companion
            </p>

            {/* Role selector — sliding pill */}
            <div
                ref={roleSelectorRef}
                className="auth-field relative grid grid-cols-2 p-1 mb-4 rounded-full"
                style={{ backgroundColor: "#e8f5f2" }}
            >
                {/* The sliding pill — sits behind the buttons */}
                <div
                    ref={pillRef}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        top: 4, bottom: 4, left: 4,
                        width: "calc(50% - 4px)",
                        backgroundColor: "#228573",
                        boxShadow: "0 4px 14px rgba(34,133,115,0.28)",
                    }}
                />
                {ROLES.map(({ key, label, icon: Icon }) => {
                    const active = role === key;
                    return (
                        <button
                            key={key} id={`role-tab-${key}`} type="button"
                            onClick={() => handleRoleChange(key)}
                            className="relative z-10 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-semibold transition-colors duration-200"
                            style={{ color: active ? "white" : "rgba(6,91,75,0.55)" }}
                            aria-pressed={active}
                        >
                            <Icon size={14} />
                            {label}
                        </button>
                    );
                })}
            </div>

            {/* Doctor notice */}
            {role === "doctor" && (
                <div className="auth-field flex items-start gap-2 px-3 py-2 rounded-2xl mb-2"
                    style={{ backgroundColor: "#f0faf7", border: "1px solid #c8ebe3" }}>
                    <UserCog size={13} style={{ color: "#228573", marginTop: "1px", flexShrink: 0 }} />
                    <p className="text-[11px] leading-relaxed" style={{ color: "#065b4b" }}>
                        You&apos;ll complete a <strong>Doctor Onboarding</strong> form after this step.
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" noValidate>
                {/* Name row */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="auth-field flex flex-col gap-1.5">
                        <label htmlFor="firstName" className="text-sm font-semibold" style={{ color: "#065b4b" }}>
                            First Name<span style={{ color: "#228573" }}>*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#228573" }}>
                                <User size={14} />
                            </span>
                            <input id="firstName" type="text" placeholder="First" required
                                className="w-full pl-10 pr-3 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                                style={{ borderColor: "#e5e7eb", color: "#065b4b", backgroundColor: "#fafffe" }}
                                onFocus={e => { e.currentTarget.style.borderColor = "#228573"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34,133,115,0.12)"; }}
                                onBlur={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
                            />
                        </div>
                    </div>
                    <div className="auth-field flex flex-col gap-1.5">
                        <label htmlFor="lastName" className="text-sm font-semibold" style={{ color: "#065b4b" }}>
                            Last Name<span style={{ color: "#228573" }}>*</span>
                        </label>
                        <input id="lastName" type="text" placeholder="Last" required
                            className="w-full px-3.5 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                            style={{ borderColor: "#e5e7eb", color: "#065b4b", backgroundColor: "#fafffe" }}
                            onFocus={e => { e.currentTarget.style.borderColor = "#228573"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34,133,115,0.12)"; }}
                            onBlur={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                    </div>
                </div>

                <AuthInput id="email"    label="Email"        type="email" placeholder="you@example.com"    icon={Mail} />
                <AuthInput id="phone"    label="Phone Number" type="tel"   placeholder="+91 XXXXX XXXXX"    icon={Phone} />
                <AuthInput
                    id="signup-password" label="Password"
                    type={showPw ? "text" : "password"} placeholder="Create a strong password" icon={Lock}
                    rightSlot={
                        <button type="button" onClick={() => setShowPw(v => !v)}
                            className="text-gray-400 hover:text-[#228573] transition-colors"
                            aria-label="Toggle password visibility">
                            {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                    }
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                />

                {/* Confirm Password — with live match indicator */}
                <div className="auth-field flex flex-col gap-1.5">
                    <label htmlFor="signup-confirm-password" className="text-sm font-semibold" style={{ color: "#065b4b" }}>
                        Re-enter Password<span style={{ color: "#228573" }}>*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: confirmPw === "" ? "#228573" : pwMatch ? "#22c55e" : "#ef4444" }}>
                            <Lock size={15} />
                        </span>
                        <input
                            id="signup-confirm-password" name="signup-confirm-password"
                            type={showPw ? "text" : "password"} placeholder="Repeat your password"
                            required value={confirmPw}
                            onChange={(e) => setConfirmPw(e.target.value)}
                            className="w-full pl-11 pr-12 py-3 rounded-full border text-sm outline-none transition-all duration-200"
                            style={{
                                borderColor: confirmPw === "" ? "#e5e7eb" : pwMatch ? "#22c55e" : "#ef4444",
                                color: "#065b4b",
                                backgroundColor: "#fafffe",
                                boxShadow: confirmPw !== "" ? (pwMatch ? "0 0 0 3px rgba(34,197,94,0.12)" : "0 0 0 3px rgba(239,68,68,0.12)") : "none",
                            }}
                            onFocus={e => {
                                if (confirmPw === "") { e.currentTarget.style.borderColor = "#228573"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34,133,115,0.12)"; }
                            }}
                            onBlur={e => {
                                if (confirmPw === "") { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }
                            }}
                        />
                        {confirmPw !== "" && (
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold" style={{ color: pwMatch ? "#22c55e" : "#ef4444" }}>
                                {pwMatch ? "✓" : "✗"}
                            </span>
                        )}
                    </div>
                    {!pwMatch && confirmPw !== "" && (
                        <p className="text-xs" style={{ color: "#ef4444" }}>Passwords do not match</p>
                    )}
                </div>

                {/* Terms */}
                <div className="auth-terms-row auth-field flex items-start gap-2">
                    <button
                        type="button" onClick={() => setAgreed(v => !v)}
                        className="mt-0.5 shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200"
                        style={agreed
                            ? { backgroundColor: "#228573", borderColor: "#228573" }
                            : { backgroundColor: "white", borderColor: "#d1d5db" }
                        }
                        aria-checked={agreed} role="checkbox"
                    >
                        {agreed && <CheckCircle2 size={12} className="text-white" />}
                    </button>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(6,91,75,0.62)" }}>
                        I agree to Aushadham&apos;s{" "}
                        <span className="font-semibold cursor-pointer hover:underline" style={{ color: "#228573" }}>Terms of Service</span>
                        {" "}and{" "}
                        <span className="font-semibold cursor-pointer hover:underline" style={{ color: "#228573" }}>Privacy Policy</span>
                    </p>
                </div>

                <button
                    type="submit" disabled={loading}
                    className="auth-cta w-full py-3.5 rounded-full text-white font-bold text-sm mt-1 transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[rgba(34,133,115,0.28)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #065b4b 0%, #228573 100%)" }}
                >
                    {loading
                        ? <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                            {role === "doctor" ? "Continuing…" : "Creating account…"}
                        </span>
                        : role === "doctor" ? "Continue to Doctor Profile →" : "Create Account"
                    }
                </button>
            </form>

            <p className="auth-footer-link text-center mt-4 text-sm" style={{ color: "rgba(6,91,75,0.6)" }}>
                Already have an account?{" "}
                <button onClick={() => onSwitch("signin")}
                    className="font-bold hover:underline" style={{ color: "#228573" }}>
                    Sign in
                </button>
            </p>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Doctor Onboarding view
───────────────────────────────────────────── */
function DoctorOnboardingView({ onSwitch }: { onSwitch: (v: View) => void }) {
    const [loading, setLoading] = useState(false);
    const { closeModal } = useAuthModal();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => { setLoading(false); closeModal(); }, 1500); // TODO: wire backend
    }

    return (
        <div>
            {/* Back */}
            <button onClick={() => onSwitch("signup")}
                className="auth-field flex items-center gap-1.5 text-xs font-semibold mb-3 hover:underline"
                style={{ color: "#228573" }}>
                <ArrowLeft size={12} /> Back to sign up
            </button>

            {/* Step indicator */}
            <div className="auth-field flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
                        style={{ backgroundColor: "rgba(34,133,115,0.14)", color: "#228573" }}>1</div>
                    <span className="text-xs font-semibold" style={{ color: "rgba(6,91,75,0.42)" }}>Basic Info</span>
                </div>
                <div className="flex-1 h-px" style={{ backgroundColor: "#228573", opacity: 0.5 }} />
                <div className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#228573" }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className="flex-1 h-px" style={{ backgroundColor: "#228573" }} />
                <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
                        style={{ backgroundColor: "#228573", color: "white" }}>2</div>
                    <span className="text-xs font-bold" style={{ color: "#065b4b" }}>Doctor Profile</span>
                </div>
            </div>

            <h2 className="auth-field text-[18px] font-extrabold mb-0.5" style={{ color: "#065b4b" }}>
                Your professional profile
            </h2>
            <p className="auth-field text-xs mb-3" style={{ color: "rgba(6,91,75,0.55)" }}>
                Verified by our medical team before you go live.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5" noValidate>
                <AuthInput id="regNumber"       label="Medical Registration Number" placeholder="MCI-XXXXXXXX"              icon={FileText} />
                <AuthInput id="specialization"  label="Specialization"              placeholder="e.g. Ayurveda, Cardiology" icon={GraduationCap} />

                <div className="grid grid-cols-2 gap-2">
                    <AuthInput id="experience" label="Years of Experience" type="number" placeholder="e.g. 5"    icon={Clock} />
                    <AuthInput id="location"   label="City / Location"                  placeholder="e.g. Mumbai" icon={MapPin} />
                </div>

                <AuthInput id="clinic" label="Clinic / Hospital Name" placeholder="Your clinic or hospital" icon={Building2} />

                <div className="auth-field flex flex-col gap-1">
                    <label htmlFor="bio" className="text-xs font-semibold" style={{ color: "#065b4b" }}>
                        Professional Bio<span style={{ color: "#228573" }}>*</span>
                    </label>
                    <textarea
                        id="bio" name="bio" rows={2}
                        placeholder="Brief introduction about your practice and expertise…"
                        className="w-full px-4 py-2 rounded-2xl border text-sm outline-none transition-all duration-200 resize-none"
                        style={{ borderColor: "#e5e7eb", color: "#065b4b", backgroundColor: "#fafffe" }}
                        onFocus={e => { e.currentTarget.style.borderColor = "#228573"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34,133,115,0.12)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                </div>

                <button
                    type="submit" disabled={loading}
                    className="auth-cta w-full py-2.5 rounded-full text-white font-bold text-sm mt-0.5 transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[rgba(34,133,115,0.28)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #065b4b 0%, #228573 100%)" }}
                >
                    {loading
                        ? <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                            Submitting application…
                        </span>
                        : "Submit Application"
                    }
                </button>
            </form>

            <p className="auth-footer-link text-[10px] text-center mt-2" style={{ color: "rgba(6,91,75,0.42)" }}>
                Our team reviews credentials within 24–48 hours. You&apos;ll receive an email once verified.
            </p>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Main Modal
───────────────────────────────────────────── */
export default function AuthModal() {
    const { view, closeModal } = useAuthModal();
    const [currentView, setCurrentView] = useState<View>("signin");
    const [mounted, setMounted] = useState(false);
    const backdropRef = useRef<HTMLDivElement>(null);
    const modalRef    = useRef<HTMLDivElement>(null);
    const contentRef  = useRef<HTMLDivElement>(null);

    useEffect(() => setMounted(true), []);

    // Keep internal view in sync with context
    useEffect(() => {
        if (view) setCurrentView(view as View);
    }, [view]);

    const isOpen = view !== null;

    // Open animation
    useEffect(() => {
        if (!isOpen || !backdropRef.current || !modalRef.current) return;
        gsap.fromTo(backdropRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(modalRef.current,
            { scale: 0.91, opacity: 0, y: 22 },
            { scale: 1, opacity: 1, y: 0, duration: 0.48, ease: "back.out(1.5)", delay: 0.05 }
        );
        gsap.from(".auth-field",
            { y: 13, opacity: 0, stagger: 0.065, duration: 0.42, delay: 0.32, overwrite: true }
        );
        gsap.fromTo(".auth-cta",
            { y: 11, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, delay: 0.72, clearProps: "opacity,transform", overwrite: true }
        );
    }, [isOpen]);

    // Close with animation
    const handleClose = useCallback(() => {
        if (!backdropRef.current || !modalRef.current) { closeModal(); return; }
        gsap.to(modalRef.current,   { scale: 0.94, opacity: 0, y: 14, duration: 0.22, ease: "power2.in" });
        gsap.to(backdropRef.current, { opacity: 0, duration: 0.26, delay: 0.06, onComplete: closeModal });
    }, [closeModal]);

    // Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
        if (isOpen) window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, handleClose]);

    // Body scroll lock
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // Animated view switch
    function switchView(newView: View) {
        if (newView === currentView || !contentRef.current) {
            setCurrentView(newView);
            return;
        }
        gsap.to(contentRef.current, {
            x: -22, opacity: 0, duration: 0.18, ease: "power2.in",
            onComplete: () => {
                setCurrentView(newView);
                gsap.fromTo(contentRef.current!,
                    { x: 24, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.28, ease: "power2.out" }
                );
                gsap.from(".auth-field",
                    { y: 10, opacity: 0, stagger: 0.06, duration: 0.35, delay: 0.06, overwrite: true }
                );
                gsap.fromTo(".auth-cta",
                    { y: 9, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.35, delay: 0.42, clearProps: "opacity,transform", overwrite: true }
                );
            },
        });
    }

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5"
            aria-modal="true" role="dialog" aria-label="Aushadham authentication">

            {/* Backdrop */}
            <div
                ref={backdropRef}
                className="absolute inset-0 bg-black/55 backdrop-blur-[6px]"
                onClick={handleClose}
                aria-hidden
            />

            {/* Modal card */}
            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-[860px] max-h-[92vh] flex rounded-3xl overflow-hidden"
                style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.28), 0 8px 32px rgba(0,0,0,0.16)" }}
                onClick={e => e.stopPropagation()}
            >
                {/* Left panel */}
                {/* Lock panel to "signup" for both signup and doctor-onboarding so it never changes */}
                <LeftPanel view="signup" />

                {/* Close button (sits over both panels) */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-black/10 hover:scale-110"
                    style={{ color: "rgba(6,91,75,0.55)" }}
                    aria-label="Close dialog"
                >
                    <X size={18} />
                </button>

                {/* Right panel — form */}
                <div className="flex-1 bg-white overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                    <div className="min-h-full flex items-start lg:items-center justify-center px-7 py-7 md:px-10">
                        <div ref={contentRef} className="w-full max-w-[400px]">
                            {currentView === "signin"             && <SignInView           onSwitch={switchView} />}
                            {currentView === "signup"             && <SignUpView            onSwitch={switchView} />}
                            {currentView === "doctor-onboarding"  && <DoctorOnboardingView onSwitch={switchView} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
