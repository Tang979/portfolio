---
title: "Testing"
layout: "project"
weight: 1
draft: true
pre: "2. "
---

### Quality Assurance via Unit Tests (Domain Layer)

One of the greatest benefits of decoupling **Logic (Domain)** from **Display (Unity)** is the ability to automatically verify game correctness — no Unity Editor required, no manual playthroughs.

In this project, I didn't build an elaborate testing framework. Instead, I focused on **validating the correctness of core rules** through small, focused, and effective test cases.

#### Example: Testing Base Survival Logic

The following is an excerpt from `BaseHealthServiceTests.cs`, extracted directly from the project — demonstrating that the damage calculation and Game Over event trigger work correctly:

```csharp
[Test]
public void TakeDamage_ShouldInvokeEvents_WhenHealthReachesZero()
{
    // 1. Arrange
    var healthService = new BaseHealthService(100);
    bool isDestroyed = false;
    healthService.OnBaseDestroyed += () => isDestroyed = true;

    // 2. Act
    healthService.TakeDamage(100);

    // 3. Assert
    Assert.AreEqual(0, healthService.CurrentHealth, "Health must reach zero.");
    Assert.IsTrue(isDestroyed, "The Game Over event must be triggered.");
}
```

### Why Does This Matter?

-   **Proof of code quality**: Demonstrates that my codebase is well-structured and logic bugs are verifiable.
-   **Safe to scale**: When I modify damage formulas or tower mechanics, Unit Tests ensure existing features don't break (Regression testing).
-   **Professional mindset**: Shows employers that I care about the long-term stability of a project, not just getting it to "run."

> [!TIP]
> The full Unit Test source code for each module (Enemy, Tower, Health) can be found in the `Assets/Scripts/Tests` directory of the project.
