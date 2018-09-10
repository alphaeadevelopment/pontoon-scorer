/* eslint-disable no-undef */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { resize } from '../actions/viewport';

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
    const { onResize } = this.props;
    onResize({ width: window.innerWidth, height: window.innerHeight });
  }
  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}

export default connect(() => ({}), { onResize: resize })(WindowEventProvider);
