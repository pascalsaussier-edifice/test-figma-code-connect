import { Node } from '@tiptap/core';
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        informationPane: {
            /**
             * Set a informationPane node
             * @param type The type of the informationPane
             */
            setInformationPane: (type?: string) => ReturnType;
        };
    }
}
export declare const InformationPane: Node<any, any>;
