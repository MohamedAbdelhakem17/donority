import { createContext, useContext } from "react";
export const ItemDetails = createContext()
const useGetOneItem = () => useContext(ItemDetails)
export default useGetOneItem 