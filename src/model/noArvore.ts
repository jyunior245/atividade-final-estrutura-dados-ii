/*
Atividade Final de Estrutura de Dados II
Turma.: ADS 3º Período - Noturno
Equipe: 
    - Francisnilto dos Santos Nascimento
    - Vanessa Pereira Cunha 

    npm run build
    npm start
*/

export class NoArvore<T> {
  valor: T;
  esquerdo: NoArvore<T> | null = null;
  direito: NoArvore<T> | null = null;

  constructor(valor: T) {
    this.valor = valor;
  }
}