// Funções Prontas //
function entrada(){
    var arr_ent = [];
    var numString = document.getElementById("numString").value;
    //determina se o valor digitado é número ou caractere, a partir disso, monta o array
    var teste = (numString.split(';').map(parseFloat));
    if (isNaN(teste[0]) == true){
        arr_ent = numString.split(';');    
    }
    else{
        arr_ent = numString.split(';').map(parseFloat);
    }
    document.getElementById("valores").innerHTML = arr_ent;
    console.log(arr_ent);
    return arr_ent;
}

function call(){
//TESTES - CONSOLE.LOG//

//console.log(quali_nominal_ordinal(PROP[0],TIPO[0],entrada()));
//console.log(quali_nominal_ordinal(PROP[0],TIPO[1],entrada()));
console.log(quanti_continua(PROP[0],entrada()));
//console.log(quanti_discreta('POPULACAO',entrada()));

//--//

//TESTES - TABULAÇÃO //

//table_builder(quanti_discreta('POPULACAO',entrada()));
//table_builder(quali_nominal_ordinal(PROP[0],TIPO[0],entrada()));
//table_builder(quali_nominal_ordinal(PROP[0],TIPO[1],entrada()));
table_builder_continua(quanti_continua(PROP[0],entrada()));
//--//

}

// constantes para alimentar as funções, conforme o que o usuário escolher//
const PROP = ['POPULACAO','AMOSTRA'], TIPO = ['NOMINAL','ORDINAL'];


// Arrays de teste //
// variável qualitativa ordinal //
var arr = ['EF','EF','PG','EF','EF','ES','PG','EM','PG','EM','EM',
            'ES','ES','EM','EM','ES','EF','EM','PG','ES','ES',
            'EM','EF','EM','EM','PG','ES','PG','ES','ES'];

var arr2 = ['rosa','amarela','rosa','azul','rosa','branca','preta',
            'preta','rosa','branca','rosa','preta','branca','preta',
            'rosa','amarela','rosa','branca','branca','azul','rosa','amarela',
            'branca','branca','branca','branca','azul','branca','branca','azul'];

var arr3 = [230,232,244,245,248,280,281,284,289,292,308,309,309,310,311,333,335,335,337,337];

var arr4 = [2,3,1,1,2,1,2,1,2,5,5,1,2,3,1,2,2,3,1,2];

var arr5 = [40,41,42,45,54,55,59,60,61,62,64,65,65,66,67,68,69,70,71,71,80,81,83,84,85,86,87,87,88,89,90,91,93,97,98,98,99,100,101,105];


var arr6 = [2,2,2,4,4,4,4,4,5,5,5,5,5,5,5,5,7,7,7,7,7,7,10,10];

var arr7 = [20,23,23,27,27,27,28,29,30,32,34,34,34,35,37,37,37,38,38,38,41,42,43,43,45,45,45,46,47,47,50,51,53,55,55,56,56,56,60,60,63,65];

var arr8 = [34,43,20,37,37,55,27,37,23,46,43,56,60,32,27,60,53,51,45,45,45,28,41,38,38,38,56,65,63,23,56,34,27,34,30,29,47,45,47,42,50,35];

// var arr8 = [58,61,61,65,65,66,66,67,67,68,71,71,71,72,73,80,90,100,55,50,47,78,98,65,69,82,72,68,61,76];

// FUNÇÕES PRINCIPAIS DE ESTATISTICA //

/* Função genérica - Variável Qualitativa Nominal e Ordinal */
function quali_nominal_ordinal(prop,tipo,arr){
    //variaveis auxiliares//
    var quali_names = [], quali_fi = [], quali_fr = [], quali_fac= [],
    quali_fac_percent = [],cont=0, sum=0, sum2=0, tot = arr.length, quali_struct_tb = [];


    //ordena o array caso a variavel seja do tipo NOMINAL (ordem alfabetica)//
    if(tipo==='NOMINAL'){
    //ordena o array em ordem alfabética (por peso UNICODE)//
        arr.sort();
    }

    //recupera os indices que se repetem//
    quali_names = arr.filter(function(valor,indice,arr){
        return arr.indexOf(valor)===indice;
    })

    //calcula a quantidade de cada indice//
    for(var i=0; i<quali_names.length; i++){
        for(var j=0; j<tot; j++){
            if(quali_names[i]==arr[j]){
                cont++;
            }
        }
        quali_fi.push(cont);
        cont = 0;
    }

    //calcula os valores restantes//
    for(x in quali_fi){

        //FR % - Frequencia Proporcional Relativa
        quali_fr.push(Number(((quali_fi[x]*100)/tot).toFixed()));

        //FAC - Frequencia Acumulativa
        sum += quali_fi[x];
        quali_fac.push(sum);

        //FAC % - Frequencia Acumulativa Proporcional
        sum2 += Number(((quali_fi[x]*100)/tot).toFixed());
        quali_fac_percent.push(sum2);
    }

    /* LEGENDA - array de retorno :
        0 - Elementos (Nomes das Variaveis Pesquisadas) 
        1 - FI 
        2 - FR %
        3 - FAC
        4 - FAC %
        5 - Tamanho do Array
        6 - Array inteiro ordenado
        7 - Moda (função genérica)
        8 - Mediana (função genérica)
    */

    //montando o array de retorno//
    quali_struct_tb[0] = quali_names;
    quali_struct_tb[1] = quali_fi;
    quali_struct_tb[2] = quali_fr;
    quali_struct_tb[3] = quali_fac;
    quali_struct_tb[4] = quali_fac_percent;
    quali_struct_tb[5] = [tot];
    quali_struct_tb[6] = arr;
    quali_struct_tb[7] = moda(quali_struct_tb);
    quali_struct_tb[8] = mediana(quali_struct_tb);

    //retorna o array com os valores prontos//
    return quali_struct_tb;
}

