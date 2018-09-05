import ReactDOM from 'react-dom';

export default ({ drawerRef, children }) => {
  if (!drawerRef || !drawerRef.current) return null;
  return ReactDOM.createPortal(children, drawerRef.current);
};
