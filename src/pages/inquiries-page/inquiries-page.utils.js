import React from "react";

export const createInquiryComponents = (
    inquiries,
    selectedInquiryIDs,
    Component,
    callback
) => {
    const inquiryComponents = [];
    inquiries = Object.values(inquiries);

    for (let i = inquiries.length - 1; i >= 0; i--) {
        inquiryComponents.push(
            <Component
                key={inquiries[i].ID}
                isSelected={selectedInquiryIDs.includes(inquiries[i].ID)}
                inquiry={inquiries[i]}
                onSelect={callback}
            />
        );
    }

    return inquiryComponents;
};

export const filterInquiries = (inquiries, filter) => {
    const inquiryIDs = converToNumericObjectKeys(inquiries);
    let filteredInquiryIDs = [];
    const filteredInquiries = {};

    switch (filter) {
        case "read":
            filteredInquiryIDs = filterReadInquiries(inquiries, inquiryIDs);
            break;
        case "unread":
            filteredInquiryIDs = filterUnreadInquiries(inquiries, inquiryIDs);
            break;
        case "starred":
            filteredInquiryIDs = filterStarredInquiries(inquiries, inquiryIDs);
            break;
        case "unstarred":
            filteredInquiryIDs = filterUnstarredInquiries(
                inquiries,
                inquiryIDs
            );
            break;
        default:
            filteredInquiryIDs = inquiryIDs;
    }

    filteredInquiryIDs.map((inquiryID) => {
        filteredInquiries[inquiryID] = inquiries[inquiryID];
    });

    return filteredInquiries;
};

export const filterReadInquiries = (inquiries, inquiryIDs) =>
    inquiryIDs.filter((inquiryID) => inquiries[inquiryID].read === true);

export const filterUnreadInquiries = (inquiries, inquiryIDs) =>
    inquiryIDs.filter((inquiryID) => inquiries[inquiryID].read === false);

export const filterStarredInquiries = (inquiries, inquiryIDs) =>
    inquiryIDs.filter((inquiryID) => inquiries[inquiryID].starred === true);

export const filterUnstarredInquiries = (inquiries, inquiryIDs) =>
    inquiryIDs.filter((inquiryID) => inquiries[inquiryID].starred === false);

export const converToNumericObjectKeys = (obj) =>
    Object.keys(obj).map((key) => Number(key));
