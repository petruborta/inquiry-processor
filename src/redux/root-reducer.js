import { combineReducers } from "redux";

import inquiriesReducer from "./inquiry/inquiry.reducer";

const rootReducer = combineReducers({
    inquiries: inquiriesReducer,
});

export default rootReducer;
