import React, {createContext, useContext, useState} from "react";
import { UsuarioType } from "../models/@types/UsuarioTypes";
import { LoginService } from "../services/LoginService";

export const AutenticacaoContext = createContext({});


export const AutenticacaoProvider = ({children}) => {
    const [usuario, setUsuario] = useState<UsuarioType>();

    const login = async (email:string, senha:string) => {
        const respostaServiceLogin= await LoginService(email, senha)
        if (!respostaServiceLogin) {
            return false;
        } else {
            setUsuario({
               
                id: respostaServiceLogin?.id,
                name: respostaServiceLogin?.nome,
                email: respostaServiceLogin?.email,
                token: respostaServiceLogin?.token,
            });
            return true;
        }
    };
    return (
        <AutenticacaoContext.Provider value={{
            login,
            usuario,
        }}>
            {children}
        </AutenticacaoContext.Provider> 
    )
}
