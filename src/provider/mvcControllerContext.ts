import { createContext } from 'react';
import { MvcController } from './mvcController';

export const mvcControllerContext = createContext<MvcController>(null);
