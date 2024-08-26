import type { ReactNode } from 'react';
import type {
  BlockNode,
  InlineElement,
  TextNode,
  JSONRichText,
} from '~/lib/schemas/shared';
import Paragraph from './typography/Paragraph';
import Heading from './typography/Heading';
import { cn } from '~/lib/utils';

/**
 * Render a localised value (JSONRichText or string).
 *
 * - If the value is a string, return it as is.
 * - If the value is a JSONRichText, render it using our custom components.
 *
 * Should return a ReactNode.
 *
 * Should be removed once we figure out which AST we will use for rich text.
 */

const getElementForType = (type: string) => {
  switch (type) {
    case 'heading':
      return Heading;
    case 'paragraph':
      return Paragraph;
    // case 'video':
    //   return <video />;
    default:
      return Paragraph;
  }
};

const processChildren = (children: (TextNode | InlineElement)[]) => {
  console.log('children', children);
  return children.map((child) => {
    if ('children' in child) {
      // If we have children, we are an online element
      return processInlineElement(child);
    } else {
      return processTextNode(child);
    }
  });
};

const processBlockNode = (blockNode: BlockNode) => {
  const Element = getElementForType(blockNode.type);

  return <Element>{processChildren(blockNode.children)}</Element>;
};

const processTextNode = (textNode: TextNode) => {
  const classNames = cn({
    'font-bold': textNode.bold,
    'italic': textNode.italic,
    'underline': textNode.underline,
    'line-through': textNode.strikethrough,
    'code': textNode.code,
  });

  // If no classNames, return the text as is
  if (!classNames) {
    return textNode.text;
  }

  return <span className={classNames}>{textNode.text}</span>;
};

const processInlineElement = (inlineElement: InlineElement) => {
  if (inlineElement.type === 'link') {
    return (
      <a href={inlineElement.url}>
        {inlineElement.children.map((textNode) => textNode.text)}
      </a>
    );
  }
};

export function renderLocalisedValue(value: JSONRichText): ReactNode {
  console.log('value', value);
  return value.map((blockNode) => processBlockNode(blockNode));
}

export default function RenderRichText({ value }: { value: JSONRichText }) {
  return <>{renderLocalisedValue(value)}</>;
}
