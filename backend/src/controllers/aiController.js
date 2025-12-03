// backend/src/controllers/aiController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.getSuggestion = async (request, response) => {
    try {
        const { prompt } = request.body;
        
        // 1. EXTRAÇÃO DA CHAVE DINÂMICA
        // O servidor procura a chave no cabeçalho da requisição
        const apiKey = request.headers['x-api-key'];

        console.log("🔑 Chave recebida pelo servidor:", apiKey);
        // Validação: Se o usuário não mandou a chave, barra a entrada
        if (!apiKey) {
            return response.status(401).json({ 
                error: "Chave de API não fornecida. Insira sua chave do Gemini no Header 'x-api-key'." 
            });
        }

        if (!prompt) {
            return response.status(400).json({ error: "Faltou o prompt!" });
        }

        console.log(`🧠 Consultando Gemini para: "${prompt}"...`);

        // 2. CONFIGURAÇÃO DO GEMINI (Instancia na hora com a chave do usuário)
        const genAI = new GoogleGenerativeAI(apiKey);
        
        // Usamos o modelo 'gemini-1.5-flash' que é rápido e barato/grátis
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Engenharia de Prompt (System Instruction simulada)
        const promptFinal = `Você é um assistente de vendas para lives. 
        Seja curto (max 15 palavras), persuasivo e use gatilhos mentais.
        Contexto do usuário: ${prompt}`;

        // 3. GERAÇÃO DE CONTEÚDO
        const result = await model.generateContent(promptFinal);
        const aiResponse = result.response.text();

        console.log(`🤖 Resposta do Gemini: ${aiResponse}`);

        return response.status(200).json({
            suggestion: aiResponse,
            originalPrompt: prompt
        });

    } catch (error) {
        console.error("Erro no Gemini:", error);
        
        // Se a chave for inválida, o Google retorna erro 400 ou 403
        return response.status(500).json({ 
            error: "Erro ao consultar IA. Verifique se sua chave é válida.",
            details: error.message 
        });
    }
};