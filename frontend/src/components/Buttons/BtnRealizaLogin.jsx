import './Buttons.css';


export const BtnRealizaLogin = ({onClick}) => {
  return (
    <button onClick={onClick} className='btnCusttom BtnRealizaLogin' closeButton>Realizar o login<img src="/images/IconUser.svg" alt=""/></button>
  );
};

export default BtnRealizaLogin;