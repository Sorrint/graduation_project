import parse from 'html-react-parser';

export const renderGuests = (number) => {
    if (Number(number) % 100 >= 11 && Number(number) % 100 <= 20) {
        return `${number} гостей`;
    } else {
        const lastDigit = String(number).split('').pop();
        switch (lastDigit) {
            case '1':
                return `${number} гость`;
            case '2':
            case '3':
            case '4':
                return `${number} гостя`;
            default:
                return `${number} гостей`;
        }
    }
};

export const renderNights = (number) => {
    if (Number(number) % 100 >= 11 && Number(number) % 100 <= 20) {
        return `${number} ночей`;
    } else {
        const lastDigit = String(number).split('').pop();
        switch (lastDigit) {
            case '1':
                return `${number} ночь`;
            case '2':
            case '3':
            case '4':
                return `${number} ночи`;
            default:
                return `${number} ночей`;
        }
    }
};

export function getIconText(icons, id) {
    const searchIcon = icons.find((icon) => icon._id === id);
    return searchIcon ? searchIcon.text : id;
}

export function getIconContent(icons, id) {
    const searchIcon = icons.find((icon) => icon._id === id);
    return searchIcon ? parse(`${searchIcon.content}`) : false;
}

export function addTextToProperties(allProperties, displayProperties, getText) {
    const selectedProprerties = allProperties.reduce((returnedProperties, property) => {
        if (displayProperties.find((p) => p === property.name)) {
            returnedProperties.push({ ...property, text: getText(property.name, property.value) });
        }
        return returnedProperties;
    }, []);
    return selectedProprerties;
}

export async function getData(service) {
    try {
        const content = await service.fetchAll();
        return content;
    } catch (error) {
        console.log(error);
    }
}

export const getToday = () => {
    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return today;
};

export const getTomorrow = () => {
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    return tomorrow;
};

export const transformDate = (string) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const date = new Date(string);
    const locale = date.toLocaleDateString('ru', options);
    return locale;
};
