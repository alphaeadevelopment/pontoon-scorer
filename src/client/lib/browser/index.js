/* globals window */
export const loadGameFromBrowser = () => {
  const obj = window.localStorage.getItem('__pontoon_game');
  return Promise.resolve(obj ? JSON.parse(obj) : null);
};

export const saveGameToBrowser = game =>
  Promise.resolve(window.localStorage.setItem('__pontoon_game', JSON.stringify(game)));
