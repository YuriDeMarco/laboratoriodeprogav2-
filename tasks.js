let tarefas = [];

export function adicionarTarefa(tarefa) {
  tarefas.push(tarefa);
}

export function getTarefas() {
  return tarefas;
}

export function deletarTarefa(index) {
  tarefas.splice(index, 1);
}