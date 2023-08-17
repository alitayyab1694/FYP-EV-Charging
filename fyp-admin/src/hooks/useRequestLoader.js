import * as Type from 'Actions/type';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
const useRequestLoader = (isLoading) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch({
      type: Type.SET_LOADING,
      payload: isLoading
    });
  }, [dispatch, isLoading]);

  const startLoading = () => {
    dispatch({
      type: Type.SET_LOADING,
      payload: true
    });
  };

  const stopLoading = () => {
    dispatch({
      type: Type.SET_LOADING,
      payload: false
    });
  };

  const withLoader = async () => {
    startLoading();
    return await promise
      .then((res) => {
        stopLoading();
        return res;
      })
      .catch((e) => {
        stopLoading();
        throw e;
      });
  };

  return { withLoader };
};

export default useRequestLoader;
