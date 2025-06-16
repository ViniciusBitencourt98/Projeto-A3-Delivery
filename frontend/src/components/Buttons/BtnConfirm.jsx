import './Buttons.css';

export const BtnConfirm = ({ onClick }) => {
  return (
    <button onClick={onClick} className='btnCusttom btnProx'>Finalizar<img src="/images/IconConfirm.svg" alt=""/></button>
  );
};

export default BtnConfirm;