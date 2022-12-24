export const existingMethods = {
    isCapitalSymbol: 'isCapitalSymbol',
    isContainDigit: 'isContainDigit',
    isNumber: 'isNumber'
};
export function validator(value, config) {
    if (!Array.isArray(config)) {
        console.log('тип ошибок должен быть указан в массиве!');
    }
    let statusValidate;
    let message;

    for (const validateMethod of config) {
        switch (validateMethod) {
            case 'isCapitalSymbol': {
                const capitalRegExp = /[A-Z]+/g;
                statusValidate = !capitalRegExp.test(value);
                if (statusValidate) {
                    message = 'Поле должно содержать хотя бы одну большую букву!';
                }
                break;
            }
            case 'isContainDigit': {
                const digitRegExp = /\d+/g;
                statusValidate = !digitRegExp.test(value);
                if (statusValidate) {
                    message = 'Поле должно содержать хотя бы одну цифру!';
                }
                break;
            }
            case 'isNumber': {
                const digitRegExp = /^\d+$/g;
                statusValidate = !digitRegExp.test(value);
                if (statusValidate) {
                    message = 'Поле должно содержать только цифры!';
                }
                break;
            }
            default:
                break;
        }

        if (statusValidate) return message;
    }
}
