import InquiryActionTypes from "./inquiry.types";
import {
    deleteInquiries,
    markInquiriesAsRead,
    markInquiriesAsUnread,
    markInquiryAsStarred,
    markInquiryAsUnstarred,
} from "./inquiry.utils";

const {
    SET_INQUIRIES,
    ADD_NEW_INQUIRIES,
    MARK_INQUIRIES_AS_READ,
    MARK_INQUIRIES_AS_UNREAD,
    MARK_INQUIRY_AS_STARRED,
    MARK_INQUIRY_AS_UNSTARRED,
    DELETE_INQUIRIES,
} = InquiryActionTypes;

const INITIAL_STATE = {};

const inquiryReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_INQUIRIES:
            return payload;
        case ADD_NEW_INQUIRIES:
            return state.concat(payload);
        case MARK_INQUIRIES_AS_READ:
            return markInquiriesAsRead(state, payload);
        case MARK_INQUIRIES_AS_UNREAD:
            return markInquiriesAsUnread(state, payload);
        case MARK_INQUIRY_AS_STARRED:
            return markInquiryAsStarred(state, payload);
        case MARK_INQUIRY_AS_UNSTARRED:
            return markInquiryAsUnstarred(state, payload);
        case DELETE_INQUIRIES:
            return deleteInquiries(state, payload);
        default:
            return state;
    }
};

export default inquiryReducer;
