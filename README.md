# Particles_Background
![Badge aplicando melhorias](https://img.shields.io/badge/Status-Aplicando_melhorias-orange)

Essa é a minha versão de um background animado maravilhoso no estilo de grafos ( https://codepen.io/VincentGarreau/pen/bGxvQd ), a idéia era praticar um pouco animações com canvas, mas ficou tão legal que decidi por aqui.

A versão atual não conta com interações com o cursor e está em processo de melhorias.

O codigo, atualmente, faz parte da classe de complexidade Quadrática - O(N²)

### Melhorias futuras

- Reduzir a quantidade de iterações ao interligar pontos
- Otimizar a geração de quadros, assim como o reset do canva
- Disponibilizar versão para js
- Criar interação com o cursor
- Limitar FPS (Entre 40 e 60)

# Como usar?

** A versão atual só pode ser utilizada como background do body e está setada com um tamanho fixo (o tamanho total da janela).

** Estava utilizando Angular quando produzi o arquivo, por esse motivo o arquivo será em typescript.

** Futuramente disponibilizarei também a versão js.

- 1° Efetue o download do arquivo e coloque em algum local no seu projeto.
- 2° No componente desejado efetue o import do GraphBackGround.
  
  ![1](https://github.com/CostaJoseff/Particles_Background/assets/97255656/e5847096-baa0-4265-8c69-370a06260445)
- 3° Defina os parâmetros necessários para a criação do objeto.
  
  ![2](https://github.com/CostaJoseff/Particles_Background/assets/97255656/9d243127-0f3b-4c98-8765-da22f6c94a6b)
  
  ** Cuidado com a quantidade de pontos, quanto mais pontos, mais pesado vai ficar...
  
  ** Lembre-se que o código está passando por melhorias, ele ainda é quadratico
  
  Existem também parâmetros implicitos (como default), são eles
    - Tamanho dos pontos = 4
    - Espessura das linhas = 1
      
  É possível alterar, basta adicionar os 2 parametros no construtor.
- 4° Instancie o objeto.
  
  ![image](https://github.com/CostaJoseff/Particles_Background/assets/97255656/d12c41be-3da8-41bc-9fac-599827a1a6ed)
  
- 5° Para finalizar, crie um canvas e adicione id="background".
  
  ![image](https://github.com/CostaJoseff/Particles_Background/assets/97255656/55ad5611-fa94-4b55-a9b3-db41df4f1d2c)
  
Já no CSS eu normalmente deixo a configuração abaixo:

  ![image](https://github.com/CostaJoseff/Particles_Background/assets/97255656/2396a3f2-f198-4545-b1fb-a291c06e38b6)

Pronto!!
Agora só apreciar seu novo background.


