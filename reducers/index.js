const initialState = {
  user: [],
  filterText: '',
};

const reducer = (state = initialState, action) => {
  const newState = {...state};

  switch (action.type) {
    case 'FETCH_DATA_API':
      newState.user = action.value;
      break;
    case 'FILTER_NAME':
      newState.filterText = action.value;
    default:
      break;
  }

  return newState;
};

export default reducer;
