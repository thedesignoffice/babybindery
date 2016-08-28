---
layout: image
title: The Book Structure
date: 2015-05-28
content-type: image
imgurl: http://i.imgur.com/uhFjKxz.jpg
author: Lukas & Cathy
---

While the webpage structures are mutable to your needs, the print.html and print_twocol.html layouts are special.

In each layout, a fixed number of pages are generated (you can change this number by editing the Liquid tags). Each page consists of a `.page` object, which contains a `.page-header`  object and `.page-footer` object, with a `.content-wrapper` object between them.

Within `.content-wrapper`, there are either one or two `.page-content` objects (depending on if it is the one- or two-column layout). The content of posts flows into these divs according to the structure written in book.html and book_twocol.html.
