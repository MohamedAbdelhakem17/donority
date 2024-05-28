const formatDate = (data) => {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return <span>{`${year}-${month}-${day}`}</span>
}

export default formatDate