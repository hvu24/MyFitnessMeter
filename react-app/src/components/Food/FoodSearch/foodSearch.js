import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "./SearchBar.css"
import { getSearchFoods } from '../../../store/foodSearch';
import { getFoodNutrition } from '../../../store/foodNutrition';
import Plot from 'react-plotly.js';
import { getProfile } from '../../../store/profile';
import { showNutrientDetail } from '../../../utilities/showNutritionDetail';

const FoodSearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [foods, setFoods] = useState({});
    const [nutrition, setNutrition] = useState({})
    const dispatch = useDispatch();
    const [calories, setCalories] = useState(2000)
    const [calorieGoal, setCalorieGoal] = useState(1)
    const [proteinGoal, setProteinGoal] = useState(0)
    const [fatGoal, setFatGoal] = useState(0)
    const [carbGoal, setCarbGoal] = useState(0)

    useEffect(() => {
        dispatch(getSearchFoods(searchTerm))
        dispatch(getProfile())
            .then((res) => {
                if (res?.id) {
                    setCalorieGoal(res?.basalMetabolicRate + res?.activityCalories + res?.weightGoalCalories)
                    setProteinGoal((res?.basalMetabolicRate + res?.activityCalories + res?.weightGoalCalories) * (res?.proteinRatio / 100) / 4)
                    setFatGoal((res?.basalMetabolicRate + res?.activityCalories + res?.weightGoalCalories) * (res?.fatRatio / 100) / 9)
                    setCarbGoal((res?.basalMetabolicRate + res?.activityCalories + res?.weightGoalCalories) * (res?.carbohydrateRatio / 100) / 4)
                }
            })
    }, [dispatch, searchTerm]);

    const handleInputChange = async (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        setFoods(await dispatch(getSearchFoods(searchTerm)))
    }

    const handleSearch = async (food) => {
        setSearchTerm(food)
        const payload = {
            "query": food
        }
        dispatch(getFoodNutrition(payload))
            .then(async (res) => {
                setNutrition(res?.foods[0])
            })
    }

    return (
        <div className='food-search-bar-container'>
            <div className='food-search-container'>
                <div style={{ marginTop: '25px', marginLeft: '200px' }}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input className='search-bar' placeholder='Search...' type="text" value={searchTerm} onChange={handleInputChange} />
                            <button type="submit" className='search-bar-button'>
                                <i class="fa-solid fa-utensils"></i>
                            </button>
                        </div>
                    </form>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-around', marginTop: '20px' }}>
                    <div>
                        {foods && foods.common && <h5 style={{ display: "flex", justifyContent: 'center' }}>Common Foods</h5>}
                        <div className='common-list'>
                            {foods && foods.common && foods?.common.map((food, index) => (
                                <div className='entry' key={index} onClick={() => handleSearch(food.food_name)}>{food.food_name}</div>
                            ))}
                        </div>
                    </div>
                    <div>
                        {foods && foods.branded && <h5 style={{ display: "flex", justifyContent: 'center' }}>Branded Foods</h5>}
                        <div className='branded-list'>
                            {foods && foods.branded && foods?.branded.map((food, index) => (
                                <div className='entry' key={index} onClick={() => handleSearch(food.food_name)}>{food.food_name}</div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div>
                        {nutrition && nutrition.food_name && <h5 style={{ display: "flex", justifyContent: 'center' }}>Nutrition Facts</h5>}
                        <div className='branded-list'>
                            {nutrition && nutrition.full_nutrients && <div><b>Food name : </b>{nutrition.food_name}</div>}
                            {nutrition && nutrition.full_nutrients && <div><b>Serving size : </b>{nutrition.serving_weight_grams} g</div>}
                            {nutrition && nutrition.full_nutrients && <div><b>Calories : </b>{nutrition.nf_calories} kcal</div>}
                            {nutrition && nutrition.full_nutrients && <div><b>Calories per gram : </b>{nutrition.nf_calories / nutrition.serving_weight_grams} kcal</div>}
                            {nutrition && nutrition.full_nutrients && nutrition?.full_nutrients.map((nutrient, index) => {
                                if (showNutrientDetail(nutrient.attr_id).name !== 'none') return <div className='' key={index}><b>{showNutrientDetail(nutrient.attr_id).name}</b> : {nutrient.value} {showNutrientDetail(nutrient.attr_id).unit}</div>
                            })}
                        </div>
                    </div>
                    <div>
                        {nutrition && nutrition.food_name && <h5 style={{ display: "flex", justifyContent: 'center' }}>Recommended Daily Intake</h5>}
                        <div className='rda'>
                            {nutrition && nutrition.full_nutrients && nutrition?.full_nutrients.map((nutrient, index) => {
                                if (showNutrientDetail(nutrient.attr_id).name !== 'none' && showNutrientDetail(nutrient.attr_id, carbGoal, fatGoal, proteinGoal).target !== 0) return <div><Plot
                                    data={[
                                        {
                                            type: 'indicator',
                                            mode: 'gauge+number+delta',
                                            value: nutrient.value,
                                            delta: { reference: showNutrientDetail(nutrient.attr_id, carbGoal, fatGoal, proteinGoal).target },
                                            title: { text: showNutrientDetail(nutrient.attr_id, carbGoal, fatGoal, proteinGoal).name, font: { size: 15 } },
                                            gauge: {
                                                axis: { range: [null, showNutrientDetail(nutrient.attr_id, carbGoal, fatGoal, proteinGoal).target], tickwidth: 1, tickcolor: 'black' },
                                                bar: { color: 'blue' },
                                                shape: 'bullet',
                                                bgcolor: 'white',
                                                borderwidth: 2,
                                                bordercolor: 'gray',
                                                steps: [
                                                    { range: [0, showNutrientDetail(nutrient.attr_id, carbGoal, fatGoal, proteinGoal).target * .25], color: '#ff1a1a' },
                                                    { range: [showNutrientDetail(nutrient.attr_id, carbGoal, fatGoal, proteinGoal).target * .25, showNutrientDetail(nutrient.attr_id, carbGoal, fatGoal, proteinGoal).target * .5], color: '#ff9933' },
                                                    { range: [showNutrientDetail(nutrient.attr_id, carbGoal, fatGoal, proteinGoal).target * .5, showNutrientDetail(nutrient.attr_id, carbGoal, fatGoal, proteinGoal).target * .75], color: '#ffff1a' },
                                                    { range: [showNutrientDetail(nutrient.attr_id, carbGoal, fatGoal, proteinGoal).target * .75, showNutrientDetail(nutrient.attr_id, carbGoal, fatGoal, proteinGoal).target], color: '#33cc33' },
                                                ],
                                            },
                                        },
                                    ]}
                                    layout={
                                        {
                                            width: 500,
                                            height: 20,
                                            margin: { t: 0, r: 150, l: 200, b: 0 },
                                            paper_bgcolor: 'rgb(255, 255, 255, 0.0)',
                                        }
                                    }
                                    style={{ width: '100%', height: '100%' }}
                                /></div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodSearchBar;
