import { useState } from "react";

function Home() {
    const [nome, setNome] = useState("");

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Oi mãe, digita seu nome aí kkk</h1>
            <input 
                type="text" 
                placeholder="Digite aqui..." 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
            />
            <strong>{nome}</strong>
        </div>
    );
}

export default Home;