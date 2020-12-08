---
layout: prototype.njk
pagination:
  data: collections.prototypes
  size: 1
  alias: proto
  addAllPagesToCollections: true
permalink: "/it/prototypes/{{ proto.data.it.name | slug }}/"
eleventyComputed:
  title: "{{ proto.it.name }}"
  noLangUrl: "/prototypes/{{ proto.data.it.name | slug }}/"
---