const messageMap = {
};

export default ({ message }) => {
  const formatted = messageMap[message];
  return formatted || message;
};
