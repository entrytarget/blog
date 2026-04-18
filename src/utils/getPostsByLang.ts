import type { CollectionEntry } from "astro:content";
import { getPostLang, type Lang } from "./getPath";

/**
 * Keep only posts whose language matches `lang`. Resolution order:
 *   1. Explicit frontmatter `lang: "en" | "pt"`.
 *   2. Inferred from the file path (blog/en/… or blog/pt/…).
 */
export default function getPostsByLang(
  posts: CollectionEntry<"blog">[],
  lang: Lang,
): CollectionEntry<"blog">[] {
  return posts.filter(p => (p.data.lang ?? getPostLang(p.filePath)) === lang);
}