/* Função específica - Variável Quantitativa Discreta */
function quanti_discreta(prop,arr){

    //variaveis auxiliares//
    var aux = [], quanti_names = [], quanti_fi = [], quanti_fr = [], quanti_fac= [], aux=0, 
    cont=0, sum=0, sum2=0, tot = arr.length, quanti_struct_tb = [],  quanti_fac_percent = [], soma = 0, mult = 0, media = 0;

    //ordena o array com base no peso unicode em ordem crescente (menor pro maior)//
    arr.sort(function(a,b){
        return a-b;
    });

    //faz uma copia do array original para guardar os valores originais//
    aux = [...arr];

    //identifica os indices que se repetem//   
    quanti_names = aux.filter(function(valor,indice,arr){
        return arr.indexOf(valor)===indice;
    })

    //calcula a quantidade de repeticoes dos indices//
    for(var i=0; i<quanti_names.length; i++){
        for(var j=0; j<tot; j++){
            if(quanti_names[i]==aux[j]){
                cont++;
            }
        }  
        quanti_fi.push(cont);
        cont = 0;
    }

    //calcula o restante dos valores//
    for(var x in quanti_fi){

        // FR % //
        quanti_fr.push(Number(((quanti_fi[x]*100)/tot).toFixed()));
        
        // Fac //
        sum += quanti_fi[x];
        quanti_fac.push(sum);

        // Fac % //
        sum2 += quanti_fr[x];
        quanti_fac_percent.push(sum2);
    }
    
    //calcula a media//
    for (i = 0; i < quanti_names.length; i++){
        mult = quanti_names[i]*quanti_fi[i];
        soma += mult;
    }
    media = soma/tot;

    //DESVIO PADRÃO
    //Para população
    if (prop[0]){
        var v_x = 0, soma = 0, coef_varia = 0, parcial = 0, percent = 0;
        for (i=0;i<quanti_names.length;i++){
            parcial = (Math.pow((quanti_names[i]-media),2)*quanti_fi[i])
            soma += parcial;
        }
        v_x = Math.sqrt(soma/tot);
        coef_varia =  v_x/media;
        percent = coef_varia * 100;
        console.log("O desvio padrão é de " + percent);
    }
    //para amostra
    else{
        var v_x = 0, soma = 0, coef_varia = 0, parcial = 0, percent = 0;
        for (i=0;i<quanti_names.length;i++){
            parcial = (Math.pow((quanti_names[i]-media),2)*quanti_fi[i])
            soma += parcial;
        }
        v_x = Math.sqrt(soma/(tot-1));
        coef_varia =  v_x/media;
        percent = coef_varia * 100;
        console.log("O desvio padrão é de " + percent);
    }

    /* LEGENDA - array de retorno :
        0 - Elementos (quantidades calculadas) 
        1 - FI 
        2 - FR %
        3 - FAC
        4 - FAC %
        5 - Tamanho do array original
        6 - Array inteiro ordenado
        7 - Moda (função genérica)
        8 - Mediana (função genérica)
        9 - Media calculada (funções específicas)
    */

    //Monta o Array de Retorno//
    quanti_struct_tb[0] = quanti_names;
    quanti_struct_tb[1] = quanti_fi;
    quanti_struct_tb[2] = quanti_fr;
    quanti_struct_tb[3] = quanti_fac;
    quanti_struct_tb[4] = quanti_fac_percent;
    quanti_struct_tb[5] = [tot]
    quanti_struct_tb[6] = arr;
    quanti_struct_tb[7] = moda(quanti_struct_tb);
    quanti_struct_tb[8] = mediana(quanti_struct_tb);
    quanti_struct_tb[9] = media;

    //retorno do array com os dados prontos//
    return quanti_struct_tb;
}

