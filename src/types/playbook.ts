export interface PlaybookPage {
  title: string;
  subtitle: string;
  content: string;
  prompts: string[];
  placeholders?: string[];
}

export interface PlaybookData {
  page1: PlaybookPage;
  page2: PlaybookPage;
  page3: PlaybookPage;
  page4: PlaybookPage;
}
