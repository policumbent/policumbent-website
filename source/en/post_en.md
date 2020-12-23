---
layout: post.njk
pagination:
  data: collections.posts
  size: 1
  alias: post
  addAllPagesToCollections: true
permalink: "/en/blog/{{ post.data.en.title | slug }}/"
eleventyComputed:
  title: "{{ post.it.title }}"
  noLangUrl: "/blog/{{ post.data.en.title | slug }}/"
---

{{ post.data.en.body }}