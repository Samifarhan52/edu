---
name: code-review
description: >
  Conducts structured pre-commit / pre-merge code review against specifications,
  security checks, performance benchmarks, and backward compatibility.
---

# Code Review Skill

Before declaring any coding task finished:
1. **Diff Inspection**: Review `git diff` to ensure no unintended edits, commented-out dead code, or temporary logs remain.
2. **Spec Compliance**: Verify each requirement from the user's prompt against the implemented code.
3. **Security & Input Sanitization**: Check inputs for injection risks, unescaped HTML, and sensitive credentials.
4. **Responsive & Cross-Browser Verification**: Ensure layout integrity on mobile, tablet, and desktop viewports.
5. **Clean Working Tree**: Verify working tree state and provide a clear, structured summary to the user.
