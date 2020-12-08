---
layout: post.njk
pagination:
  data: collections.posts
  size: 1
  alias: post
  addAllPagesToCollections: true
permalink: "/it/blog/{{ post.data.it.title | slug }}/"
eleventyComputed:
  title: "{{ post.it.title }}"
---

{{ post.data.it.body }}