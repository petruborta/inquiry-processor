export const isSameDay = (date) => {
    const currentDate = new Date().toDateString().slice(4, 10);
    return date === currentDate;
};

export const windowWidthGreaterThan576px = () => window.innerWidth > 576;
