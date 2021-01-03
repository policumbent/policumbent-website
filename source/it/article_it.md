---
layout: article.njk
pagination:
  data: articles
  size: 1
  alias: article
  addAllPagesToCollections: true
permalink: "/it/blog/{{ article.slug_it }}/"
eleventyComputed:
  metadata:
    title: "{{ article.title_it }}"  
    description: "{{ article.seo_it.description }}"
    image: "{{ article.image.src | to-og-image }}"
  noLangUrl: "/blog/{{ article.slug_it | slug }}/"
  noLangUrl_en: "/blog/{{ article.slug_en | slug }}/"
---

{{ article.content_it }}