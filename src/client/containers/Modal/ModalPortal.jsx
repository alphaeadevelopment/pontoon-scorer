import ReactDOM from 'react-dom';

export default ({ children, modalRef }) => {
  if (!modalRef || !modalRef.current) return null;
  return ReactDOM.createPortal(children, modalRef.current);
};
