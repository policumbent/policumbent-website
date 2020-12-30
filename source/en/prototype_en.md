---
layout: prototype.njk
pagination:
  data: prototypes
  size: 1
  alias: proto # Important: it bugs when alias: prototype (don't know why)
  addAllPagesToCollections: true
permalink: "/en/prototypes/{{ proto.slug }}/"
eleventyComputed:
  metadata:
    title: "{{ proto.name }}"
  noLangUrl: "/prototypes/{{ proto.slug }}/"
---