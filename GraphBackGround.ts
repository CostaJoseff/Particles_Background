export class GraphBackGround {
  private canvas: any;
  private ctx: any;
  private largura: number;
  private altura: number;

  private pontos: any[];
  private tamanhoDosPontos: number;
  private espessuraDasLinhas: number;
  private quantidadeDePontos: number;
  private velocidadeDosPontos: number;
  private corDosPontos: number[];
  private corDosLinks: number[];
  private distanciaLimite: number;

  constructor(altura: any, largura: any, quantidadeDePontos: number, velocidadeDosPontos: number, corDosPontos: number[], corDosLinks: number[], animado: boolean, tamanhoDosPontos: number = 4, espessuraDasLinhas: number = 1) {
    this.canvas = document.getElementById("background");
    this.ctx = this.canvas.getContext('2d');
    this.largura = largura;
    this.altura = altura;
    this.canvas.width = this.largura;
    this.canvas.height = this.altura;
    this.pontos = [];
    this.tamanhoDosPontos = tamanhoDosPontos;
    this.espessuraDasLinhas = espessuraDasLinhas;
    this.quantidadeDePontos = quantidadeDePontos;
    this.velocidadeDosPontos = velocidadeDosPontos;
    this.corDosPontos = corDosPontos;
    this.corDosLinks = corDosLinks;
    this.distanciaLimite = 100;

    this.gerarPontos();
    if (animado) {
      this.gerarAnimacao();
    } else {
      this.gerarImagemEstatica();
    }
  }

  public setCorPontos(rgb: number[]) {
    this.corDosPontos = rgb;
  }

  public setCorLinks(rgb: number[]) {
    this.corDosLinks = rgb;
  }

  private gerarPontos() {
    for (let i = 0; i <= this.quantidadeDePontos; i++) {
      let x = Math.floor(Math.random() * this.largura);
      let y = Math.floor(Math.random() * this.altura)
      if (x < 0) {
        x = 0;
      }
      if (x > this.largura) {
        x = this.largura;
      }
      if (y < 0) {
        y = 0;
      }
      if (y > this.altura) {
        y = this.altura;
      }
      let randomX = Math.random();
      let randomY = Math.random();
      var ponto = {
          id: i,
          x: x,
          y: y,
          velocidadeX: randomX * this.velocidadeDosPontos * (randomY < 0.5 ? 1 : -1),
          velocidadeY: randomY * this.velocidadeDosPontos * (randomX < 0.5 ? 1 : -1),
          tamanho: randomX * this.tamanhoDosPontos,
          links: []
      };

      this.pontos.push(ponto);
    }
  }

  private angulo(angulo: number) {
    return (Math.PI/180)*angulo;
  }

  private desenharPontos() {
    this.pontos.forEach((ponto) => {
      this.ctx.fillStyle = `rgba(${this.corDosPontos[0]}, ${this.corDosPontos[1]}, ${this.corDosPontos[2]})`;
      this.ctx.beginPath();
      this.ctx.arc(ponto.x, ponto.y, ponto.tamanho, this.angulo(0), this.angulo(360));
      this.ctx.fill();
      this.ctx.closePath();
    });
  }

  private calcularDistancia(x1: number, y1: number, x2: number, y2: number) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const distancia = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return distancia;
  }

  private calcularNivelDeTransparencia(distancia: number) {
    return (1 - (distancia / 100)).toFixed(3);
  }

  private linkarDesenharLinks(ponto1: any, ponto2: any, distancia: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(ponto1.x, ponto1.y);
    this.ctx.lineTo(ponto2.x, ponto2.y);
    this.ctx.lineWidth = this.espessuraDasLinhas;
    this.ctx.strokeStyle = `rgba(${this.corDosLinks[0]}, ${this.corDosLinks[1]}, ${this.corDosLinks[2]}, ${this.calcularNivelDeTransparencia(distancia)})`;
    this.ctx.stroke();
    this.ctx.closePath();
    ponto1.links.push(ponto2);
    ponto2.links.push(ponto1);
  }

  private desenharLinks(ponto1: any, ponto2: any, distancia: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(ponto1.x, ponto1.y);
    this.ctx.lineTo(ponto2.x, ponto2.y);
    this.ctx.lineWidth = this.espessuraDasLinhas;
    this.ctx.strokeStyle = `rgba(${this.corDosLinks[0]}, ${this.corDosLinks[1]}, ${this.corDosLinks[2]}, ${this.calcularNivelDeTransparencia(distancia)})`;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private deslinkar(ponto1: any, ponto2: any) {
    ponto1.links = ponto1.links.filter((ponto: any) => ponto !== ponto2);
    ponto2.links = ponto2.links.filter((ponto: any) => ponto !== ponto1);
  }

  private definirLinks() {
    for (let i = 0; i < this.pontos.length; i++) {
      let ponto1 = this.pontos[i];
      for (let j = i + 1; j < this.pontos.length; j++) {
        let ponto2 = this.pontos[j];
        if (ponto1 === ponto2) {return}
        const distancia = this.calcularDistancia(ponto1.x, ponto1.y, ponto2.x, ponto2.y);
        const estaoLinkados = (ponto1.links.includes(ponto2) || ponto2.links.includes(ponto1));
        const estaPerto = distancia < this.distanciaLimite;
        if (estaoLinkados && estaPerto) {
          this.desenharLinks(ponto1, ponto2, distancia);
        } else if (estaPerto) {
          this.linkarDesenharLinks(ponto1, ponto2, distancia);
        } else if (estaoLinkados) {
          this.deslinkar(ponto1, ponto2);
        }
      }
    }
  }

  private gerarImagemEstatica() {
    this.definirLinks();
    this.desenharPontos();
  }

  private gerarAnimacao() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.pontos.forEach((ponto) => {
      if (ponto.x >= this.largura || ponto.x <= 0) {ponto.velocidadeX = ponto.velocidadeX * (-1)}
      if (ponto.y >= this.altura || ponto.y <= 0) {ponto.velocidadeY = ponto.velocidadeY * (-1)}
      ponto.x += ponto.velocidadeX;
      ponto.y += ponto.velocidadeY;
    });
    this.definirLinks();
    this.desenharPontos();
    requestAnimationFrame(() => this.gerarAnimacao());
  }
}