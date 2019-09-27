
var arr_ent = [];
// Funções Prontas //
function entrada(){
      var numString = document.getElementById("numString").value;
      arr_ent.push(numString.split(';'));
      document.getElementById("valores").innerHTML = arr_ent;
      return arr_ent;
}
 
// //constantes para alimentar as funções, conforme o que o usuário escolher//
const PROP = ['POPULACAO','AMOSTRA'], TIPO = ['NOMINAL','ORDINAL'];


// //Arrays de teste//
var arr = ['EF','EF','PG','EF','EF','ES','PG','EM','PG','EM','EM',
            'ES','ES','EM','EM','ES','EF','EM','PG','ES','ES',
            'EM','EF','EM','EM','PG','ES','PG','ES','ES'];
var arr2 = ['rosa','amarela','rosa','azul','rosa','branca','preta',
            'preta','rosa','branca','rosa','preta','branca','preta',
            'rosa','amarela','rosa','branca','branca','azul','rosa','amarela',
            'branca','branca','branca','branca','azul','branca','branca','azul'];


var arr3 = [230,232,244,245,248,
            280,281,284,289,292,
            308,309,309,310,311,
            333,335,335,337,337];

var arr4 = [2,3,1,1,2,1,2,1,2,5,5,1,2,3,1,2,2,3,1,2];


var arr5 = [40,41,42,45,54,55,59,60,61,62,64,65,65,66,67,68,69,70,71,71,
            80,81,83,84,85,86,87,87,88,89,90,91,93,97,98,98,99,100,101,105];

// FUNÇÕES PRINCIPAIS DE ESTATISTICA //
function quali_nominal_ordinal(prop,tipo,arr){

    //Variaveis auxiliares//;
    var quali_names = [],
        quali_fi = [],
        quali_fr = [], 
        quali_fac= [],
        quali_fac_percent = [],
        cont=0, sum=0, sum2=0, tot = arr.length, quali_struct_tb = [];
    

    //Ordena o array caso a variavel seja do tipo NOMINAL (ordem alfabética)//
    if(tipo==='NOMINAL'){
        //Ordena o array em ordem alfabética (por peso UNICODE)//
        arr.sort();
    }

    //Captura os elementos repetidos//
    quali_names = arr.filter(function(valor,indice,arr){
        return arr.indexOf(valor)===indice;
    })

    //Calculando as quantidades//
    for(var i=0; i<quali_names.length; i++){
        for(var j=0; j<tot; j++){
            if(quali_names[i]==arr[j]){
                cont++;
            }
        }
        quali_fi.push(cont);
        cont = 0;
    }

    //Calcula os valores//
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
    
    /*Array contendo os elementos calculados acima, legenda abaixo:
        0 - Elementos (Nomes das Variaveis Pesquisadas) 
        1 - FI 
        2 - FR %
        3 - FAC
        4 - FAC %
        5 - Tamanho do Array
        6 - Array inteiro ordenado//

    */
    //Montando o array de retorno//
    quali_struct_tb[0] = quali_names;
    quali_struct_tb[1] = quali_fi;
    quali_struct_tb[2] = quali_fr;
    quali_struct_tb[3] = quali_fac;
    quali_struct_tb[4] = quali_fac_percent;
    quali_struct_tb[5] = [tot];
    quali_struct_tb[6] = arr;

    //chamadas 
    moda(quali_struct_tb);
    mediana(quali_struct_tb);
    //exibe o resultado
    //console.log(quali_struct_tb);    
    //Retorno dos valores tratados//
    return quali_struct_tb;
    
}

