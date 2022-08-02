
export const filterDate = (ranAt, fromDate, toDate) => {
    var nextDays = new Date(toDate);
    nextDays.setDate(nextDays.getDate() + 1);
    const nextDayIntoMiliSeconds = new Date(nextDays).getTime()
    return (new Date(ranAt).getTime()) >= fromDate && (new Date(ranAt).getTime()) <= nextDayIntoMiliSeconds
}