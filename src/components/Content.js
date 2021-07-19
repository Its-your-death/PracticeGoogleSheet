import { FormattedMessage } from "react-intl";
import {  useRef } from 'react';
import validator from 'validator'; 



const Content = (props) => {
                        
 

  validatePhoneNumber = (number) => {
    const isValidPhoneNumber = validator.isMobilePhone(number)
    return (isValidPhoneNumber)
   }
















  const urlPhp = "http://practice/Sheets.php";

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


  //const [error, setError] = useState(null);

  
 
  
  
  
  const refName = useRef(null);
  const refSurname = useRef(null);
  const refPhone = useRef(null);
  const refEmail = useRef(null);
  const refComment = useRef(null);

  



  if (isValidPhoneNumber){
      
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

          props.access(respJson.connection);
        // setError( respJson.error )
        }
        else {
          error = {value :<div>"Невалидный номер"</div>}
        }
  return (
    <div className="container hero">
      <div className="formar">
           
           <form method="POST" onSubmit={validatePhoneNumber (refPhone.current.value)}>
               <FormattedMessage id='name' /> <br />
               <input size="15" ref = {refName}></input><br />              
               <FormattedMessage id='Surname' /><br />
               <input size="15" ref = {refSurname}></input><br />
               <FormattedMessage id='Phone' /><br />              
               <input name ={'Number'} ref = {refPhone} size="15"></input><br />
               <FormattedMessage id='Email' /><br />
               <input size="15" ref = {refEmail}></input><br />
               <FormattedMessage id='Comm' /><br />
               <input size="15" ref = {refComment}></input><br />
               {error}
               <button type="submit"><FormattedMessage id='click' /></button>

               
           </form>
           
       </div>
      
    </div>
  );
};

export default Content;
