import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import Auth from "../pages/Auth";
import Error from "../pages/Error";
import ProjectIdPage from "../pages/ProjectIdPage";
import Projects from "../pages/Projects";
import projects from "../pages/Projects";
import Cookies from "js-cookie";

const AppRouter = () => {
    const router = useNavigate();

    useEffect(() => {
        if (!Cookies.get('token')) {
            if (Cookies.get('access_token')) {
                Cookies.remove('access_token')
            }
            if (Cookies.get('OAuth-token')) {
                Cookies.remove('OAuth-token')
            }
            router('/');
        }
    },[Cookies.get('token')])

    return (
        <Routes>
            <Route
                path="/projects"
                component={projects}
                element={<Projects/>}
            />

            <Route
                path="/projects/:name/:id"
                component={ProjectIdPage}
                element={<ProjectIdPage/>}
            />

            <Route
                path="/"
                component={Auth}
                element={<Auth/>}
            />

            <Route
                path="/error"
                component={Error}
                element={<Error/>}
            />
        </Routes>
    );
};

export default AppRouter;