/* Função específica - Variável Quantitativa Continua */
function quanti_continua(prop,arr){

    //variaveis auxiliares//
    var aux = [], quanti_names = [], quanti_fi = [], quanti_fr = [], quanti_fac= [], 
    quanti_fac_percent = [], pontos_medios = [], cont=0, sum=0, sum2=0, sum3=0, 
    tot = arr.length, quanti_struct_tb = [], at=0, max=0, min=0, k=0, ic=0, aux=0, soma = 0, mult = 0, media = 0;

    //ordena o array com base no peso unicode e ordem crescente (menor pro maior)//
    arr.sort(function(a,b){
        return a-b;
    });

    //faz uma copia do array original ja ordernado, para guardar o array original//
    aux = [...arr];


    //calculo de amplitude//
    max = Math.max(...arr);
    min = Math.min(...arr);
    at = (max-min)+1;
   
    //calcula a quantidade de linhas que a tabela tera//
    k = Math.sqrt(tot).toFixed();

    //diminui 1 no k
    k--;
    cc = 1;

    while(at % k != 0){
        at++;


        if(cc===1) //aumenta 1 no k
        {
            k++;
            cc++;  
        }
        else if(cc===2) //aumenta 1 no k (totalizando 1 anterior +1 + 1 posterior)
        {
            k++;
            cc++;
        }
    }
   
    //calcula o valor dos intervalos//
    ic = at/k;
    sum = aux[0];
    
    //monta o vetor de intervalos//
    for(var i=0; i<k; i++){

        quanti_names.push(sum);
        
        if(sum <= aux[arr.length-1]+1){
            sum += ic;
        }
        
    }

    //adiciona o numero final no array + ic (o ultimo numero sempre tem +1)//
    quanti_names.push(aux[tot-1]+1);

    //calcula os valores restantes//
    for(var i=0; i<k; i++){
        for(var j=0; j<tot; j++){

            //contador FI//
            if(aux[j]>=quanti_names[i] && aux[j]<quanti_names[i+1]){
                cont++;
            }
        }

        //registra o FI//
        quanti_fi[i] = cont;
        cont = 0;

        //registra o FR - frequencia relativa proporcional//
        quanti_fr.push(Number(((quanti_fi[i]*100)/tot).toFixed()));
        
        //registra a FAC - frequencia acumulativa//
        sum2 += quanti_fi[i];
        quanti_fac[i] = sum2;

        //registra a FAC % - frequencia acumulativa proporcinal//
        sum3 += quanti_fr[i];
        quanti_fac_percent.push(Number(sum3));
    }

    //calcula a media entre cada intervalo e registra um vetor de pontos medios//
    for(var i=0; i<=k-1; i++){  
        pontos_medios[i] = Number(((quanti_names[i]+quanti_names[i+1] ) / 2).toFixed(2));  
    }
    //calcula a media//
    for (i = 0; i < quanti_fi.length; i++){
        mult = pontos_medios[i]*quanti_fi[i];
        soma += mult;
    }
    media = soma/tot;

    //DESVIO PADRÃO
    //Para população
    if (prop[0]){
        var v_x = 0, soma = 0, coef_varia = 0, parcial = 0, percent = 0;
        for (i=0;i<pontos_medios.length;i++){
            parcial = (Math.pow((pontos_medios[i]-media),2)*quanti_fi[i])
            soma += parcial;
        }
        v_x = Math.sqrt(soma/tot);
        coef_varia =  v_x/media;
        percent = coef_varia * 100;
        console.log("O desvio padrão é de " + percent);
    }
    //para amostra
    else{
        var v_x = 0, soma = 0, coef_varia = 0, parcial = 0, percent = 0;
        for (i=0;i<pontos_medios.length;i++){
            parcial = (Math.pow((pontos_medios[i]-media),2)*quanti_fi[i])
            soma += parcial;
        }
        v_x = Math.sqrt(soma/(tot-1));
        coef_varia =  v_x/media;
        percent = coef_varia * 100;
        console.log("O desvio padrão é de " + percent);
    }
    


    /* LEGENDA - array de retorno:
    0 - Elementos (intervalos registrados) 
    1 - FI 
    2 - FR %
    3 - FAC
    4 - FAC %
    5 - Tamanho do array original
    6 - Array original ordenado 
    7 - Vetor de pontos medios (intervalos)
    8 - Vetor de intervalos
    9 - Media específica calculada
    10 - Mediana específica - função externa
    11 - Moda específica - função externa
    */

    //Monta o Array de Retorno//
    quanti_struct_tb[0] = quanti_names;
    quanti_struct_tb[1] = quanti_fi;
    quanti_struct_tb[2] = quanti_fr;
    quanti_struct_tb[3] = quanti_fac;
    quanti_struct_tb[4] = quanti_fac_percent;
    quanti_struct_tb[5] = [tot];
    quanti_struct_tb[6] = arr;
    quanti_struct_tb[7] = pontos_medios;
    quanti_struct_tb[8] = ic;
    quanti_struct_tb[9] = media;
    quanti_struct_tb[10] = mediana_cont(quanti_struct_tb);
    quanti_struct_tb[11] = moda_cont(quanti_struct_tb);

    //retorna o array com os valores prontos//
    return quanti_struct_tb;
}

//##################################//



//funcoes de tabulação//

