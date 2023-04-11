const GET_EXERCISE_DETAILS = "/food/getExerciseDetails";



const getExerciseDetailsAction = (details) => ({
    type: GET_EXERCISE_DETAILS,
    details,
});


export const getExerciseDetails = (payload) => async (dispatch) => {
    const res = await fetch(`https://trackapi.nutritionix.com/v2/natural/exercise`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-app-id": process.env.REACT_APP_NUTRI_APP_ID,
            "x-app-key": process.env.REACT_APP_NUTRI_APP_KEY
        },
        body: JSON.stringify(payload)

    });

    if (res.ok) {
        const details = await res.json();
        dispatch(getExerciseDetailsAction(details));
        return details;
    }
};

const initialState = {};

export const exerciseDetailsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_EXERCISE_DETAILS: {
            newState = { ...action.details.exercises[0]}
            return newState;
        }

        default:
            return state;
    }

};
