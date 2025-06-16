import './Buttons.css';


export const BtnAbandonar = ({onClick}) => {
  return (
    <button onClick={onClick} className='btnCusttom BtnBack' closeButton><img src="/images/cancelicon.svg" alt=""/>Voltar</button>
  );
};

export default BtnAbandonar;