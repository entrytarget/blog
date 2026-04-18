import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import getPostsByLang from "@/utils/getPostsByLang";
import { SITE } from "@/config";

export async function GET() {
  // Default RSS feed carries the EN posts. A PT feed at /pt/rss.xml can be
  // added later by mirroring this handler with `lang: "pt"`.
  const all = await getCollection("blog");
  const posts = getPostsByLang(all, "en");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(({ data, id, filePath }) => ({
      link: getPath(id, filePath),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
