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
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return formatDate;
}
const formatdateString = formatDateString();
const formatdatetime = formatDate();
export { formatdatetime, formatdateString };
