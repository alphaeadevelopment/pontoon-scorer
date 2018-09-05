import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import ContentOverlay from '../ContentOverlay';
import { drawerRef } from '../../lib/drawer';
import DrawerPortal from './DrawerPortal';

const styles = {
  'root': {
  },
  'content': {
    '&$drawerOpen': {
      'transform': 'translateX(0%)',
      'box-shadow': '0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)',
    },
    'background': 'white',
    'height': props => props.pageHeight,
    'left': 0,
    'position': 'fixed',
    'top': 0,
    'transform': 'translateX(-100%)',
    'transition': 'transform 0.5s ease-in-out',
    'width': '300px',
    'z-index': 6,
  },
  'drawerOpen': {},
};
@injectSheet(styles)
class Drawer extends React.Component {
  render() {
    const { classes, open, onClose, children, pageHeight } = this.props;
    return (
      <DrawerPortal drawerRef={drawerRef}>
        <div
          className={classNames(classes.root)}
        >
          <ContentOverlay pageHeight={pageHeight} visible={open} onBackgroundClicked={onClose} />
          <div
            className={classNames(classes.content, { [classes.drawerOpen]: open })}
          >
            {children}
          </div>
        </div>
      </DrawerPortal>
    );
  }
}

export default Drawer;
