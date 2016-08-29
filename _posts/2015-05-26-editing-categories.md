---
layout: image
title: How Do I Change The Content Types?
date: 2015-05-26
content-type: image
imgurl: img/mandance.jpg
author: Lukas & Cathy
---

Before building your site, edit the _config.yml file in your Jekyll root repo.

We anticipated three content types: “Conversations” (a generalized interview), “Images” (appropriate for show catalogues or portfolios), and “Text” (catchall text-based content).

If you seek to shrink or expand this list, start in _config.yml and simply edit the variable. Then, look into book.html and book_twocol.html. After the Table of Contents in each file, there are some calls, using the templating language Liquid, for content of specific types; edit these if statements and HTML according to the types you anticipate.

(Additionally, you should prepare web layouts for the new content that reflects its metadata and such.)
