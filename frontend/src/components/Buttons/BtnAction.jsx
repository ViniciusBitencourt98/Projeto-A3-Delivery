import './Buttons.css';

export const BtnAction = ({onClick, label, ...props}) => {
  

  return (
    <button onClick={onClick} className='btnAction' {...props}>{label}</button>
  );
};

export default BtnAction;