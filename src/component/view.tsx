import React from 'react';

export type View<TProps = {}> = React.ComponentClass<TProps> | React.FunctionComponent<TProps>;
export type ViewInstance = JSX.Element;
