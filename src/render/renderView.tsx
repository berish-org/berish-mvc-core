import React from 'react';
import { View } from '../component';

export function getRenderView(viewInstance: View) {
  const RenderView: React.FunctionComponent<{ [key: string]: any }> = (props) => {
    const result = viewInstance && viewInstance.render && viewInstance.render();
    return <React.Fragment>{result || props.children}</React.Fragment>;
  };
  return RenderView;
}
