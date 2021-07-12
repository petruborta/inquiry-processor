import axios from "axios";
import InquiryActionTypes from "./inquiry.types";

const {
    SET_INQUIRIES,
    ADD_NEW_INQUIRIES,
    MARK_INQUIRIES_AS_READ,
    MARK_INQUIRIES_AS_UNREAD,
    MARK_INQUIRY_AS_STARRED,
    MARK_INQUIRY_AS_UNSTARRED,
    DELETE_INQUIRIES,
} = InquiryActionTypes;

export const verifyReCAPTCHAresponse = (response) =>
    axios
        .post("/inquiries/verify-recaptcha-response", { response })
        .then((res) => res)
        .catch((err) => console.log(err));

export const submitInquiry = (inquiry) =>
    axios
        .post("/inquiries/submit-inquiry", inquiry)
        .then((res) => res)
        .catch((err) => console.log(err));

export const fetchInquiries = () => (dispatch) =>
    axios
        .get("/inquiries/fetch-inquiries")
        .then((res) => dispatch(setInquiries(res.data)))
        .catch((err) => console.log(err));

export const fetchNewInquiries = () => (dispatch) => {
    axios
        .get("/inquiries/fetch-new-inquiries")
        .then((res) => dispatch(addNewInquiries(res.data)))
        .catch((err) => console.log(err));
};

export const saveInquiriesAsRead = (inquiryIDs) => (dispatch) => {
    axios
        .post("/inquiries/save-inquiries-as-read", inquiryIDs)
        .then((res) => {
            if (res.statusText === "OK") {
                return dispatch(markInquiriesAsRead(inquiryIDs));
            } else {
                console.log(res.data);
            }
        })
        .catch((err) => console.log(err));
};

export const saveInquiriesAsUnread = (inquiryIDs) => (dispatch) => {
    axios
        .post("/inquiries/save-inquiries-as-unread", inquiryIDs)
        .then((res) => {
            if (res.statusText === "OK") {
                return dispatch(markInquiriesAsUnread(inquiryIDs));
            } else {
                console.log(res.data);
            }
        })
        .catch((err) => console.log(err));
};

export const saveInquiryAsStarred = (inquiryID) => (dispatch) => {
    axios
        .post("/inquiries/save-inquiry-as-starred", { inquiryID })
        .then((res) => {
            if (res.statusText === "OK") {
                return dispatch(markInquiryAsStarred(inquiryID));
            } else {
                console.log(res.data);
            }
        })
        .catch((err) => console.log(err));
};

export const saveInquiryAsUnstarred = (inquiryID) => (dispatch) => {
    axios
        .post("/inquiries/save-inquiry-as-unstarred", { inquiryID })
        .then((res) => {
            if (res.statusText === "OK") {
                return dispatch(markInquiryAsUnstarred(inquiryID));
            } else {
                console.log(res.data);
            }
        })
        .catch((err) => console.log(err));
};

export const deleteInquiriesFromDB = (inquiryIDs) => (dispatch) => {
    axios
        .delete("/inquiries/delete-inquiries", { data: { inquiryIDs } })
        .then((res) => {
            if (res.statusText === "OK") {
                return dispatch(deleteInquiries(inquiryIDs));
            } else {
                console.log(res.data);
            }
        })
        .catch((err) => console.log(err));
};

export const setInquiries = (inquiries) => ({
    type: SET_INQUIRIES,
    payload: inquiries,
});

export const addNewInquiries = (inquiries) => ({
    type: ADD_NEW_INQUIRIES,
    payload: inquiries,
});

export const markInquiriesAsRead = (inquiryIDs) => ({
    type: MARK_INQUIRIES_AS_READ,
    payload: inquiryIDs,
});

export const markInquiriesAsUnread = (inquiryIDs) => ({
    type: MARK_INQUIRIES_AS_UNREAD,
    payload: inquiryIDs,
});

export const markInquiryAsStarred = (inquiryIDs) => ({
    type: MARK_INQUIRY_AS_STARRED,
    payload: inquiryIDs,
});

export const markInquiryAsUnstarred = (inquiryIDs) => ({
    type: MARK_INQUIRY_AS_UNSTARRED,
    payload: inquiryIDs,
});

export const deleteInquiries = (inquiryIDs) => ({
    type: DELETE_INQUIRIES,
    payload: inquiryIDs,
});
