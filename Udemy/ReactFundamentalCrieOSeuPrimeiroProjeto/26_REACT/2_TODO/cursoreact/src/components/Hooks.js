import { useState, useEffect } from 'react';

const Hooks = () => {

    let idade = 30;
    const [novaIdade, setNovaIdade] = useState(40);

    const changeAge = () => {
        idade++;
        console.log(idade);
    };

    const changeNewAge = () => {
        setNovaIdade(novaIdade + 1);
    };

    useEffect(() => {
        console.log("Testando...");
    });

    return (
        <div>
            <p>Idade: {idade}</p>
            <button onClick={changeAge}>Mudar idade!</button>
            <p>Idade: {novaIdade}</p>
            <button onClick={changeNewAge}>Mudar idade!</button>
        </div>
    );
};

export default Hooks;