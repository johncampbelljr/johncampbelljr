import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site, url } from '../lib/site';
export async function GET(context: APIContext) {
  const posts = (
    await getCollection(
      'writing',
      ({ data }) => !data.draft && !data.placeholder && !!data.date,
    )
  ).sort((a, b) => b.data.date!.getTime() - a.data.date!.getTime());
  return rss({
    title: `${site.name} — Field Notes`,
    description: site.description,
    site: context.site!,
    items: posts.map(({ data }) => ({
      title: data.title,
      description: data.description,
      pubDate: data.date!,
      link: url(`writing/${data.slug}/`),
      categories: data.tags,
    })),
    customData: '<language>en-us</language>',
  });
}
