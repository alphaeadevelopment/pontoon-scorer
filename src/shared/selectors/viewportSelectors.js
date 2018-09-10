import { createSelector } from 'reselect';

export const getViewport = state => state.viewport;

const breakpoints = {
  sm: 375,
  md: 768,
  lg: 1200,
  xl: 1600,
};

export const getWidth = createSelector(getViewport, viewport => viewport.width);
export const getHeight = createSelector(getViewport, viewport => viewport.height);

const createIsMinSelector = breakpoint => createSelector(getWidth, width => width >= breakpoints[breakpoint]);
export const isMinSm = createIsMinSelector('sm');
export const isMinMd = createIsMinSelector('md');
export const isMinLg = createIsMinSelector('lg');
export const isMinXl = createIsMinSelector('xl');
