import { createContext, useContext } from "react";

export const RequestContext = createContext();

const useGetRequestDetails = () => useContext(RequestContext);

export default useGetRequestDetails;
