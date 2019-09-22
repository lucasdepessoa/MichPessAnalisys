//constantes para alimentar as funções, conforme o que o usuário escolher//
const PROP = ['POPULACAO','AMOSTRA'], TIPO = ['NOMINAL','ORDINAL'];


//Arrays de teste//
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


// Funções Prontas //
function quali_nominal_ordinal(prop,tipo,arr){

    //Variaveis auxiliares//;
    var aux = [],
        quali_names = [],
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

    //Monta um objeto contendo os elementos e a sua frequencia simples FI//
    for(var i=0; i<tot; i++){   
        for(var j=0; j<tot; j++){
            if(arr[i]==arr[j]){
                cont++;
            }             
        }
        aux[arr[i]] = cont;
        cont = 0;
    }
    
    //Calcula os valores//
    for(x in aux){

        //Names - Variáveis
        quali_names.push(x);

        //Fi - Frequencia Simples
        quali_fi.push(aux[x]);

        //FR % - Frequencia Proporcional Relativa
        quali_fr.push(Number(((aux[x]*100)/tot).toFixed()));

        //FAC - Frequencia Acumulativa
        sum += aux[x];
        quali_fac.push(sum);

        //FAC % - Frequencia Acumulativa Proporcional
        sum2 += Number(((aux[x]*100)/tot).toFixed());
        quali_fac_percent.push(sum2);
    }

    /*Array contendo os elementos calculados acima, legenda abaixo:
        0 - Elementos (Nomes das Variaveis Pesquisadas) 
        1 - FI 
        2 - FR %
        3 - FAC
        4 - FAC %
    */
    //Montando o array de retorno//
    quali_struct_tb[0] = quali_names;
    quali_struct_tb[1] = quali_fi;
    quali_struct_tb[2] = quali_fr;
    quali_struct_tb[3] = quali_fac;
    quali_struct_tb[4] = quali_fac_percent;
    
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
        cont=0, sum=0, sum2=0, sum3=0, tot = arr.length, quanti_struct_tb = [],
        at=0, max=0, min=0, k=0, ic=0, aux=0;
    
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

        /*Array contendo os elementos calculados acima, legenda abaixo:
        0 - Elementos (Nomes das Variaveis Pesquisadas) 
        1 - FI 
        2 - FR %
        3 - FAC
        4 - FAC %
        */

        //Monta o Array de Retorno//
        quanti_struct_tb[0] = quanti_names;
        quanti_struct_tb[1] = quanti_fi;
        quanti_struct_tb[2] = quanti_fr;
        quanti_struct_tb[3] = quanti_fac;
        quanti_struct_tb[4] = quanti_fac_percent;

        return quanti_struct_tb;
}
// Fim - Funções Prontas //


//Chamadas de Teste//
// console.log(quali_nominal_ordinal(PROP[0],TIPO[0],arr));
// console.log(quali_nominal_ordinal(PROP[0],TIPO[1],arr2));
// console.log(quanti_continua(PROP[0],arr3));




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
    
