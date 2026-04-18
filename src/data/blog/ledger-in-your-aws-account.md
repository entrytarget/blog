---
author: EntryTarget
pubDatetime: 2026-04-18T02:05:00-03:00
title: Why the ledger runs in your AWS account, not ours
featured: true
draft: false
tags:
  - architecture
  - security
  - aws
description: Shared-tenancy ledgers make operational sense for the vendor and compliance nightmares for the customer. We went the other way — and it changed almost every design decision downstream.
---

Most "ledger as a service" offerings put the ledger in **their** infrastructure. Your transactions ride a multi-tenant Postgres instance somewhere in their VPC, accessible via their API. It's the path of least resistance for the vendor: one stack to operate, one database to scale, one pager rotation.

It's also the path that pushes every hard question back onto the customer's compliance team.

- *Where does our transactional data physically live?*
- *Who at the vendor has read access to the underlying database?*
- *If the vendor is breached, do we have to notify our customers under LGPD/GDPR?*
- *What does our DPA look like — and will we ever get them to sign ours?*
- *If the vendor disappears, how do we recover the data?*

We picked the opposite model. EntryTarget deploys a **dedicated Rust ledger runtime** — Fargate + RDS Postgres — inside the AWS account the customer already owns. The customer picks the region. The customer owns the root IAM credentials. We never see a transaction.

## What actually runs in your account

When you click "Deploy" in the console, an infra-worker we operate uses your scoped IAM role to stand up:

- A VPC (`natGateways: 1, maxAzs: 2`) — 1 NAT Gateway + an Application Load Balancer in front of the service.
- A Fargate service running the ledger binary, container image pushed to **your** ECR.
- An RDS Postgres instance (you pick the class — `db.t4g.medium` for Starter, `db.r6g.large` for Business and Enterprise) with a read replica.
- Two Secrets Manager entries — RDS creds and the app config.
- CloudWatch log groups.
- A security group wiring ECS ↔ RDS, no public egress.

That's everything. When we update our manifests, we don't touch your data — the worker just rolls a new task definition against the same RDS instance. Your logs go to your CloudWatch. Your costs appear on your AWS bill, not ours.

## The clear line

The operational boundary is simple:

- **Your side:** transactional data, AWS credentials, customer PII, IAM, region choice, backup policy, retention.
- **Our side:** the binary (signed Ed25519 license JWT, HMAC SHA-256 per-row integrity hashes), the deploy workflow, release signing, the heartbeat that tells us your deployment is alive.

We see the heartbeat. We don't see the journal.

## What we traded

Running in the customer's AWS account isn't free. It cost us a handful of design constraints we'd happily skip if we could:

- **Per-customer builds turned into a per-customer license JWT** — we moved from "compile a unique binary per account" to "ship one universal binary + sign a short-lived JWT per environment." Fewer moving parts, no secrets leaked through a compile step.
- **Cost math is the customer's problem.** We charge a flat $250/mo; AWS charges whatever Fargate + RDS + NAT + ALB adds up to in the customer's region. We publish an estimator in the console so there's no surprise, but the line item is theirs.
- **We can't "oops-patch" a bug by SSH-ing in.** Every fix ships as a signed image and rolls through the customer's ECS deployment. Slower, but also: we physically can't touch their data.

## Why this blog exists

A lot of the trade-offs above are the kind of thing that doesn't fit in a docs page or a sales deck. We'll write them down here — architecture decisions, the things we reconsidered, and the reasoning behind the choices that ended up being load-bearing.

If the model appeals to you, [join the waitlist](https://entrytarget.com/). Product is still invite-only while we finish onboarding early customers.
