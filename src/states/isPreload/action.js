function setIsPreloadActionCreator(isPreload) {
  return {
    type: 'SET_IS_PRELOAD',
    payload: { isPreload },
  };
}

export { setIsPreloadActionCreator };
