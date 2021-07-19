import { useState, useRef } from 'react';
import { t } from 'ttag';
import { saveLocale } from '../i18nInit';


const setLocale = (locale) => (ev) => {
    ev.preventDefault();
    saveLocale(locale);
    window.location.reload();
  }





const LangSwitcher = () => (
    <div className="Lang-switch">
      <h2>{ t`Switch lang`}</h2>
      <a href='/' onClick={setLocale('ru')}>ru</a>
    <a href='/' onClick={setLocale('ru')}>ru</a>
    <a href='/' onClick={setLocale('en')}>en</a>
    </div>
  )


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

/*function ValidPhone(props){
     const refPhone = useRef(null);
        var output;
        var check = /^\d[\d\(\)\ -]{4,14}\ds/;
        var phone = refPhone.current.value;
        var valph = check.test(phone);
        if (!valph) output = 'Номер не верный';
        return <a>{valph}</a>;
    } */

export default function Comment(props) {
    const [error, setError] = useState(null);
    const [formValid,setFormValid] = useState(false);
    
   
    
    
    
    const refName = useRef(null);
    const refSurname = useRef(null);
    const refPhone = useRef(null);
    const refEmail = useRef(null);
    const refComment = useRef(null);

    const [Number, setNumber] = useState(null);
    const [NumberDirty, setNumberDirty] = useState(false);
    const [NumberError, setNumberError] = useState("Номер не может быть пустым")
    
    const NumberHandler = (e)=>{
        setNumber(e.target.value)
        const reg = new RegExp('/^(\d{3})(\d{3})(\d{4})$/');
        if (reg.test(e.target.value)){
            setNumberError('Некорректный номер');
        }
        else{
            setNumberError(null);
        };
    } 



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

            props.access(respJson.connection);
            setError( respJson.error )
        //}
    }

    return(
        <div> 
    <h1><LangSwitcher/></h1>
        <div className="formar">
           
      <form>
          <label>{t`Name`}</label> <br />
          <input size="15" ref = {refName}></input><br />
          
          <label >{t`Second Name`}</label><br />
          <input size="15" ref = {refSurname}></input><br />

        
          <label id = "number">{t`Phone Number`}</label><br />
          {(NumberDirty && NumberError) && <label style={{color:'red'}}>{NumberError}</label>}
          <input onChange={e=>NumberHandler(e)} name ={'Number'} ref = {refPhone} size="15"></input><br />
          <label>Email</label><br />
          <input size="15" ref = {refEmail}></input><br />
          <label>{t`Comment`}</label><br />
          <input size="15" ref = {refComment}></input><br />
          
          
      </form>
      <button onClick={handleLogin}>{t `Send comment` }</button>
  </div>
  </div>
    )

}