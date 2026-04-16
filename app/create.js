import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { adicionarTarefa } from '../tasks';

export default function Create() {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [foto, setFoto] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [openCamera, setOpenCamera] = useState(false);

  const cameraRef = useRef(null);
  const router = useRouter();

  if (!permission) return <View />;
  
  if (!permission.granted) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <Text>Permitir câmera</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={{ color:'blue' }}>Permitir</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function tirarFoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setFoto(photo.uri);
      setOpenCamera(false);
    }
  }

  function salvar() {
    adicionarTarefa({
      nome,
      data,
      feito: false,
      foto
    });

    router.back();
  }

  return (
    <View style={{ flex:1, padding:20, backgroundColor:'#0f172a' }}>

      <Text style={{ color:'#22c55e', fontSize:24 }}>Nova Tarefa</Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
        style={{ backgroundColor:'#1e293b', color:'white', marginTop:10, padding:10 }}
      />

      <TextInput
        placeholder="Data"
        placeholderTextColor="#999"
        value={data}
        onChangeText={setData}
        style={{ backgroundColor:'#1e293b', color:'white', marginTop:10, padding:10 }}
      />

      {foto && (
        <Image source={{ uri: foto }} style={{ width:100, height:100, marginTop:10 }} />
      )}

      <TouchableOpacity onPress={() => setOpenCamera(true)}>
        <Text style={{ color:'#22c55e', marginTop:10 }}>Abrir câmera</Text>
      </TouchableOpacity>

      {openCamera && (
        <CameraView ref={cameraRef} style={{ height:300, marginTop:10 }}>
          <TouchableOpacity onPress={tirarFoto}>
            <Text style={{ color:'white', textAlign:'center', marginTop:20 }}>
              Tirar foto
            </Text>
          </TouchableOpacity>
        </CameraView>
      )}

      <TouchableOpacity onPress={salvar}
        style={{ backgroundColor:'#22c55e', padding:15, marginTop:20 }}>
        <Text style={{ textAlign:'center' }}>Salvar</Text>
      </TouchableOpacity>

    </View>
  );
}