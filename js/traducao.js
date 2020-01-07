const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let indiceChave = 0;
let linhas = 0;
let colunas = 0;
let matrizOriginal;
let matrizDescriptografada;
var textoCifrado = "";
var aux = 0;
var criptografar = true;

function criptografa(letra, vetorChaveOrdenada) {
    let chave = document.getElementById("senha").value;
    var colunaBuscada = chave.indexOf(letra);
    for (let i = 0; i < linhas; i++) {
        if (matrizOriginal[i][colunaBuscada] == undefined) {
            matrizOriginal[i][colunaBuscada] = " ";
        } else {
            textoCifrado += matrizOriginal[i][colunaBuscada];
        }
    }
}

function descriptografa(letra, vetorChaveOrdenada) {

    colunaBuscada = vetorChaveOrdenada.indexOf(letra);
    for (let l = 0; l < linhas; l++) {
        matrizDescriptografada[l][aux] = matrizOriginal[l][colunaBuscada];
    }
    aux++;
}

function transposicao() {
    let chave = document.getElementById("senha").value;
    let vetorChaveOrdenada = [];
    let vetorChaveNormal = [];

    for (let i = 0; i < chave.length; i++) {
        vetorChaveNormal[i] = chave[i];
        vetorChaveOrdenada[i] = chave[i];
    }

    vetorChaveOrdenada.sort();

    console.log("chave ordenada: ", vetorChaveOrdenada)

    if (criptografar) {
        vetorChaveOrdenada.forEach(
            (letraChave) => criptografa(letraChave)
        )
    } else {
        vetorChaveNormal.forEach(
            (letraChave) => descriptografa(letraChave, vetorChaveOrdenada)
        )
        for (let i = 0; i < linhas; i++) {
            for (let c = 0; c < colunas; c++) {
                if ((matrizDescriptografada[i][c] != '.') && (matrizDescriptografada[i][c] != undefined))
                    textoCifrado += matrizDescriptografada[i][c];
            }
        }
    }
}

function preencheMatrizInicial(tamanhoTexto, tamanhoChave, textoBuscado) {
    linhas = Math.ceil(tamanhoTexto / tamanhoChave);
    colunas = tamanhoChave;
    let posicaoDoTexto = 0;
    matrizOriginal = criaMatriz(linhas, colunas);
    matrizDescriptografada = criaMatriz(linhas, colunas);
    if (criptografar) {
        for (let i = 0; i < linhas; i++) {
            for (let c = 0; c < colunas; c++) {
                matrizOriginal[i][c] = textoBuscado[posicaoDoTexto];
                //completando a linha da matriz para que as colunas fiquem do tamanho correto
                if (matrizOriginal[i][c] == undefined) {
                    matrizOriginal[i][c] = '.';
                }
                posicaoDoTexto++
            }
        }
        console.table(matrizOriginal)
    } else {
        for (let c = 0; c < colunas; c++) {
            for (let l = 0 ; l <  linhas; l++) {
                //verificar so funciona quando muda o i para o lugar do c
                matrizOriginal[l][c] = textoBuscado[posicaoDoTexto]
                posicaoDoTexto++
            }
        }
        console.table(matrizOriginal)
    }
    transposicao()
    document.getElementById("textoDestino").innerHTML = textoCifrado;
    textoCifrado = "";
    aux = 0;
}

function criaMatriz(linhas, colunas) {
    let matrizVazia = []
    for (let i = 0; i < linhas; i++) {
        for (let c = 0; c < colunas; c++) {
            matrizVazia[i] = []
        }
    }
    return matrizVazia;
}

function calculaChave(letraDotexto) {
    let chave = document.getElementById("senha").value;
    let posicaoResultante;
    if (criptografar) {
        posicaoResultante = abc.indexOf(chave[indiceChave]) + abc.indexOf(letraDotexto); // após a última letra da chave ira somar com -1 
    } else {
        posicaoResultante = abc.indexOf(letraDotexto) - abc.indexOf(chave[indiceChave]);
    }
    if (indiceChave == parseInt(String(chave).length)) {
        indiceChave = 0;
        if (criptografar) {
            posicaoResultante += abc.indexOf(chave[indiceChave]) + 1 // incrementando 1 para suprir a soma anterior com -1              
        } else {
            posicaoResultante -= abc.indexOf(chave[indiceChave]) + 1;
        }
    }
    indiceChave++;
    return posicaoResultante;
}



function verificaRadio(nameGroup) {
    let radios = document.getElementsByName(nameGroup);
    let escolhido;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            escolhido = radios[i].value;
        }
    }
    if (nameGroup == "optradio") {
        if (escolhido == "criptografar") {
            criptografar = true;
        } else {
            criptografar = false;
        }
    }
    return escolhido;
}


