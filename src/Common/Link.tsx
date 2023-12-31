import React from 'react';
import c from 'classnames';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

export function Link({ className, ...props }: LinkProps): JSX.Element {
  return (
    <RouterLink {...props} className={c(className, 'text-indigo-500 hover:text-indigo-600')} />
  );
}
