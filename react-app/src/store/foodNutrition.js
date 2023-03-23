const GET_FOOD_NUTRITION = "/food/getFoodNutrition";



const getFoodNutritionAction = (nutrition) => ({
    type: GET_FOOD_NUTRITION,
    nutrition,
});


export const getFoodNutrition = (payload) => async (dispatch) => {
    const res = await fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-app-id": process.env.REACT_APP_NUTRI_APP_ID,
            "x-app-key": process.env.REACT_APP_NUTRI_APP_KEY
        },
        body: JSON.stringify(payload)

    });

    if (res.ok) {
        const nutrition = await res.json();
        dispatch(getFoodNutritionAction(nutrition));
        return nutrition;
    }
};

const initialState = {};

export const foodNutritionReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_FOOD_NUTRITION: {
            newState = { ...action.nutrition.foods[0]}
            return newState;
        }

        default:
            return state;
    }

};
