export const areEmptyFields = (object:Object):boolean => {
    return Object.values(object).some(value => value === "");
};