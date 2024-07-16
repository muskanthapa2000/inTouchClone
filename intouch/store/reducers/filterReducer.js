import { APPLY_FILTER_DATA, SEARCH_DATA, SET_FILTER_DATA } from "../action";

const initialState = {
    filterData : {},
    appliedFilters: {},
    searchQuery: {},
}
const filterReducer =(state = initialState , action)=>{
    switch (action.type) {
        case SET_FILTER_DATA:
            return {
                ...state, 
                filterData: action.payload
            }
        case APPLY_FILTER_DATA : 
            return {
                ...state,
                appliedFilters : action.payload
            }

        case SEARCH_DATA : 
            return {
                ...state,
                searchQuery : action.payload
            }
        default:
            return state;
    }
}

export default filterReducer;