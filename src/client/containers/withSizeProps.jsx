import React from 'react';
import { connect } from 'react-redux';
import { isMinSm, isMinMd, isMinLg, isMinXl } from '../selectors/viewportSelectors';

export default (Wrapped) => {
  @connect(state => (
    {
      minSm: isMinSm(state),
      minMd: isMinMd(state),
      minLg: isMinLg(state),
      minXl: isMinXl(state),
    }
  ))
  class WithSizeProps extends React.Component {
    render() {
      const { minSm, minMd, minLg, minXl } = this.props;
      const xs = !minSm;
      const sm = minSm && !minMd;
      const md = minMd && !minLg;
      const lg = minLg && !minXl;
      const xl = minXl;
      const sizeProps = { xs, sm, md, lg, xl };
      return (
        <Wrapped
          {...this.props}
          {...sizeProps}
        />);
    }
  }

  return WithSizeProps;
};
