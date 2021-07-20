import { FormattedMessage } from "react-intl";
import { useContext, useState, useRef } from 'react';
import { MyContext } from './Mycontext'



const sendTable = false;

function Content() {
  //const urlPhp = "http://server/quickstart.php";
  const { registerFormPhp } = useContext(MyContext);
  
 

  const initialState = {
      form: {
        name: '',
        surname: '',
        email: '',
        phone: '',
        comment: '',
      },
      errorCod: '',
      errorMsg: '',
      successMsg: '',
  }

  


  const [state, setState] = useState(initialState);

  const submitForm = async (event) => {
    event.preventDefault();
    const data = await registerFormPhp(state.form);
    if (data.success) {    
        setState({
            ...initialState,
            successMsg: data.message,            
        });
    }
    // Если отправка не успешна
    else {
        setState({
            ...state,
            
            errorCod: data.status,
            successMsg: '',
            errorMsg: data.message
        });
    }
  }

  const onChangeValue = (e) => {
    setState({
        ...state,
        form: {
            ...state.form,
            [e.target.name]: e.target.value
        }
    });
  }

    let successMsg = '';
    let errorMsg = '';
    let errorCod = '';
    switch (state.errorCod){
      case 400: errorCod = <div className ='alert'><FormattedMessage id='e400' /><br /></div>;
                break
      case 403: errorCod = <div className ='alert'><FormattedMessage id='e403' /><br /></div>;
                break
      case 404: errorCod = <div className ='alert'><FormattedMessage id='e404' /><br /></div>;
    }
    if (successMsg){
      sendTable = true; 
      successMsg = <div className ='Success'><FormattedMessage id='Success' /><br /></div>;
    }
    
  if (!sendTable){     
    return (
      <div className="container hero">
        <div className="formar">
            
            <form onSubmit={submitForm} noValidate autoComplete="off" >
                <FormattedMessage id='name' /> <br />
                <input name='name' size="25" value={state.form.name} onChange ={onChangeValue} ></input><br />              
                <FormattedMessage id='Surname' /><br />
                <input name='surname' size="25" value={state.form.surname} onChange ={onChangeValue} ></input><br />
                <FormattedMessage id='Phone' /><br />              
                <input name ='phone' value={state.form.phone}  size="25" onChange ={onChangeValue} ></input><br />
                <FormattedMessage id='Email' /><br />
                <input size="25" name="email" type="email" value={state.form.email} onChange ={onChangeValue} ></input><br />
                <FormattedMessage id='Comm' /><br />
                <input name = 'comment' size="25" value={state.form.comment} onChange ={onChangeValue} ></input><br />
                {errorCod}
                {errorMsg}
                <button 
                className="btn btn-primary" 
                type="submit">
                  <FormattedMessage id='click' />
                </button>
            </form>
            <br />
            
        </div>
        
      </div>
    );
  } 
  else {
    return (
      <div className="container hero">
        <div className="formar"></div>
        {successMsg}
        </div> 
    )         
  }
};

export default Content;
