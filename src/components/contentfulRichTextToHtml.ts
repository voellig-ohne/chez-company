import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function contentfulRichtTextToThml(source?: string) {
  if (!source) return null;
  const parsed = JSON.parse(source);

  return documentToReactComponents(parsed);
}
