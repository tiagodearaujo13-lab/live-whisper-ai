import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  PermissionsAndroid,
  Platform,
  Alert,
  FlatList,
  ActivityIndicator,
  DeviceEventEmitter, 
} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import axios from 'axios';

import { showFloatingBubble, initialize, hideFloatingBubble, requestPermission } from 'react-native-floating-bubble';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

function App(): React.JSX.Element {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  
  const flatListRef = useRef<FlatList>(null);

  // 1. Configuração Inicial (Áudio + Bolha)
  useEffect(() => {
    // Inicia Gravador
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      audioSource: 6,
      wavFile: 'test.wav'
    };
    AudioRecord.init(options);

    // Inicia Sistema de Bolha
    initialize().then(() => console.log("Sistema de Bolha Iniciado"));

    // O QUE ACONTECE QUANDO CLICA NA BOLHA FLUTUANTE?
    const subscription = DeviceEventEmitter.addListener('floating-bubble-press', (e) => {
      // Quando clicar na bolha, ele vai tentar gravar
      handleRecordPress(); 
    });

    return () => subscription.remove();
  }, [isRecording]); // Importante: [isRecording] para a bolha saber o estado atual

  // 2. Função para Ativar o Modo Fantasma
  const ativarModoFlutuante = async () => {
    try {
      // Pede permissão para desenhar por cima (Android abre config)
      await requestPermission();
      // Mostra a bolha (x=10, y=10)
      await showFloatingBubble(10, 10);
      Alert.alert("Modo Fantasma", "A bolha apareceu! Pode sair do app agora.");
    } catch (e) {
      Alert.alert("Permissão Negada", "Você precisa autorizar o app a sobrepor outros aplicativos.");
    }
  };

  const checkPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);
        if (grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        }
        return false;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleRecordPress = async () => {
    
    const SEU_IP = 'SEU-IP-AQUI'; 
    // ==========================================================

    if (isRecording) {
      // --- PARAR E ENVIAR ---
      try {
        const filePath = await AudioRecord.stop();
        setIsRecording(false);
        setIsLoadingAI(true); 

        const formData = new FormData();
        formData.append('audio', {
          uri: 'file://' + filePath, 
          type: 'audio/wav',
          name: 'audio.wav',
        });

        const response = await axios.post(`http://${SEU_IP}:5000/transcribe`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const textoUsuario = response.data.user_text || "Áudio enviado";
        const textoIA = response.data.ai_text || "⚠️ Vazio";

        const userMsg: Message = { id: Date.now() + '_u', text: textoUsuario, sender: 'user' };
        const aiMsg: Message = { id: Date.now() + '_a', text: textoIA, sender: 'ai' };
        
        setMessages(prev => [...prev, userMsg, aiMsg]);

      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Falha na conexão.');
      } finally {
        setIsLoadingAI(false);
      }

    } else {
      // --- GRAVAR ---
      const hasPermission = await checkPermission();
      if (hasPermission) {
        try {
          setIsRecording(true);
          AudioRecord.start();
          console.log("Gravando...");
        } catch (error) {
          console.error('Erro ao iniciar:', error);
        }
      }
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isAi = item.sender === 'ai';
    return (
      <View style={[styles.bubble, isAi ? styles.bubbleAI : styles.bubbleUser]}>
        <Text style={styles.bubbleText}>{isAi ? '🤖 ' : '👤 '}{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* HEADER COM O NOVO BOTÃO */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>LiveWhisper AI</Text>
          <Text style={styles.statusText}>On-line</Text>
        </View>

        {/* 👇👇👇 AQUI ESTÁ O BOTÃO QUE VOCÊ PEDIU 👇👇👇 */}
        <TouchableOpacity 
          style={styles.ghostButton}
          onPress={ativarModoFlutuante}
        >
          <Text style={styles.ghostButtonText}>👻 MODO LIVE</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.footer}>
        {isLoadingAI && <ActivityIndicator color="#00ff88" style={{marginBottom: 10}} />}
        
        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.recordingButton]}
          onPress={handleRecordPress}
        >
          <Text style={styles.buttonText}>
            {isRecording ? 'PARAR' : 'GRAVAR'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  header: {
    padding: 15, borderBottomWidth: 1, borderBottomColor: '#333',
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  statusText: { color: '#00ff88', fontSize: 12, fontWeight: 'bold' },
  
  // Estilo do Botão Fantasma
  ghostButton: { backgroundColor: '#333', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#555' },
  ghostButtonText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },

  listContent: { padding: 20, paddingBottom: 100 },
  bubble: { padding: 15, borderRadius: 15, marginBottom: 10, maxWidth: '85%' },
  bubbleAI: { backgroundColor: '#1e1e1e', alignSelf: 'flex-start', borderTopLeftRadius: 0, borderWidth: 1, borderColor: '#333' },
  bubbleUser: { backgroundColor: '#004422', alignSelf: 'flex-end', borderTopRightRadius: 0 },
  bubbleText: { color: '#fff', fontSize: 16, lineHeight: 22 },
  footer: { padding: 20, backgroundColor: 'rgba(0,0,0,0.9)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center' },
  recordButton: {
    width: '100%', backgroundColor: '#00ff88', padding: 15, borderRadius: 50, alignItems: 'center',
    shadowColor: '#00ff88', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5,
  },
  recordingButton: { backgroundColor: '#ff4444', shadowColor: '#ff4444' },
  buttonText: { color: '#000', fontWeight: '900', fontSize: 16, letterSpacing: 1 },
});

export default App;