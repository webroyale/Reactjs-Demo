
import {combineReducers } from 'redux';

const user ={
    email: "",
    password: ""
}

const UserReducer = (state=user , action) => {
    switch(action.type){
        case "REGISTER": 
            return {
                ...action.user
            }
        default: 
            return {...state}
    }
}



const User = combineReducers({
    user: UserReducer,
});


export default  User;