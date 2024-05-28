const getId = (type) => {
    if (type === "food")
        return 1
    else if (type === "clothes")
        return 2
    else if (type === "tools")
        return 4
    else if (type === "furniture")
        return 3
}

export default getId; 