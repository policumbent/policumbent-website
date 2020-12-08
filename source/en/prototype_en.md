---
layout: prototype.njk
pagination:
  data: collections.prototypes
  size: 1
  alias: proto
  addAllPagesToCollections: true
permalink: "/en/prototypes/{{ proto.data.en.name | slug }}/"
eleventyComputed:
  title: "{{ proto.en.name }}"
  noLangUrl: "/prototypes/{{ proto.data.en.name | slug }}/"
---