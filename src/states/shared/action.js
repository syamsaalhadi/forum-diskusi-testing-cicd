import { asyncPreloadAuthUser } from '../authUser/action';
import { asyncPopulateUsers } from '../users/action';
import { asyncPopulateThreads } from '../threads/action';
import { setIsPreloadActionCreator } from '../isPreload/action';

function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      await Promise.all([
        dispatch(asyncPreloadAuthUser()),
        dispatch(asyncPopulateUsers()),
        dispatch(asyncPopulateThreads()),
      ]);
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}

export { asyncPreloadProcess };
