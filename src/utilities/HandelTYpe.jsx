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


export const getType = (id) => {
    if (id === 1)
        return "Food"
    else if (id === 2)
        return "Clothes"
    else if (id === 4)
        return "Tools"
    else if (id ===3 )
        return "Furniture"
}
export default getId; 