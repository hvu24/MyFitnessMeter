import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { getSearchFoods } from '../../store/foodSearch';
import { getFoodNutrition } from '../../store/foodNutrition';
import "./foodSearchModal.css";
import { createFoodDiary } from '../../store/foodDiary';

function FoodSearchModal({ date, onModalSubmit }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const [searchTerm, setSearchTerm] = useState('');
    const [foods, setFoods] = useState({});
    const [nutrition, setNutrition] = useState({})
    const history = useHistory()
    const [msg, setMsg] = useState('')
    const [foodName, setFoodName] = useState('')
    const [foodAmount, setFoodAmount] = useState('')
    const [entries, setEntries] = useState([]);
    const [calorieAmount, setCalorieAmount] = useState('')
    const [proteinAmount, setProteinAmount] = useState('')
    const [fatAmount, setFatAmount] = useState('')
    const [carbAmount, setCarbAmount] = useState('')
    const [calories, setCalories] = useState(0)

    const payload = {
        dateObj: {
            'year': date.getFullYear(),
            'month': date.getMonth() + 1,
            'day': date.getDate()
        }
    }

    useEffect(() => {
        dispatch(getSearchFoods(searchTerm))
    }, [dispatch, searchTerm]);

    const handleInputChange = async (event) => {
        setSearchTerm(event.target.value);
        // console.log('logging searchTerm from input change', searchTerm)
    };


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
                break
            case 262:
                detail.name = 'Caffeine'
                detail.unit = 'mg'
                break
            case 255:
                detail.name = 'Water'
                detail.unit = 'g'
                break
            case 291:
                detail.name = 'Fiber'
                detail.unit = 'g'
                break
            case 209:
                detail.name = 'Starch'
                detail.unit = 'g'
                break
            case 269:
                detail.name = 'Sugars'
                detail.unit = 'g'
                break
            case 205:
                detail.name = 'Net carbs'
                detail.unit = 'g'
                break
            case 204:
                detail.name = 'Total fat'
                detail.unit = 'g'
                break
            case 645:
                detail.name = 'Monounsaturated fat'
                detail.unit = 'g'
                break
            case 646:
                detail.name = 'Polyunsaturated fat'
                detail.unit = 'g'
                break
            case 619:
                detail.name = 'Omega3 alphalinolenic acid'
                detail.unit = 'g'
                break
            case 629:
                detail.name = 'Omega3 eicosapentaenoic acid'
                detail.unit = 'g'
                break
            case 621:
                detail.name = 'Omega3 docosahexaenoic acid'
                detail.unit = 'g'
                break
            case 618:
                detail.name = 'Linoleic acid'
                detail.unit = 'g'
                break
            case 620:
                detail.name = 'Arachidonic acid'
                detail.unit = 'g'
                break
            case 606:
                detail.name = 'Saturated fat'
                detail.unit = 'g'
                break
            case 605:
                detail.name = 'Trans fat'
                detail.unit = 'g'
                break
            case 601:
                detail.name = 'Cholesterol'
                detail.unit = 'mg'
                break
            case 203:
                detail.name = 'Total protein'
                detail.unit = 'g'
                break
            case 512:
                detail.name = 'Histidine'
                detail.unit = 'g'
                break
            case 503:
                detail.name = 'Isoleucine'
                detail.unit = 'g'
                break
            case 504:
                detail.name = 'Leucine'
                detail.unit = 'g'
                break
            case 505:
                detail.name = 'Lysine'
                detail.unit = 'g'
                break
            case 506:
                detail.name = 'Methionine'
                detail.unit = 'g'
                break
            case 508:
                detail.name = 'Phenylalanine'
                detail.unit = 'g'
                break
            case 502:
                detail.name = 'Threonine'
                detail.unit = 'g'
                break
            case 501:
                detail.name = 'Tryptophan'
                detail.unit = 'g'
                break
            case 510:
                detail.name = 'Valine'
                detail.unit = 'g'
                break
            case 404:
                detail.name = 'Vitamin b1'
                detail.unit = 'mg'
                break
            case 405:
                detail.name = 'Vitamin b2'
                detail.unit = 'mg'
                break
            case 406:
                detail.name = 'Vitamin b3'
                detail.unit = 'mg'
                break
            case 410:
                detail.name = 'Vitamin b5'
                detail.unit = 'mg'
                break
            case 415:
                detail.name = 'Vitamin b6'
                detail.unit = 'mg'
                break
            case 418:
                detail.name = 'Vitamin b12'
                detail.unit = 'Aug'
                break
            case 417:
                detail.name = 'Folate'
                detail.unit = 'Aug'
                break
            case 320:
                detail.name = 'Vitamin a'
                detail.unit = 'Aug'
                break
            case 401:
                detail.name = 'Vitamin c'
                detail.unit = 'mg'
                break
            case 324:
                detail.name = 'Vitamin d'
                detail.unit = 'iu'
                break
            case 323:
                detail.name = 'Vitamin e'
                detail.unit = 'mg'
                break
            case 430:
                detail.name = 'Vitamin k'
                detail.unit = 'Aug'
                break
            case 301:
                detail.name = 'Calcium'
                detail.unit = 'mg'
                break
            case 312:
                detail.name = 'Copper'
                detail.unit = 'mg'
                break
            case 303:
                detail.name = 'Iron'
                detail.unit = 'mg'
                break
            case 304:
                detail.name = 'Magnesium'
                detail.unit = 'mg'
                break
            case 315:
                detail.name = 'Manganese'
                detail.unit = 'mg'
                break
            case 305:
                detail.name = 'Phosphorus'
                detail.unit = 'mg'
                break
            case 306:
                detail.name = 'Potassium'
                detail.unit = 'mg'
                break
            case 317:
                detail.name = 'Selenium'
                detail.unit = 'Aug'
                break
            case 307:
                detail.name = 'Sodium'
                detail.unit = 'mg'
                break
            case 309:
                detail.name = 'Zinc'
                detail.unit = 'mg'
                break
            default:
                detail.name = 'none'
                detail.unit = 'none'
                break
        }

        return detail
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(getSearchFoods(searchTerm));
        setFoods(data)
        if (data) {
            setErrors(data);
        } else {
            closeModal()
        }
    };

    const entrySubmit = (e) => {
        e.preventDefault();
        payload.body = {
            "name": searchTerm,
            "amount": foodAmount,
            "calories_per_gram": calorieAmount,
            "protein_per_gram": proteinAmount,
            "fat_per_gram": fatAmount,
            "carb_per_gram": carbAmount
        }
        dispatch(createFoodDiary(payload))
            .then((res) => {
                setEntries(res?.foodEntries)
                setCalories(res?.totalCalories)
                onModalSubmit()
            })
    }

    return (
        <div className='food-diary-search-container'>
            <div>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", justifyContent: 'center' }}>
                        <input className='food-search-bar' placeholder='Search...' type="text" value={searchTerm} onChange={handleInputChange} />
                        <button type="submit" className='search-bar-button'>
                            <i class="fa-solid fa-utensils"></i>
                        </button>
                    </div>
                    {/* <h5>{date.toLocaleString()}</h5> */}
                    <div style={{ display: "flex", justifyContent: 'space-between' }}>
                        <div>
                            {foods && foods.common && <h5 style={{ display: "flex", justifyContent: 'center' }}>Common foods</h5>}
                            <div className='common-list'>
                                {foods && foods.common && foods?.common.map((food, index) => (
                                    <div className='search-entry' key={index} onClick={() => handleSearch(food.food_name)}>{food.food_name}</div>
                                ))}
                            </div>
                        </div>
                        <div>
                            {foods && foods.branded && <h5 style={{ display: "flex", justifyContent: 'center' }}>Branded foods</h5>}
                            <div className='branded-list'>
                                {foods && foods.branded && foods?.branded.map((food, index) => (
                                    <div className='search-entry' key={index} onClick={() => handleSearch(food.food_name)}>{food.food_name}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div style={{ display: "flex", justifyContent: 'space-between' }}>
                <div>
                    {nutrition && nutrition.food_name && <h5 style={{ display: "flex", justifyContent: 'center' }}>Nutrition Facts</h5>}
                    <div className=''>
                        {nutrition && nutrition.full_nutrients && <div><b>Food name</b> : {nutrition.food_name}</div>}
                        {nutrition && nutrition.full_nutrients && <div><b>Serving size</b> : {nutrition.serving_weight_grams} g</div>}
                        {nutrition && nutrition.full_nutrients && <div><b>Calories</b> : {nutrition.nf_calories }kcal</div>}
                        {nutrition && nutrition.full_nutrients && <div><b>Calories per gram</b> : {nutrition.nf_calories / nutrition.serving_weight_grams} kcal</div>}
                        {nutrition && nutrition.full_nutrients && nutrition?.full_nutrients.map((nutrient, index) => {
                            // if (nutrient.attr_id === 208) return <div className='search-entry' key={index}>{showNutrientDetail(nutrient.attr_id).name} : {nutrient.value} {showNutrientDetail(nutrient.attr_id).unit}</div>
                            if (showNutrientDetail(nutrient.attr_id).name !== 'none') return <div className='' key={index}><b>{showNutrientDetail(nutrient.attr_id).name}</b> : {nutrient.value} {showNutrientDetail(nutrient.attr_id).unit}</div>
                        })}
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                    {nutrition && nutrition.full_nutrients && <form method="POST" onSubmit={entrySubmit}>
                        <div>Food Name: <b>{searchTerm}</b>
                        </div>
                        <div>
                            <label className=''>Amount:
                                <input
                                    type="number"
                                    placeholder="Amount in grams..."
                                    required
                                    onChange={(e) => {
                                        setFoodAmount(e.target.value)
                                        setCalorieAmount(nutrition.nf_calories / nutrition.serving_weight_grams)
                                        setProteinAmount(nutrition.nf_protein / nutrition.serving_weight_grams)
                                        setFatAmount(nutrition.nf_total_fat / nutrition.serving_weight_grams)
                                        setCarbAmount(nutrition.nf_total_carbohydrate / nutrition.serving_weight_grams)
                                    }}
                                />
                            </label>
                        </div>
                        <div><button className="search-bar-button" type="submit"><i class="fa-solid fa-utensils"></i></button></div>
                    </form>}
                </div>
            </div>
        </div>


    );
};

export default FoodSearchModal;
