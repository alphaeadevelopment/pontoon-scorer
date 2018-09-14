import { createSelector } from 'reselect';

export const rootSelector = state => state.viewport;

const breakpoints = {
  sm: 375,
  md: 768,
  lg: 1200,
  xl: 1600,
};

export const getWidth = createSelector(rootSelector, viewport => viewport.width);
export const getHeight = createSelector(rootSelector, viewport => viewport.height);

export const getRequestedScrollPosition = createSelector(rootSelector, viewport => viewport.scrollTo);
export const getRequestedScrollX = createSelector(getRequestedScrollPosition, scroll => scroll.x);
export const getRequestedScrollY = createSelector(getRequestedScrollPosition, scroll => scroll.y);

const createIsMinSelector = breakpoint => createSelector(getWidth, width => width >= breakpoints[breakpoint]);
export const isMinSm = createIsMinSelector('sm');
export const isMinMd = createIsMinSelector('md');
export const isMinLg = createIsMinSelector('lg');
export const isMinXl = createIsMinSelector('xl');
