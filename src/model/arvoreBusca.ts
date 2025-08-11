/*
Atividade Final de Estrutura de Dados II
Turma.: ADS 3º Período - Noturno
Equipe: 
    - Francisnilto dos Santos Nascimento
    - Vanessa Pereira Cunha 

    npm run build
    npm start
*/


import { NoArvore } from './noArvore';

export class ArvoreBuscaBinaria<T> {
  private raiz: NoArvore<T> | null = null;
  private quantidade: number = 0;
  private comparar: (a: T, b: T) => number;

  constructor(comparador?: (a: T, b: T) => number) {
    if (comparador) {
      this.comparar = comparador;
    } else {
      this.comparar = function (a: any, b: any) {
        if (a === b) {
          return 0;
        }
        if (a < b) {
          return -1;
        }
        return 1;
      };
    }
  }

  inserir(valor: T): void {
    const novoNo = new NoArvore(valor);
    if (this.raiz === null) {
      this.raiz = novoNo;
      this.quantidade = 1;
      return;
    }

    let atual = this.raiz;
    while (true) {
      const comp = this.comparar(valor, atual.valor);
      if (comp === 0) {
        return; // não insere duplicatas
      }
      if (comp < 0) {
        if (atual.esquerdo === null) {
          atual.esquerdo = novoNo;
          this.quantidade++;
          return;
        }
        atual = atual.esquerdo;
      } else {
        if (atual.direito === null) {
          atual.direito = novoNo;
          this.quantidade++;
          return;
        }
        atual = atual.direito;
      }
    }
  }

  contem(valor: T): boolean {
    return this.encontrarNo(valor) !== null;
  }

  buscaLargura(): T[] {
    const resultado: T[] = [];
    if (this.raiz === null) {
      return resultado;
    }
    const fila: NoArvore<T>[] = [this.raiz];
    while (fila.length > 0) {
      const no = fila.shift()!;
      resultado.push(no.valor);
      if (no.esquerdo !== null) {
        fila.push(no.esquerdo);
      }
      if (no.direito !== null) {
        fila.push(no.direito);
      }
    }
    return resultado;
  }

  preOrdem(): T[] {
    const resultado: T[] = [];
    function visitar(no: NoArvore<T> | null) {
      if (no === null) return;
      resultado.push(no.valor);
      visitar(no.esquerdo);
      visitar(no.direito);
    }
    visitar(this.raiz);
    return resultado;
  }

  emOrdem(): T[] {
    const resultado: T[] = [];
    function visitar(no: NoArvore<T> | null) {
      if (no === null) return;
      visitar(no.esquerdo);
      resultado.push(no.valor);
      visitar(no.direito);
    }
    visitar(this.raiz);
    return resultado;
  }

  posOrdem(): T[] {
    const resultado: T[] = [];
    function visitar(no: NoArvore<T> | null) {
      if (no === null) return;
      visitar(no.esquerdo);
      visitar(no.direito);
      resultado.push(no.valor);
    }
    visitar(this.raiz);
    return resultado;
  }

  altura(): number {
    function calcularAltura(no: NoArvore<T> | null): number {
      if (no === null) return -1;
      const alturaEsquerda = calcularAltura(no.esquerdo);
      const alturaDireita = calcularAltura(no.direito);
      if (alturaEsquerda > alturaDireita) {
        return alturaEsquerda + 1;
      } else {
        return alturaDireita + 1;
      }
    }
    return calcularAltura(this.raiz);
  }

  quantidadeElementos(): number {
    return this.quantidade;
  }

  ancestrais(valor: T): T[] {
    const caminho: T[] = [];
    let atual = this.raiz;
    while (atual !== null) {
      const comp = this.comparar(valor, atual.valor);
      if (comp === 0) break;
      caminho.push(atual.valor);
      if (comp < 0) {
        atual = atual.esquerdo;
      } else {
        atual = atual.direito;
      }
    }
    if (atual === null || this.comparar(atual.valor, valor) !== 0) return [];
    return caminho;
  }

  descendentes(valor: T): T[] {
    const noInicial = this.encontrarNo(valor);
    if (noInicial === null) return [];
    const resultado: T[] = [];
    function visitar(no: NoArvore<T> | null) {
      if (no === null) return;
      resultado.push(no.valor);
      visitar(no.esquerdo);
      visitar(no.direito);
    }
    visitar(noInicial.esquerdo);
    visitar(noInicial.direito);
    return resultado;
  }

  nivelDo(valor: T): number {
    let nivel = 0;
    let atual = this.raiz;
    while (atual !== null) {
      const comp = this.comparar(valor, atual.valor);
      if (comp === 0) return nivel;
      if (comp < 0) {
        atual = atual.esquerdo;
      } else {
        atual = atual.direito;
      }
      nivel++;
    }
    return -1;
  }

  ehEstritamenteBinaria(): boolean {
    function verificar(no: NoArvore<T> | null): boolean {
      if (no === null) return true;
      const temEsquerdo = no.esquerdo !== null;
      const temDireito = no.direito !== null;
      if ((temEsquerdo && !temDireito) || (!temEsquerdo && temDireito)) return false;
      return verificar(no.esquerdo) && verificar(no.direito);
    }
    return verificar(this.raiz);
  }

  ehPerfeita(): boolean {
    const altura = this.altura();
    if (altura < 0) return true;
    const esperado = Math.pow(2, altura + 1) - 1;
    return this.quantidade === esperado;
  }

  private encontrarNo(valor: T): NoArvore<T> | null {
    let atual = this.raiz;
    while (atual !== null) {
      const comp = this.comparar(valor, atual.valor);
      if (comp === 0) return atual;
      if (comp < 0) {
        atual = atual.esquerdo;
      } else {
        atual = atual.direito;
      }
    }
    return null;
  }
}
