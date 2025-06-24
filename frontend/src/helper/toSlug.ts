export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-.]+/g, "")
    .replace(/--+/g, "-");
}
