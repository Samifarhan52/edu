# Project Agent Guidelines & Active Plugins

This repository is configured with the standard **Agent Plugins & Skills** architecture (`.agents/`), incorporating **Ponytail**, **Superpowers**, and **OmniRoute** workflows.

---

## 1. Active Plugins Overview

### 🧘 Ponytail (`.agents/plugins/ponytail`)
Channels a minimalist senior developer: "The best code is the code you never wrote."
- **The Decision Ladder**:
  1. Does it need to exist at all? (YAGNI – skip speculative work).
  2. Already in this codebase? Reuse existing helpers, patterns, and components.
  3. Does standard library do it? Use built-in APIs.
  4. Does native platform/browser feature cover it? Use semantic HTML and CSS over JS bloat.
  5. Does an already-installed dependency solve it? Never add new packages unnecessarily.
  6. Can it be one line? Keep it concise.
  7. Only then: Write the minimum robust code that works.
- **Root-Cause Fixes**: Diagnose and fix bugs at the root source rather than patching symptoms across multiple call sites.

### ⚡ Superpowers (`.agents/plugins/superpowers`)
Disciplined software engineering methodology:
- **Brainstorming**: When requirements are broad or novel, explore 2–3 approaches and confirm trade-offs with the user before implementing.
- **Writing Plans**: Generate a clear step-by-step plan before making non-trivial modifications.
- **Test-Driven & Verification**: Validate each step with immediate checks, reproduction tests, and syntax verification.
- **Code Review**: Inspect diffs for clean formatting, security, input sanitization, and regression avoidance before concluding tasks.

### 🌐 OmniRoute (`.agents/plugins/omniroute`)
Local AI Gateway & Multi-Provider Router:
- **Local Endpoint**: `http://127.0.0.1:20128/v1`
- **Fallback**: Aggregates models (Gemini, Claude, OpenAI, DeepSeek) with automatic rate-limit and quota failover.
- **Compression**: Activates RTK + Caveman token compression to maximize speed and token efficiency.

---

## 2. Coding Standards for The Edu Consultant & ElavateX
- **Branding**: Website name is strictly **The Edu Consultant**. Developer signature and agency portal is **ElavateX** (`ElavateX.com`).
- **Contacts**: Developer lead is **Farhan** (`+91 7676808068`). Admissions consultancy hotline is `+91 9845371459`.
- **Zero-FOUC & Speed**: Avoid rendering flickers; keep critical entry animations inline and self-contained.
- **Version Control**: Keep commits structured, descriptive, and atomic.
