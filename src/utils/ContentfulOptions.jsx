import {
    Paragraph,
    UnorderedList,
    OrderedList,
    ListItem,
    Heading1,
    Heading2,
    Heading3,
    HorizontalRule,
    EmbeddedEntry,
    EmbeddedAsset,
    Hyperlink,
    EmbeddedInlineEntry
  } from '../components/ContentfulComponents'; 
  import {
    BLOCKS,
    INLINES
  } from '@contentful/rich-text-types';
  
  
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph>{children}</Paragraph>,
      [BLOCKS.UL_LIST]: (node, children) => <UnorderedList>{children}</UnorderedList>,
      [BLOCKS.OL_LIST]: (node, children) => <OrderedList>{children}</OrderedList>,
      [BLOCKS.LIST_ITEM]: (node, children) => <ListItem>{children}</ListItem>,
      [BLOCKS.HEADING_1]: (node, children) => <Heading1>{children}</Heading1>,
      [BLOCKS.HEADING_2]: (node, children) => <Heading2>{children}</Heading2>,
      [BLOCKS.HEADING_3]: (node, children) => <Heading3>{children}</Heading3>,
      'embedded-horizontal-rule': () => <HorizontalRule />,
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const { title, content } = node.data.target.fields;
        return <EmbeddedEntry title={title} content={content} />;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { title, file } = node.data.target.fields;
        return <EmbeddedAsset title={title} file={file} />;
      },
    },
    renderInline: {
      [INLINES.HYPERLINK]: (node) => {
        const { uri } = node.data;
        return <Hyperlink uri={uri}>{node.content[0].value}</Hyperlink>;
      },
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const { title, content } = node.data.target.fields;
        return <EmbeddedInlineEntry title={title} content={content} />;
      },
    },
  };
  
  export default options;
  