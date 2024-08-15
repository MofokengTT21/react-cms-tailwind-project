import React from 'react';

export const Paragraph = ({ children }) => <p className="mb-3">{children}</p>;

export const UnorderedList = ({ children }) => <ul className="list-disc ml-6">{children}</ul>;

export const OrderedList = ({ children }) => <ol className="list-decimal ml-6">{children}</ol>;

export const ListItem = ({ children }) => <li className='-mb-3 ml-2 pl-2'>{children}</li>;

export const Heading1 = ({ children }) => <h1 className="text-2xl font-semibold mt-4">{children}</h1>;

export const Heading2 = ({ children }) => <h2 className="text-xl font-semisbold mt-6 mb-2">{children}</h2>;

export const Heading3 = ({ children }) => <h3 className="text-gray-800">{children}</h3>;


export const HorizontalRule = () => <hr className="mb-10 border-t border-gray-300" />;

export const EmbeddedEntry = ({ title, content }) => (
  <div className="embedded-entry">
    <h4>{title}</h4>
    <p>{content}</p>
  </div>
);

export const EmbeddedAsset = ({ title, file }) => (
  <div className="embedded-asset">
    {file.contentType.startsWith('image/') ? (
      <img src={file.url} alt={title} />
    ) : (
      <a href={file.url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    )}
  </div>
);

export const Hyperlink = ({ uri, children }) => (
  <a 
    href={uri} 
    className="text-blue-500 hover:text-blue-700 underline" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

export const EmbeddedInlineEntry = ({ title, content }) => (
  <div className="embedded-inline-entry">
    <h4>{title}</h4>
    <p>{content}</p>
  </div>
);
