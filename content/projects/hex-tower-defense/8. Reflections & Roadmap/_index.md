---
title: "Reflections & Roadmap"
layout: "project"
weight: 1
pre: "3. "
---

### Lessons Learned

This project was the first time I truly organized a codebase around a clear structure, with a complete separation between logic and view. The most important takeaways:

**On architecture and code organization:**
- I genuinely understood *why* logic must be separated from view — before this, I had only heard the advice but never truly *felt* the difference until I debugged directly inside a cleanly separated codebase.
- When bugs arise, there's no more guesswork — I immediately know to check the logic layer first, then the visual layer.
- Deepened my understanding of OOP by decomposing functionality into classes with clear, single responsibilities (SRP).

**On Unity and technology:**
- Learned how to use Addressables for asynchronous resource loading — preventing screen freezes on mobile.
- Developed a clear mental model for when to use JSON (balance data) versus ScriptableObjects (visual assets).

**Being honest about the process:**
This project was built with significant AI assistance, particularly when solving complex technical challenges. However, that process itself was how I learned — asking questions, understanding explanations, and applying them to the specific context of the game. The knowledge wasn't entirely self-discovered, but it is solid enough that I can explain the reasoning behind every design decision.

---

### Roadmap: A Vision for Sustainable Growth

The current project has established a solid architectural foundation. If development continues, I would focus on evolving it from an offline game into a true **Live-Ops** ecosystem:

#### 1. Backend & Cloud Integration (Primary Focus)
To bring the project to commercial scale, integrating cloud services is the top priority:
-   **Authentication (AWS Cognito)**: Implement a secure player login/registration system, enabling Cloud Save that persists across multiple devices.
-   **Database (MongoDB Free Tier)**: Build a database to store Player Profiles, match history, and server-side configuration — moving beyond local JSON loading.

#### 2. Expanding the Game Ecosystem
-   **Map Editor & UGC**: Provide tools that allow players to create custom maps via JSON and share them with the community.
-   **Boss System & Advanced AI**: Develop Bosses with special abilities (dispelling debuffs, healing minions) to challenge player strategy at a higher level.
-   **Merge Tier 3**: Expand the Evolution Tree with complex recipes requiring rare resources from special stages.

#### 3. UI/UX Professionalization
-   **High-end VFX/SFX**: Replace placeholder visuals with a professional Particle system and spatial audio.
-   **Motion UI**: Transition from basic Unity panels to animated interfaces for a premium user experience.

> [!IMPORTANT]
> My vision is not just to create a game, but to build a **system capable of stable operation in the cloud**, easy to maintain and scale to users.
