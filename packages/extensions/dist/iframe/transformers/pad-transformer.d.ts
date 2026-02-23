import { IframeTransformer } from './interface';
/**
 * This transformer is used to transform the pad URL to the embed URL inside the iframe
 * The embed URL is used to create a session for the pad before redirecting to the pad url
 */
export declare class PadIframeTransformer implements IframeTransformer {
    private padPath;
    private embedPath;
    onRenderHTML({ HTMLAttributes }: {
        HTMLAttributes: any;
    }): void;
}
