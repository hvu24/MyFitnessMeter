const GET_SEARCH_FOODS = "/food/getSearchFoods";


const getSearchFoodsAction = (foods) => ({
    type: GET_SEARCH_FOODS,
    foods,
});


export const getSearchFoods = (searchTerm) => async (dispatch) => {
    console.log('logging search term from thunk', searchTerm)
    const res = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${searchTerm}`, {
        method: "GET",
        headers: {
            "x-app-id": process.env.REACT_APP_NUTRI_APP_ID,
            "x-app-key": process.env.REACT_APP_NUTRI_APP_KEY
        }
    });

    if (res.ok) {
        const foods = await res.json();
        dispatch(getSearchFoodsAction(foods));
        return foods;
    }
};

const initialState = {};

export const searchFoodsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_SEARCH_FOODS: {
            newState = { ...action.foods }
            return newState;
        }

        default:
            return state;
    }

};
