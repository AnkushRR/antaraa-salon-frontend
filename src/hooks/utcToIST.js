export default function (utcDateStr){
    if (utcDateStr){
        const date = new Date(utcDateStr);
        if (date){
            return date.toLocaleString();
        }
    }
    return "null";
}