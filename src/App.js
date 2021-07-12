import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/home-page/home-page.component.jsx";
import InquiriesPage from "./pages/inquiries-page/inquiries-page.component.jsx";
import ErrorPage from "./pages/error-page/error-page.component.jsx";
import Modal from "./components/modal/modal.component.jsx";

import "./App.css";

function App() {
    return (
        <div className="App">
            <Modal />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/inquiries" component={InquiriesPage} />
                <Route path="*" component={ErrorPage} />
            </Switch>
        </div>
    );
}

export default App;
