export default function uuidToNumber(uuid:any) {
    const number = uuid.replace(/[^0-9]/g, '');
    return number;
}