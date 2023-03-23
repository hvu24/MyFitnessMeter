import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "./SearchBar.css"
import { getSearchFoods } from '../../../store/foodSearch';
import { getFoodNutrition } from '../../../store/foodNutrition';

const FoodSearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [foods, setFoods] = useState({});
    const [nutrition, setNutrition] = useState({})
    const dispatch = useDispatch();
    const history = useHistory()
    const [msg, setMsg] = useState('')

    useEffect(() => {
        dispatch(getSearchFoods(searchTerm))
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
                console.log('logging response from dispatch', res)
                setNutrition(res.foods[0])
            })
            .then(() => {
                console.log('logging nutrition from 2nd then', nutrition)
            })
    }

    const showNutrientDetail = (id) => {
        let detail = {
            'name': '',
            'unit': ''
        }
        switch (id) {
            case 208:
                detail.name = 'energy'
                detail.unit = 'kcal'
                break
            case 221:
                detail.name = 'alcohol'
                detail.unit = 'g'
                break
            case 262:
                detail.name = 'caffeine'
                detail.unit = 'mg'
                break
            case 255:
                detail.name = 'water'
                detail.unit = 'g'
                break
            case 291:
                detail.name = 'fiber'
                detail.unit = 'g'
                break
            case 209:
                detail.name = 'starch'
                detail.unit = 'g'
                break
            case 269:
                detail.name = 'sugars'
                detail.unit = 'g'
                break
            case 205:
                detail.name = 'net_carbs'
                detail.unit = 'g'
                break
            case 204:
                detail.name = 'total_fat'
                detail.unit = 'g'
                break
            case 645:
                detail.name = 'monounsaturated_fat'
                detail.unit = 'g'
                break
            case 646:
                detail.name = 'polyunsaturated_fat'
                detail.unit = 'g'
                break
            case 619:
                detail.name = 'omega3_alphalinolenic_acid'
                detail.unit = 'g'
                break
            case 629:
                detail.name = 'omega3_eicosapentaenoic_acid'
                detail.unit = 'g'
                break
            case 621:
                detail.name = 'omega3_docosahexaenoic_acid'
                detail.unit = 'g'
                break
            case 618:
                detail.name = 'linoleic_acid'
                detail.unit = 'g'
                break
            case 620:
                detail.name = 'arachidonic_acid'
                detail.unit = 'g'
                break
            case 606:
                detail.name = 'saturated_fat'
                detail.unit = 'g'
                break
            case 605:
                detail.name = 'trans_fat'
                detail.unit = 'g'
                break
            case 601:
                detail.name = 'cholesterol'
                detail.unit = 'mg'
                break
            case 203:
                detail.name = 'total_protein'
                detail.unit = 'g'
                break
            case 512:
                detail.name = 'histidine'
                detail.unit = 'g'
                break
            case 503:
                detail.name = 'isoleucine'
                detail.unit = 'g'
                break
            case 504:
                detail.name = 'leucine'
                detail.unit = 'g'
                break
            case 505:
                detail.name = 'lysine'
                detail.unit = 'g'
                break
            case 506:
                detail.name = 'methionine'
                detail.unit = 'g'
                break
            case 508:
                detail.name = 'phenylalanine'
                detail.unit = 'g'
                break
            case 502:
                detail.name = 'threonine'
                detail.unit = 'g'
                break
            case 501:
                detail.name = 'tryptophan'
                detail.unit = 'g'
                break
            case 510:
                detail.name = 'valine'
                detail.unit = 'g'
                break
            case 404:
                detail.name = 'vitamin_b1'
                detail.unit = 'mg'
                break
            case 405:
                detail.name = 'vitamin_b2'
                detail.unit = 'mg'
                break
            case 406:
                detail.name = 'vitamin_b3'
                detail.unit = 'mg'
                break
            case 410:
                detail.name = 'vitamin_b5'
                detail.unit = 'mg'
                break
            case 415:
                detail.name = 'vitamin_b6'
                detail.unit = 'mg'
                break
            case 418:
                detail.name = 'vitamin_b12'
                detail.unit = 'Aug'
                break
            case 417:
                detail.name = 'folate'
                detail.unit = 'Aug'
                break
            case 320:
                detail.name = 'vitamin_a'
                detail.unit = 'Aug'
                break
            case 401:
                detail.name = 'vitamin_c'
                detail.unit = 'mg'
                break
            case 324:
                detail.name = 'vitamin_d'
                detail.unit = 'iu'
                break
            case 323:
                detail.name = 'vitamin_e'
                detail.unit = 'mg'
                break
            case 430:
                detail.name = 'vitamin_k'
                detail.unit = 'Aug'
                break
            case 301:
                detail.name = 'calcium'
                detail.unit = 'mg'
                break
            case 312:
                detail.name = 'copper'
                detail.unit = 'mg'
                break
            case 303:
                detail.name = 'iron'
                detail.unit = 'mg'
                break
            case 304:
                detail.name = 'magnesium'
                detail.unit = 'mg'
                break
            case 315:
                detail.name = 'manganese'
                detail.unit = 'mg'
                break
            case 305:
                detail.name = 'phosphorus'
                detail.unit = 'mg'
                break
            case 306:
                detail.name = 'potassium'
                detail.unit = 'mg'
                break
            case 317:
                detail.name = 'selenium'
                detail.unit = 'Aug'
                break
            case 307:
                detail.name = 'sodium'
                detail.unit = 'mg'
                break
            case 309:
                detail.name = 'zinc'
                detail.unit = 'mg'
                break
            default:
                detail.name = 'none'
                detail.unit = 'none'
                break
        }

        return detail
    }

    return (

        <form onSubmit={handleSubmit}>
            <input className='search-bar' placeholder='Search...' type="text" value={searchTerm} onChange={handleInputChange} />
            <button type="submit" className='search-bar-button'>
                <i class="fa-solid fa-utensils"></i>
            </button>
            {/* <svg width='960' height='500'>
                <circle r="50" cy="100" cx='100' fill='yellow' stroke='black'></circle>
            </svg> */}
            {foods && foods.common && <h5>Common foods</h5>}
            <div className='search-common-list'>
                {foods && foods.common && foods?.common.map((food, index) => (
                    <div className='search-entry' key={index} onClick={() => handleSearch(food.food_name)}>{food.food_name}</div>
                ))}
            </div>
            {foods && foods.branded && <h5>Branded foods</h5>}
            <div className='search-branded-list'>
                {foods && foods.branded && foods?.branded.map((food, index) => (
                    <div className='search-entry' key={index} onClick={() => handleSearch(food.food_name)}>{food.food_name}</div>
                ))}
            </div>
            {nutrition && nutrition.food_name && <h5>Nutrition Facts</h5>}
            <div className='search-branded-list'>
                {nutrition && nutrition.full_nutrients && nutrition?.full_nutrients.map((nutrient, index) => {
                    // if (nutrient.attr_id === 208) return <div className='search-entry' key={index}>{showNutrientDetail(nutrient.attr_id).name} : {nutrient.value} {showNutrientDetail(nutrient.attr_id).unit}</div>
                    if (showNutrientDetail(nutrient.attr_id).name !== 'none') return <div className='search-entry' key={index}>{showNutrientDetail(nutrient.attr_id).name} : {nutrient.value} {showNutrientDetail(nutrient.attr_id).unit}</div>
                })}
            </div>
        </form>

    );
};

export default FoodSearchBar;
