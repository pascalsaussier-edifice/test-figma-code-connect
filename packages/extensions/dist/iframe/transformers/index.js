var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj)), __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
import { PadIframeTransformer } from "./pad-transformer.js";
var _transformers;
class DefaultIframeTransformer {
  constructor() {
    __privateAdd(this, _transformers, [new PadIframeTransformer()]);
  }
  onRenderHTML({ HTMLAttributes }) {
    for (const transformer of __privateGet(this, _transformers))
      transformer.onRenderHTML({ HTMLAttributes });
  }
}
_transformers = new WeakMap();
const iframeTransformer = new DefaultIframeTransformer();
export {
  iframeTransformer
};
//# sourceMappingURL=index.js.map
