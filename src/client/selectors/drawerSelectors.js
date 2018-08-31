import { createSelector } from 'reselect';

export const getDrawer = state => state.drawer || {};

export const isDrawerOpen = createSelector(getDrawer, drawer => drawer.open);
