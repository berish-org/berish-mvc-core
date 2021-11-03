import { createContext } from 'react';
import type { Controller } from './controller';

export const controllerContext = createContext<Controller>(null);
