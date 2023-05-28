import { createElement } from "react-syntax-highlighter";

const rowRendererNode = (node: rendererNode): rendererNode => {
  const text = (node.value as string)?.split(" ");
  if (node.type == "text" && text.length > 1) {
    return {
      type: "element",
      tagName: "span",
      properties: {
        className: [],
      },
      children: text.map((e, i) => {
        return {
          type: "element",
          tagName: "span",
          properties: {
            className: ["scoop"].includes(e) ? ["hljs-built_in"] : [],
          },
          children: [
            {
              type: "text",
              value: i < text.length - 1 ? e + " " : e,
            },
          ],
        };
      }),
    };
  } else {
    node.children = node.children?.map((e) => rowRendererNode(e));
  }
  return node;
};

const rowRenderer = ({
  rows,
  stylesheet,
  useInlineStyles,
}: rendererProps): React.ReactNode => {
  return rows.map((node: rendererNode, i: number) => {
    node = rowRendererNode(node);

    return createElement({
      node,
      stylesheet,
      useInlineStyles,
      key: `code-segement-${i}`,
    });
  });
};

export default rowRenderer;
