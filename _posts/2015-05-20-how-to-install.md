---
layout: post
title: How Do I Install It?
date: 2015-05-31
author: Lukas & Cathy
content-type: blogpost

---

First, we’re assuming you are running Jekyll to power your site. 

Download this repo, firstly. Then, bring:<br />
- print.html and print_twocol.html layouts into your _layouts directory. <br />
- any other layout templates you want into your _layouts directory.  By default we have “post”—a generic text-based layout, “image”—which serves well the need for a show catalogue, and “conversation”, which brings in some special javascript to format initials for interview-type content.<br />
- checkboxes_links.js, ** into a folder “js” in your Jekyll base directory. (This is used in the book generation.)<br />
- book.css, print.css, and two-col.css into your “css” folder. <br />
- book_css.html, checkboxes_links.html, *** into your _includes directory. <br />
- Our _config.yml has three properties at the end: page_width, page_height, and content_types—copy these into your config file. See post “How Do I Change The Content Types” if you wish to deviate from post/image/conversation. <br />

If you are serving your site using github pages, you need to change the css and javascript include HTML files to reflect the URL structure when referring to pages inside the site. [See documentation for this on Jekyll](https://jekyllrb.com/docs/github-pages/#project-page-url-structure).
