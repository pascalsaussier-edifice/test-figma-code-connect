import { Node, mergeAttributes } from "@tiptap/core";
const InformationPane = Node.create({
  name: "information-pane",
  group: "block",
  content: "block+",
  defining: !0,
  marks: "",
  addAttributes() {
    return {
      type: {
        default: "info",
        // type par défaut
        parseHTML: (element) => element.getAttribute("data-type") || "info",
        renderHTML: (attributes) => ({
          "data-type": attributes.type
        })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "div[data-information-pane]"
      }
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    const type = node.attrs.type;
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-information-pane": "",
        class: `information-pane information-pane-${type}`
      }),
      0
    ];
  },
  addCommands() {
    return {
      setInformationPane: (type = "info") => ({ commands }) => commands.insertContent([
        {
          type: this.name,
          attrs: { type },
          content: [
            {
              type: "paragraph"
            }
          ]
        }
      ])
    };
  }
});
export {
  InformationPane
};
//# sourceMappingURL=information-pane.js.map
