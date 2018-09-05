import React from 'react';
import ReactDOM from 'react-dom';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { DrawerContext } from '../lib/context';
import { getHeight } from '../selectors/viewportSelectors';
import ContentOverlay from './ContentOverlay';

const styles = {
  root: {
    content: {
      '&$drawerOpen': {
        'transform': 'translateX(0%)',
        'box-shadow': '0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)',
      },
      'background': 'white',
      'height': props => props.height,
      'left': 0,
      'position': 'fixed',
      'top': 0,
      'transform': 'translateX(-100%)',
      'transition': 'transform 0.5s ease-in-out',
      'width': '300px',
      'z-index': 6,
    },
  },
  drawerOpen: {},
};
@connect(state => ({
  height: getHeight(state),
}))
@injectSheet(styles)
class Drawer extends React.Component {
  render() {
    const { classes, open, onClose, children } = this.props;
    console.log('Drawer open', open);
    return (
      <DrawerContext.Consumer>
        {(drawerRef) => {
          console.log('render open', open);
          return drawerRef && drawerRef.current && ReactDOM.createPortal(
            <div
              className={classNames(classes.root)}
            >
              <ContentOverlay visible={open} onBackgroundClicked={onClose} />
              <div
                className={classNames(classes.content, { [classes.drawerOpen]: open })}
              >
                {children}
              </div>
            </div>,
            drawerRef.current,
          );
        }}
      </DrawerContext.Consumer>
    );
  }
}

export default Drawer;
