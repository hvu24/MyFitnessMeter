import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { getSearchFoods } from '../../store/foodSearch';
import { getFoodNutrition } from '../../store/foodNutrition';
import "./foodSearchModal.css";
import { createFoodDiary } from '../../store/foodDiary';
import { showNutrientDetail } from '../../utilities/showNutritionDetail';
import { capitalizeWords } from '../../utilities/capitalizeWords';


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
                                    <div className='search-entry' key={index} onClick={() => handleSearch(food.food_name)}>{capitalizeWords(food.food_name)}</div>
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
