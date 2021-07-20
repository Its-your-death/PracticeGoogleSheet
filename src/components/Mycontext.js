import React, { createContext, Component } from "react";
import axios from 'axios';
export const MyContext = createContext();

const Axios = axios.create({
    baseURL: 'http://server/',
});

class MyContextProvider extends Component {
    constructor() {
        super();
    }

    


    registerFormPhp = async (form) => {

        // Отправка запроса на регистрацию пользователя
        const send = await Axios.post('quickstart.php', {
            name: form.name,
            surname: form.surname,
            phone: form.phone,
            email: form.email,
            comment: form.comment,
        });

        return send.data;
    }

    render() {
        const contextValue = {         
            registerFormPhp: this.registerFormPhp,
        }
        return (
            <MyContext.Provider value={contextValue}>
                {this.props.children}
            </MyContext.Provider>
        )
    }

}



export default MyContextProvider;