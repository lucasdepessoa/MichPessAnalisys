

var prop = 'POPULACAO';
var arr = ['EF','EF','PG','EF','EF','ES','PG','EM','PG','EM','EM',
            'ES','ES','EM','EM','ES','EF','EM','PG','ES','ES',
            'EM','EF','EM','EM','PG','ES','PG','ES','ES'];
var arr2 = ['rosa','amarela','rosa','azul','rosa','branca','preta',
            'preta','rosa','branca','rosa','preta','branca','preta',
            'rosa','amarela','rosa','branca','branca','azul','rosa','amarela',
            'branca','branca','branca','branca','azul','branca','branca','azul']


function quali_nominal(prop,arr){

    //Variaveis auxiliares;
    var box = {},
        quali_names = {},
        quali_fi = {},
        quali_fr = {}, 
        quali_fac={},
        quali_fac_percent = {},
        cont=0, sum=0, sum2=0, tot = arr.length, quali_nominal_tb = [];

    //Ordena o array//
    arr.sort();

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
    quali_nominal_tb[0] = quali_names;
    quali_nominal_tb[1] = quali_fi;
    quali_nominal_tb[2] = quali_fr;
    quali_nominal_tb[3] = quali_fac;
    quali_nominal_tb[4] = quali_fac_percent;
    
    return quali_nominal_tb;
}

console.log(quali_nominal(prop,arr));
console.log(quali_nominal(prop,arr2));