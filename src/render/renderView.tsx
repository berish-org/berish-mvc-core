import React from 'react';

import { View } from '../component';

export interface RenderViewProps {
  view: View;
}

export const RenderView: React.FunctionComponent<RenderViewProps> = (props) => {
  const { view } = props;
  const result = view && view.render && view.render();
  return <>{result || props.children}</>;
};
