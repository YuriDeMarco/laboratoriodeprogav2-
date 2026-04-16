import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { deletarTarefa, getTarefas } from '../tasks';

export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setTarefas([...getTarefas()]);
    }, [])
  );

  function toggle(index) {
    const lista = [...tarefas];
    lista[index].feito = !lista[index].feito;
    setTarefas(lista);
  }

  function remover(index) {
    deletarTarefa(index);
    setTarefas([...getTarefas()]);
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#0f172a',
      padding: 20
    }}>

      {/* TÍTULO */}
      <Text style={{
        color: '#22c55e',
        fontSize: 28,
        marginBottom: 10
      }}>
        Facilitador 🚀
      </Text>

      {/* LISTA */}
      <FlatList
        data={tarefas}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={{
            backgroundColor: '#1e293b',
            padding: 20,
            borderRadius: 15,
            marginTop: 10
          }}>

            {/* FOTO */}
            {item.foto && (
              <Image
                source={{ uri: item.foto }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
                  marginBottom: 10
                }}
              />
            )}

            {/* ÁREA CLICÁVEL (MARCAR) */}
            <TouchableOpacity onPress={() => toggle(index)}>

              <Text style={{
                color: 'white',
                fontSize: 16
              }}>
                {item.nome}
              </Text>

              <Text style={{
                color: '#aaa',
                marginTop: 5
              }}>
                {item.data}
              </Text>

              <Text style={{
                color: '#22c55e',
                marginTop: 10,
                fontWeight: 'bold'
              }}>
                {item.feito
                  ? '✔ Feito (toque para desfazer)'
                  : '⏳ Pendente (toque para marcar)'}
              </Text>

            </TouchableOpacity>

            {/* 🔘 BOTÕES */}
            <View style={{
              flexDirection: 'row',
              marginTop: 15
            }}>

              {/* MARCAR (extra botão opcional — pode remover se quiser) */}
              <TouchableOpacity
                onPress={() => toggle(index)}
                style={{
                  flex: 1,
                  backgroundColor: '#facc15',
                  padding: 12,
                  borderRadius: 8,
                  marginRight: 5
                }}
              >
                <Text style={{
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}>
                  Marcar
                </Text>
              </TouchableOpacity>

              {/* DELETAR */}
              <TouchableOpacity
                onPress={() => remover(index)}
                style={{
                  flex: 1,
                  backgroundColor: '#ef4444',
                  padding: 12,
                  borderRadius: 8,
                  marginLeft: 5
                }}
              >
                <Text style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  Deletar
                </Text>
              </TouchableOpacity>

            </View>

          </View>
        )}
      />

      {/* BOTÃO + */}
      <TouchableOpacity
        onPress={() => router.push('/create')}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          backgroundColor: '#22c55e',
          width: 65,
          height: 65,
          borderRadius: 33,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{
          fontSize: 30,
          color: 'white'
        }}>
          +
        </Text>
      </TouchableOpacity>

    </View>
  );
}