// Funções Prontas //
function entrada(){
    var numString = document.getElementById("numString").value;
    arr_ent.push(numString.split(';'));
    document.getElementById("valores").innerHTML = arr_ent;
    return arr_ent;
}
 
//constantes para alimentar as funcoes, conforme o que o usuario escolher//
const PROP = ['POPULACAO','AMOSTRA'], TIPO = ['NOMINAL','ORDINAL'];


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
        6 - Array inteiro ordenado//
    */

    //montando o array de retorno//
    quali_struct_tb[0] = quali_names;
    quali_struct_tb[1] = quali_fi;
    quali_struct_tb[2] = quali_fr;
    quali_struct_tb[3] = quali_fac;
    quali_struct_tb[4] = quali_fac_percent;
    quali_struct_tb[5] = [tot];
    quali_struct_tb[6] = arr;

    //funcoes complementares 
    //moda(quali_struct_tb);
    //mediana(quali_struct_tb);
    
    //retorna o array com os valores prontos//
    return quali_struct_tb;
}

/* Função específica - Variável Quantitativa Discreta */
function quanti_discreta(prop,arr){
    
    //variaveis auxiliares//
    var aux = [], quanti_names = [], quanti_fi = [], quanti_fr = [], quanti_fac= [], aux=0, 
    cont=0, sum=0, sum2=0, tot = arr.length, quanti_struct_tb = [],  quanti_fac_percent = [];
    
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

    /* LEGENDA - array de retorno :
        0 - Elementos (quantidades calculadas) 
        1 - FI 
        2 - FR %
        3 - FAC
        4 - FAC %
        5 - .length do array original
        6 - array inteiro ordenado
    */

    //Monta o Array de Retorno//
    quanti_struct_tb[0] = quanti_names;
    quanti_struct_tb[1] = quanti_fi;
    quanti_struct_tb[2] = quanti_fr;
    quanti_struct_tb[3] = quanti_fac;
    quanti_struct_tb[4] = quanti_fac_percent;
    quanti_struct_tb[5] = [tot]
    quanti_struct_tb[6] = arr;

    //funcoes complementares//

    //retorno do array com os dados prontos//
    return quanti_struct_tb;
}

/* Função específica - Variável Quantitativa Continua */
function quanti_continua(prop,arr){

    //variaveis auxiliares//
    var aux = [], quanti_names = [], quanti_fi = [], quanti_fr = [], quanti_fac= [], 
    quanti_fac_percent = [], pontos_medios = [], cont=0, sum=0, sum2=0, sum3=0, 
    tot = arr.length, quanti_struct_tb = [], at=0, max=0, min=0, k=0, ic=0, aux=0, cc=0;
    
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

    /* LEGENDA - array de retorno:
    0 - elementos (intervalos registrados) 
    1 - FI 
    2 - FR %
    3 - FAC
    4 - FAC %
    5 - .length do array original
    6 - array original ordenado 
    7 - vetor de pontos medios (intervalos)
    8 - vetor de intervalos
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

    //funcoes complementares//
    //mediana_cont(quanti_struct_tb);

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



//TESTES - CONSOLE.LOG//

// console.log(quali_nominal_ordinal(PROP[0],TIPO[0],arr));
// console.log(quali_nominal_ordinal(PROP[0],TIPO[0],arr)); 
// console.log(quali_nominal_ordinal(PROP[0],TIPO[1],arr2));
// console.log(quanti_continua(PROP[0],arr5));
// console.log(quanti_discreta('AMOSTRA',arr4));

//--//



//TESTES - TABULAÇÃO //

// table_builder(quanti_discreta('AMOSTRA',arr4));
// table_builder(quali_nominal_ordinal(PROP[0],TIPO[0],arr));
// table_builder(quali_nominal_ordinal(PROP[0],TIPO[1],arr2));
table_builder_continua(quanti_continua(PROP[0],arr8));
//--//




//FUNÇÕES COMPLEMENTARES - MODA, MEDIANA, DESVIO PADRÃO E SEPARATRIZ//

/* Função de moda genérica */
function moda(matriz){
    /* Cálculo da Moda - Legenda da matriz de origem:
        1 - FI 
        5 - Tamanho do Array 
    */

    var moda = matriz[1][0];
   
    for (i=0;i<matriz[5];i++){
        if (matriz[1][i+1]>matriz[1][i]){
            moda = matriz[1][i+1];
        };
    };

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
        var pos1 = matriz[5]/2;
        med.push(matriz[6][pos1]);
        console.log("A mediana é " + med + " na posição " + pos1);
    };
};





/* Função de mediana específica - variável continua */
function mediana_cont(matriz){
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
console.log(medida_separatriz_cont(quanti_continua('AMOSTRA',arr8),5,3))


//--//

