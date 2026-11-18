---
title: "System Architecture"
layout: "project"
weight: 1
draft: true
pre: "2. "
---

### Philosophy: A Complete Separation of Logic and Infrastructure

The architecture of this project is not merely a technical choice — it is the direct result of a pivotal lesson learned from a real-world technical test. The requirement at the time was: **"The system must be designed so that the Unity UI can be easily replaced by any other UI, including a plain Console Application."**

After recognizing the limitations of mixing Logic and View in previous projects, I invested significant effort into restructuring Hex Tower Defense to be fully **UI-agnostic**:

1.  **Domain-Centric Design**: All core logic (from damage calculation and merge formulas to Hex Grid state management) is written entirely in **Pure C#**. This layer contains no `MonoBehaviour` or any Unity API, allowing the game to run seamlessly even in a Console environment.
2.  **Logic & View Separation**: The Unity Layer serves purely as an "infrastructure" layer — it listens to data from the Domain and updates the visuals. The View never interferes with data processing logic.
3.  **Testability & Extensibility**: By applying **Dependency Injection (DI)** and the **Observer Pattern**, the system is extremely flexible. Swapping the data source (from JSON to a server) or adding a new tower type never breaks the existing structure.

> [!IMPORTANT]
> This project is a testament to my growth as a developer and my ability to solve complex architectural challenges — turning a technical test failure into a flexible, testable, and highly scalable system.

This section covers each architectural decision in detail:

-   **Clean Architecture & DDD** — Domain Layer and Unity Layer structure
-   **Dependency Injection** — Managing service lifecycles with Constructor Injection
-   **Event-Driven (Observer Pattern)** — Domain-to-View communication via C# Events
-   **Composition Root** — GameController as the single point of initialization
