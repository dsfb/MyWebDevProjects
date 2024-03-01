 const AnotherComponent = () => {
    const handleClick = () => {
        console.log("Clicou no botão");
    };

    return (
        <div>
            <p>Segundo componente</p>
            <button onClick={handleClick}>Evento de click</button>
            <br />
            <button onClick={() => console.log("teste")}>Evento no Elemento</button>
        </div>
    );
 };

 export default AnotherComponent;
