const formatDate = (data) => {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return <span>{`${year}-${month}-${day}`}</span>
}


export function getFormattedDate() {
    let now = new Date();
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, '0');
    let day = String(now.getDate()).padStart(2, '0');
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    let milliseconds = String(now.getMilliseconds()).padStart(3, '0').substring(0, 2);

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
}



export default formatDate