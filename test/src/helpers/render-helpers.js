/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

const makeGetTree = wrapper => () => toJson(wrapper);

const getWrapped = (C) => {
  if (C.WrappedComponent || C.InnerComponent) return getWrapped(C.WrappedComponent || C.InnerComponent);
  return C;
};

export const createRender = (Component, opts = { wrapped: true, context: {} }) => {
  const outerContext = opts.context;
  const C = opts.wrapped ? getWrapped(Component) : Component;
  return (props = {}, context) => {
    const comp = (
      <C {...props} />
    );
    const contextToUse = {
      ...outerContext,
      ...context,
    };
    const wrapper = shallow(comp, { context: contextToUse });
    return {
      wrapper,
      instance: wrapper.instance,
      getTree: makeGetTree(wrapper),
    };
  };
};
