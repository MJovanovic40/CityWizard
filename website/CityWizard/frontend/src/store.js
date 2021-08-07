import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import {
    userLoginReducer,
    userRegisterReducer,
    //userDetailsReducer,
    //userUpdateProfileReducer,
    //userListReducer,
    //userDeleteReducer,
    //userUpdateReducer,
    //getUserReducer,
} from './reducers/userReducers'

/*import {
    projectListReducer,
    projectDeleteReducer,
    projectCreateReducer,
    projectUpdateReducer,
    projectDetailsReducer,
} from './reducers/projectReducers'*/

const reducer = combineReducers({
    /*projectCreate: projectCreateReducer,
    projectDelete: projectDeleteReducer,
    projectList: projectListReducer,
    projectUpdate: projectUpdateReducer,
    projectDetails: projectDetailsReducer,*/

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    /*userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userGet: getUserReducer,*/
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store