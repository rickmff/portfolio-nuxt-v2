
export interface ContentItem {
  title: string;
}

export const searchByTitle = <T extends ContentItem>(array: T[], title: string): T | null =>
  array.find((item) => item.title === title) || null;