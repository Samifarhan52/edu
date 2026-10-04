---
name: ponytail-audit
description: >
  Audits existing code or files for over-engineering, unnecessary dependencies,
  redundant wrapper layers, dead code, and bloated abstractions. Use when
  asked to review, audit, simplify, or clean up code for maximum simplicity and performance.
---

# Ponytail Code Audit

Conduct a ruthless audit of the requested files or codebase focusing on:
1. **Dead Code & Unused Assets**: Identify unused imports, uncalled functions, and obsolete styles.
2. **Redundant Dependencies**: Spot third-party libraries that could easily be replaced with native browser or standard library APIs.
3. **Speculative Abstractions**: Highlight classes, interfaces, or helper files created with only a single implementation or no real consumer.
4. **Simplification Opportunities**: Propose direct, high-impact diffs that reduce lines of code without altering behavior.