function quanti_continua(prop,arr){

    //Variaveis Auxiliares//
    var aux = [],
        quanti_names = [],
        quanti_fi = [],
        quanti_fr = [], 
        quanti_fac= [],
        quanti_fac_percent = [],
        pontos_medios = [],
        cont=0, sum=0, sum2=0, sum3=0, tot = arr.length, quanti_struct_tb = [],
        at=0, max=0, min=0, k=0, ic=0, aux=0, media = 0, total = 0, mult = 0;
    
        //Ordenando o Array//
        arr.sort(function(a,b){
            return a-b;
        });

        //Guarda uma copia do array original ordenado//
        aux = [...arr];


        //Amplitude//
        max = Math.max(...arr);
        min = Math.min(...arr);
        at = (max-min)+1;

        //Calcula a quantidade de linhas//
        k = (Math.sqrt(tot).toFixed());
        while(at % k != 0){
            k++;
        }

        //Calcula o Intervalo//
        ic = at/k;
        sum = aux[0];

        //Monta os intervalos//
        for(var i=0; i<k; i++){
            for(var j=0; j<2; j++){
                quanti_names[i] = sum;        
            }
            sum += ic;
        }

        //Adiciona o numero final + ic//
        quanti_names.push(quanti_names[k-1]+ic);


        // Monta FI ; FR% ; FAC ; FAC% //
        for(var i=0; i<k; i++){
            for(var j=0; j<tot; j++){

                //Monta a variavel FI//
                if(aux[j]>=quanti_names[i] && aux[j]<quanti_names[i+1]){
                    cont++;
                }
            }

            //Monta a variavel FI//
            quanti_fi[i] = cont;
            cont = 0;

            //Monta a variavel FR//
            quanti_fr.push(Number(((quanti_fi[i]*100)/tot).toFixed()));
            
            //Monta a variavel FAC//
            sum2 += quanti_fi[i];
            quanti_fac[i] = sum2;

            //Monta a variavel FAC % //
            sum3 += quanti_fr[i];
            quanti_fac_percent.push(Number(sum3));
        }

        //Monta os pontos médios de cada intervalo//
        for(var i=0; i<=k-1; i++){  
            pontos_medios[i] = Number(((quanti_names[i]+quanti_names[i+1] ) / 2).toFixed(2));  
        }
        //cálculo da média 
        for (i = 0; i < quanti_fi.length; i++){
            mult = pontos_medios[i]*quanti_fi[i];
            total += mult;
        }
        media = (total/sum2).toFixed(2);
        console.log ("A media é " + media);

        /*Array contendo os elementos calculados acima, legenda abaixo:
        0 - Elementos (Nomes das Variaveis Pesquisadas) 
        1 - FI 
        2 - FR %
        3 - FAC
        4 - FAC %
        5 - Tamanho do Array
        6 - Array inteiro ordenado 
        7 - Pontos médios de cada intervalo soma de um + outro / por 2
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

        //chama as funções
        //mediana_cont(quanti_struct_tb);

        return quanti_struct_tb;
}


function quanti_discreta(prop,arr){
    //variaveis
    var aux = [],
        quanti_names = [],
        quanti_fi = [],
        quanti_fr = [], 
        quanti_fac= [],
        quanti_fac_percent = [],
        cont=0, sum=0, sum2=0, tot = arr.length, quanti_struct_tb = [], aux=0, media = 0, total = 0, mult = 0;
    
    //Ordena o array//
    arr.sort(function(a,b){
        return a-b;
    });
    
    //Guarda Cópias//
    aux = [...arr];

    //Pega os elementos que se repetem//   
    quanti_names = aux.filter(function(valor,indice,arr){
        return arr.indexOf(valor)===indice;
    })

    //Calcula a quantidade de repetições//
    for(var i=0; i<quanti_names.length; i++){
        for(var j=0; j<tot; j++){
            if(quanti_names[i]==aux[j]){
                cont++;
            }
        }  
        quanti_fi.push(cont);
        cont = 0;
    }

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
    //cálculo da média 
    for (i = 0; i < quanti_names.length; i++){
        mult = quanti_fi[i]*quanti_names[i];
        total += mult;
    }
    media = total/sum;
    console.log ("A media é " + media);
    
    
    /*Array contendo os elementos calculados acima, legenda abaixo:
        0 - Elementos (Nomes das Variaveis Pesquisadas) 
        1 - FI 
        2 - FR %
        3 - FAC
        4 - FAC %
        5 - Tamanhao do Array
        6 - Array completo ordenado 
    */
    
    //Monta o Array de Retorno//
    quanti_struct_tb[0] = quanti_names;
    quanti_struct_tb[1] = quanti_fi;
    quanti_struct_tb[2] = quanti_fr;
    quanti_struct_tb[3] = quanti_fac;
    quanti_struct_tb[4] = quanti_fac_percent;
    quanti_struct_tb[5] = [tot]
    quanti_struct_tb[6] = arr;

    return quanti_struct_tb;
}
//##################################//



