---
layout: article.njk
pagination:
  data: articles
  size: 1
  alias: article
  addAllPagesToCollections: true
permalink: "/en/blog/{{ article.slug_en }}/"
eleventyComputed:
  metadata:
    title: "{{ article.title_en }}"
    description: "{{ article.seo_en.description }}"
    image: "{{ article.image.src | to-og-image }}"
  noLangUrl: "/blog/{{ article.slug_en | slug }}/"
  noLangUrl_it: "/blog/{{ article.slug_it | slug }}/"
---

{{ article.content_en }}