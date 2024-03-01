import AnotherComponent from "./AnotherComponent";

function FirstComponent() {
    // Algum comentário
    const name = "Matheus";

    return (
        <div className="firstcomponent">
            <p>Primeiro Componente</p>
            {/*
            <label htmlFor="name">Nome:</label>
            <input type="text" name="name" style={{ marginLeft: 8 + 'px' }} />
            {2 + 2}
            {console.log("JavaScript!")}
            */}
            <p>Nome: {name}</p>
            <AnotherComponent />
        </div>
    );
}

export default FirstComponent;