//funcao gatilho - menu dropdown//
function trigger(id){

    var obj =  document.getElementById('varPes');

    switch(id){
        case 'quali_nomi':
            obj.innerHTML = 'Qualitativa Nominal';
        break;
        case 'quali_ordi':
            obj.innerHTML = 'Qualitativa Ordinal';
        break;
        case 'quati_disc':
            obj.innerHTML = 'Quantitativa Discreta';
        break;
        case 'quati_cont':
            obj.innerHTML = 'Quantitativa Contínua';
        break;        
    }

    if(document.getElementById('trigger').style.display != 'block'){
        document.getElementById('trigger').style.display = 'block'; 
    }
}

//funcao de tabulacao generica - variavel nominal, ordinal e quantitativa discreta//
function table_builder(arr){
    var tabela = '';    

    for(var i=0; i<arr[1].length; i++){
        tabela += '<tr>';
        tabela += '<td>'+arr[0][i]+'</td><td>'+arr[1][i]+'</td><td>'+arr[2][i]+'</td><td>'+arr[3][i]+'</td><td>'+arr[4][i]+'</td>';
        tabela += '</tr>';
        
    }

    document.getElementById('tabul').innerHTML += tabela; 
}

//funcao de tabulacao específica - variavel continua//
function table_builder_continua(arr){

    var tabela = '';

    for(var i=0; i<arr[1].length; i++){
        tabela += '<tr>';
        tabela += '<td>'+arr[0][i]+' |--------- '+arr[0][i+1]+'</td><td>'+arr[1][i]+'</td><td>'+arr[2][i]+'</td><td>'+arr[3][i]+'</td><td>'+arr[4][i]+'</td>';
        tabela += '</tr>';    
    }
    document.getElementById('tabul').innerHTML += tabela; 
}
//--//

//FUNÇÕES COMPLEMENTARES - MODA, MEDIANA, DESVIO PADRÃO E SEPARATRIZ//

/* Função de moda genérica */
function moda(matriz){
/*  Cálculo da mediana para as funções qualitativas e quantitativa discreta
    0 - Nome da variavel
    1 - Frequencia Simples (FI)
*/

    var freq = matriz[1][0];
    var moda = [];
    for (var i=0;i<matriz[1].length;i++){
        if (matriz[1][i]>freq){
            freq = matriz[1][i];
        };
    };
    for (var i = 0; i<matriz[1].length; i++){
        if(freq==matriz[1][i]){
            moda.push(matriz[0][i]);
        }
    }
    console.log("A moda é " + moda + " com " + freq + " de frequência");
    return moda;
}

function moda_cont(matriz){
/*  Cálculo da moda para a função quantitativa contínua
    7 - Pontos Médios
    1 - Frequencia Simples (FI)
*/
    var freq = matriz[1][0];
    var moda = [];
    for (var i=0;i<matriz[1].length;i++){
        if (matriz[1][i]>freq){
            freq = matriz[1][i];
        };
    };
    for (var i = 0; i<matriz[1].length; i++){
        if(freq==matriz[1][i]){
            moda.push(matriz[7][i]);
        }
    }
    console.log("A moda é " + moda + " com " + freq + " de frequência");
    return moda;

}

/* Função de mediana genérica */
function mediana(matriz){
    /* Cálculo da mediana para as funções qualitativas e quantitativa discreta
        5 - Tamanhao do Array
        6 - Array completo ordenado 
    */
    
    var med = [];
    
    if (matriz[5]%2==0){
        var pos1 = matriz[5]/2;
        var pos2 = pos1 + 1;
        med.push(matriz[6][pos1],matriz[6][pos2]);
        console.log("A mediana é " + med + " nas posições "+ pos1 + " e " + pos2);
    }
    else {
        var pos1 = Math.ceil(matriz[5]/2);
        med.push(matriz[6][pos1]);
        console.log("A mediana é " + med + " na posição " + pos1);
    };
    return med;
};

function mediana_cont(matriz){
/* Função de mediana específica - variável qualitativa continua */
/*Array contendo os elementos calculados acima, legenda abaixo:
    0 - Elementos (Invervalos no caso da continua) 
    1 - FI 
    2 - FR %
    3 - FAC
    4 - FAC %
    5 - Tamanho do Array
    6 - Array inteiro ordenado 
    7 - Pontos médios de cada intervalo soma de um + outro / por 2
    8 - Valor do intervalo da continua
*/  
    //variaveis auxiliares
    var posicao=0, linha = 0, I = 0, fac_ant = 0, fi_da_med = 0, md = 0;

    //guarda a posicao a ser encontrada//
    posicao = Math.ceil(matriz[6].length/2);
    
    //verifica a quantidades de linha ate a posicao encontrada//
    for(var i=0; i<matriz[3].length; i++){
        if(matriz[3][i] <= posicao){
            linha++;
        }    
    }

    //pega o primeiro valor da linha correspondente//
    I = matriz[0][linha-1];
    
    //pega o fac anterior ao da linha correspondente a posicao procurada//
    fac_ant = matriz[3][linha-2];

    //pega o FI da linha correspondente//
    fi_da_med = matriz[1][linha-1];

    //captura o valor da mediana//
    md = Number((I + ((posicao - fac_ant)/fi_da_med) * matriz[8]).toFixed(2));
    
    //retorna//
    return md;
};


