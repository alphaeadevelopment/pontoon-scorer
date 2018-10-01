import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import ContentOverlay from '../ContentOverlay';
import { modalRef } from '../../lib/modal';
import ModalPortal from './ModalPortal';
import withSizeClasses from '../withSizeClasses';

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
    'transform': 'translateX(-50%) translateY(-100%)',
    'left': props => props.pageWidth / 2,
    'top': props => props.pageHeight / 2,
    'min-width': props => props.pageWidth / 4,
    'padding': `${theme.spacing.unit * 2}px`,
    'z-index': 6,
    'width': '100%',
    '$md &': {
      'width': 'initial',
    },
  },
  'md': {},
  'open': {},
});
@injectSheet(styles)
@withSizeClasses
class Modal extends React.Component {
  static propTypes = {
    disableBackdropClick: PropTypes.bool,
    onClose: PropTypes.func,
    pageHeight: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
    pageWidth: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types

  }
  static defaultProps = {
    disableBackdropClick: false,
    onClose: null,
  }
  render() {
    const { contentClassName, className, classes, open, onClose, children, disableBackdropClick, pageHeight } = this.props;
    return (
      <ModalPortal modalRef={modalRef}>
        <aside
          className={classNames(classes.root, className)}
          hidden={!open}
        >
          <ContentOverlay
            pageHeight={pageHeight}
            visible={open}
            onBackgroundClicked={disableBackdropClick ? null : onClose}
          />
          <div
            className={classNames(classes.content, contentClassName, { [classes.open]: open })}
          >
            {children}
          </div>
        </aside>
      </ModalPortal>
    );
  }
}

export default Modal;
