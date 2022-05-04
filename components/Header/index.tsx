import * as React from 'react';

interface HeaderProps {

}

const Header:React.FC<HeaderProps> = ({})=>{
     // TODO: Header
    return (
      <h1 className="text-3xl font-bold underline">
       Header
      </h1>
    )
};

export default React.memo<HeaderProps>(Header);