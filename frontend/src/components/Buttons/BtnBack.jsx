import './Buttons.css';

export const BtnBack = ({onClick}) => {
  return (
    <button onClick={onClick} className='btnCusttom BtnBack'><img src="/images/arroundleft.svg" alt=""/>Voltar</button>
  );
};

export default BtnBack;