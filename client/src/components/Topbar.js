import React from 'react';

import { Link } from 'react-router-dom';

function Topbar() {

  return (
    <div id={"top-bar"}>
      <Link to={'/'}>
      <img 
        src={"https://i.pinimg.com/originals/2f/cc/e8/2fcce87dd6b29a3a8615cb9e6f434af6.png"} 
        alt={"app-icon"}>
      </img>
      </Link>

    </div>
  );
}

export default Topbar;
