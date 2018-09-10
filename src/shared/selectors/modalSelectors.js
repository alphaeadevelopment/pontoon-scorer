import { createSelector } from 'reselect';

export const getModal = state => state.modal || {};

export const isShowModal = createSelector(getModal, modal => modal.show);
