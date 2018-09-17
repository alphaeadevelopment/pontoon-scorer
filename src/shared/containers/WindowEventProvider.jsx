import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { setSize } from '../actions/viewport';
import { window } from '../services';

@connect(() => ({}), { setSize })
class WindowEventProvider extends Component {
  constructor(props) {
    super(props);
    this.debouncedUpdateSize = debounce(this.updateSize, 100);
  }
  componentDidMount() {
    this.updateSize();
    window.addEventListener('resize', this.debouncedUpdateSize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedUpdateSize);
  }
  updateSize = () => {
    const { setSize } = this.props;
    setSize(window.innerWidth, window.innerHeight);
  }
  render() {
    const { children } = this.props;
    return (
      <Fragment>
        {children}
      </Fragment>
    );
  }
}

export default WindowEventProvider;