function medida_separatriz(arr,medida,posicao){
    /*
        Q - Quartil - 25% 50% 75% 100% (4)
        K - Quintil - 20% 40% 60% 80% 100% (5)
        D - Deal - 10% 20% 30% 40% 50% 60% 70% 80% 90% 100% (10)
        P - Percentil - 1 % 2% .. 100% (100);       
    */

    //variaveis auxiliares//
    var medida = Number(medida), posicao = Number(posicao), elemento = [], cont = 0;
    
    //identifica a separatriz e guarda o contador adequado//
    switch(medida){
        case 4:
            cont = Math.floor((arr[6].length*25*posicao)/100);
        break;
        case 5:
            cont = Math.floor((arr[6].length*20*posicao)/100);
        break;
        case 10:
            cont = Math.floor((arr[6].length*10*posicao)/100);
        break;
        case 100:
            cont = Math.floor((arr[6].length*posicao)/100);
        break;
    }
    return arr[6][cont];
}


function medida_separatriz_cont(arr,medida,posicao){    
      /*
        Q - Quartil - 25% 50% 75% 100% (4)
        K - Quintil - 20% 40% 60% 80% 100% (5)
        D - Deal - 10% 20% 30% 40% 50% 60% 70% 80% 90% 100% (10)
        P - Percentil - 1 % 2% .. 100% (100);       
    */

    //variaveis auxiliares//
    var medida = Number(medida), posicao = Number(posicao), linha = 0, cont = 0,
    pos = 0, fac_anterior = 0, fi_linha = 0, H = 0, ms = 0, I = 0;
    
    //identifica a separatriz e guarda o contador adequado//
    switch(medida){
        case 4:
            cont = Number(((arr[6].length*25*posicao)/100).toFixed(2));
        break;
        case 5:
            cont = Number(((arr[6].length*20*posicao)/100).toFixed(2));
        break;
        case 10:
            cont = Number(((arr[6].length*10*posicao)/100).toFixed(2));
        break;
        case 100:
            cont = Number(((arr[6].length*posicao)/100).toFixed(2));
        break;
    }

    //verifica a quantidades de linha ate a posicao encontrada//
    for(var i=0; i<arr[3].length; i++){
        if(arr[3][i] <= cont){
            linha++;
        }    
    }
    
    //Indice inferior//
    I = arr[0][linha]
    
    //Posição//
    pos = cont;

    //Fac-Anterior//
    fac_anterior = arr[3][linha-1];

    //FI - da linha//
    fi_linha = arr[1][linha];
    
    //H - da formula (intervalo)//
    H = Number(arr[8].toFixed(2));
    console.log(arr)
    //medida separatriz recebe//
    ms = I + ( (pos - fac_anterior) /fi_linha ) * H;

    return Number(ms.toFixed(2));
}
//Teste de mediana//
//console.log(mediana_cont(quanti_continua(PROP[0],arr5)));

// Teste de separatriz//
// console.log(medida_separatriz(quanti_discreta('AMOSTRA',arr6),4,1)); //Quartil 1//
// console.log(medida_separatriz(quanti_discreta('AMOSTRA',arr6),4,3)); //Quartil 3//
// console.log(medida_separatriz(quanti_discreta('AMOSTRA',arr6),10,4)); //Deal 4//
// console.log(medida_separatriz(quanti_discreta('AMOSTRA',arr6),5,4)); //Kintil 4//
// console.log(medida_separatriz(quanti_discreta('AMOSTRA',arr6),100,60)); //Percentil 60//

// console.log(medida_separatriz(quali_nominal_ordinal('AMOSTRA','NOMINAL',arr2),4,1)); //Quartil 1//
// console.log(medida_separatriz(quali_nominal_ordinal('AMOSTRA','ORDINAL',arr2),4,3)); //Quartil 3//
// console.log(medida_separatriz(quali_nominal_ordinal('AMOSTRA','NOMINAL',arr2),10,4)); //Deal 4//
// console.log(medida_separatriz(quali_nominal_ordinal('AMOSTRA','ORDINAL',arr2),5,4)); //Kintil 4//
// console.log(medida_separatriz(quali_nominal_ordinal('AMOSTRA','ORDINAL',arr2),100,60)); //Percentil 60//
// console.log(medida_separatriz_cont(quanti_continua('AMOSTRA',arr8),100,27))
// console.log(medida_separatriz_cont(quanti_continua('AMOSTRA',arr8),5,3))


//--//




//Segunda tela - Estatistica por probabilidade //

//Distribuição Uniforme//

