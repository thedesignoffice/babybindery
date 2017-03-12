---
layout: default
title: How Do I Change The Content Types?
date: 2015-05-26
author: Lukas & Cathy
chapter: demo

---

We anticipated three content types: “Conversations” (a generalized interview), “Images” (appropriate for show catalogues or portfolios), and “Text” (catchall text-based content). There’s also “Other” on by default.

If you seek to shrink or expand this list, start in `_config.yml` and simply edit the variable `content-types`. If you want a multi-word content type, please wrap it in quotes in `_config.yml`, but don’t wrap it in quotes in your post files.

Reminder: you must rebuild if you make a change to `_config.yml` to see the changes appear.

And as a final point: layouts and content-types do not need to be one and the same!
