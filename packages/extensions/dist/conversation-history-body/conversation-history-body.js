import { Node, mergeAttributes } from "@tiptap/core";
const ConversationHistoryBody = Node.create({
  name: "converstationHistoryBody",
  group: "block",
  content: "block+",
  parseHTML() {
    return [
      {
        tag: "div.conversation-history-body"
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { class: "conversation-history-body" }),
      0
    ];
  }
});
export {
  ConversationHistoryBody
};
//# sourceMappingURL=conversation-history-body.js.map
