import React, { Component } from "react";
import { connect } from "react-redux";

import {
    saveInquiriesAsUnread,
    saveInquiryAsStarred,
    saveInquiryAsUnstarred,
    deleteInquiriesFromDB,
} from "../../redux/inquiry/inquiry.actions";
import { isSameDay, windowWidthGreaterThan576px } from "../../utilities";

import "./modal.styles.css";

class Modal extends Component {
    static show(inquiry) {
        Modal.__singletonRef.__show(inquiry);
    }

    constructor() {
        super();
        this.state = { visible: false };
        Modal.__singletonRef = this;
    }

    static getDerivedStateFromProps({ inquiries }, prevState) {
        const { visible, ...prevInquiry } = prevState;
        const newInquiry = inquiries[prevInquiry.ID];

        return prevInquiry !== newInquiry ? { visible, ...newInquiry } : null;
    }

    __show = (inquiry) => {
        this.setState({ visible: true, ...inquiry });
    };

    __hide = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible } = this.state;

        if (!visible) return null;

        const {
            ID,
            name,
            email,
            message,
            subscribe,
            starred,
            time,
            date,
            backgroundColor,
        } = this.state;
        const [weekDay, monthAndDay, year] = date.split(", ");

        const {
            saveInquiriesAsUnread,
            saveInquiryAsStarred,
            saveInquiryAsUnstarred,
            deleteInquiriesFromDB,
        } = this.props;

        return (
            <div className={"modal" + (!visible ? " invisible" : "")}>
                <div className="modal-content">
                    <div className="modal-header">
                        <i
                            className="fas fa-arrow-left"
                            title="Go to inquiries"
                            onClick={this.__hide}
                        ></i>
                        <div>
                            <i
                                className="fas fa-trash-alt"
                                title="Delete"
                                onClick={() => {
                                    deleteInquiriesFromDB([ID]);
                                    this.__hide();
                                }}
                            ></i>
                            <i
                                className="fas fa-envelope"
                                title="Mark as unread"
                                onClick={() => {
                                    saveInquiriesAsUnread([ID]);
                                    this.__hide();
                                }}
                            ></i>
                            <i
                                className={
                                    "far fa-star" +
                                    (starred ? " invisible" : "")
                                }
                                title="Not starred"
                                onClick={() => {
                                    saveInquiryAsStarred(ID);
                                }}
                            ></i>
                            <i
                                className={
                                    "fas fa-star" +
                                    (!starred ? " invisible" : "")
                                }
                                title="Starred"
                                onClick={() => {
                                    saveInquiryAsUnstarred(ID);
                                }}
                            ></i>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="inquiry-info">
                            <div
                                className="customer-icon"
                                style={{ backgroundColor }}
                            >
                                <span className="initial-letter">
                                    {name[0]}
                                </span>
                            </div>
                            <div className="inquiry-details">
                                <div className="customer-details">
                                    <div>
                                        <span className="name">{name}</span>
                                        {windowWidthGreaterThan576px() ? (
                                            <span className="email">{`<${email}>`}</span>
                                        ) : null}
                                    </div>
                                    <span className="subscribe">
                                        {subscribe
                                            ? "Subscribed"
                                            : "Not subscribed"}
                                    </span>
                                </div>
                                <div className="inquiry-date">
                                    {windowWidthGreaterThan576px() ? (
                                        <span>{`${date}, ${time}`}</span>
                                    ) : isSameDay(monthAndDay) ? (
                                        <span>{time}</span>
                                    ) : (
                                        <span>{monthAndDay}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ inquiries }) => ({
    inquiries,
});

const mapDispatchToProps = (dispatch) => ({
    saveInquiriesAsUnread: (inquiryIDs) =>
        dispatch(saveInquiriesAsUnread(inquiryIDs)),
    saveInquiryAsStarred: (inquiryID) =>
        dispatch(saveInquiryAsStarred(inquiryID)),
    saveInquiryAsUnstarred: (inquiryID) =>
        dispatch(saveInquiryAsUnstarred(inquiryID)),
    deleteInquiriesFromDB: (inquiryIDs) =>
        dispatch(deleteInquiriesFromDB(inquiryIDs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
