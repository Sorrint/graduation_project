export function displayDate(timeStamp) {
    const options = {
        year: 'numeric',
        month: 'long'
    };
    const dateTimeStamp = new Date(timeStamp);
    const now = new Date();

    if (now.getFullYear() !== dateTimeStamp.getFullYear()) {
        return ` - ${dateTimeStamp.getDate()} ${dateTimeStamp.toLocaleString('ru', options)}`;
    } else if (now.getDate() !== dateTimeStamp.getDate()) {
        return ` - ${dateTimeStamp.getDate()} ${dateTimeStamp.toLocaleString('ru', options)}`;
    } else {
        const diff = (now - dateTimeStamp) / 60000;
        if (diff >= 0 && diff < 1) {
            return ' - 1 минуту назад';
        }
        if (diff >= 1 && diff < 5) {
            return ' - 5 минут назад';
        }
        if (diff >= 5 && diff < 30) {
            return ' - 10 минут назад';
        }
        if (diff >= 30 && diff < 60) {
            return ' - 30 минут назад';
        }
        return `- ${dateTimeStamp.getHours()}:${addZero(dateTimeStamp.getMinutes())}`;
    }
}

function addZero(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}
