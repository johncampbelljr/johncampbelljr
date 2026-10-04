---
title: What Work Should We Actually Give Coding Agents?
description: "As coding agents become increasingly capable, the important question isn't simply whether an agent can implement something. It's whether we should give the agent the autonomy to do it."
slug: what-work-should-we-give-coding-agents
tags: [Agentic SDLC, Engineering]
featured: true
placeholder: true
series: Building an Agentic-First SDLC
order: 1
---

## The question behind the implementation

A coding agent's ability to complete a task is only part of the decision to delegate it. The consequences of a mistake, the ability to detect it, and the ability to undo it matter too.

This article will introduce an **Agentic Suitability Framework** for deciding how to approach engineering work.

## Three ways to approach the work

| Approach      | Working definition                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------ |
| **Agent-led** | An agent carries out implementation within defined constraints and review boundaries.            |
| **Hybrid**    | Humans and agents share the work, with human involvement at intermediate decision points.        |
| **Human-led** | A human leads the engineering decisions and implementation, using agents for bounded assistance. |

These are starting points for the framework, rather than a fixed scoring system.

## Dimensions to explore

- **Autonomy risk:** blast radius, reversibility, testability, permissions, and security implications.
- **Business exposure:** who depends on the system and what a failure would mean for them.
- **Review boundaries:** when a human needs to participate, and what evidence they need to make a decision.
- **The agent harness:** the infrastructure and controls around the coding model.

> The difficulty of a programming task is not necessarily the same as the risk of allowing an agent to perform it autonomously.

## Grounding the framework in practice

The Agentic Software Development Pipeline is the working context for these questions. It places human review primarily at the pull-request boundary and provides a concrete setting for exploring when that boundary is appropriate.

Future notes in this series will take each dimension in turn. Examples, evaluation criteria, and conclusions will follow as the work develops.
