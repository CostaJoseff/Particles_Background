![image](https://github.com/CostaJoseff/Particles_Background/assets/97255656/eb8f1f53-e502-446a-a6a2-ca85a69bfe56)# Particles_Background
![Badge aplicando melhorias](https://img.shields.io/badge/Status-Aplicando_melhorias-orange)

Essa é a minha versão de um background animado maravilhoso no estilo de grafos ( https://codepen.io/VincentGarreau/pen/bGxvQd ), a idéia era praticar um pouco animações com canvas, mas ficou tão legal que decidi por aqui.

A versão atual não conta com interações com o cursor e está em processo de melhorias.

(Antes) O codigo, faz parte da classe de complexidade Quadrática - O(n²).
(Atualmente) Com melhorias aplicadas no laço for² consegui Σ(n) partindo de n-1 até 0.

### Melhorias futuras

- Reduzir a quantidade de iterações ao interligar pontos (quanto mais eficiente melhor)
- Otimizar a geração de quadros, assim como o reset do canva
- Disponibilizar versão para js (feito)
- Criar interação com o cursor
- Limitar FPS (Entre 40 e 60)

# Como usar?

** A versão atual só pode ser utilizada como background do body e está setada com um tamanho fixo (o tamanho total da janela).

** (Antes) Estava utilizando Angular quando produzi o arquivo, por esse motivo o arquivo será em typescript.
** (Atualmente) Já é possível utilizar em projetos com js.

# TypeScript

- 1° Efetue o download do arquivo e coloque em algum local no seu projeto.
- 2° No componente desejado efetue o import do GraphBackGround.
  
  ![1](https://github.com/CostaJoseff/Particles_Background/assets/97255656/944597c8-5417-4265-8bc0-69a9b25506be)

- 3° Defina os parâmetros necessários para a criação do objeto.
  
  ![2](https://github.com/CostaJoseff/Particles_Background/assets/97255656/cd0dbfcc-fdfb-4b79-9dde-e08a196f8a97)
  
  ** Cuidado com a quantidade de pontos, quanto mais pontos, mais pesado vai ficar...
  (Antes) O limite de pontos recomendado (baseado na minha máquina) é de 200 a 250 pts
  (Atualmente) O limite de pontos agora chega em 650 pontos

  (Antes) A velocidade dos pontos deve ser um valor inteiro
  (Atualmente) Agora é possível definir a velocidade como float, permitindo uma animação mais lenta.
  
  ** Lembre-se que o código está passando por melhorias, ele ainda é quadratico (não mais :) )
  
  Existem também parâmetros implicitos (como default), são eles
    - Tamanho dos pontos = 4
    - Espessura das linhas = 1
      
  É possível alterar, basta adicionar os 2 parametros no construtor.

  É possível também alterar a distancia dos links entre os pontos (não deixei como parametro da class pois seria uma arma no seu PC pois ja temos a quantidade de pontos).
  Mesmo assim, é possível alterar isso também, só cuidado ao aumentar a distancia limite, um limite grande aumenta a quantidade de processamento de arestas.
  
- 4° Instancie o objeto.
  
  ![3](https://github.com/CostaJoseff/Particles_Background/assets/97255656/01e09e1d-c119-4e25-a792-d1ebbcfae975)

  
- 5° Para finalizar, crie um canvas e adicione id="background".
  
  ![4](https://github.com/CostaJoseff/Particles_Background/assets/97255656/00649653-cb6f-4358-8e8f-a731d97d12f2)

  
Já no CSS eu normalmente deixo a configuração abaixo:

  ![5](https://github.com/CostaJoseff/Particles_Background/assets/97255656/ba5afc00-f15b-40e8-94c7-5a8251871f1d)

# JavaScript:

Na versão para js é necessário apenas adicionar o ID ao canvas (como listado no TypeScript) e adicionar o script no seu HTML
A instância do objeto está acontecendo nas ultimas linhas do codigo.

![image](https://github.com/CostaJoseff/Particles_Background/assets/97255656/184bf65d-7086-4f7b-afa5-d04945b15a80)

Para alterar qualquer configuração é necessário apenas ir para as ultimas linhas do codigo js, onde o objeto está sendo instanciado.

#
Pronto!!
Agora só apreciar seu novo background.


