import { BLOG_PATH } from "@/content.config";
import { slugifyStr } from "./slugify";

export type Lang = "en" | "pt";
export const LANGS: Lang[] = ["en", "pt"];
export const DEFAULT_LANG: Lang = "en";

/** Infer the post's language from its file path. Posts under blog/pt/* are PT,
 *  blog/en/* are EN, anything else defaults to EN (legacy/flat posts). */
export function getPostLang(filePath: string | undefined): Lang {
  if (!filePath) return DEFAULT_LANG;
  const segments = filePath.replace(BLOG_PATH, "").split("/").filter(Boolean);
  const head = segments[0];
  if (head === "pt") return "pt";
  return "en";
}

/**
 * Get full path of a blog post.
 *
 *   blog/en/foo.mdx  → /posts/foo             (default lang — no prefix)
 *   blog/pt/foo.mdx  → /pt/posts/foo          (translated — /pt/ prefix)
 *   blog/foo.mdx     → /posts/foo             (legacy flat)
 *
 * Nested sub-dirs below the language root stay preserved as sub-segments
 * (e.g. blog/en/deep-dives/foo.mdx → /posts/deep-dives/foo).
 */
export function getPath(
  id: string,
  filePath: string | undefined,
  includeBase = true
) {
  const allSegments = filePath
    ?.replace(BLOG_PATH, "")
    .split("/")
    .filter(path => path !== "")
    .filter(path => !path.startsWith("_"))
    .slice(0, -1)
    .map(segment => slugifyStr(segment));

  // Pull the language root off the front, if present.
  const firstSegment = allSegments?.[0];
  const isLangRoot = firstSegment === "en" || firstSegment === "pt";
  const lang: Lang = firstSegment === "pt" ? "pt" : "en";
  const pathSegments = isLangRoot ? (allSegments ?? []).slice(1) : allSegments;

  // Making sure `id` does not contain the directory.
  const blogId = id.split("/");
  const slug = blogId.length > 0 ? blogId.slice(-1) : blogId;

  const inner =
    pathSegments && pathSegments.length > 0
      ? [...pathSegments, ...slug].join("/")
      : slug.join("/");

  // When includeBase is false the caller wants a slug it can route against
  // (e.g. a [...slug] getStaticPaths), so we omit both the language prefix
  // and the "/posts" segment.
  if (!includeBase) return inner;

  const langPrefix = lang === "pt" ? "/pt" : "";
  return `${langPrefix}/posts/${inner}`;
}
