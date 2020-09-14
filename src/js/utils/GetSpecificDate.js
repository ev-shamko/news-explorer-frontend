// получаем строку вида 2020-09-4
// если numOfDays(0) то мы получим текущую дату

export const GetSpecificDate = (numOfDays) => {
    const rawDate = new Date(Date.now() - 24 * 3600 * 1000 * numOfDays);

    const stringCuttedDate = `${rawDate.getFullYear()}-${rawDate.getMonth() + 1}-${rawDate.getDate()}`;
    return stringCuttedDate;
};
