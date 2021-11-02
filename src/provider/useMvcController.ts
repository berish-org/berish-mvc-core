import { useContext } from 'react';
import { mvcControllerContext } from './mvcControllerContext';

export function useMvcController() {
  return useContext(mvcControllerContext);
}
