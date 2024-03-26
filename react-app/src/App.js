import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import FoodSearchBar from "./components/Food/FoodSearch/foodSearch";
import FoodDiary from "./components/Food/FoodDiary/foodDiary";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserProfile from "./components/profile/profile";
import ExerciseDiary from "./components/Exercise/ExerciseDiary/exerciseDiary";
import Footer from "./components/Footer/footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./components/HomePage/HomePage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <HomePage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/food/search">
            <FoodSearchBar />
          </Route>
          <Route path='/food/diary'>
            <ProtectedRoute>
              <FoodDiary />
            </ProtectedRoute>
          </Route>
          <Route path='/exercise/diary'>
            <ProtectedRoute>
              <ExerciseDiary />
            </ProtectedRoute>
          </Route>
          <Route path='/profile'>
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
