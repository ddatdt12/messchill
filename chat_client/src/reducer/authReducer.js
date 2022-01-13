export const authReducer = (state, action) => {
  const { type, payload } = action;

  let updatedState = {};
  switch (type) {
    case 'AUTH_LOADING': {
      updatedState = { ...state, isLoading: true };
      break;
    }
    case 'SET_AUTH': {
      updatedState = { ...state, user: { ...payload }, isLoading: false };
      break;
    }
    case 'NO_LOGIN': {
      updatedState = { error: null, user: null, isLoading: false };
      break;
    }
    case 'FAILED_LOGIN': {
      updatedState = { user: null, isLoading: false, error: payload };
      break;
    }
    default:
      updatedState = { ...state };
      break;
  }
  return updatedState;
};
