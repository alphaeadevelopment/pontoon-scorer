import React from 'react';
import GridContainer from './GridContainer';
import GridItem from './GridItem';


const Grid = ({ container, item, ...props }) => {
  if (container) return <GridContainer {...props} />;
  if (item) return <GridItem {...props} />;
  return null;
};
export default React.forwardRef((props, ref) => <Grid forwardedRef={ref} {...props} />);
