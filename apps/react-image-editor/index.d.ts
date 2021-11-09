declare module '@wizteam/react-image-editor';

interface ImageEditorOptions {
  includeUI: {
    loadImage: {
      path: string;
      name: string;
    };
    // eslint-disable-next-line @typescript-eslint/ban-types
    theme?: Object;
    menu?: string[];
    initMenu?: string;
    uiSize?: {
      width?: string;
      height?: string;
    };
    menuBarPosition?: string;
  };
  cssMaxHeight?: number | string;
  cssMaxWidth?: number | string;
  selectionStyle?: {
    cornerSize?: number;
    rotatingPointOffset?: number;
  };
  usageStatistics?: boolean;
}

export default function ReactImageEditor(props: ImageEditorOptions): JSX.Element;