function replaceAll(chars, to, originalString) {
    let str = originalString.replace(chars, to);
    while (str != originalString) {
        originalString = str;
        str = originalString.replace(chars, to);
    }

    return str;
}


function limpaString(str) {
    str = str.toLowerCase();

    str = replaceAll("é", "e", str);
    str = replaceAll("ê", "e", str);
    str = replaceAll("ẽ", "e", str);
    str = replaceAll("è", "e", str);
    str = replaceAll("ë", "e", str);

    str = replaceAll("ã", "a", str);
    str = replaceAll("á", "a", str);
    str = replaceAll("à", "a", str);
    str = replaceAll("â", "a", str);
    str = replaceAll("ä", "a", str);

    str = replaceAll("ó", "o", str);
    str = replaceAll("õ", "o", str);
    str = replaceAll("ô", "o", str);
    str = replaceAll("ò", "o", str);
    str = replaceAll("ö", "o", str);

    str = replaceAll("í", "i", str);
    str = replaceAll("ì", "i", str);
    str = replaceAll("î", "i", str);
    str = replaceAll("ĩ", "i", str);
    str = replaceAll("ï", "i", str);

    str = replaceAll("ú", "u", str);
    str = replaceAll("û", "u", str);
    str = replaceAll("ù", "u", str);

    str = replaceAll("ũ", "u", str);
    str = replaceAll("ü", "u", str);

    str = replaceAll("ç", "c", str);

    str = replaceAll("ñ", "n", str);

    return str;
}

var traducao = traducao || (function () {
    let doStaff = function (txt, chavePassada, action) {
        let replace = (function () {
            let l = abc.length;
            return function (c) {
                if (verificaRadio("inlineRadioOptions") == "option2") {
                    chavePassada = calculaChave(c.toLocaleLowerCase());
                }
                let i = abc.indexOf(c.toLowerCase());
                if (i != -1) {
                    let pos = i;
                    if (action) {
                        // Codificar
                        if (verificaRadio("inlineRadioOptions") == "option2") {
                            pos = chavePassada;
                        } else {
                            pos += chavePassada;
                        }
                        pos -= (pos >= l) ? l : 0;
                    } else {
                        // decodificar
                        if (verificaRadio("inlineRadioOptions") == "option2") {
                            pos = chavePassada;
                        } else {
                            pos -= chavePassada;
                        }
                        pos += (pos < 0) ? l : 0;
                    }
                    return abc[pos];
                }
                return c;
            };
        })();
        let re = (/([a-z])/ig);
        return String(txt).replace(re, function (match) {
            //recebendo cada letra
            return replace(match);
        });
    };

    return {
        encode: function (txt, chavePassada) {
            return doStaff(txt, chavePassada, true);
        },
        traducaoe: function (txt, chavePassada) {
            return doStaff(txt, chavePassada, false);
        }
    };
})();

function codificaCesar() {
    let senha = parseInt(document.getElementById("senha").value);
    verificaRadio("optradio");
    if (isNaN(senha)) {
        senha = 0;
    }
    while (senha > 26) {
        senha = senha - 26;
    }
    if (criptografar) {
        document.getElementById("textoDestino").innerHTML = traducao.encode(limpaString(document.getElementById("textoBuscado").value), senha);
    } else {
        document.getElementById("textoDestino").innerHTML = traducao.traducaoe(limpaString(document.getElementById("textoBuscado").value), senha);
    }

}

function codificaVigenere() {
    let senha = document.getElementById("senha").value;
    verificaRadio("optradio");
    if (criptografar) {
        document.getElementById("textoDestino").innerHTML = traducao.encode(limpaString(document.getElementById("textoBuscado").value), senha);
    } else {
        document.getElementById("textoDestino").innerHTML = traducao.traducaoe(limpaString(document.getElementById("textoBuscado").value), senha);
    }
}

function codificaTransposicao() {
    let senha = document.getElementById("senha").value;
    let tamanhoChave = senha.length;
    let textoBuscado = limpaString(document.getElementById("textoBuscado").value);
    if (criptografar) {
        preencheMatrizInicial(textoBuscado.length, tamanhoChave, textoBuscado);
    } else {
        preencheMatrizInicial(textoBuscado.length, tamanhoChave, textoBuscado);
    }
}

function traduz() {
    indiceChave = 0;
    verificaRadio("optradio");
    if (verificaRadio("inlineRadioOptions") == "option1") {
        codificaCesar();
    } else if (verificaRadio("inlineRadioOptions") == "option2") {
        codificaVigenere();
    } else {
        codificaTransposicao();
    }
}
