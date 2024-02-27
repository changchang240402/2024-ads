import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

function formatDateString(dateString) {
    const date = new Date(dateString);
    const formattedDate = format(date, "dd-MM-yyyy", { locale: vi });
    return formattedDate;
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function formatDateCustom(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export { formatDate, formatDateString, formatDateCustom };