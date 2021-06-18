export const register = (user) => {
    return (dispatch) =>{
        dispatch({type: "REGISTER", user})
    }
}