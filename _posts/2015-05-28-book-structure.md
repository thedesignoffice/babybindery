---
layout: image
title: The Book Structure
date: 2015-05-28
content-type: image
imgurl: http://i.imgur.com/uhFjKxz.jpg
author: Lukas & Cathy
---

While the webpage structures are mutable to your needs, the print.html and layouts is special.

In it, a fixed number of pages are generated (you can change this number by editing `_config.yml`). There’s a lot of nesting to keep track of details, and this is the list from outside in: 
`.sheet`, `.page`, `.content-wrapper`, then either one or two `.page-content` (which can help facilitate a two-column layout), then `.content` divs that have content flowed into them. 

All of the content comes from `book.html`. 