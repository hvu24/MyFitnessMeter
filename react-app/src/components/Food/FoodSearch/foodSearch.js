import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "./SearchBar.css"
import { getSearchFoods } from '../../../store/foodSearch';
import { getFoodNutrition } from '../../../store/foodNutrition';
import Plot from 'react-plotly.js';
import { getProfile } from '../../../store/profile';

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
        // console.log('logging searchTerm from input change', searchTerm)
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
                // if(!res?.foods[0]){
                //     console.log('yo')
                // }
            })
    }

    const showNutrientDetail = (id) => {
        let detail = {
            'name': '',
            'unit': ''
        }
        switch (id) {
            // case 208:
            //     detail.name = 'Energy'
            //     detail.unit = 'kcal'
            //     break
            case 221:
                detail.name = 'Alcohol'
                detail.unit = 'g'
                detail.target = 0
                break
            case 262:
                detail.name = 'Caffeine'
                detail.unit = 'mg'
                detail.target = 0
                break
            case 255:
                detail.name = 'Water'
                detail.unit = 'g'
                detail.target = 3700
                break
            case 291:
                detail.name = 'Fiber'
                detail.unit = 'g'
                detail.target = 38
                break
            case 209:
                detail.name = 'Starch'
                detail.unit = 'g'
                detail.target = 0
                break
            case 269:
                detail.name = 'Sugars'
                detail.unit = 'g'
                detail.target = 0
                break
            case 205:
                detail.name = 'Net carbs'
                detail.unit = 'g'
                detail.target = carbGoal
                break
            case 204:
                detail.name = 'Total fat'
                detail.unit = 'g'
                detail.target = fatGoal
                break
            case 645:
                detail.name = 'Monounsaturated fat'
                detail.unit = 'g'
                detail.target = 0
                break
            case 646:
                detail.name = 'Polyunsaturated fat'
                detail.unit = 'g'
                detail.target = 0
                break
            case 619:
                detail.name = 'Alphalinolenic acid'
                detail.unit = 'g'
                detail.target = 2
                break
            case 629:
                detail.name = 'Eicosapentaenoic acid'
                detail.unit = 'g'
                detail.target = 0.25
                break
            case 621:
                detail.name = 'Docosahexaenoic acid'
                detail.unit = 'g'
                detail.target = 0.25
                break
            case 618:
                detail.name = 'Linoleic acid'
                detail.unit = 'g'
                detail.target = 10
                break
            case 620:
                detail.name = 'Arachidonic acid'
                detail.unit = 'g'
                detail.target = 7
                break
            case 606:
                detail.name = 'Saturated fat'
                detail.unit = 'g'
                detail.target = 0
                break
            case 605:
                detail.name = 'Trans fat'
                detail.unit = 'g'
                detail.target = 0
                break
            case 601:
                detail.name = 'Cholesterol'
                detail.unit = 'mg'
                detail.target = 0
                break
            case 203:
                detail.name = 'Total protein'
                detail.unit = 'g'
                detail.target = proteinGoal
                break
            case 512:
                detail.name = 'Histidine'
                detail.unit = 'g'
                detail.target = 1.1
                break
            case 503:
                detail.name = 'Isoleucine'
                detail.unit = 'g'
                detail.target = 1.5
                break
            case 504:
                detail.name = 'Leucine'
                detail.unit = 'g'
                detail.target = 3.3
                break
            case 505:
                detail.name = 'Lysine'
                detail.unit = 'g'
                detail.target = 3
                break
            case 506:
                detail.name = 'Methionine'
                detail.unit = 'g'
                detail.target = 0.8
                break
            case 508:
                detail.name = 'Phenylalanine'
                detail.unit = 'g'
                detail.target = 1.3
                break
            case 502:
                detail.name = 'Threonine'
                detail.unit = 'g'
                detail.target = 1.6
                break
            case 501:
                detail.name = 'Tryptophan'
                detail.unit = 'g'
                detail.target = 0.4
                break
            case 510:
                detail.name = 'Valine'
                detail.unit = 'g'
                detail.target = 1.9
                break
            case 404:
                detail.name = 'Vitamin b1'
                detail.unit = 'mg'
                detail.target = 1.2
                break
            case 405:
                detail.name = 'Vitamin b2'
                detail.unit = 'mg'
                detail.target = 1.3
                break
            case 406:
                detail.name = 'Vitamin b3'
                detail.unit = 'mg'
                detail.target = 16
                break
            case 410:
                detail.name = 'Vitamin b5'
                detail.unit = 'mg'
                detail.target = 5
                break
            case 415:
                detail.name = 'Vitamin b6'
                detail.unit = 'mg'
                detail.target = 1.3
                break
            case 418:
                detail.name = 'Vitamin b12'
                detail.unit = 'Aug'
                detail.target = 2.4
                break
            case 417:
                detail.name = 'Folate'
                detail.unit = 'Aug'
                detail.target = 400
                break
            case 320:
                detail.name = 'Vitamin a'
                detail.unit = 'Aug'
                detail.target = 900
                break
            case 401:
                detail.name = 'Vitamin c'
                detail.unit = 'mg'
                detail.target = 90
                break
            case 324:
                detail.name = 'Vitamin d'
                detail.unit = 'iu'
                detail.target = 600
                break
            case 323:
                detail.name = 'Vitamin e'
                detail.unit = 'mg'
                detail.target = 15
                break
            case 430:
                detail.name = 'Vitamin k'
                detail.unit = 'Aug'
                detail.target = 120
                break
            case 301:
                detail.name = 'Calcium'
                detail.unit = 'mg'
                detail.target = 1000
                break
            case 312:
                detail.name = 'Copper'
                detail.unit = 'mg'
                detail.target = 0.9
                break
            case 303:
                detail.name = 'Iron'
                detail.unit = 'mg'
                detail.target = 8
                break
            case 304:
                detail.name = 'Magnesium'
                detail.unit = 'mg'
                detail.target = 400
                break
            case 315:
                detail.name = 'Manganese'
                detail.unit = 'mg'
                detail.target = 2.3
                break
            case 305:
                detail.name = 'Phosphorus'
                detail.unit = 'mg'
                detail.target = 700
                break
            case 306:
                detail.name = 'Potassium'
                detail.unit = 'mg'
                detail.target = 3400
                break
            case 317:
                detail.name = 'Selenium'
                detail.unit = 'Aug'
                detail.target = 55
                break
            case 307:
                detail.name = 'Sodium'
                detail.unit = 'mg'
                detail.target = 1500
                break
            case 309:
                detail.name = 'Zinc'
                detail.unit = 'mg'
                detail.target = 11
                break
            default:
                detail.name = 'none'
                detail.unit = 'none'
                detail.target = 0
                break
        }

        return detail
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
                        {/* <h5>{date.toLocaleString()}</h5> */}
                    </form>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-around', marginTop: '0px' }}>
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
                                // if (nutrient.attr_id === 208) return <div className='search-entry' key={index}>{showNutrientDetail(nutrient.attr_id).name} : {nutrient.value} {showNutrientDetail(nutrient.attr_id).unit}</div>
                                if (showNutrientDetail(nutrient.attr_id).name !== 'none') return <div className='' key={index}><b>{showNutrientDetail(nutrient.attr_id).name}</b> : {nutrient.value} {showNutrientDetail(nutrient.attr_id).unit}</div>
                            })}
                        </div>
                    </div>
                    <div>
                        {nutrition && nutrition.food_name && <h5 style={{ display: "flex", justifyContent: 'center' }}>Recommended Daily Intake</h5>}
                        <div className='rda'>
                            {nutrition && nutrition.full_nutrients && nutrition?.full_nutrients.map((nutrient, index) => {
                                // if (nutrient.attr_id === 208) return <div className='search-entry' key={index}>{showNutrientDetail(nutrient.attr_id).name} : {nutrient.value} {showNutrientDetail(nutrient.attr_id).unit}</div>
                                if (showNutrientDetail(nutrient.attr_id).name !== 'none' && showNutrientDetail(nutrient.attr_id).target !== 0) return <div><Plot
                                    data={[
                                        {
                                            type: 'indicator',
                                            mode: 'gauge+number+delta',
                                            value: nutrient.value,
                                            delta: { reference: showNutrientDetail(nutrient.attr_id).target },
                                            title: { text: showNutrientDetail(nutrient.attr_id).name, font: { size: 15 } },
                                            gauge: {
                                                axis: { range: [null, showNutrientDetail(nutrient.attr_id).target], tickwidth: 1, tickcolor: 'black' },
                                                bar: { color: 'blue' },
                                                shape: 'bullet',
                                                bgcolor: 'white',
                                                borderwidth: 2,
                                                bordercolor: 'gray',
                                                steps: [
                                                    { range: [0, showNutrientDetail(nutrient.attr_id).target * .25], color: '#ff1a1a' },
                                                    { range: [showNutrientDetail(nutrient.attr_id).target * .25, showNutrientDetail(nutrient.attr_id).target * .5], color: '#ff9933' },
                                                    { range: [showNutrientDetail(nutrient.attr_id).target * .5, showNutrientDetail(nutrient.attr_id).target * .75], color: '#ffff1a' },
                                                    { range: [showNutrientDetail(nutrient.attr_id).target * .75, showNutrientDetail(nutrient.attr_id).target], color: '#33cc33' },
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
