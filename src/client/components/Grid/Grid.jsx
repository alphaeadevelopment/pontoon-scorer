import React from 'react';
import GridContainer from './GridContainer';
import GridItem from './GridItem';


const RawGrid = ({ container, item, ...props }) => {
  if (container) return <GridContainer {...props} />;
  if (item) return <GridItem {...props} />;
  return null;
};
export default RawGrid;
