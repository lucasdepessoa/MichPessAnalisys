

var prop = 'POPULACAO';
var arr = ['EF','EF','PG','EF','EF','ES','PG','EM','PG','EM','EM',
            'ES','ES','EM','EM','ES','EF','EM','PG','ES','ES',
            'EM','EF','EM','EM','PG','ES','PG','ES','ES'];


function quali_nominal(prop,arr){

    //Variaveis auxiliares;
    var box = {},box_perc = {},fac = {}, fac_perc={}, cont=0, sum=0, sum2=0;

    //Ordena o array por peso de código unicode e guarda o valor total de elementos//
    arr.sort();
    var tot = arr.length;

    //Monta um objeto contendo os elementos e a sua frequencia simples FI//
    for(var i=0; i<arr.length; i++){   
        for(var j=0; j<arr.length; j++){
            if(arr[i]==arr[j]){
                cont++;
            }             
        }
        box[arr[i]] = cont;
        cont = 0;
    }

    //Percorre o objeto catpruando os valroes descritos abaixo: //
    for(x in box){
        //FR %
        box_perc[x] = (box[x]*100)/tot;

        //FAC
        sum += box[x]
        fac[x] = sum;

        //FAC %
        sum2 += (box[x]*100)/tot;
        fac_perc[x] = sum2;
    }
    
    console.log(box);
    console.log(box_perc);
    console.log(fac);
    console.log(fac_perc)
    
}

console.log(quali_nominal(prop,arr));