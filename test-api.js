// test-api.js
// Script simples para testar nossa API sem precisar do Frontend ainda

async function testarAPI() {
    console.log("📡 Enviando dados para o servidor...");

    const dados = {
        prompt: "O cliente disse que o produto é caro."
    };

    try {
        // Faz a requisição para o NOSSO servidor local
        const response = await fetch("http://localhost:3000/api/suggestion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();
        
        console.log("--- RESPOSTA DO SERVIDOR ---");
        console.log(resultado);

    } catch (error) {
        console.error("Erro ao conectar:", error);
    }
}

testarAPI();