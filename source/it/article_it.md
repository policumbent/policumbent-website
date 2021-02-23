---
layout: article.njk
pagination:
  data: articles
  size: 1
  alias: article
  addAllPagesToCollections: true
permalink: "/it/blog/{{ article[locale].slug }}/"
eleventyComputed:
  metadata:
    title: "{{ article[locale].title }}"
    description: "{{ article[locale].seo.description }}"
    image: "{{ article.image.src | to-og-image }}"
  noLangUrl: "/blog/{{ article[locale].slug | slug }}/"
  noLangUrl_en: "/blog/{{ article.en.slug | slug }}/"
---