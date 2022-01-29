export const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'AUTH_LOADING': {
      return { ...state, isLoading: true };
    }
    case 'SET_AUTH': {
      return { ...state, user: { ...payload }, isLoading: false };
    }
    case 'NO_LOGIN': {
      console.log('No_LOGIN');
      return { error: null, user: null, isLoading: false };
    }
    case 'FAILED_LOGIN': {
      return { user: null, isLoading: false, error: payload };
    }
    case 'UPDATE_USER': {
      return { ...state, user: { ...payload } };
    }
    default:
      return { ...state };
  }
};
