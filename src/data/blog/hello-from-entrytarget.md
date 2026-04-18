---
author: EntryTarget
pubDatetime: 2026-04-18T02:00:00-03:00
title: Hello from EntryTarget
featured: true
draft: false
tags:
  - announcements
description: A short note on why we are starting this blog and what you can expect to read here.
---

We're EntryTarget. We build **dedicated double-entry ledger infrastructure** that runs inside your AWS account — not ours.

This blog is the place where we'll publish the things worth writing down. Not launch announcements or release notes dressed up as content — those belong in a changelog. The kind of writing we want to publish here is:

- **Engineering notes.** How we keep latency low, how the Rust runtime handles crash recovery, what trade-offs we made and which ones we'd make differently.
- **Security posture.** Our integrity model (HMAC SHA-256 per row, Ed25519 signed licenses), where customer data lives, what we do and don't see.
- **Operations.** What a "managed deploy into your AWS account" actually looks like under the hood — the CDK stack, the IAM template, the runbooks.
- **The boring stuff.** Accounting primitives, reconciliation patterns, why double-entry is still the right shape for a ledger in 2026.

If any of that sounds useful, we'd love to hear from you. The product is in invite-only access right now — [join the waitlist](https://entrytarget.com/) or drop us a line at [contact@entrytarget.com](mailto:contact@entrytarget.com).

Posts go out when we have something real to say, not on a schedule. Subscribe to the [RSS feed](/rss.xml) if you want to catch the next one.
