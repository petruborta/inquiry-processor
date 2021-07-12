import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Modal from "../modal/modal.component";

import {
    saveInquiriesAsRead,
    saveInquiriesAsUnread,
    saveInquiryAsStarred,
    saveInquiryAsUnstarred,
    deleteInquiriesFromDB,
} from "../../redux/inquiry/inquiry.actions";

import { isSameDay } from "../../utilities";

import "./inquiry.styles.css";

const Inquiry = ({ isSelected, inquiry, onSelect }) => {
    const { ID, name, message, read, starred, time, backgroundColor } = inquiry;
    const date = inquiry.date.slice(5, 11);

    const [selected, setSelected] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setSelected(isSelected);
    }, [isSelected]);

    const onCheckboxClick = (e) => {
        setSelected(e.target.checked);
        onSelect(ID);
    };

    const onCustomerIconClick = () => {
        setSelected(!selected);
        onSelect(ID);
    };

    const onInquiryClick = (e) => {
        if (clickedOnInquiry(e)) {
            Modal.show(inquiry);
            dispatch(saveInquiriesAsRead([ID]));
        }
    };

    const clickedOnInquiry = (e) => {
        const { className } = e.target;
        return !(
            className.includes("customer-icon") ||
            className.includes("initial-letter") ||
            className.includes("checkbox") ||
            className.includes("far") ||
            className.includes("fas")
        );
    };

    return (
        <div
            className={
                "inquiry" +
                (!read ? " unread" : "") +
                (selected || isSelected ? " selected" : "")
            }
            onClick={onInquiryClick}
        >
            <div
                className="customer-icon"
                onClick={onCustomerIconClick}
                style={{ backgroundColor }}
            >
                <span className="initial-letter">{name[0]}</span>
            </div>
            <div className="checkbox-container">
                <input
                    className="checkbox"
                    type="checkbox"
                    name="selected"
                    checked={selected}
                    title={selected ? "Unselect" : "Select"}
                    onChange={onCheckboxClick}
                />
            </div>

            <div className="stars">
                <i
                    className={"far fa-star" + (starred ? " invisible" : "")}
                    title="Not starred"
                    onClick={() => dispatch(saveInquiryAsStarred(ID))}
                ></i>
                <i
                    className={"fas fa-star" + (!starred ? " invisible" : "")}
                    title="Starred"
                    onClick={() => dispatch(saveInquiryAsUnstarred(ID))}
                ></i>
            </div>

            <div className="wrapper">
                <div className="name-and-message-container">
                    <span className={"name" + (!read ? " bold" : "")}>
                        {name}
                    </span>
                    <p className="message">{message}</p>
                </div>

                <div className="time-or-date-container">
                    <span className={"time-or-date" + (!read ? " bold" : "")}>
                        {isSameDay(date) ? time : date}
                    </span>
                </div>
            </div>

            <div className="actions-container">
                <i
                    className="fas fa-trash-alt"
                    title="Delete"
                    onClick={() => dispatch(deleteInquiriesFromDB([ID]))}
                ></i>
                <i
                    className={
                        "fas fa-envelope-open-text" + (read ? " invisible" : "")
                    }
                    title="Mark as read"
                    onClick={() => dispatch(saveInquiriesAsRead([ID]))}
                ></i>
                <i
                    className={"fas fa-envelope" + (!read ? " invisible" : "")}
                    title="Mark as unread"
                    onClick={() => dispatch(saveInquiriesAsUnread([ID]))}
                ></i>
            </div>
        </div>
    );
};

export default Inquiry;
