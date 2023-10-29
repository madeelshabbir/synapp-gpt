import {
  CALORIES_LIST_REQUEST,
  CALORIES_LIST_SUCCESS,
  CALORIES_LIST_FAILURE,
  CALORIES_LIST_AVG_REQUEST,
  CALORIES_LIST_AVG_SUCCESS,
  CALORIES_LIST_AVG_FAILURE,
  TOTAL_ENTRIES_REQUEST,
  TOTAL_ENTRIES_SUCCESS,
  TOTAL_ENTRIES_FAILURE,
} from "../constants/CaloriesListConstants";
export const caloriesListReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case CALORIES_LIST_REQUEST:
      return { loading: true, cal: [] };
    case CALORIES_LIST_SUCCESS:
      return { loading: false, cal: action.payload };
    case CALORIES_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ADMIN CALORIES AVERAGE REDUCER
export const caloriesAvgReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case CALORIES_LIST_AVG_REQUEST:
      return { loading: true, cal_avg: [] };
    case CALORIES_LIST_AVG_SUCCESS:
      return { loading: false, cal_avg: action.payload };
    case CALORIES_LIST_AVG_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// TOTAL ENTRIES REDUCER
export const totalEntriesReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case TOTAL_ENTRIES_REQUEST:
      return { loading: true, total_entries: [] };
    case TOTAL_ENTRIES_SUCCESS:
      return { loading: false, total_entries: action.payload };
    case TOTAL_ENTRIES_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
