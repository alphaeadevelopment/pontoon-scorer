import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import ContentOverlay from '../ContentOverlay';
import { modalRef } from '../../lib/modal';
import ModalPortal from './ModalPortal';

const styles = theme => ({
  'root': {
  },
  'content': {
    '&$open': {
      'box-shadow': '0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)',
    },
    '&:not($open)': {
      display: 'none',
    },
    'background': 'white',
    'position': 'fixed',
    'transform': 'translateX(-50%) translateY(-50%)',
    'left': props => props.pageWidth / 2,
    'top': props => props.pageHeight / 2,
    'min-width': 400,
    'min-height': 300,
    'padding': theme.spacing.unit * 4,
    'z-index': 6,
  },
  'open': {},
});
@injectSheet(styles)
class Modal extends React.Component {
  static propTypes = {
    closeOnBackgroundClick: PropTypes.bool,
    onClose: PropTypes.func,
    pageHeight: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
    pageWidth: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
  }
  static defaultProps = {
    closeOnBackgroundClick: true,
    onClose: null,
  }
  render() {
    const { contentClassName, classes, open, onClose, children, closeOnBackgroundClick, pageHeight } = this.props;
    return (
      <ModalPortal modalRef={modalRef}>
        <div
          className={classNames(classes.root)}
        >
          <ContentOverlay
            pageHeight={pageHeight}
            visible={open}
            onBackgroundClicked={closeOnBackgroundClick ? onClose : null}
          />
          <div
            className={classNames(classes.content, contentClassName, { [classes.open]: open })}
          >
            {children}
          </div>
        </div>
      </ModalPortal>
    );
  }
}

export default Modal;
