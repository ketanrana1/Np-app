import formatRFC from 'date-fns/formatRFC3339';
import format from 'date-fns/format';
import it from 'date-fns/locale/it';

export const formatDate = (date) => format(date, 'dd-MM-yyyy');
export const formatDateTimeRFC = (date) => formatRFC(date);

export const formatDateString = (date) => format((date), 'dd/MM/yyyy');
export const formatDateShort = (date) =>
    format(new Date(date), 'dd MMM yy', { locale: it });
export function subtractHours(numOfHours) {
    const todayDate = new Date()
    return todayDate.getTime() - numOfHours * 60 * 60 * 1000;

}

export const formatDateTimeSimple = (date) =>
    format(new Date(date), 'yyyy-MM-dd hh:mm');

export const formatDateToEn = (date) => {
    const [day, month, year] = date.split('-')

    return [year, month, day].join('/')
}

export const filterDate = (ranAt, fromDate, toDate) => {
    const nextDays = new Date(toDate);
    nextDays.setDate(nextDays.getDate() + 1);
    const nextDayIntoMiliSeconds = new Date(nextDays).getTime()
    return (new Date(ranAt).getTime()) >= fromDate && (new Date(ranAt).getTime()) <= nextDayIntoMiliSeconds
}