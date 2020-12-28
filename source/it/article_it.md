---
layout: article.njk
pagination:
  data: articles
  size: 1
  alias: article
  addAllPagesToCollections: true
permalink: "/it/blog/{{ article.slug_it }}/"
eleventyComputed:
  title: "{{ article.title_it }}"
  noLangUrl: "/blog/{{ article.slug_it | slug }}/"
---

{{ article.content_it }}