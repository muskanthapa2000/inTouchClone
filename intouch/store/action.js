export const SET_FILTER_DATA = "SET_FILTER_DATA";
export const SET_TABLE_DATA = "SET_TABLE_DATA";
export const APPLY_FILTER_DATA = "APPLY_FILTER_DATA";
export const SEARCH_DATA = "SEARCH_DATA"

export const setFilterData = (data) => ({
    type: SET_FILTER_DATA,
    payload: data,
  });

export const setTableData = (data)=>({
  type : SET_TABLE_DATA,
  payload : data
})

export const applyFilterData = (data)=>({
  type : APPLY_FILTER_DATA,
  payload : data
})

export const setSearchQuery = (data)=>({
  type : SEARCH_DATA,
  payload : data
})
  