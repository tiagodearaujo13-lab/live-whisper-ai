# 🎙️ LiveWhisper AI

![Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)
![Python](https://img.shields.io/badge/Backend-Python%20%7C%20Flask-blue)
![React Native](https://img.shields.io/badge/Mobile-React%20Native-61dafb)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)

Um assistente pessoal inteligente projetado para streamers e criadores de conteúdo. O aplicativo "ouve" perguntas feitas durante uma transmissão ao vivo, transcreve o áudio e usa Inteligência Artificial (Google Gemini) para sugerir a melhor resposta em tempo real.

---

## 🧠 Sobre o Projeto e Estudos

Este projeto faz parte da minha jornada de estudos em **Desenvolvimento Full-Stack Mobile e IA**.

Atualmente, o **Core (Núcleo)** do sistema está 100% funcional:

- ✅ Captura de áudio no App Mobile.
- ✅ Envio seguro para servidor Python.
- ✅ Transcrição de Voz (Speech-to-Text).
- ✅ Inteligência via Google Gemini (LLM).
- ✅ Interface de Chat funcional.

🚧 **Próximos Passos (Em Estudo):**
Estou estudando ativamente sobre **Android Native Modules** e permissões de sobreposição (`SYSTEM_ALERT_WINDOW`) para implementar o **"Modo Fantasma" (Overlay)**, permitindo que a resposta da IA flutue sobre outros apps (como Instagram ou TikTok) durante a live.

---

## 🚀 Tecnologias Utilizadas

### Mobile (Frontend)

- **React Native (CLI)**
- **Axios** (Comunicação HTTP)
- **React Native Audio Record** (Gravação WAV)
- **TypeScript**

### Server (Backend)

- **Python 3**
- **Flask** (API Server)
- **Google Generative AI** (Integração Gemini Flash 1.5)
- **SpeechRecognition** (Processamento de áudio)

---

## ⚙️ Como Rodar o Projeto

Como este projeto envolve chaves de API e configurações de rede, siga os passos abaixo para configurar o ambiente local.

### 1. Pré-requisitos

- Node.js e JDK instalados.
- Python instalado.
- Dispositivo Android (Físico ou Emulador) com Depuração USB ativa.
- Uma API Key do [Google AI Studio](https://aistudio.google.com/).

### 2. Configurando o Backend (Cérebro)

```bash
# Entre na pasta do servidor
cd backend

# Instale as dependências
pip install flask speechrecognition google-generativeai

# ⚠️ IMPORTANTE:
# Abra o arquivo 'server.py' e adicione sua GOOGLE_API_KEY na linha indicada.
```
