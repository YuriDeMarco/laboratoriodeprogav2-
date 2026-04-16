import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

let usuarioFake = {
  email: 'admin',
  senha: '123'
};

export default function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  function entrar() {
    if (!login || !senha) {
      setErro('Preencha todos os campos');
      return;
    }

    if (login === usuarioFake.email && senha === usuarioFake.senha) {
      setErro('');
      router.replace('/home');
    } else {
      setErro('Login ou senha inválidos');
    }
  }

  return (
    <View style={{ flex:1, justifyContent:'center', padding:20, backgroundColor:'#0f172a' }}>

      <Text style={{ color:'#22c55e', fontSize:28, marginBottom:20 }}>
        Login
      </Text>

      <TextInput
        placeholder="Login"
        placeholderTextColor="#999"
        onChangeText={setLogin}
        style={{ backgroundColor:'#1e293b', color:'white', padding:15, marginBottom:10 }}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        onChangeText={setSenha}
        style={{ backgroundColor:'#1e293b', color:'white', padding:15 }}
      />

      {erro ? <Text style={{ color:'red', marginTop:10 }}>{erro}</Text> : null}

      <TouchableOpacity
        onPress={entrar}
        style={{ backgroundColor:'#22c55e', padding:15, marginTop:20 }}
      >
        <Text style={{ textAlign:'center' }}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={{ color:'#22c55e', marginTop:15 }}>
          Criar conta
        </Text>
      </TouchableOpacity>

    </View>
  );
}