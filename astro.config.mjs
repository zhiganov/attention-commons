// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://attentioncommons.org',
  integrations: [
    starlight({
      title: 'Attention Commons',
      description:
        'A knowledge commons for attention: the idea that attention is a shared resource being enclosed by the attention economy, and the counter-tradition that holds the wisdom about attention in common.',
      editLink: {
        baseUrl: 'https://github.com/zhiganov/attention-commons/edit/main/',
      },
      lastUpdated: true,
      pagefind: true,
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/zhiganov/attention-commons' },
      ],
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Start here', items: [
          { slug: 'start/what-is-attention-commons' },
          { slug: 'start/three-directions' },
          { slug: 'start/how-to-contribute' },
        ]},
        { label: 'The idea', items: [
          { slug: 'idea/attention-as-a-commons' },
          { slug: 'idea/the-enclosure-claim' },
          { slug: 'idea/the-bounded-commons-problem' },
          { slug: 'idea/commons-vs-ground' },
        ]},
        { label: 'Governance', items: [
          { slug: 'governance/ostrom-principles-for-attention' },
          { slug: 'governance/monitoring-commons' },
          { slug: 'governance/civilizational-frame-vs-practical-questions' },
          { slug: 'governance/theory-of-change' },
        ]},
        { label: 'Practices', items: [
          { slug: 'practices/practice-commons-and-licensing' },
          { slug: 'practices/living-traditions-and-lineages' },
          { slug: 'practices/the-kit-form' },
        ]},
        { label: 'Map & strategy', items: [
          { slug: 'map/four-quadrant-map' },
          { slug: 'map/three-horizons' },
        ]},
        { label: 'Library', items: [
          { slug: 'library/reading-and-sources' },
          { slug: 'library/fellow-travellers' },
        ]},
      ],
    }),
  ],
});
