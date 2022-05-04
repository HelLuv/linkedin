import * as React from 'react';

interface HomeProps {

}

const Home:React.FC<HomeProps> = ({})=>{
     // TODO: Home
    return (
        <h1>Home</h1>
    )
};

export default React.memo<HomeProps>(Home);