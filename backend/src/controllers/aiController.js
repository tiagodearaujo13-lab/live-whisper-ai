// backend/src/controllers/aiController.js

// Lógica: Recebe o texto do usuário e devolve uma sugestão
exports.getSuggestion = async (request, response) => {
    try {
        // 1. Pega o que o usuário enviou (ex: "O cliente achou caro")
        const { prompt } = request.body;

        if (!prompt) {
            return response.status(400).json({ error: "Faltou o prompt!" });
        }

        console.log(`Recebido do Frontend: ${prompt}`);

        // 2. SIMULAÇÃO DA IA (Mock)
        // Aqui entraremos com a OpenAI depois
        const fakeAiResponse = `(IA Simulada) Diga para ele que parcelamos em 12x sem juros!`;

        // 3. Devolve a resposta
        return response.status(200).json({
            suggestion: fakeAiResponse,
            originalPrompt: prompt
        });

    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Erro interno no servidor" });
    }
};