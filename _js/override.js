

var prop = 'POPULACAO';
var arr = ['EF','EF','PG','EF','EF','ES','PG','EM','PG','EM','EM',
            'ES','ES','EM','EM','ES','EF','EM','PG','ES','ES',
            'EM','EF','EM','EM','PG','ES','PG','ES','ES'];


function quali_nominal(prop,arr){

    //Variaveis auxiliares;
    var box = {},fr = {}, fac = {}, fac_perc = {}, cont=0, sum=0;

    //Ordena o array por peso de código unicode e guarda o valor total de elementos//
    arr.sort();

    //Monta um objeto que contem os elementos e a frequencia simples de cada um, já em ordem alfabética//
    for(var i=0; i<arr.length; i++){   
        for(var j=0; j<arr.length; j++){
            if(arr[i]==arr[j]){
                cont++;
            }             
        }
        box[arr[i]] = cont;
        cont = 0;
    }

    //Monta um objeto contendo a frequencia relativa porcentual, seguindo a ordem do objeto de elementos//
    // for(x in box){

    // }

    //Monta um objeto que contem a frequência acumulativa de cada elemento, seguindo a ordem do objeto de elementos acima//
    for(x in box){
        sum += box[x]
        fac[x] = sum;
    }


    console.log(box);
    console.log(fac);
}

console.log(quali_nominal(prop,arr));