const GET_SEARCH_EXERCISES = "/food/getSearchExercises";


const getSearchExercisesAction = (exercises) => ({
    type: GET_SEARCH_EXERCISES,
    exercises,
});


export const getSearchExercises = (searchTerm) => async (dispatch) => {
    console.log('logging search term from thunk', searchTerm)
    const res = await fetch(`https://api.api-ninjas.com/v1/exercises?name=${searchTerm}`, {
        method: "GET",
        headers: {
            "X-Api-Key": process.env.REACT_APP_EXERCISE_API_KEY
        }
    });

    if (res.ok) {
        const exercises = await res.json();
        dispatch(getSearchExercisesAction(exercises));
        return exercises;
    }
};

const initialState = {};

export const searchExercisesReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_SEARCH_EXERCISES: {
            newState = { ...action.exercises }
            return newState;
        }

        default:
            return state;
    }

};
