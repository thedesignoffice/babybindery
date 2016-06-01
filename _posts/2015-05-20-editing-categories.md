---
layout: image
title: How Do I Change The Content Types?
date: 2015-05-31
content-type: image
imgurl: http://i.imgur.com/vh4HeNP.png
byline:
---

Before building your site, edit the _config.yml file in your Jekyll root repo. 

We anticipated three content types: “Conversations” (a generalized interview), “Images” (appropriate for show catalogues or portfolios), and “Posts” (catchall text-based content). 

If you seek to shrink or expand this list, start in _config.yml. Then, look into book.html and book_twocol.html. After the Table of Contents, there are some calls for content of specific types; edit these if statements and HTML according to the types you anticipate. 

(Additionally, you should prepare web layouts for the new content that reflects its metadata and such.) 