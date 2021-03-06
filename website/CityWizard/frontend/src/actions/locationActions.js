import {
    SEARCH_RESULT_REQUEST,
    SEARCH_RESULT_SUCCESS,
    SEARCH_RESULT_FAIL,
} from '../constants/locationConstants'
import axios from 'axios'

export const resultsAction = (country) => async (dispatch) => {
    axios.defaults.baseURL = "http://52.57.159.2:8000/"
    try {
        dispatch({
            type: SEARCH_RESULT_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.get("http://52.57.159.2:8000/api/getresults?country=" + country)

        dispatch({
            type: SEARCH_RESULT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SEARCH_RESULT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data
                : error.response.data,
        })
    }
}

