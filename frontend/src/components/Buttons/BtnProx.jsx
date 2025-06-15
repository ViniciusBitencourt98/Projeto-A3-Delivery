import './Buttons.css';

export const BtnProx = ({ onClick }) => {
  return (
    <button onClick={onClick} className='btnCusttom btnProx'>Próximo<img src="/images/arroundright.svg" alt=""/></button>
  );
};

export default BtnProx;