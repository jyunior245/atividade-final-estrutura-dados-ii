/*
Atividade Final de Estrutura de Dados II
Turma.: ADS 3º Período - Noturno
Equipe: 
    - Francisnilto dos Santos Nascimento
    - Vanessa Pereira Cunha 

    npm install
    npm run build
    npm start
*/

import { ArvoreBuscaBinaria } from "./model/arvoreBusca";

function executarTestes() {
  const arvore = new ArvoreBuscaBinaria<number>();

  console.log("--- Inserindo elementos ---");
  [50, 30, 70, 20, 40, 60, 80].forEach(v => arvore.inserir(v));
  console.log("Elementos inseridos.");

  console.log("--- Busca em Largura ---");
  console.log(arvore.buscaLargura());

  console.log("--- Pré-Ordem ---");
  console.log(arvore.preOrdem());

  console.log("--- Em-Ordem ---");
  console.log(arvore.emOrdem());

  console.log("--- Pós-Ordem ---");
  console.log(arvore.posOrdem());

  console.log("--- Contém 40? ---", arvore.contem(40));
  console.log("--- Contém 99? ---", arvore.contem(99));

  console.log("--- Altura da Árvore ---", arvore.altura());
  console.log("--- Quantidade de Elementos ---", arvore.quantidadeElementos());

  console.log("--- Ancestrais do 60 ---", arvore.ancestrais(60));
  console.log("--- Descendentes do 30 ---", arvore.descendentes(30));
  console.log("--- Nível do 80 ---", arvore.nivelDo(80));

  console.log("--- É Estritamente Binária? ---", arvore.ehEstritamenteBinaria());
  console.log("--- É Perfeita? ---", arvore.ehPerfeita());
}

executarTestes();
