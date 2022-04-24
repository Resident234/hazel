export const getPastingStrategy = (name) => {
    return (name === undefined) ? false : name.function
};