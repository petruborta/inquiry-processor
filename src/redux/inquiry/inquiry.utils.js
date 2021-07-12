export const markInquiriesAsRead = (inquiries, inquiryIDs) => {
    inquiryIDs.forEach((ID) => {
        inquiries[ID].read = true;
    });

    return { ...inquiries };
};

export const markInquiriesAsUnread = (inquiries, inquiryIDs) => {
    inquiryIDs.forEach((ID) => {
        inquiries[ID].read = false;
    });

    return { ...inquiries };
};

export const markInquiryAsStarred = (inquiries, inquiryID) => {
    inquiries[inquiryID].starred = true;
    return { ...inquiries };
};

export const markInquiryAsUnstarred = (inquiries, inquiryID) => {
    inquiries[inquiryID].starred = false;
    return { ...inquiries };
};

export const deleteInquiries = (inquiries, inquiryIDs) => {
    inquiryIDs.forEach((ID) => {
        delete inquiries[ID];
    });

    return { ...inquiries };
};
