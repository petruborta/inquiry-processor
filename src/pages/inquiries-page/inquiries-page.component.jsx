import React, { Component } from "react";
import { connect } from "react-redux";

import Inquiry from "../../components/inquiry/inquiry.component";

import {
    converToNumericObjectKeys,
    filterInquiries,
    filterReadInquiries,
    filterUnreadInquiries,
    createInquiryComponents,
} from "./inquiries-page.utils";

import {
    fetchInquiries,
    saveInquiriesAsRead,
    saveInquiriesAsUnread,
    deleteInquiriesFromDB,
} from "../../redux/inquiry/inquiry.actions";

import "./inquiries-page.styles.css";

class InquiriesPage extends Component {
    constructor() {
        super();

        this.state = {
            inquiries: {},
            selectedInquiryIDs: [],
            filter: "all",
        };
    }

    async componentDidMount() {
        await this.props.fetchInquiries();
        const { inquiries } = this.props;
        this.setState({ inquiries });
    }

    static getDerivedStateFromProps(
        { inquiries: newInquiries },
        { inquiries: oldInquiries, filter }
    ) {
        return oldInquiries !== newInquiries
            ? { inquiries: filterInquiries(oldInquiries, filter) }
            : null;
    }

    onInquirySelect = (inquiryID) => {
        const { selectedInquiryIDs } = this.state;

        if (!selectedInquiryIDs.includes(inquiryID)) {
            selectedInquiryIDs.push(inquiryID);
        } else {
            let index = selectedInquiryIDs.indexOf(inquiryID);
            if (index > -1) {
                selectedInquiryIDs.splice(index, 1);
            }
        }

        this.setState({ selectedInquiryIDs });
    };

    onFilterChange = (e) => {
        const { inquiries } = this.props;
        const { value: newValue } = e.target;

        this.setState({
            inquiries: filterInquiries(inquiries, newValue),
            selectedInquiryIDs: [],
            filter: newValue,
        });
    };

    selectAllInquiries = () => {
        const { inquiries } = this.state;
        const inquiryIDs = converToNumericObjectKeys(inquiries);
        this.setState({ selectedInquiryIDs: inquiryIDs });
    };

    unselectAllInquiries = () => {
        this.setState({ selectedInquiryIDs: [] });
    };

    areSelectedInquiries = () => {
        const { selectedInquiryIDs } = this.state;
        return !!selectedInquiryIDs.length;
    };

    render() {
        const {
            fetchInquiries,
            deleteInquiriesFromDB,
            saveInquiriesAsRead,
            saveInquiriesAsUnread,
        } = this.props;
        const { inquiries, selectedInquiryIDs, filter } = this.state;

        return (
            <div className="inquiries-control-panel">
                <div className="inquiries-control-panel-header">
                    <i
                        className="fas fa-arrow-alt-circle-left"
                        title="Go to inquiry form"
                        onClick={() => this.props.history.push("/")}
                    ></i>
                    <h1>Inquiries</h1>
                </div>
                <div className="inquiries-control-actions">
                    <div
                        className={
                            "select-all-inquiries" +
                            (this.areSelectedInquiries() ? " invisible" : "")
                        }
                    >
                        <i
                            className="far fa-square"
                            title="Select all"
                            onClick={this.selectAllInquiries}
                        ></i>
                    </div>
                    <div
                        className={
                            "deselect-all-inquiries" +
                            (!this.areSelectedInquiries() ? " invisible" : "")
                        }
                    >
                        <i
                            className="fas fa-minus-square"
                            title="Unselect all"
                            onClick={this.unselectAllInquiries}
                        ></i>
                    </div>
                    <i
                        className="fas fa-redo-alt"
                        title="Refresh inquiry list"
                        onClick={() => {
                            fetchInquiries();
                            this.unselectAllInquiries();
                        }}
                    ></i>
                    <i
                        className={
                            "fas fa-trash-alt" +
                            (!this.areSelectedInquiries() ? " invisible" : "")
                        }
                        title="Delete all selected"
                        onClick={() => {
                            deleteInquiriesFromDB(
                                inquiries,
                                selectedInquiryIDs
                            );
                            this.unselectAllInquiries();
                        }}
                    ></i>
                    <i
                        className={
                            "fas fa-envelope-open-text" +
                            (!this.areSelectedInquiries() ? " invisible" : "")
                        }
                        title="Mark all selected as read"
                        onClick={() =>
                            saveInquiriesAsRead(
                                filterUnreadInquiries(
                                    inquiries,
                                    selectedInquiryIDs
                                )
                            )
                        }
                    ></i>
                    <i
                        className={
                            "fas fa-envelope" +
                            (!this.areSelectedInquiries() ? " invisible" : "")
                        }
                        title="Mark all selected as unread"
                        onClick={() =>
                            saveInquiriesAsUnread(
                                filterReadInquiries(
                                    inquiries,
                                    selectedInquiryIDs
                                )
                            )
                        }
                    ></i>
                    <select
                        className="select-filter"
                        name="filter"
                        value={filter}
                        onChange={this.onFilterChange}
                    >
                        <option value="all">All</option>
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                        <option value="starred">Starred</option>
                        <option value="unstarred">Unstarred</option>
                    </select>
                </div>
                <div className="inquiries-list">
                    {createInquiryComponents(
                        inquiries,
                        selectedInquiryIDs,
                        Inquiry,
                        this.onInquirySelect
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ inquiries }) => ({
    inquiries,
});

const mapDispatchToProps = (dispatch) => ({
    fetchInquiries: () => dispatch(fetchInquiries()),
    saveInquiriesAsRead: (inquiryIDs) =>
        dispatch(saveInquiriesAsRead(inquiryIDs)),
    saveInquiriesAsUnread: (inquiryIDs) =>
        dispatch(saveInquiriesAsUnread(inquiryIDs)),
    deleteInquiriesFromDB: (inquiryIDs) =>
        dispatch(deleteInquiriesFromDB(inquiryIDs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InquiriesPage);
