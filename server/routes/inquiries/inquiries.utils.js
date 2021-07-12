const fetch = require("node-fetch");
import fs from "fs";

export const verifyReCAPTCHAresponse = (response) =>
    fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: `secret=${process.env.RECAPTCHA_SERVER_KEY}&response=${response}`,
    })
        .then((res) => res.json())
        .then((json) => json.success)
        .catch((err) => {
            console.log(`Error in Google Siteverify API. ${err.message}`);
            return false;
        });

export const parseArray = (array) => {
    return array.map((element) => JSON.parse(element));
};

export const convertToHashTable = (array) => {
    const obj = {};
    array.map((element) => (obj[element.ID] = element));

    return obj;
};

export const saveInquiryToFile = (path, name, content, extension) => {
    fs.writeFileSync(`${path}${name}${extension}`, content, (err) => {
        if (err) {
            return false;
        }
    });

    return true;
};

export const readDirectoryContent = (path) => {
    return fs.readdirSync(path, "utf8", (err, fileNames) => {
        if (err) {
            console.log("Couldn't find directory at: ", path);
            return [];
        }

        return fileNames;
    });
};

export const readFileContent = (path, files) => {
    return files.map((file) =>
        fs.readFileSync(path + file, "utf8", (err, data) => {
            if (err) {
                console.log("Couldn't find file at: ", path + file);
                return;
            }
            data[0] = "'";
            data[data.length - 1] = "'";

            return JSON.parse(data);
        })
    );
};

export const saveInquiriesAsRead = (directory, files, extension) => {
    const results = files.map((file) => {
        const filePath = `${directory}${file}${extension}`;
        return findAndRewriteInFile(filePath, '"read":false', '"read":true');
    });
    console.log("Read ", results);
    return areAllPositive(results);
};

export const saveInquiriesAsUnread = (directory, files, extension) => {
    const results = files.map((file) => {
        const filePath = `${directory}${file}${extension}`;
        return findAndRewriteInFile(filePath, '"read":true', '"read":false');
    });
    console.log("Unread ", results);
    return areAllPositive(results);
};

export const saveInquiryAsStarred = (directory, file, extension) => {
    const filePath = `${directory}${file}${extension}`;
    const result = findAndRewriteInFile(
        filePath,
        '"starred":false',
        '"starred":true'
    );
    console.log("Starred ", result);
    return result;
};

export const saveInquiryAsUnstarred = (directory, file, extension) => {
    const filePath = `${directory}${file}${extension}`;
    const result = findAndRewriteInFile(
        filePath,
        '"starred":true',
        '"starred":false'
    );

    console.log("Unstarred ", result);
    return result;
};

export const deleteInquiries = (directory, files, extension) => {
    const results = files.map((file) => {
        const filePath = `${directory}${file}${extension}`;

        try {
            fs.unlinkSync(filePath);

            return true;
        } catch (err) {
            console.log(`Couldn't find and delete file at ${filePath}: ${err}`);
            return false;
        }
    });
    console.log("Deleted ", results);
    return areAllPositive(results);
};

export const generateRandomLightColour = () => {
    return (
        "#" +
        Math.floor(Math.random() * 222 + 33).toString(16) +
        Math.floor(Math.random() * 222 + 33).toString(16) +
        Math.floor(Math.random() * 222 + 33).toString(16)
    );
};

const findAndRewriteInFile = (filePath, oldData, newData) => {
    try {
        const oldContent = fs.readFileSync(filePath, "utf8");
        const newContent = oldContent.replace(oldData, newData);
        fs.writeFileSync(filePath, newContent, "utf8");

        return true;
    } catch (err) {
        console.log(`Couldn't find or rewrite file at ${filePath}: ${err}`);
        return false;
    }
};

const areAllPositive = (results) => {
    return !results.includes(false);
};
