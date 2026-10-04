---
name: omniroute
description: >
  Guides configuration and orchestration of the OmniRoute AI Gateway
  (diegosouzapw/OmniRoute). Manages multi-provider pooling (Claude, Gemini, OpenAI,
  DeepSeek), automatic quota fallback, token compression (RTK + Caveman), and
  unified local API endpoints (http://127.0.0.1:20128/v1).
---

# OmniRoute Gateway Skill

OmniRoute is a self-hosted AI gateway that provides a single OpenAI-compatible endpoint
aggregating multiple model providers with intelligent rate-limit fallbacks and token compression.

## Local Gateway Endpoints
- **Base URL**: `http://127.0.0.1:20128/v1`
- **Health / Status**: `http://127.0.0.1:20128/health`
- **Dashboard UI**: `http://127.0.0.1:20128/`

## Core Capabilities
1. **Multi-Provider Pooling**: Combine Gemini, Claude, OpenAI, and DeepSeek keys into a single fallback chain.
2. **Quota-Aware Fallback**: If a primary model hits a 429 (rate limit) or outage, OmniRoute seamlessly shifts to the next designated provider.
3. **Token Compression (RTK + Caveman)**: Automatically compresses prompt context by 15%–90% without losing semantic meaning.
4. **Tool Compatibility**: Drop-in replacement for OpenAI base URLs in Cursor, Claude Code, Cline, Aider, and Antigravity SDK.

## Quick Start on macOS
Run the bundled script in `.agents/plugins/omniroute/scripts/start-omniroute.sh` or run:
```bash
# Via Docker:
docker run -d --name omniroute -p 127.0.0.1:20128:20128 diegosouzapw/omniroute:latest

# Or via npm:
npm install -g omniroute
omniroute start
```
