/**
 * Canonical export of every MDX editorial component. Posts can import from
 * this single path:
 *
 *   import { Callout, Ledger, PullQuote, Lede, JSONBlock, NumberedList, CTA } from "@/components/mdx";
 *
 * But most posts won't need to — the PostDetails layout passes them all to
 * <Content components={...} /> so they're available as unqualified JSX tags.
 */
export { default as Callout } from "./Callout.astro";
export { default as Ledger } from "./Ledger.astro";
export { default as PullQuote } from "./PullQuote.astro";
export { default as Lede } from "./Lede.astro";
export { default as JSONBlock } from "./JSONBlock.astro";
export { default as NumberedList } from "./NumberedList.astro";
export { default as CTA } from "./CTA.astro";
