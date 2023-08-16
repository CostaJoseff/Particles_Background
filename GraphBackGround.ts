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

  constructor(quantidadeDePontos: number, velocidadeDosPontos: number, corDosPontos: number[], corDosLinks: number[], animado: boolean, tamanhoDosPontos: number = 4, espessuraDasLinhas: number = 1) {
    this.canvas = document.getElementById("background");
    this.ctx = this.canvas.getContext('2d');
    this.largura = window.innerWidth;
    this.altura = window.innerHeight;
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

  private gerarPontos() {
    for (let i = 0; i < this.quantidadeDePontos; i++) {
      this.pontos.push({
        id: i,
        x: Math.floor(Math.random() * this.largura),
        y: Math.floor(Math.random() * this.altura),
        velocidadeX: Math.floor(Math.random() * this.velocidadeDosPontos),
        velocidadeY: Math.floor(Math.random() * this.velocidadeDosPontos),
        links: []
      });
    }
  }

  private angulo(angulo: number) {
    return (Math.PI/180)*angulo;
  }

  private desenharPontos() {
    this.pontos.forEach((ponto) => {
      this.ctx.fillStyle = `rgba(${this.corDosPontos[0]}, ${this.corDosPontos[1]}, ${this.corDosPontos[2]})`;
      this.ctx.beginPath();
      this.ctx.arc(ponto.x, ponto.y, this.tamanhoDosPontos, this.angulo(0), this.angulo(360));
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

  private linkarDesenhar(ponto1: any, ponto2: any, distancia: number) {
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

  private deslinkar(ponto1: any, ponto2: any) {
    ponto1.links.splice(ponto1.links.indexOf(ponto2), 1);
    ponto2.links.splice(ponto2.links.indexOf(ponto1), 1);
  }

  private definirLinks() {
    this.pontos.forEach((ponto1) => {
      this.pontos.forEach((ponto2) => {
        const distancia = this.calcularDistancia(ponto1.x, ponto1.y, ponto2.x, ponto2.y);
        if ((ponto1 !== ponto2 && (!ponto1.links.includes(ponto2) || !ponto2.links.includes(ponto1))) && distancia < this.distanciaLimite) {
          this.linkarDesenhar(ponto1, ponto2, distancia);
        } else if (distancia >= this.distanciaLimite) {
          this.deslinkar(ponto1, ponto2);
        }
      });
    });
  }

  private gerarImagemEstatica() {
    this.desenharPontos();
    this.definirLinks();
  }

  private gerarAnimacao() {
    this.pontos.forEach((ponto) => {
      if (ponto.x >= this.largura || ponto.x <= 0) {ponto.velocidadeX = ponto.velocidadeX * (-1)}
      if (ponto.y >= this.altura || ponto.y <= 0) {ponto.velocidadeY = ponto.velocidadeY * (-1)}
      ponto.x += ponto.velocidadeX;
      ponto.y += ponto.velocidadeY;
    });
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.desenharPontos();
    this.definirLinks();
    requestAnimationFrame(() => this.gerarAnimacao());
  }
}