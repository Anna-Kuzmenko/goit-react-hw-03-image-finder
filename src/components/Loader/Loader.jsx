import React from 'react';
import { TailSpin } from 'react-loader-spinner';

function Loader() {
  return (
    <div>
      <TailSpin color="#F9FF33" height={100} width={100} />
      загружаем...
    </div>
  );
}

export default Loader;