/*
    Quando um parametro é passado dessa forma (nome= alguma coisa), se ele nao for chamado na chamada da função, ele simplesmente assume o valor
    passado na hora da declaração(nesse caso nulo), porque vamos utilizar essa variavel qtd2, somente na opção ENTRE_ que é quando qtd1 e qtd2 passam
    a ser um intervalo entre os valores max e min (ta bom nene s2 ?).
*/
function distribuicao_uniforme(max,min,tipo,qtd1=null, qtd2=null){
    var result = [], media = 0, cv = 0, dp = 0, intervalo = 0;

    switch(tipo){
        case 'MENOR_QUE':
            //media//
            media = Number(parseFloat((max + min)/2).toFixed(2));
            //Intervalo F(X)//
            intervalo = Number(parseFloat(((1 / (max-min))*(qtd1-min))*100).toFixed(2));
            
            result[0] = media;
            result[1] = intervalo;
            return result;
        break;
        case 'MAIOR_QUE':
            //media//
            media = Number(parseFloat((max + min)/2).toFixed(2));
            //Intervalo F(x)//
            intervalo = Number(parseFloat(((1 / (max-min))*(max-qtd1))*100).toFixed(2));  

            result[0] = media;
            result[1] = intervalo;
            return result;   
        break;
        case 'ENTRE_':
            //Intervalo F(x) qtd1 e qtd2 agora são o intervalo dentro dos valores max e min//
            intervalo = Number(parseFloat(((1 / (max-min))*(qtd2-qtd1))*100).toFixed(2));

            result[0] = intervalo;
            return result;
        break;
        case 'EQUILIBRIO':
            //Media//
            media = Number(parseFloat((max+min)/2).toFixed(2));
      
            //Intervalo F(X)//
            intervalo = Number(parseFloat(((1 / (max-min))*(max-qtd1))*100).toFixed(2)); 

            //Desvio Padrão//
            dp = Number(Math.sqrt(Math.pow(max-min,2)/12).toFixed(2));

            //Coeficiente de variação//
            cv = Number(parseFloat(((dp/media)*100)).toFixed(2));

            result[0] = media;
            result[1] = intervalo;
            result[2] = dp;
            result[3] = cv;
            return result;
        break;
    }
}






//Função Fatorial para utilização dentro da análise combinatória da Distribuição Binomial//
function factorial(n){
    if(n == 0 | n ==1 ){
        return 1;
    }
    var resultado = n;
    while(n > 2){
        resultado *= --n;
    }
    return resultado;
}



function distribuicao_binomial(n,p,q,k){
    
    var analise_combinatoria = 0, probabilidade = 0, media = 0, dp = 0, result = []; 
   
    analise_combinatoria = factorial(n) / (factorial(k) * factorial(n-k));
    
    probabilidade = analise_combinatoria * Math.pow(p,k) * Math.pow(q,(n-k));

    media = Number(n*p).toFixed(2);

    dp = Math.sqrt(n*p*q);

    //Resultados//
    result[0] = Number((probabilidade * 100).toFixed(2));
    result[1] = Number(media);
    result[2] = dp;

    return result;
}



//Teste os exemplos do caderno amor, já está funcionando//
// console.log(distribuicao_binomial(10,0.3,0.7,2))




