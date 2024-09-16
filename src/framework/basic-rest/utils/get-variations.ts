import groupBy from "lodash/groupBy";

export function getVariations(variations: object | undefined) {
  if (!variations) return {};
  return groupBy<{ color: string; image: string }>(
    variations,
    "attribute.slug"
  );
}
