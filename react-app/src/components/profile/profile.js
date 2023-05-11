import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getProfile, editProfile, resetProfile, createProfile } from '../../store/profile';
import Plot from 'react-plotly.js';
import './profile.css'
import Container from 'react-bootstrap/Container'


const UserProfile = () => {
    const sessionUserProfile = useSelector(state => state?.session.profileReducer);
    const [feet, setFeet] = useState()
    const [inch, setInch] = useState()
    const [gender, setGender] = useState()
    const [birthday, setBirthday] = useState()
    const [weight, setWeight] = useState()
    const [bodyfat, setBodyfat] = useState()
    const [weightGoalRate, setWeightGoalRate] = useState();
    const [bmi, setBmi] = useState()
    const [bmr, setBmr] = useState()
    const [activity, setActivity] = useState()
    const [activityCalories, setActivityCalories] = useState()
    const [weightGoal, setWeightGoal] = useState()
    const [weightGoalCalories, setWeightGoalCalories] = useState()
    const [age, setAge] = useState()
    const [hideSubmitNew, setHideSubmitNew] = useState(true)
    const [hideSubmitEdit, setHideSubmitEdit] = useState(false)
    const dispatch = useDispatch()

    const [protein, setProtein] = useState();
    const [carbs, setCarbs] = useState();
    const [fat, setFat] = useState();

    const date = new Date()
    const date2 = new Date()
    let dateMultiplier = 1

    if ((weightGoal > weight && weightGoalRate > 0) || (weightGoal < weight && weightGoalRate < 0)) {
        dateMultiplier = 7 * ((weightGoal - weight) / weightGoalRate)
        if (dateMultiplier !== Infinity && dateMultiplier >= 0 && dateMultiplier !== NaN) {
            date2.setDate(date2.getDate() + dateMultiplier)
        }
    }

    const data = [
        {
            x: [
                date?.toISOString().substring(0, 10),
                date2?.toISOString().substring(0, 10),
            ],
            y: [weight, weightGoal],
            // mode: 'markers',
            marker: {
                color: 'blue',
                size: 10,
                symbol: 'circle',
                line: {
                    color: 'black',
                    width: 1
                }
            },
            type: 'scatter',
            name: 'Current Weight'
        },
        {
            x: [
                date?.toISOString().substring(0, 10),
                date2?.toISOString().substring(0, 10),
            ],
            y: [weightGoal, weightGoal],
            type: 'scatter',
            name: 'Goal Weight'
        }
    ];
    const layout = {
        plot_bgcolor: 'transparent',
        paper_bgcolor: 'transparent',
        width: 800,
        height: 400,
        title: 'Weight Goal Timeline',
        font: {
            family: 'Arial',
            size: 10,
            color: 'black',
        },
        xaxis: {
            title: 'Date',
            titlefont: {
                family: 'Arial',
                size: 12,
                color: 'black'
            }
        },
        yaxis: {
            title: 'Weight',
            titlefont: {
                family: 'Arial',
                size: 12,
                color: 'black'
            }
        }
    };

    const data2 = {
        values: [protein, carbs, fat],
        labels: ['Protein', 'Carbohydrates', 'Fat'],
        type: 'pie',
        hole: 0.6,
        marker: {
            colors: ['rgb(61, 252, 3)', 'rgb(123, 3, 252)', 'rgb(252, 98, 3)'],
            line: {
                color: 'black',
                width: 2
            }
        },
    };

    const layout2 = {
        // title: 'Donut Chart with Plotly.js',
        plot_bgcolor: 'transparent',
        paper_bgcolor: 'transparent',
        showlegend: true,
        annotations: [
            {
                font: {
                    size: 15,
                },
                showarrow: false,
                text: 'Macronutrients',
                x: 0.5,
                y: 0.5,
            },
        ],
    };

    function handleProteinChange(e) {
        const value = parseInt(e.target.value);
        const remainingPercentage = 100 - value;
        const newPercentage = remainingPercentage / 2;
        setProtein(value);
        setCarbs(newPercentage);
        setFat(newPercentage);
    }

    function handleCarbsChange(e) {
        const value = parseInt(e.target.value);
        const remainingPercentage = 100 - value;
        const newPercentage = remainingPercentage / 2;
        setProtein(newPercentage);
        setCarbs(value);
        setFat(newPercentage);
    }

    function handleFatChange(e) {
        const value = parseInt(e.target.value);
        const remainingPercentage = 100 - value;
        const newPercentage = remainingPercentage / 2;
        setProtein(newPercentage);
        setCarbs(newPercentage);
        setFat(value);
    }

    useEffect(() => {
        setHideSubmitNew(true)
        setHideSubmitEdit(false)
        setInch(0)
        setFeet(1)
        setGender('male')
        const date = new Date()
        setBirthday(date?.toISOString().substring(0, 10))
        setWeight(0)
        setBodyfat(0)
        setWeightGoalRate(0)
        setBmi(0)
        setBmr(0)
        setActivity('None')
        setActivityCalories(0)
        setWeightGoal(0)
        setWeightGoalCalories(0)
        setAge(0)
        setProtein(0)
        setCarbs(0)
        setFat(0)
        dispatch(getProfile())
            .then((res) => {
                if (res.id) {
                    setHideSubmitNew(false)
                    setHideSubmitEdit(true)
                    setInch(res?.heightInInches % 12)
                    setFeet(Math.floor(res?.heightInInches / 12))
                    setGender(res?.sex)
                    const date = new Date(res?.birthday)
                    setBirthday(date?.toISOString().substring(0, 10))
                    setWeight(res?.weightInPounds)
                    setBodyfat(res?.bodyFat)
                    setWeightGoalRate(res?.weightGoalRate)
                    setBmi(res?.bodyMassIndex)
                    setBmr(res?.basalMetabolicRate)
                    setActivity(res?.activityLevel)
                    setActivityCalories(res?.activityCalories)
                    setWeightGoal(res?.weightGoal)
                    setWeightGoalCalories(res?.weightGoalCalories)
                    setAge(res?.age)
                    setProtein(res?.proteinRatio)
                    setCarbs(res?.carbohydrateRatio)
                    setFat(res?.fatRatio)

                }
            })
    }, [dispatch])

    const genderHandler = (e) => {
        setGender(e.target.value)
    }
    const weightHandler = (e) => {
        setWeight(e.target.value)
    }
    const birthdayHandler = (e) => {
        setBirthday(e.target.value)
        setAge(date.getFullYear() - e.target.value.slice(0, 4)- (((date.getMonth()), date.getDate()) < (e.target.value.slice(5, 7), e.target.value.slice(8, 10))))
    }
    const bodyfatHandler = (e) => {
        setBodyfat(e.target.value)
    }
    const weightGoalHandler = (e) => {
        setWeightGoal(e.target.value)
    }
    const weightGoalRateChange = (e) => {
        setWeightGoalRate(e.target.value);
        setWeightGoalCalories((e.target.value / 0.25) * 125)
        if ((weightGoal > weight && weightGoalRate > 0) || (weightGoal < weight && weightGoalRate < 0)) {
            dateMultiplier = 7 * ((weightGoal - weight) / weightGoalRate)
            if (dateMultiplier !== Infinity && dateMultiplier >= 0 && dateMultiplier !== NaN) {
                date2.setDate(date2.getDate() + dateMultiplier)
            }
        }
    };

    const entrySubmit = (e) => {
        // e.prevent.default()
        const payload = {
            body: {
                "height_in_inches": parseInt(feet * 12) + parseInt(inch),
                "sex": gender,
                "birthday": birthday,
                "weight_in_pounds": weight,
                "body_fat": bodyfat,
                "weight_goal_rate": weightGoalRate,
                "activity_level": activity,
                "weight_goal": weightGoal,
                "protein_ratio": protein,
                "carbohydrate_ratio": carbs,
                "fat_ratio": fat
            }
        }
        dispatch(editProfile(payload))
            .then((res) => {
                if (res.id) {
                    setHideSubmitNew(false)
                    setHideSubmitEdit(true)
                    setInch(res?.heightInInches % 12)
                    setFeet(Math.floor(res?.heightInInches / 12))
                    setGender(res?.sex)
                    const date = new Date(res?.birthday)
                    setBirthday(date?.toISOString().substring(0, 10))
                    setWeight(res?.weightInPounds)
                    setBodyfat(res?.bodyFat)
                    setWeightGoalRate(res?.weightGoalRate)
                    setBmi(res?.bodyMassIndex)
                    setBmr(res?.basalMetabolicRate)
                    setActivity(res?.activityLevel)
                    setActivityCalories(res?.activityCalories)
                    setWeightGoal(res?.weightGoal)
                    setWeightGoalCalories(res?.weightGoalCalories)
                    setAge(res?.age)
                    setProtein(res?.proteinRatio)
                    setCarbs(res?.carbohydrateRatio)
                    setFat(res?.fatRatio)
                    window.alert('Successfully edited profile!')
                }
            })
    }

    const newEntrySubmit = (e) => {
        // e.prevent.default()
        const payload = {
            body: {
                "height_in_inches": parseInt(feet * 12) + parseInt(inch),
                "sex": gender,
                "birthday": birthday,
                "weight_in_pounds": weight,
                "body_fat": bodyfat,
                "weight_goal_rate": weightGoalRate,
                "activity_level": activity,
                "weight_goal": weightGoal,
                "protein_ratio": protein,
                "carbohydrate_ratio": carbs,
                "fat_ratio": fat
            }
        }
        dispatch(createProfile(payload))
            .then((res) => {
                if (res.id) {
                    setHideSubmitNew(false)
                    setHideSubmitEdit(true)
                    setInch(res?.heightInInches % 12)
                    setFeet(Math.floor(res?.heightInInches / 12))
                    setGender(res?.sex)
                    const date = new Date(res?.birthday)
                    setBirthday(date?.toISOString().substring(0, 10))
                    setWeight(res?.weightInPounds)
                    setBodyfat(res?.bodyFat)
                    setWeightGoalRate(res?.weightGoalRate)
                    setBmi(res?.bodyMassIndex)
                    setBmr(res?.basalMetabolicRate)
                    setActivity(res?.activityLevel)
                    setActivityCalories(res?.activityCalories)
                    setWeightGoal(res?.weightGoal)
                    setWeightGoalCalories(res?.weightGoalCalories)
                    setAge(res?.age)
                    setProtein(res?.proteinRatio)
                    setCarbs(res?.carbohydrateRatio)
                    setFat(res?.fatRatio)
                    window.alert('Successfully created profile!')
                }
            })
    }

    const resetProfileHandler = () => {
        dispatch(resetProfile())
            .then((res) => {
                setHideSubmitNew(true)
                setHideSubmitEdit(false)
                setInch(0)
                setFeet(1)
                setGender('male')
                const date = new Date()
                setBirthday(date?.toISOString().substring(0, 10))
                setWeight(0)
                setBodyfat(0)
                setWeightGoalRate(0)
                setBmi(0)
                setBmr(0)
                setActivity('None')
                setActivityCalories(0)
                setWeightGoal(0)
                setWeightGoalCalories(0)
                setAge(0)
                setProtein(0)
                setCarbs(0)
                setFat(0)
                window.alert('Successfully deleted profile!')
            })
    }

    const activity_calories = (activity_level) => {
        if (activity_level == 'sedentary') return basal_metabolic_rate(gender) * 0.2
        else if (activity_level == 'lightly_active') return basal_metabolic_rate(gender) * 0.375
        else if (activity_level == 'moderately_active') return basal_metabolic_rate(gender) * 0.5
        else if (activity_level == 'very_active') return basal_metabolic_rate(gender) * 0.9
        else return 0
    }

    const basal_metabolic_rate = (sex) => {
        if (sex === 'male') return ((4.536 * weight) + (15.88 * (parseInt(feet * 12) + parseInt(inch))) - (5 * age) + 5)
        else if (sex === 'female') return ((4.536 * weight) + (15.88 * (parseInt(feet * 12) + parseInt(inch))) - (5 * age) - 161)
        else return 0
    }



    return (
        <Container>
            <div className='profile-container-background'>
                <div className='profile-container'>
                    <div style={{ display: "flex", justifyContent: 'center' }}>
                        <button className="" type="submit" onClick={resetProfileHandler}>Reset profile</button>
                    </div>
                    <form>
                        <div onChange={genderHandler} style={{ display: "flex", justifyContent: 'space-between' }}>Sex
                            <label><input type='radio' name='sex' value='male' checked={gender === 'male'}></input>Male</label>
                            <label><input type='radio' name='sex' value='female' checked={gender === 'female'}></input>Female</label>
                        </div>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>Birthday
                            <label><input onChange={birthdayHandler} type='date' defaultValue={birthday}></input></label>
                        </div>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>Age
                            <label>{age}{' years old'}</label>
                        </div>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>{"Height "}
                            <label>feet
                                <select value={feet} onChange={(e) => { setFeet(e.target.value) }}>
                                    {[...Array(8)].map((ele, index) => {
                                        return <option value={index + 1}>{index + 1}</option>
                                    })}
                                </select>
                            </label>
                            <label>inch
                                <select value={inch} onChange={(e) => { setInch(e.target.value) }}>
                                    {[...Array(12)].map((ele, index) => {
                                        return <option value={index}>{index}</option>
                                    })}
                                </select>
                            </label>
                        </div>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>Current Weight
                            <label><input onChange={weightHandler} type='number' step='0.1' defaultValue={weight}></input></label>
                        </div>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>Body Fat %
                            <label><input onChange={bodyfatHandler} type='number' step='0.1' defaultValue={bodyfat}></input></label>
                        </div>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>Body Mass Index
                            <label>{parseFloat(((weight) / ((parseInt(feet * 12) + parseInt(inch)) * (parseInt(feet * 12) + parseInt(inch)))) * 703).toFixed(2)}</label>
                        </div>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>Basal Metabolic Rate
                            <label>{Math.round(basal_metabolic_rate(gender))}{" kcal"}</label>
                        </div>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>Activity Level
                            <label>{Math.round(activityCalories)} {" kcal"}
                            </label>
                            <label>
                                <select value={activity} onChange={(e) => {
                                    setActivity(e.target.value)
                                    setActivityCalories(activity_calories(e.target.value))
                                }}>
                                    {["None", "sedentary", "lightly_active", "moderately_active", "very_active"].map((ele, index) => {
                                        return <option value={ele}>{ele}</option>
                                    })}
                                </select>
                            </label>
                        </div>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>Total Energy Burned without exercise
                            <label>{Math.round(bmr + activityCalories)}{" kcal"}</label>
                        </div>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>Weight Goal
                            <label><input onChange={weightGoalHandler} type='number' step='0.1' defaultValue={weightGoal}></input></label>
                        </div>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                            <label>
                                Weight Goal Rate:
                                <input
                                    type="range"
                                    min="-2"
                                    max="2"
                                    step='0.25'
                                    value={weightGoalRate}
                                    required
                                    onChange={weightGoalRateChange}
                                />
                                {weightGoalRate}lbs / week
                            </label>
                            {weightGoalCalories}{' kcal daily'}
                        </div>
                        <div style={{ display: "flex", justifyContent: 'center' }}>
                            <Plot
                                data={data}
                                layout={layout}
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: 'space-around' }}>
                            <label>
                                Protein Ratio:
                                <input type="number" min='0' max='100' value={protein} onChange={handleProteinChange} />
                                %
                            </label>
                            <label>
                                Carb Ratio:
                                <input type="number" min='0' max='100' value={carbs} onChange={handleCarbsChange} />
                                %
                            </label>
                            <label>
                                Fat Ratio:
                                <input type="number" min='0' max='100' value={fat} onChange={handleFatChange} />
                                %
                            </label>
                        </div>
                        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                            <Plot
                                data={[data2]}
                                layout={layout2}
                            // style={{ width: '100%', height: '400px' }}
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>Daily calorie goal without exercise
                            <label>{Math.round(bmr + activityCalories + weightGoalCalories)}{" kcal"}</label>
                        </div>
                    </form>
                    <div style={{ display: "flex", justifyContent: 'center' }}>
                        {hideSubmitEdit && <button className="" type="submit" onClick={entrySubmit}>Save profile edit</button>}
                        {hideSubmitNew && <button className="" type="submit" onClick={newEntrySubmit}>Submit new profile</button>}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default UserProfile;
