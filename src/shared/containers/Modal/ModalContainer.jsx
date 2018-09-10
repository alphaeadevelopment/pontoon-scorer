import React from 'react';
import { connect } from 'react-redux';
import { getHeight, getWidth } from '../../selectors/viewportSelectors';
import { modalRef } from '../../lib/modal';
import Modal from './Modal';

@connect(state => ({
  pageHeight: getHeight(state),
  pageWidth: getWidth(state),
}))
class ModalContainer extends React.Component {
  componentDidMount() {
    this.interval = setInterval(this.checkModalRef, 100);
  }
  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }
  checkModalRef = () => {
    if (modalRef.current) {
      this.forceUpdate();
      clearInterval(this.interval);
    }
  }
  render() {
    return (
      <Modal {...this.props} />
    );
  }
}

export default ModalContainer;

