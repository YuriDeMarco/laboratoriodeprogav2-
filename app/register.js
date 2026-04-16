import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export let usuarioFake = {};

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erro, setErro] = useState('');

  const router = useRouter();

  function cadastrar() {
    if (!nome || !email || !senha || !confirmar) {
      setErro('Preencha todos os campos');
      return;
    }

    if (senha !== confirmar) {
      setErro('Senhas não coincidem');
      return;
    }

    usuarioFake = { email, senha };
    alert('Cadastro realizado!');

    router.replace('/login');
  }

  return (
    <View style={{ flex:1, justifyContent:'center', padding:20, backgroundColor:'#0f172a' }}>

      <Text style={{ color:'#22c55e', fontSize:28, marginBottom:20 }}>
        Cadastro
      </Text>

      <TextInput placeholder="Nome" placeholderTextColor="#999" onChangeText={setNome}
        style={{ backgroundColor:'#1e293b', color:'white', padding:15, marginBottom:10 }} />

      <TextInput placeholder="Email/Login" placeholderTextColor="#999" onChangeText={setEmail}
        style={{ backgroundColor:'#1e293b', color:'white', padding:15, marginBottom:10 }} />

      <TextInput placeholder="Senha" secureTextEntry placeholderTextColor="#999" onChangeText={setSenha}
        style={{ backgroundColor:'#1e293b', color:'white', padding:15, marginBottom:10 }} />

      <TextInput placeholder="Confirmar senha" secureTextEntry placeholderTextColor="#999" onChangeText={setConfirmar}
        style={{ backgroundColor:'#1e293b', color:'white', padding:15 }} />

      {erro ? <Text style={{ color:'red', marginTop:10 }}>{erro}</Text> : null}

      <TouchableOpacity
        onPress={cadastrar}
        style={{ backgroundColor:'#22c55e', padding:15, marginTop:20 }}
      >
        <Text style={{ textAlign:'center' }}>Cadastrar</Text>
      </TouchableOpacity>

    </View>
  );
}