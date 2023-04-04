import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getProfile, editProfile, resetProfile, createProfile } from '../../store/profile';


const UserProfile = () => {
    const sessionUserProfile = useSelector(state => state?.session.profileReducer);
    const [feet, setFeet] = useState(1)
    const [inch, setInch] = useState(0)
    const [gender, setGender] = useState('male')
    const date = new Date()
    const [birthday, setBirthday] = useState(date?.toISOString().substring(0, 10))
    const [weight, setWeight] = useState(0)
    const [bodyfat, setBodyfat] = useState(0)
    const [weightGoalRate, setWeightGoalRate] = useState(0);
    const [bmi, setBmi] = useState(0)
    const [bmr, setBmr] = useState(0)
    const [activity, setActivity] = useState('None')
    const [activityCalories, setActivityCalories] = useState(0)
    const [weightGoal, setWeightGoal] = useState(0)
    const [weightGoalCalories, setWeightGoalCalories] = useState(0)
    const [proteinTarget, setProteinTarget] = useState(0)
    const [carbTarget, setCarbTarget] = useState(0)
    const [fatTarget, setFatTarget] = useState(0)
    const [age, setAge] = useState(0)
    const [hideSubmitNew, setHideSubmitNew] = useState(true)
    const [hideSubmitEdit, setHideSubmitEdit] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
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
                    setProteinTarget(res?.proteinRatio)
                    setCarbTarget(res?.carbohydrateRatio)
                    setFatTarget(res?.fatRatio)
                    setAge(res?.age)
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
    }
    const bodyfatHandler = (e) => {
        setBodyfat(e.target.value)
    }
    const weightGoalHandler = (e) => {
        setWeightGoal(e.target.value)
    }
    const weightGoalRateChange = (e) => {
        setWeightGoalRate(e.target.value);
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
                "protein_ratio": proteinTarget,
                "carbohydrate_ratio": carbTarget,
                "fat_ratio": fatTarget
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
                    setProteinTarget(res?.proteinRatio)
                    setCarbTarget(res?.carbohydrateRatio)
                    setFatTarget(res?.fatRatio)
                    setAge(res?.age)
                }
            })
    }

    const newEntrySubmit = (e) => {
        // e.prevent.default()
        console.log('logging from new entry')
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
                "protein_ratio": proteinTarget,
                "carbohydrate_ratio": carbTarget,
                "fat_ratio": fatTarget
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
                    setProteinTarget(res?.proteinRatio)
                    setCarbTarget(res?.carbohydrateRatio)
                    setFatTarget(res?.fatRatio)
                    setAge(res?.age)
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
                setProteinTarget(0)
                setCarbTarget(0)
                setFatTarget(0)
                setAge(0)
            })
    }

    return (
        <>
            <button className="" type="submit" onClick={resetProfileHandler}>Reset profile</button>
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
                    <label>{bmi}</label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Basal Metabolic Rate
                    <label>{bmr}{" kcal"}</label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Activity Level
                    <label>{activityCalories} {" kcal"}
                    </label>
                    <label>
                        <select value={activity} onChange={(e) => { setActivity(e.target.value) }}>
                            {["None", "sedentary", "lightly_active", "moderately_active", "very_active"].map((ele, index) => {
                                return <option value={ele}>{ele}</option>
                            })}
                        </select>
                    </label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Total Energy Burned without exercise
                    <label>{bmr + activityCalories}{" kcal"}</label>
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
                            onChange={weightGoalRateChange}
                        />
                        {weightGoalRate}lbs / week
                    </label>
                    {weightGoalCalories}{' kcal daily'}
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Protein Target %
                    <label><input onChange={(e) => { setProteinTarget(e.target.value) }} type='number' defaultValue={proteinTarget}></input></label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Carbohydrate Target %
                    <label><input onChange={(e) => { setCarbTarget(e.target.value) }} type='number' defaultValue={carbTarget}></input></label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Fat Target %
                    <label><input onChange={(e) => { setFatTarget(e.target.value) }} type='number' defaultValue={fatTarget}></input></label>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Daily calorie goal without exercise
                    <label>{bmr + activityCalories + weightGoalCalories}{" kcal"}</label>
                </div>
            </form>
            {hideSubmitEdit && <button className="" type="submit" onClick={entrySubmit}>Submit profile edit</button>}
            {hideSubmitNew && <button className="" type="submit" onClick={newEntrySubmit}>Submit new profile</button>}
        </>
    );
};

export default UserProfile;
