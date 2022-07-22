import Context from "./authContext";

const AuthProvider = ({children, value}) => <Context.Provider value>{children}</Context.Provider>;
export default AuthProvider;