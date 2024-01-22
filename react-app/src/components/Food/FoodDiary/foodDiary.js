import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./foodDiary.css"
import { getFoodDiary, createFoodDiary, clearFoodDiary, editFoodDiary, deleteFoodEntry, editFoodEntry } from '../../../store/foodDiary';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import OpenModalButton from '../../OpenModalButton';
import FoodSearchModal from '../../FoodSearchModal/foodSearchModal';
import Plot from 'react-plotly.js';
import { getProfile } from '../../../store/profile';
import { getExerciseDiary } from '../../../store/exerciseDiary';

const FoodDiary = () => {
    const [date, setDate] = useState(new Date());
    const [entries, setEntries] = useState([]);
    const [showCalender, setShowCalender] = useState(false)
    const [calenderButton, setCalenderButton] = useState('Show Calender')
    const [foodName, setFoodName] = useState('')
    const [foodAmount, setFoodAmount] = useState('')
    const [foodId, setFoodId] = useState(0)
    const [calorieAmount, setCalorieAmount] = useState('')
    const [proteinAmount, setProteinAmount] = useState('')
    const [fatAmount, setFatAmount] = useState('')
    const [carbAmount, setCarbAmount] = useState('')
    const [calories, setCalories] = useState(0)
    const [protein, setProtein] = useState(0)
    const [fat, setFat] = useState(0)
    const [carb, setCarb] = useState(0)
    const [calorieGoal, setCalorieGoal] = useState(0)
    const [proteinGoal, setProteinGoal] = useState(0)
    const [fatGoal, setFatGoal] = useState(0)
    const [carbGoal, setCarbGoal] = useState(0)
    const [caloriesBurned, setCaloriesBurned] = useState(0)
    const dispatch = useDispatch();
    // const diary = useSelector((state) => state?.searchFoodDiaryReducer)


    const data1 = [
        {
            type: 'indicator',
            mode: 'gauge+number+delta',
            value: Math.round(calories),
            delta: { reference: (calorieGoal + caloriesBurned) },
            title: { text: 'Calories (kcal)', font: { size: 15 } },
            gauge: {
                axis: { range: [null, (calorieGoal + caloriesBurned)], tickwidth: 1, tickcolor: 'black' },
                bar: { color: '#33cc33' },
                // shape: 'bullet',
                bgcolor: 'white',
                borderwidth: 2,
                bordercolor: 'gray',
                steps: [
                    { range: [0, (calorieGoal + caloriesBurned) * .25], color: '#ff1a1a' },
                    { range: [(calorieGoal + caloriesBurned) * .25, (calorieGoal + caloriesBurned) * .5], color: '#ff9933' },
                    { range: [(calorieGoal + caloriesBurned) * .5, (calorieGoal + caloriesBurned) * .75], color: '#ffff1a' },
                    { range: [(calorieGoal + caloriesBurned) * .75, (calorieGoal + caloriesBurned)], color: '#33cc33' },
                ],
            },
        },
    ];
    const layout1 = {
        width: 920,
        height: 200,
        margin: { t: 50, r: 0, l: 0, b: 50 },
        plot_bgcolor: 'transparent',
        paper_bgcolor: 'transparent'
        // grid: { rows: 1, columns: 1, pattern: "independent" },
    };

    const data2 = [
        {
            type: 'indicator',
            mode: 'gauge+number+delta',
            value: Math.round(protein),
            delta: { reference: proteinGoal },
            title: { text: 'Protein (g)', font: { size: 15 } },
            gauge: {
                axis: { range: [null, proteinGoal], tickwidth: 1, tickcolor: 'black' },
                bar: { color: '#33cc33' },
                // shape: 'bullet',
                bgcolor: 'white',
                borderwidth: 2,
                bordercolor: 'gray',
                steps: [
                    { range: [0, proteinGoal * .25], color: '#ff1a1a' },
                    { range: [proteinGoal * .25, proteinGoal * .5], color: '#ff9933' },
                    { range: [proteinGoal * .5, proteinGoal * .75], color: '#ffff1a' },
                    { range: [proteinGoal * .75, proteinGoal], color: '#33cc33' },
                ],
            },
        },

    ];
    const layout2 = {
        width: 250,
        height: 200,
        margin: { t: 50, r: 0, l: 0, b: 50 },
        plot_bgcolor: 'transparent',
        paper_bgcolor: 'transparent'
        // grid: { rows: 1, columns: 1, pattern: "independent" },
    };

    const data3 = [
        {
            type: 'indicator',
            mode: 'gauge+number+delta',
            value: Math.round(fat),
            delta: { reference: fatGoal },
            title: { text: 'Fat (g)', font: { size: 15 } },
            gauge: {
                axis: { range: [null, fatGoal], tickwidth: 1, tickcolor: 'black' },
                bar: { color: '#33cc33' },
                // shape: 'bullet',
                bgcolor: 'white',
                borderwidth: 2,
                bordercolor: 'gray',
                steps: [
                    { range: [0, fatGoal * .25], color: '#ff1a1a' },
                    { range: [fatGoal * .25, fatGoal * .5], color: '#ff9933' },
                    { range: [fatGoal * .5, fatGoal * .75], color: '#ffff1a' },
                    { range: [fatGoal * .75, fatGoal], color: '#33cc33' },
                ],
            },
        },
    ];
    const layout3 = {
        width: 250,
        height: 200,
        margin: { t: 50, r: 0, l: 0, b: 50 },
        plot_bgcolor: 'transparent',
        paper_bgcolor: 'transparent'
        // grid: { rows: 1, columns: 1, pattern: "independent" },
    };

    const data4 = [
        {
            type: 'indicator',
            mode: 'gauge+number+delta',
            value: Math.round(carb),
            delta: { reference: carbGoal },
            title: { text: 'Carbohydrate (g)', font: { size: 15 } },
            gauge: {
                axis: { range: [null, carbGoal], tickwidth: 1, tickcolor: 'black' },
                bar: { color: '#33cc33' },
                // shape: 'bullet',
                bgcolor: 'white',
                borderwidth: 2,
                bordercolor: 'gray',
                steps: [
                    { range: [0, carbGoal * .25], color: '#ff1a1a' },
                    { range: [carbGoal * .25, carbGoal * .5], color: '#ff9933' },
                    { range: [carbGoal * .5, carbGoal * .75], color: '#ffff1a' },
                    { range: [carbGoal * .75, carbGoal], color: '#33cc33' },
                ],
            },
        },
    ];
    const layout4 = {
        width: 250,
        height: 200,
        margin: { t: 50, r: 0, l: 0, b: 50 },
        plot_bgcolor: 'transparent',
        paper_bgcolor: 'transparent'
        // grid: { rows: 1, columns: 1, pattern: "independent" },
    };

    const payload = {
        dateObj: {
            'year': date.getFullYear(),
            'month': date.getMonth() + 1,
            'day': date.getDate()
        }
    }

    useEffect(() => {
        dispatch(getFoodDiary(payload))
            .then((res) => {
                setEntries(res?.foodEntries)
                setCalories(res?.totalCalories || 0)
                setProtein(res?.totalProtein || 0)
                setFat(res?.totalFat || 0)
                setCarb(res?.totalCarb || 0)
            })
        dispatch(getExerciseDiary(payload))
            .then((res) => {
                setCaloriesBurned(res?.totalCalories || 0)
            })
        dispatch(getProfile())
            .then((res) => {
                if (res.id) {
                    setCalorieGoal(res?.basalMetabolicRate + res?.activityCalories + res?.weightGoalCalories)
                    setProteinGoal((res?.basalMetabolicRate + res?.activityCalories + res?.weightGoalCalories) * (res?.proteinRatio / 100) / 4)
                    setFatGoal((res?.basalMetabolicRate + res?.activityCalories + res?.weightGoalCalories) * (res?.fatRatio / 100) / 9)
                    setCarbGoal((res?.basalMetabolicRate + res?.activityCalories + res?.weightGoalCalories) * (res?.carbohydrateRatio / 100) / 4)
                }
            })
    }, [dispatch, date]);

    const handleModalSubmit = () => {
        dispatch(getFoodDiary(payload))
            .then((res) => {
                setEntries(res?.foodEntries)
                setCalories(res?.totalCalories)
                setProtein(res?.totalProtein || 0)
                setFat(res?.totalFat || 0)
                setCarb(res?.totalCarb || 0)
            })
    };

    const onClick = () => {
        setShowCalender(!showCalender)
        if (showCalender === false) {
            setCalenderButton('Hide Calendar')
        }
        if (showCalender === true) {
            setCalenderButton('Show Calendar')
        }
    }

    const onChange = (date) => {
        setDate(date);
    };

    const entrySubmit = (e) => {
        e.preventDefault();
        payload.body = {
            "name": foodName,
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
                setProtein(res?.totalProtein || 0)
                setFat(res?.totalFat || 0)
                setCarb(res?.totalCarb || 0)
            })
    }

    const entryDeleteHandler = (id) => {
        payload.body = {
            "id": id
        }
        dispatch(editFoodDiary(payload))
            .then((res) => {
                setEntries(res?.foodEntries)
                setCalories(res?.totalCalories)
                setProtein(res?.totalProtein || 0)
                setFat(res?.totalFat || 0)
                setCarb(res?.totalCarb || 0)
            })
    }

    const diaryDeleteHandler = () => {
        dispatch(clearFoodDiary(payload))
        setEntries([])
        setCalories(0)
    }

    const entryEditSubmit = () => {
        payload.body = {
            "id": foodId,
            "name": foodName,
            "amount": foodAmount,
            "calories_per_gram": calorieAmount,
            "protein_per_gram": proteinAmount,
            "fat_per_gram": fatAmount,
            "carb_per_gram": carbAmount
        }
        dispatch(editFoodEntry(payload))
            .then((res) => {
                setEntries(res?.foodEntries)
                setCalories(res?.totalCalories)
                setProtein(res?.totalProtein || 0)
                setFat(res?.totalFat || 0)
                setCarb(res?.totalCarb || 0)
            })
    }

    return (
        <div className='food-diary-background'>
            <div className='food-diary-div'>
                <h1>{date.toLocaleString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}</h1> {' '}
                <input className='calendar-button' type="submit" value={calenderButton} onClick={onClick} />
                {showCalender ? <Calendar className='calendar' onChange={onChange} value={date} /> : null}
                <h5></h5>
                <div className='add-food'>
                    <OpenModalButton
                        buttonText="Add food from database"
                        modalComponent={<FoodSearchModal onModalSubmit={handleModalSubmit} date={date} />}
                    />
                </div>
                <h5>Food Entries</h5>
                <div className='food-diary-list'>
                    {entries && entries.length > 0 ? entries.map((entry, index) => {
                        return <div style={{ display: "flex", justifyContent: 'space-between' }}>
                            <div style={{ width: '234px', height: '100%' }} className='food-entry' key={index} >
                                {entry.name}
                            </div>
                            <div style={{ width: '234px', height: '100%', display: 'flex', justifyContent: 'center' }}>
                                <input
                                    className='food-entry-amount'
                                    type="number"
                                    defaultValue={entry.amount}
                                    required
                                    onChange={(e) => {
                                        setFoodAmount(e.target.value)
                                        setFoodId(entry.id)
                                        setFoodName(entry.name)
                                        setCalorieAmount(entry.caloriesPerGram)
                                        setProteinAmount(entry.proteinPerGram)
                                        setFatAmount(entry.fatPerGram)
                                        setCarbAmount(entry.carbPerGram)
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            entryEditSubmit();
                                            e.target.blur();
                                        }
                                    }}
                                />grams {' '}
                            </div>
                            <div style={{ width: '234px', height: '100%', display: 'flex', justifyContent: 'right' }}>
                                {Math.round(entry.calories) + ' kcal'}
                                <button type="submit" onClick={() => entryDeleteHandler(entry.id)}><i class="fa-solid fa-trash-can"></i></button>
                            </div>
                        </div>

                    }) : <>No food entries for this date.</>}
                </div>
                <button className='clear-diary' type="submit" onClick={() => diaryDeleteHandler()}>Clear Diary</button>
                <h3>Calories consumed: {Math.round(calories)}</h3>
                <h3>Calories burned: {Math.round(caloriesBurned)}</h3>
                <h3>Calorie goal: {Math.round(calorieGoal + caloriesBurned)}</h3>
                <div><Plot
                    data={data1}
                    layout={layout1}
                    style={{ width: '100%', height: '100%' }}
                /></div>
                <div style={{ display: "flex", justifyContent: 'space-around' }}>
                    <div><Plot
                        data={data2}
                        layout={layout2}
                    /></div>
                    <div><Plot
                        data={data3}
                        layout={layout3}
                    /></div>
                    <div><Plot
                        data={data4}
                        layout={layout4}
                    /></div>
                </div>
            </div>
        </div>
    );
};

export default FoodDiary;
