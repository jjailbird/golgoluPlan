import ConfirmWin from './ConfirmWin.jsx';
import { createConfirmation } from 'react-confirm';

const confirm = createConfirmation(ConfirmWin);

export default function (confirmation, options = {}) {
  return confirm({ confirmation, ...options });
}
