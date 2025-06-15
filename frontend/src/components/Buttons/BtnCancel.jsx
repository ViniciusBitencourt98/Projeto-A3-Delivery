import './Buttons.css';

export const BtnCancel = ({onClick}) => {
  return (
    <button onClick={onClick} className='btnCusttom BtnCancel'>Cancelar<img src="/images/cancelicon.svg" alt=""/></button>
  );
};

export default BtnCancel;