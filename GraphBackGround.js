"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.GraphBackGround = void 0;
var GraphBackGround = /** @class */ (function () {
    function GraphBackGround(altura, largura, quantidadeDePontos, velocidadeDosPontos, corDosPontos, corDosLinks, animado, tamanhoDosPontos, espessuraDasLinhas) {
        if (tamanhoDosPontos === void 0) { tamanhoDosPontos = 3; }
        if (espessuraDasLinhas === void 0) { espessuraDasLinhas = 1; }
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
        }
        else {
            this.gerarImagemEstatica();
        }
    }
    GraphBackGround.prototype.setCorPontos = function (rgb) {
        this.corDosPontos = rgb;
    };
    GraphBackGround.prototype.setCorLinks = function (rgb) {
        this.corDosLinks = rgb;
    };
    GraphBackGround.prototype.gerarPontos = function () {
        for (var i = 0; i <= this.quantidadeDePontos; i++) {
            var x = Math.floor(Math.random() * this.largura);
            var y = Math.floor(Math.random() * this.altura);
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
    };
    GraphBackGround.prototype.angulo = function (angulo) {
        return (Math.PI / 180) * angulo;
    };
    GraphBackGround.prototype.desenharPontos = function () {
        var _this = this;
        this.pontos.forEach(function (ponto) {
            _this.ctx.fillStyle = "rgba(".concat(_this.corDosPontos[0], ", ").concat(_this.corDosPontos[1], ", ").concat(_this.corDosPontos[2], ")");
            _this.ctx.beginPath();
            _this.ctx.arc(ponto.x, ponto.y, ponto.tamanho, _this.angulo(0), _this.angulo(360));
            _this.ctx.fill();
            _this.ctx.closePath();
        });
    };
    GraphBackGround.prototype.calcularDistancia = function (x1, y1, x2, y2) {
        var deltaX = x2 - x1;
        var deltaY = y2 - y1;
        var distancia = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        return distancia;
    };
    GraphBackGround.prototype.calcularNivelDeTransparencia = function (distancia) {
        return (1 - (distancia / this.distanciaLimite)).toFixed(3);
    };
    GraphBackGround.prototype.linkarDesenharLinks = function (ponto1, ponto2, distancia) {
        this.ctx.beginPath();
        this.ctx.moveTo(ponto1.x, ponto1.y);
        this.ctx.lineTo(ponto2.x, ponto2.y);
        this.ctx.lineWidth = this.espessuraDasLinhas;
        this.ctx.strokeStyle = "rgba(".concat(this.corDosLinks[0], ", ").concat(this.corDosLinks[1], ", ").concat(this.corDosLinks[2], ", ").concat(this.calcularNivelDeTransparencia(distancia), ")");
        this.ctx.stroke();
        this.ctx.closePath();
        ponto1.links.push(ponto2);
        ponto2.links.push(ponto1);
    };
    GraphBackGround.prototype.desenharLinks = function (ponto1, ponto2, distancia) {
        this.ctx.beginPath();
        this.ctx.moveTo(ponto1.x, ponto1.y);
        this.ctx.lineTo(ponto2.x, ponto2.y);
        this.ctx.lineWidth = this.espessuraDasLinhas;
        this.ctx.strokeStyle = "rgba(".concat(this.corDosLinks[0], ", ").concat(this.corDosLinks[1], ", ").concat(this.corDosLinks[2], ", ").concat(this.calcularNivelDeTransparencia(distancia), ")");
        this.ctx.stroke();
        this.ctx.closePath();
    };
    GraphBackGround.prototype.deslinkar = function (ponto1, ponto2) {
        ponto1.links = ponto1.links.filter(function (ponto) { return ponto !== ponto2; });
        ponto2.links = ponto2.links.filter(function (ponto) { return ponto !== ponto1; });
    };
    GraphBackGround.prototype.definirLinks = function () {
        for (var i = 0; i < this.pontos.length; i++) {
            var ponto1 = this.pontos[i];
            for (var j = i + 1; j < this.pontos.length; j++) {
                var ponto2 = this.pontos[j];
                if (ponto1 === ponto2) {
                    return;
                }
                var distancia = this.calcularDistancia(ponto1.x, ponto1.y, ponto2.x, ponto2.y);
                var estaoLinkados = (ponto1.links.includes(ponto2) || ponto2.links.includes(ponto1));
                var estaPerto = distancia < this.distanciaLimite;
                if (estaoLinkados && estaPerto) {
                    this.desenharLinks(ponto1, ponto2, distancia);
                }
                else if (estaPerto) {
                    this.linkarDesenharLinks(ponto1, ponto2, distancia);
                }
                else if (estaoLinkados) {
                    this.deslinkar(ponto1, ponto2);
                }
            }
        }
    };
    GraphBackGround.prototype.gerarImagemEstatica = function () {
        this.definirLinks();
        this.desenharPontos();
    };
    GraphBackGround.prototype.gerarAnimacao = function () {
        var _this = this;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.pontos.forEach(function (ponto) {
            if (ponto.x >= _this.largura || ponto.x <= 0) {
                ponto.velocidadeX = ponto.velocidadeX * (-1);
            }
            if (ponto.y >= _this.altura || ponto.y <= 0) {
                ponto.velocidadeY = ponto.velocidadeY * (-1);
            }
            ponto.x += ponto.velocidadeX;
            ponto.y += ponto.velocidadeY;
        });
        this.definirLinks();
        this.desenharPontos();
        requestAnimationFrame(function () { return _this.gerarAnimacao(); });
    };
    return GraphBackGround;
}());
//exports.GraphBackGround = GraphBackGround;

let altura = window.innerHeight;
let largura = window.innerWidth;
const quantidadeDePontos = 250;
const velocidadeDosPontos = 0.4;
const animado = true;
let bg = new GraphBackGround(altura, largura, quantidadeDePontos, velocidadeDosPontos, [255, 255, 255], [255, 255, 255], animado);