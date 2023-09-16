import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import GroupPage from '../GroupPage/GroupPage';
import GameSchedule from '../GameSchedule/GameSchedule';
import UserSchedule from '../UserPage/UserSchedule';

import './App.css';
import CreateGroupPage from '../CreateGroupPage/CreateGroupPage';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
    components: {
      MuiTimePicker: {
        styleOverrides: {
          root: {
            color: "white"
          }
        }
      },
      MuiTable: {
        styleOverrides: {
          root: {
            color: 'white',
            backgroundColor: 'rgb(54,54,58)', // Change this to your desired color
            // Add any other table styles here
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: 'white'
          }
        }
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: 'white', // Change this to your desired color
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgb(54,54,58)', // Change this to your desired color
          },
        },
      },
    },
  });

  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>
            <ProtectedRoute
              // logged in shows CreateGroupPage else shows LoginPage
              exact
              path="/creategroup"
            >
              <CreateGroupPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            <Route
              exact
              path="/login"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the login page
                <LoginPage />
              }
            </Route>

            <Route
              exact
              path="/registration"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the registration page
                <RegisterPage />
              }
            </Route>

            <Route
              exact
              path="/home"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the Landing page
                <LandingPage />
              }
            </Route>
            <ProtectedRoute

              path="/group/:id"
            >
              <GroupPage />
            </ProtectedRoute>

            <ProtectedRoute path="/gameschedule/:groupId/:gameId">
              <GameSchedule />
            </ProtectedRoute>

            <ProtectedRoute 
            exact
            path="/userschedule">
              <UserSchedule/>
            </ProtectedRoute>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
