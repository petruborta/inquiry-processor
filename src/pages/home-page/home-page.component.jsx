import React, { useEffect, useState } from "react";
import Inquiry from "../../classes/Inquiry";
import { Link } from "react-router-dom";

import ReCAPTCHA from "react-google-recaptcha";

import {
    submitInquiry,
    verifyReCAPTCHAresponse,
} from "../../redux/inquiry/inquiry.actions";

import "./home-page.styles.css";

const HomePage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [subscribe, setSubscribe] = useState(false);
    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validMessage, setValidMessage] = useState(false);
    const [isHuman, setIsHuman] = useState(false);
    const [clickedSubmitInquiry, setClickedSubmitInquiry] = useState(false);
    const [inquirySubmitted, setInquirySubmitted] = useState(false);

    useEffect(() => {
        if (inquirySubmitted) {
            setTimeout(() => setInquirySubmitted(false), 5000);
        }
    }, [inquirySubmitted]);

    const onChange = (e) => {
        const { name: changedProperty, value: newValue } = e.target;

        switch (changedProperty) {
            case "name":
                setName(newValue);
                break;
            case "email":
                setEmail(newValue);
                break;
            case "message":
                setMessage(newValue);
                break;
            case "subscribe":
                setSubscribe(e.target.checked);
        }
    };

    const onRecaptchaChange = async (value) => {
        const response = await verifyReCAPTCHAresponse(value);
        const { isHuman } = response.data;
        setIsHuman(isHuman);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        setClickedSubmitInquiry(true);

        if (!areValidInputs()) {
            return;
        }

        const newInquiry = new Inquiry(
            name.trim(),
            email.trim(),
            message.trim(),
            subscribe
        );

        const response = await submitInquiry(newInquiry.toObject());
        const { data, statusText } = response;
        // display data if error
        if (isSuccessfulSubmit(statusText)) {
            setInquirySubmitted(true);
            resetState();
        }
    };

    const areValidInputs = () => {
        const validName = isValidName();
        const validEmail = isValidEmail();
        const validMessage = isValidMessage();
        const allInputsAreValid =
            validName && validEmail && validMessage && isHuman;

        if (!allInputsAreValid) {
            return false;
        }

        return true;
    };

    const isValidName = () => {
        if (!allInitialsAreUppercase(name) || !hasAtLeastTwoCharacters(name)) {
            setValidName(false);
            return false;
        }

        setValidName(true);
        return true;
    };

    const hasAtLeastTwoCharacters = (string) => string.trim().length >= 2;

    const allInitialsAreUppercase = (string) => {
        const words = string.split(/\s+/);

        return words.every(
            (word) => word.charAt(0) === word.charAt(0).toUpperCase()
        );
    };

    const isValidEmail = () => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(String(email).toLowerCase())) {
            setValidEmail(false);
            return false;
        }

        setValidEmail(true);
        return true;
    };

    const isValidMessage = () => {
        const messageLength = message.trim().length;

        if (messageLength === 0 || messageLength > 500) {
            setValidMessage(false);
            return false;
        }

        setValidMessage(true);
        return true;
    };

    const isSuccessfulSubmit = (statusText) => {
        return statusText === "OK";
    };

    const resetState = () => {
        setName("");
        setEmail("");
        setMessage("");
        setSubscribe(false);
        setValidName(false);
        setValidEmail(false);
        setValidMessage(false);
        setIsHuman(false);
        setClickedSubmitInquiry(false);
        window.grecaptcha.reset();
    };

    return (
        <div className="inquiry-form">
            <Link to="/inquiries" className="link-to-inquiries">
                Inquiries
                <i className="fas fa-angle-right"></i>
            </Link>

            <h1>Tasty Treats</h1>
            <form>
                <div>
                    <div className="form-input">
                        <label htmlFor="name">
                            <span>Name</span>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={onChange}
                                required
                            />
                        </label>
                        <p
                            className={
                                "error-message" +
                                (!clickedSubmitInquiry || validName
                                    ? " invisible"
                                    : "")
                            }
                        >
                            Name must have least 2 characters and all initials
                            capitalized
                        </p>
                    </div>
                    <div className="form-input">
                        <label htmlFor="email">
                            <span>Email address</span>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                            />
                        </label>
                        <p
                            className={
                                "error-message" +
                                (!clickedSubmitInquiry || validEmail
                                    ? " invisible"
                                    : "")
                            }
                        >
                            Not a valid email address
                        </p>
                    </div>
                    <div className="form-input">
                        <label htmlFor="message">
                            <span>Message</span>
                            <textarea
                                name="message"
                                cols="30"
                                rows="10"
                                value={message}
                                onChange={onChange}
                            ></textarea>
                        </label>
                        <p
                            className={
                                "error-message" +
                                (!clickedSubmitInquiry || validMessage
                                    ? " invisible"
                                    : "")
                            }
                        >
                            Message can't be empty or longer than 500 characters
                        </p>
                    </div>
                    <div className="form-input">
                        <label htmlFor="subscribe">
                            <input
                                type="checkbox"
                                name="subscribe"
                                checked={subscribe}
                                onChange={onChange}
                            />
                            <span>Subscribe to Tasty Treats' newsletter!</span>
                        </label>
                    </div>
                </div>
                <div>
                    <ReCAPTCHA
                        sitekey="6LeLkogbAAAAAHXkZYu0MQTVt-EB0fZQ8UjtArnO"
                        onChange={onRecaptchaChange}
                    />
                    <p
                        className={
                            "error-message" +
                            (!clickedSubmitInquiry || isHuman
                                ? " invisible"
                                : "")
                        }
                    >
                        reCAPTCHA not completed successfully or at all
                    </p>
                </div>
                <button type="submit" onClick={onSubmit}>
                    Submit
                </button>
                <p
                    className={
                        "succes-message" +
                        (!inquirySubmitted ? " invisible" : "")
                    }
                >
                    Success! Thank you for your time!
                </p>
            </form>
        </div>
    );
};

export default HomePage;
