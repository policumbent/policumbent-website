---
layout: article.njk
pagination:
  data: articles
  size: 1
  alias: article
  addAllPagesToCollections: true
permalink: "/en/blog/{{ article.slug_en }}/"
eleventyComputed:
  title: "{{ article.title_en }}"
  noLangUrl: "/blog/{{ article.slug_en | slug }}/"
---

{{ article.content_en }}