import { createSelector } from 'reselect';

export const rootSelector = state => state.page.settings || {};

export const isSettingsOpen = createSelector(rootSelector, settings => settings.open);

export const getGameSettings = createSelector(rootSelector, settings => settings.game);

const stakeSelector = createSelector(getGameSettings, settings => settings.stake);
export const getMinimumStake = createSelector(stakeSelector, stake => stake.minimum);
export const getMaximumStake = createSelector(stakeSelector, stake => stake.maximum);
