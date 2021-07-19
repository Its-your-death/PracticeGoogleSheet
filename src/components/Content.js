import { FormattedMessage } from "react-intl";
import { useState, useRef } from 'react';
import {validator} from 'validator'; 



const Content = (props) => {
                        
 

 /*  const validatePhoneNumber = (number) => {
    const isValidPhoneNumber = validator.isMobilePhone(number)
    return (isValidPhoneNumber)
   }
 */
  const urlPhp = "http://server/quickstart.php";

const sendData = async (url, data) => {

    const resp = await fetch(url,{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)          
    });

    const json = await resp.json();
    return json;

}


  const [error, setError] = useState(null);

  
 
  
  
  
  const refName = useRef(null);
  const refSurname = useRef(null);
  const refPhone = useRef(null);
  const refEmail = useRef(null);
  const refComment = useRef(null);

  



  const handleLogin = async () => {
      
      const data = {
          "name": refName.current.value,
          "surname": refSurname.current.value,
          "phone": refPhone.current.value,
          "email": refEmail.current.value,
          "comment": refComment.current.value
      };

     


     // if (setNumberError == null){
          console.log(data);
       
          const respJson = await sendData(urlPhp, data);
          console.log("Ответ", respJson);

         // props.access(respJson.connection);
         // setError( respJson.error )
        }
        
        
  return (
    <div className="container hero">
      <div className="formar">
           
           <form >
               <FormattedMessage id='name' /> <br />
               <input size="25" ref = {refName}></input><br />              
               <FormattedMessage id='Surname' /><br />
               <input size="25" ref = {refSurname}></input><br />
               <FormattedMessage id='Phone' /><br />              
               <input name ={'Number'} ref = {refPhone} size="25"></input><br />
               <FormattedMessage id='Email' /><br />
               <input size="25" ref = {refEmail}></input><br />
               <FormattedMessage id='Comm' /><br />
               <input size="25" ref = {refComment}></input><br />
               

               
           </form>
           <br />
           <button type="button" class="btn btn-primary" onClick={handleLogin}><FormattedMessage id='click' /></button>
       </div>
      
    </div>
  );
};

export default Content;
