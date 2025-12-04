from flask import Flask, request, jsonify
import os
import speech_recognition as sr
import google.generativeai as genai # <--- Biblioteca Nova

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
recognizer = sr.Recognizer()

# ==============================================================================
# 👇👇👇 COLOQUE SUA CHAVE DO GOOGLE AQUI 👇👇👇
# Pegue em: https://aistudio.google.com/app/apikey
GOOGLE_API_KEY = "SUA-CHAVE-API-AQUI" 
# Exemplo: "AIzaSyD..."
# ==============================================================================

# Configura a IA se a chave existir
if GOOGLE_API_KEY != "":
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-2.5-flash') # Modelo rápido e leve
    print("🧠 Cérebro Gemini ativado!")
else:
    print("⚠️ AVISO: Sem chave API. Rodando em modo simulado.")

def cérebro_ia(texto_usuario):
    """Decide a resposta usando o Google Gemini"""
    
    # Verifica se a chave foi colocada
    if GOOGLE_API_KEY == "COLE_SUA_CHAVE_AQUI" or not GOOGLE_API_KEY:
        return "⚠️ Erro: Você não colocou a API Key no arquivo server.py ainda."

    try:
        # Tenta gerar a resposta
        response = model.generate_content(
            f"Responda de forma curta (máximo 1 frase) para uma live: {texto_usuario}"
        )
        
        # Se a resposta vier vazia, avisa
        if not response.text:
            return "⚠️ O Google pensou mas não disse nada."
            
        return response.text

    except Exception as e:
        print(f"❌ ERRO DETALHADO: {e}") # Mostra o erro no terminal
        return f"Erro técnico: {str(e)}"
@app.route('/transcribe', methods=['POST'])
def transcribe():
    print("\n📞 Recebendo áudio...")
    
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file'}), 400
    
    file = request.files['audio']
    filename = os.path.join(UPLOAD_FOLDER, 'received.wav')
    file.save(filename)
    
    try:
        # 1. Transcrever (Ouvido do Google)
        with sr.AudioFile(filename) as source:
            audio_data = recognizer.record(source)
            # Ouve em Português
            texto_usuario = recognizer.recognize_google(audio_data, language='pt-BR')
            print(f"👤 Usuário: {texto_usuario}")
            
            # 2. Pensar (Cérebro do Google)
            resposta_ia = cérebro_ia(texto_usuario)
            print(f"🤖 IA: {resposta_ia}")
            
            # 3. Responder
            return jsonify({
                'user_text': texto_usuario,
                'ai_text': resposta_ia
            })
            
    except sr.UnknownValueError:
        return jsonify({'user_text': "...", 'ai_text': "Não entendi o áudio."})
    except Exception as e:
        print(f"Erro: {e}")
        return jsonify({'user_text': "Erro", 'ai_text': str(e)})

if __name__ == '__main__':
    print("🚀 Servidor Google Full-Stack Rodando!")
    app.run(host='0.0.0.0', port=5000, debug=True)