//Funções de Tabulação//
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

function table_builder(arr){
    var tabela = '';    

    for(var i=0; i<arr[1].length; i++){
        tabela += '<tr>';
        tabela += '<td>'+arr[0][i]+'</td><td>'+arr[1][i]+'</td><td>'+arr[2][i]+'</td><td>'+arr[3][i]+'</td><td>'+arr[4][i]+'</td>';
        tabela += '</tr>';
        
    }
    document.getElementById('tabul').innerHTML += tabela; 
}

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

//console.log(quali_nominal_ordinal(PROP[0],TIPO[0],arr));
// console.log(quali_nominal_ordinal(PROP[0],TIPO[0],arr)); 
// console.log(quali_nominal_ordinal(PROP[0],TIPO[1],arr2));
//console.log(quanti_continua(PROP[0],arr5));
// console.log(quanti_discreta('AMOSTRA',arr4));

//--//



//TESTES - TABULAÇÃO //

// table_builder(quanti_discreta('AMOSTRA',arr4));
// table_builder(quali_nominal_ordinal(PROP[0],TIPO[0],arr));
// table_builder(quali_nominal_ordinal(PROP[0],TIPO[1],arr2));
//table_builder_continua(quanti_continua(PROP[0],arr5));
//--//




//FUNÇÕES COMPLEMENTARES - MODA, MEDIANA, DESVIO PADRÃO E SEPARATRIZ//

function moda(matriz){
/*   Cálculo da Moda - Legenda da matriz de origem:
    1 - FI 
    5 - Tamanho do Array */
    var moda = matriz[1][0];
    for (i=0;i<matriz[5];i++){
        if (matriz[1][i+1]>matriz[1][i]){
            moda = matriz[1][i+1];
        };
    };
    console.log("A moda é " + moda);
}

function mediana(matriz){
/*  Cálculo da mediana para as funções qualitativas e quantitativa discreta
    5 - Tamanhao do Array
    6 - Array completo ordenado 
*/
    var med = []
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






function mediana_cont(matriz){
/*Array contendo os elementos calculados acima, legenda abaixo:
    0 - Elementos (Nomes das Variaveis Pesquisadas) 
    1 - FI 
    2 - FR %
    3 - FAC
    4 - FAC %
    5 - Tamanho do Array
    6 - Array inteiro ordenado 
    7 - Pontos médios de cada intervalo soma de um + outro / por 2
*/  
    //variaveis auxiliares


//     var pos = matriz[5]/2;
//     var I = 0;
//     var linha = 0;
//     var fac_ant = 0;
//     var fi_da_med = 0;
//     var md = 0;
//     for (var i=0;i<matriz[3][i].length;i++){
//         if (pos>matriz[3]){
//             linha = i;
//         }
//     }
//     I = matriz[0][linha];
//     fac_ant = matriz[3][linha-1];
//     fi_da_med = matriz[1][linha];
//     h = matriz[0][1] - matriz[0][0];
//     md = I + ((pos - fac_ant)/fi_da_med)*h;
//     console.log("pos é " + pos);
//     console.log("I é " + I);
//     console.log("fac_ant: " + fac_ant);
//     console.log("fi_da_med" + fi_da_med);
//     console.log("linha é " + linha);
//     console.log("A mediana arredondada é " + Math.round(md));
};


mediana_cont(quanti_continua(PROP[0],arr5));




//--//

