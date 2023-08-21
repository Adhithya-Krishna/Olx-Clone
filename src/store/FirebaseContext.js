import { createContext } from "react";



const FirebaseContext = createContext(null);
export const AuthContext = createContext(null) //1
export const FirebaseProvider = FirebaseContext.Provider;

export default FirebaseContext;