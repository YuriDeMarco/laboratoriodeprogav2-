export let usuario = {
  nome: '',
  email: '',
  senha: ''
};

export function setUsuario(novo) {
  usuario.nome = novo.nome;
  usuario.email = novo.email;
  usuario.senha = novo.senha;
}