function distribuicao_normal(media,dp,tipo,qtd1=null,qtd2=null){
    var tbz = {

        //Coluna 0,0 - 0,9 //
        '0,0': ['0.0000','0.0040','0.0080','0.0120','0.0160','0.0199','0.0239','0.0279','0.0319','0.0359'],
        '0,1': ['0.0398','0.0438','0.0478','0.0517','0.0557','0.0596','0.0636','0.0675','0.0714','0.0753'],
        '0,2': ['0.0793','0.0832','0.0871','0.0910','0.0948','0.0987','0.1026','0.1064','0.1103','0.1141'],
        '0,3': ['0.1179','0.1217','0.1255','0.1293','0.1331','0.1368','0.1406','0.1443','0.1480','0.1517'],
        '0,4': ['0.1554','0.1591','0.1628','0.1664','0.1700','0.1736','0.1772','0.1808','0.1844','0.1879'],
        '0,5': ['0.1915','0.1950','0.1985','0.2019','0.2054','0.2088','0.2123','0.2157','0.2190','0.2224'],
        '0,6': ['0.2257','0.2291','0.2324','0.2357','0.2389','0.2422','0.2454','0.2486','0.2517','0.2549'],
        '0,7': ['0.2580','0.2611','0.2642','0.2673','0.2703','0.2734','0.2764','0.2794','0.2823','0.2852'],
        '0,8': ['0.2881','0.2910','0.2939','0.2967','0.2995','0.3023','0.3051','0.3078','0.3106','0.3133'],
        '0,9': ['0.3159','0.3186','0.3212','0.3238','0.3264','0.3289','0.3315','0.3340','0.3365','0.3389'],
    
        //Coluna 1,0 - 1,9 //
        '1,0': ['0.3413','0.3438','0.3461','0.3485','0.3508','0.3531','0.3554','0.3577','0.3599','0.3621'],
        '1,1': ['0.3643','0.3665','0.3686','0.3708','0.3729','0.3749','0.3770','0.3790','0.3810','0.3830'],
        '1,2': ['0.3849','0.3869','0.3888','0.3907','0.3925','0.3944','0.3962','0.3980','0.3997','0.4015'],
        '1,3': ['0.4032','0.4049','0.4066','0.4082','0.4099','0.4115','0.4131','0.4147','0.4162','0.4177'],
        '1,4': ['0.4192','0.4207','0.4222','0.4236','0.4251','0.4265','0.4279','0.4292','0.4306','0.4319'],
        '1,5': ['0.4332','0.4345','0.4357','0.4370','0.4382','0.4394','0.4406','0.4418','0.4429','0.4441'],
        '1,6': ['0.4452','0.4463','0.4474','0.4484','0.4495','0.4505','0.4515','0.4525','0.4535','0.4545'],
        '1,7': ['0.4554','0.4564','0.4573','0.4582','0.4591','0.4599','0.4608','0.4616','0.4625','0.4633'],
        '1,8': ['0.4641','0.4649','0.4656','0.4664','0.4671','0.4678','0.4686','0.4693','0.4699','0.4706'],
        '1,9': ['0.4713','0.4719','0.4726','0.4732','0.4738','0.4744','0.4750','0.4756','0.4761','0.4767'],
    
        //Coluna 2,0 - 2,9 //
        '2,0': ['0.4772','0.4778','0.4783','0.4788','0.4793','0.4798','0.4803','0.4808','0.4812','0.4817'],
        '2,1': ['0.4821','0.4826','0.4830','0.4834','0.4838','0.4842','0.4846','0.4850','0.4854','0.4857'],
        '2,2': ['0.4861','0.4864','0.4868','0.4871','0.4875','0.4878','0.4881','0.4884','0.4887','0.4890'],
        '2,3': ['0.4893','0.4896','0.4898','0.4901','0.4904','0.4906','0.4909','0.4911','0.4913','0.4916'],
        '2,4': ['0.4918','0.4920','0.4922','0.4925','0.4927','0.4929','0.4931','0.4932','0.4934','0.4936'],
        '2,5': ['0.4938','0.4940','0.4941','0.4943','0.4945','0.4946','0.4948','0.4949','0.4951','0.4952'],
        '2,6': ['0.4953','0.4955','0.4956','0.4957','0.4959','0.4960','0.4961','0.4962','0.4963','0.4964'],
        '2,7': ['0.4965','0.4966','0.4967','0.4968','0.4969','0.4970','0.4971','0.4972','0.4973','0.4974'],
        '2,8': ['0.4974','0.4975','0.4967','0.4977','0.4977','0.4978','0.4979','0.4979','0.4980','0.4981'],
        '2,9': ['0.4981','0.4982','0.4982','0.4983','0.4984','0.4984','0.4985','0.4985','0.4986','0.4986'],
        
        //Coluna 3,0 - 3,9 //
        '3,0': ['0.4987','0.4987','0.4987','0.4988','0.4988','0.4989','0.4989','0.4989','0.4990','0.4990'],
        '3,1': ['0.4990','0.4991','0.4991','0.4991','0.4992','0.4992','0.4992','0.4992','0.4993','0.4993'],
        '3,2': ['0.4993','0.4993','0.4994','0.4994','0.4994','0.4994','0.4994','0.4995','0.4995','0.4995'],
        '3,3': ['0.4995','0.4995','0.4995','0.4996','0.4996','0.4996','0.4996','0.4996','0.4996','0.4997'],
        '3,4': ['0.4997','0.4997','0.4997','0.4997','0.4997','0.4997','0.4997','0.4997','0.4997','0.4998'],
        '3,5': ['0.4998','0.4998','0.4998','0.4998','0.4998','0.4998','0.4998','0.4998','0.4998','0.4998'],
        '3,6': ['0.4998','0.4998','0.4999','0.4999','0.4999','0.4999','0.4999','0.4999','0.4999','0.4999'],
        '3,7': ['0.4999','0.4999','0.4999','0.4999','0.4999','0.4999','0.4999','0.4999','0.4999','0.4999'],
        '3,8': ['0.4999','0.4999','0.4999','0.4999','0.4999','0.4999','0.4999','0.4999','0.4999','0.4999'],
        '3,9': ['0.5000','0.5000','0.5000','0.5000','0.5000','0.5000','0.5000','0.5000','0.5000','0.5000'] 
    }

    

    switch(tipo){
        case 'MAIOR_QUE':
            //Calcula o Z//
            var z = parseFloat((qtd1 - media)/dp).toFixed(2);

            //Caso z seja maior do que 3,9//
            if(z > 3.9 || z < -3.9){
                return "Error: Intervalo maior do que 3,9";
            }
            
            //Verifica se o resultado é negativo//
            if(Math.sign(z) == -1 || Math.sign(z) == '-0' || Math.sign(z) == -0){
                z = Math.abs(z).toString();
            }

            //Retira do Z o indice do objeto tbz//
            var indice = z.slice(0,3).replace('.',',');

            //Retira a posição do array que está no indice//
            var pos = (z.charAt(3) == '' || z.charAt(3) == '0')? 0 : Number(z.slice(-1));
            
            //Calcula a probabilidade//
            var prob = ((0.5 - parseFloat(tbz[indice][pos])) * 100 ).toFixed(2);

            //Retorna a probabilidade//
            return prob;
        break;
        case 'MENOR_QUE':
            //Calcula o Z//
            var z = parseFloat((qtd1 - media)/dp).toFixed(2);

            //Caso z seja maior do que 3,9//
            if(z > 3.9 || z < -3.9){
                return "Error: Intervalo maior do que 3,9";
            }
            
            //Verifica se o resultado é negativo//
            if(Math.sign(z) == -1 || Math.sign(z) == '-0' || Math.sign(z) == -0){
                z = Math.abs(z).toString();
            }

            //Retira do Z o indice do objeto tbz//
            var indice = z.slice(0,3).replace('.',',');

            //Retira a posição do array que está no indice//
            var pos = (z.charAt(3) == '' || z.charAt(3) == '0')? 0 : Number(z.slice(-1));

            //Calcula a probabilidade//
            var prob = ((0.5 + parseFloat(tbz[indice][pos])) * 100 ).toFixed(2)

            //Retorna a probabilidade//
            return prob;
        break;
        case 'ENTRE_':
            //Entre_ é quando a média está entre os valores informados//
            //Calcula os Z//
            var z = parseFloat((qtd1 - media)/dp).toFixed(2);
            var z1 = parseFloat((qtd2 - media)/dp).toFixed(2);
            
            //Verifica se o intervalo existe na tabela//
            if(z > 3.9 || z < -3.9 || z1 > 3.9 || z1 < -3.9){
                return "Error: Intervalos maior do que 3,9";
            }

            //Verifica se o resultado é negativo//
            if(Math.sign(z) == -1 || Math.sign(z) == '-0' || Math.sign(z) == -0){
                z = Math.abs(z).toString();
               
            }
            //Verifica se o resultado é negativo//
            if(Math.sign(z1) == -1 || Math.sign(z1) == '-0' || Math.sign(z1) == -0){
                z1 = Math.abs(z1).toString();
            }

            //Retira do Z o indice do objeto tbz//
            var indice = z.slice(0,3).replace('.',',');
            var indice1 = z1.slice(0,3).replace('.',',');
        
            //Retira a posição do array que está no indice//
            var pos = (z.charAt(3) == '' || z.charAt(3) == '0')? 0 : Number(z.slice(-1));   
            var pos1 = (z1.charAt(3) == '' || z1.charAt(3) == '0')? 0 : Number(z1.slice(-1)); 

            //Calcula a probabilidade//
            var prob = ((parseFloat(tbz[indice][pos]) + parseFloat(tbz[indice1][pos1])) * 100 ).toFixed(2)

            //Retorna a probabilidade//
            return prob;
        break;
        case 'ENTRE_MENOS':
            //Entre_Menos é quando a média é maior do que os valores informados, ou seja o intervalo é entre números que são menores que a média//
            
            //Calcula os Z//
            var z = parseFloat((qtd1 - media)/dp).toFixed(2);
            var z1 = parseFloat((qtd2 - media)/dp).toFixed(2);
            
            //verifica se o intervalo existe na tabela//
            if(z > 3.9 || z < -3.9 || z1 > 3.9 || z1 < -3.9){
                return "Error: Intervalos maior do que 3,9";
            }

            //Verifica se o resultado é negativo//
            if(Math.sign(z) == -1 || Math.sign(z) == '-0' || Math.sign(z) == -0){
                z = Math.abs(z).toString();
            
            }
            //Verifica se o resultado é negativo//
            if(Math.sign(z1) == -1 || Math.sign(z1) == '-0' || Math.sign(z1) == -0){
                z1 = Math.abs(z1).toString();
            }

            //Retira do Z o indice do objeto tbz//
            var indice = z.slice(0,3).replace('.',',');
            var indice1 = z1.slice(0,3).replace('.',',');
        
            //Retira a posição do array que está no indice//
            var pos = (z.charAt(3) == '' || z.charAt(3) == '0')? 0 : Number(z.slice(-1));   
            var pos1 = (z1.charAt(3) == '' || z1.charAt(3) == '0')? 0 : Number(z1.slice(-1));  
            
            //Calcula a probabilidade//
            var prob = ((parseFloat(tbz[indice][pos]) - parseFloat(tbz[indice1][pos1])) * 100 ).toFixed(2)
 
            //Retorna a probabilidade//
            return prob;
        break;
    }  
}

// console.log('maior que ' + distribuicao_normal(90,5,'MAIOR_QUE',93));
// console.log('menor que ' + distribuicao_normal(90,5,'MENOR_QUE',95));
// console.log('entre ' + distribuicao_normal(90,5,'ENTRE_',89,93));
// console.log('entre menos ' + distribuicao_normal(90,5,'ENTRE_MENOS',86,89));



function correlacao_regressao(arrX,arrY){
    var auxX = [], auxY = [], somaX = 0, somaY = 0, X_x_y = 0,  somaX_x_Y = 0, x2 = 0, y2 = 0, somax2 = 0, somay2 = 0;  
}





































