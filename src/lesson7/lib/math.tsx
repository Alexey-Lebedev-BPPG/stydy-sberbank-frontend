import type { FC } from 'react';

export const add = (a: number, b: number): number => a + b;
export const multiply = (a: number, b: number): number => a * b;

export const MathComponent: FC = () => {
  return <div>Math Component: {add(2, 3)}</div>;
};
