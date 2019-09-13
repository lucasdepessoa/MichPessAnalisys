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


function quali_nominal_ordinal(prop,tipo,arr){

    //Variaveis auxiliares//;
    var box = {},
        quali_names = {},
        quali_fi = {},
        quali_fr = {}, 
        quali_fac={},
        quali_fac_percent = {},
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
        box[arr[i]] = cont;
        cont = 0;
    }

    //Percorre o objeto catpruando os valroes descritos abaixo: //
    for(x in box){
        //Names - Variaveis
        quali_names[x] = x; 

        //Fi
        quali_fi[x] = box[x];

        //FR %
        quali_fr[x] = Number(((box[x]*100)/tot).toFixed());

        //FAC
        sum += box[x]
        quali_fac[x] = sum;

        //FAC %
        sum2 += Number(((box[x]*100)/tot).toFixed());
        quali_fac_percent[x] = sum2;
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


//Chamadas de Teste//
console.log(quali_nominal_ordinal(PROP[0],TIPO[0],arr));
console.log(quali_nominal_ordinal(PROP[0],TIPO[0],arr2));