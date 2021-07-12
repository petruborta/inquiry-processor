import express from "express";

import {
    INQUIRIES_ROOT_DIR_PATH,
    INQUIRY_FILE_EXTENTION,
} from "../../../settings";

import {
    verifyReCAPTCHAresponse,
    parseArray,
    convertToHashTable,
    generateRandomLightColour,
    saveInquiryToFile,
    readDirectoryContent,
    readFileContent,
    saveInquiriesAsRead,
    saveInquiriesAsUnread,
    saveInquiryAsStarred,
    saveInquiryAsUnstarred,
    deleteInquiries,
} from "./inquiries.utils";

const router = express.Router();

router.post(
    "/verify-recaptcha-response",
    async ({ body: { response } }, res) => {
        const isHuman = await verifyReCAPTCHAresponse(response);
        return res.send({ isHuman });
    }
);

router.post("/submit-inquiry", ({ body: inquiry }, res) => {
    const { timeInMilliseconds: inquiryID } = inquiry;

    //check if file exists

    inquiry.ID = inquiryID;
    inquiry.backgroundColor = generateRandomLightColour();

    const inquirySaved = saveInquiryToFile(
        INQUIRIES_ROOT_DIR_PATH,
        inquiryID,
        JSON.stringify(inquiry),
        INQUIRY_FILE_EXTENTION
    );

    return inquirySaved
        ? res.send("Inquiry saved successfully!\nThank you for your time!")
        : res
              .status(500)
              .send(
                  "Sorry, we couldn't save your inquiry.\nPlease try again later."
              );
});

router.get("/fetch-inquiries", (req, res) => {
    const inquiryFileNames = readDirectoryContent(INQUIRIES_ROOT_DIR_PATH),
        inquiryStrings = readFileContent(
            INQUIRIES_ROOT_DIR_PATH,
            inquiryFileNames
        );
    let inquiries = parseArray(inquiryStrings);

    return res.send(convertToHashTable(inquiries));
});

router.get("/fetch-new-inquiries", (req, res) => {
    //
});

router.post("/save-inquiries-as-read", ({ body: inquiryIDs }, res) => {
    console.log("R ", inquiryIDs);
    const inquiriesSavedAsRead = saveInquiriesAsRead(
        INQUIRIES_ROOT_DIR_PATH,
        inquiryIDs,
        INQUIRY_FILE_EXTENTION
    );

    return inquiriesSavedAsRead
        ? res.send("Inquiries saved as read successfully!")
        : res
              .status(500)
              .send(
                  "Sorry, we couldn't save inquiries as read successfully.\nPlease try again later."
              );
});

router.post("/save-inquiries-as-unread", ({ body: inquiryIDs }, res) => {
    console.log("UN", inquiryIDs);
    const inquiriesSavedAsUnread = saveInquiriesAsUnread(
        INQUIRIES_ROOT_DIR_PATH,
        inquiryIDs,
        INQUIRY_FILE_EXTENTION
    );

    return inquiriesSavedAsUnread
        ? res.send("Inquiries saved as unread successfully!")
        : res
              .status(500)
              .send(
                  "Sorry, we couldn't save inquiries as unread successfully.\nPlease try again later."
              );
});

router.post("/save-inquiry-as-starred", ({ body: { inquiryID } }, res) => {
    console.log("S ", inquiryID);
    const inquirySavedAsStarred = saveInquiryAsStarred(
        INQUIRIES_ROOT_DIR_PATH,
        inquiryID,
        INQUIRY_FILE_EXTENTION
    );

    return inquirySavedAsStarred
        ? res.send("Inquiry saved as starred successfully!")
        : res
              .status(500)
              .send(
                  "Sorry, we couldn't save inquiry as starred successfully.\nPlease try again later."
              );
});

router.post("/save-inquiry-as-unstarred", ({ body: { inquiryID } }, res) => {
    console.log("US", inquiryID);
    const inquirySavedAsUnstarred = saveInquiryAsUnstarred(
        INQUIRIES_ROOT_DIR_PATH,
        inquiryID,
        INQUIRY_FILE_EXTENTION
    );

    return inquirySavedAsUnstarred
        ? res.send("Inquiry saved as unstarred successfully!")
        : res
              .status(500)
              .send(
                  "Sorry, we couldn't save inquiry as unstarred successfully.\nPlease try again later."
              );
});

router.delete("/delete-inquiries", ({ body: { inquiryIDs } }, res) => {
    console.log("D", inquiryIDs);
    const inquiriesDeleted = deleteInquiries(
        INQUIRIES_ROOT_DIR_PATH,
        inquiryIDs,
        INQUIRY_FILE_EXTENTION
    );

    return inquiriesDeleted
        ? res.send("Inquiries deleted successfully!")
        : res
              .status(500)
              .send(
                  "Sorry, we couldn't delete inquiries successfully.\nPlease try again later."
              );
});

export default router;
