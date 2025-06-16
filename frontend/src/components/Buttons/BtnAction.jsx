import './Buttons.css';

export const BtnAction = ({onClick, label}) => {
  return (
    <button onClick={onClick} className='btnAction'>{label}</button>
  );
};

export default BtnAction;