import { Node } from "@tiptap/core";
const AttachmentTransformer = Node.create({
  name: "attachments",
  content: "",
  marks: "",
  group: "inline",
  inline: !0,
  selectable: !0,
  atom: !0,
  draggable: !0,
  addOptions() {
    return {
      HTMLAttributes: {
        class: "attachments"
      }
    };
  },
  parseHTML() {
    return [{ tag: "div[class=attachments]" }];
  },
  renderHTML({ HTMLAttributes }) {
    const renderedLinks = HTMLAttributes.links.map((el) => [
      "a",
      {
        name: el.name,
        href: el.href,
        "data-document-id": el["data-document-id"],
        "data-content-type": el["data-content-type"]
      },
      el.name
    ]);
    return ["div", this.options.HTMLAttributes, ...renderedLinks];
  },
  addAttributes() {
    return {
      links: {
        default: [],
        parseHTML: (element) => {
          const links = element.getElementsByTagName("a"), parsedLinks = [];
          for (let i = 0; i < links.length; i++) {
            const link = links[i], href = link.getAttribute("href"), name = link.textContent, regexResult = href.match(/([^/]+$)/), dataDocumentId = link.getAttribute("data-document-id") || regexResult && regexResult[0], dataContentType = link.getAttribute("data-content-type");
            parsedLinks.push({
              href,
              name,
              dataDocumentId,
              dataContentType
            });
          }
          return parsedLinks;
        },
        renderHTML: (attributes) => ({
          links: attributes.links.map((link) => ({
            href: link.href,
            name: link.name,
            "data-document-id": link.dataDocumentId,
            "data-content-type": link.dataContentType
          }))
        })
      }
    };
  },
  addCommands() {
    return {
      setAttachment: (attrs = {
        dataContentType: "",
        name: "",
        documentId: "",
        href: ""
      }) => ({ chain }) => chain().insertContent({ type: this.name, attrs }).run()
    };
  }
});
export {
  AttachmentTransformer
};
//# sourceMappingURL=attachment-transformer.js.map
