const getWrapped = C => C.WrappedComponent || C.InnerComponent || null;

const getNeedyComponent = (C) => {
  if (C.needs) return C;
  const wrapped = getWrapped(C);
  if (!wrapped) {
    return C;
  }

  return getNeedyComponent(wrapped);
};

export default (Comp, store) => {
  const C = getNeedyComponent(Comp);
  if (!C || !C.needs) return Promise.resolve();
  if (Array.isArray(C.needs)) {
    return Promise.all(C.needs.map(p => p(store)));
  }
  if (typeof C.needs === 'function') {
    return C.needs(store);
  }
  return Promise.resolve();
};
