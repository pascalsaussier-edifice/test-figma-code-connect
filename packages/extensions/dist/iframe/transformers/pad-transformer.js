class PadIframeTransformer {
  constructor() {
    this.padPath = "/pad/", this.embedPath = "/collaborativeeditor/embed/";
  }
  onRenderHTML({ HTMLAttributes }) {
    try {
      const currentUrl = window.location.href.split("?")[0], baseUrl = new URL(currentUrl).origin, srcUrl = new URL(HTMLAttributes.src), pathMatch = srcUrl.pathname.match(
        new RegExp(`^${this.padPath}(.+)$`)
      );
      if (srcUrl.origin === baseUrl && pathMatch && pathMatch[1]) {
        const padId = pathMatch[1].replace(/^p\//i, ""), newUrl = new URL(`${baseUrl}${this.embedPath}${padId}`);
        srcUrl.searchParams.forEach((value, key) => {
          newUrl.searchParams.set(key, value);
        }), HTMLAttributes.src = newUrl.toString();
      }
    } catch (e) {
      console.error("Error transforming pad URL:", e);
    }
  }
}
export {
  PadIframeTransformer
};
//# sourceMappingURL=pad-transformer.js.map
