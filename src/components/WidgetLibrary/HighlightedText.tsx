import { splitByQuery } from './useWidgetLibraryState';

interface HighlightedTextProps {
  text: string;
  query: string;
}

export const HighlightedText = ({ text, query }: HighlightedTextProps) => (
  <>
    {splitByQuery(text, query).map((segment, index) =>
      segment.isMatch ? <mark key={index}>{segment.text}</mark> : <span key={index}>{segment.text}</span>,
    )}
  </>
);
