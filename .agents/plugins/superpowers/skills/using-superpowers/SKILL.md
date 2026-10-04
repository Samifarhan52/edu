---
name: using-superpowers
description: >
  Foundational meta-skill that establishes disciplined engineering habits.
  Instructs the agent to check for and activate appropriate structured skills
  (brainstorming, writing plans, test-driven development, code review) before
  rushing into implementation.
---

# Using Superpowers

Before taking action on non-trivial tasks:
1. **Assess the Task Scope**: Does this change affect architecture, multi-file interactions, or user workflows?
2. **Select the Right Process**:
   - For novel features or unclear requirements: Trigger `brainstorming`.
   - For multi-step implementation: Trigger `writing-plans`.
   - For bug fixes or logic changes: Trigger `test-driven-development`.
   - Before finishing or merging: Trigger `code-review`.
3. **Execute Systematically**: Do not skip planning to jump straight into writing code. Validate each step before advancing to the next.
