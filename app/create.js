import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Create() {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const router = useRouter();

  function salvar() {
    if (!nome || !data) {
      alert('Preencha tudo');
      return;
    }

    router.push({
      pathname: '/home',
      params: { nome, data }
    });
  }

  return (
    <View style={{ flex:1, justifyContent:'center', padding:20, backgroundColor:'#0f172a' }}>

      <Text style={{ color:'#22c55e', fontSize:24 }}>
        Nova Tarefa
      </Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#999"
        onChangeText={setNome}
        style={{ backgroundColor:'#1e293b', color:'white', marginTop:10, padding:10 }}
      />

      <TextInput
        placeholder="Data"
        placeholderTextColor="#999"
        onChangeText={setData}
        style={{ backgroundColor:'#1e293b', color:'white', marginTop:10, padding:10 }}
      />

      <TouchableOpacity
        onPress={salvar}
        style={{ backgroundColor:'#22c55e', padding:15, marginTop:20 }}
      >
        <Text style={{ textAlign:'center' }}>Salvar</Text>
      </TouchableOpacity>

    </View>
  );
}