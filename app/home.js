import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.nome && params.data) {
      setTarefas((prev) => [
        ...prev,
        { nome: params.nome, data: params.data }
      ]);
    }
  }, [params.nome, params.data]);

  return (
    <View style={{ flex:1, backgroundColor:'#0f172a', padding:20 }}>

      <Text style={{ color:'#22c55e', fontSize:28 }}>
        Facilitador 🚀
      </Text>

      <FlatList
        data={tarefas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ color:'white', marginTop:10 }}>
            {item.nome} - {item.data}
          </Text>
        )}
      />

      <TouchableOpacity
        onPress={() => router.push('/create')}
        style={{
          position:'absolute',
          bottom:30,
          right:30,
          backgroundColor:'#22c55e',
          width:60,
          height:60,
          borderRadius:30,
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        <Text style={{ fontSize:30 }}>+</Text>
      </TouchableOpacity>

    </View>
  );
}