import {
    SEARCH_RESULT_REQUEST,
    SEARCH_RESULT_SUCCESS,
} from '../constants/locationConstants'

export const searchResultReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_RESULT_REQUEST:
            return { loading: true }

        case SEARCH_RESULT_SUCCESS:
            return { loading: false, results: action.payload }

        default:
            return state
    }
}