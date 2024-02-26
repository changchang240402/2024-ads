import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

function formatDateString() {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = format(date, "dd-MM-yyyy", { locale: vi });
        return formattedDate;
    };

    return formatDate;
}

function formatDate() {
    const formatDate = (date) => {
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    };

    return formatDate;
}
const formatdateString = formatDateString();
const formatdatetime = formatDate();
export { formatdatetime, formatdateString };
