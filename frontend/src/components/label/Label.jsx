import { Children } from 'react';
import './Label.css';

const LabelComponent = ({ children, ...props }) => {
  return (
    <label {...props} className="labelstyle">
      {children}
    </label>
  );
}
export default LabelComponent;     