/**
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 * @fileoverview TOAST UI Image-Editor React wrapper component
 */
import React from 'react';
import TuiImageEditor from '@wizteam/tui-image-editor';

export default class ImageEditor extends React.Component {
  rootEl = React.createRef();

  imageEditorInst = null;

  componentDidMount() {
    // eslint-disable-next-line no-unused-vars
    const { onCreate, onDestroy, ...extProps } = this.props;
    //
    this.imageEditorInst = new TuiImageEditor(this.rootEl.current, {
      ...extProps,
    });

    this.bindEventHandlers(this.props);
    if (this.props.onCreate) {
      this.props.onCreate(this.imageEditorInst);
    }
  }

  componentWillUnmount() {
    this.unbindEventHandlers();

    this.imageEditorInst.destroy();

    this.imageEditorInst = null;
    //
    if (this.props.onDestroy) {
      this.props.onDestroy();
    }
  }

  shouldComponentUpdate(nextProps) {
    this.bindEventHandlers(this.props, nextProps);

    return false;
  }

  getInstance() {
    return this.imageEditorInst;
  }

  getRootElement() {
    return this.rootEl.current;
  }

  bindEventHandlers(props, prevProps) {
    Object.keys(props)
      .filter(this.isEventHandlerKeys)
      .forEach((key) => {
        const eventName = key[2].toLowerCase() + key.slice(3);
        // For <ImageEditor onFocus={condition ? onFocus1 : onFocus2} />
        if (prevProps && prevProps[key] !== props[key]) {
          this.imageEditorInst.off(eventName);
        }
        this.imageEditorInst.on(eventName, props[key]);
      });
  }

  unbindEventHandlers() {
    Object.keys(this.props)
      .filter(this.isEventHandlerKeys)
      .forEach((key) => {
        const eventName = key[2].toLowerCase() + key.slice(3);
        this.imageEditorInst.off(eventName);
      });
  }

  isEventHandlerKeys(key) {
    return /on[A-Z][a-zA-Z]+/.test(key);
  }

  render() {
    return <div ref={this.rootEl} />;
  }
}
