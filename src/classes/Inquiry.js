class Inquiry {
    constructor(name, email, message, subscribe) {
        this.ID = null;
        this.name = name;
        this.email = email;
        this.message = message;
        this.subscribe = subscribe;
        this.read = false;
        this.starred = false;

        const currentDate = new Date();
        this.date = this.getDate(currentDate);
        this.time = this.getTime(currentDate);
        this.timeInMilliseconds = this.getTimeInMilliseconds(currentDate);
        this.backgroundColor = "";
    }

    getDate(date) {
        const [weekDay, month, day, year] = date.toDateString().split(" ");
        return `${weekDay}, ${month} ${day}, ${year}`;
    }

    getTime(date) {
        return date.toTimeString().slice(0, 5);
    }

    getTimeInMilliseconds(date) {
        return date.getTime();
    }

    toObject() {
        return {
            ID: this.ID,
            name: this.name,
            email: this.email,
            message: this.message,
            subscribe: this.subscribe,
            read: this.read,
            starred: this.starred,
            date: this.date,
            time: this.time,
            timeInMilliseconds: this.timeInMilliseconds,
            backgroundColor: this.backgroundColor,
        };
    }
}

export default Inquiry;
