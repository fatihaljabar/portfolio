/**
 * JSON-LD Script
 * Renders a schema.org object as an application/ld+json script tag.
 * Passed as a text child, not dangerouslySetInnerHTML — React writes
 * script children as textContent, never parsed as HTML. `<` is escaped
 * to < so an embedded "</script>" substring can't close the tag early.
 */

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json">{json}</script>;
}
