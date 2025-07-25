export * as ipni from './ipni';
export * as powo from './powo';
export * as kpl from './kpl';
export * from './core';

export const VERSION = [1, 0, 0] as const;
export const __version__ = VERSION.join('.');