import * as React from 'react';

interface HeaderLinkProps {
Icon:any;
text:string;
}

const HeaderLink:React.FC<HeaderLinkProps> = ({text,Icon})=>{
     // TODO: HeaderLink
    return (
       <div>
           <Icon />
       </div>
    )
};

export default React.memo<HeaderLinkProps>(HeaderLink);