// FUNÇÕES PARA CRIAÇÃO DE GRÁFICOS //

//função de cores//
function gera_cor(){
    var hexadecimais = '0123456789ABCDEF';
    var cor = '#';

    //Pega um numero aleatório do array acima//
    for (var i=0; i<6; i++){
        cor += hexadecimais[Math.floor(Math.random()*16)];
    }
    return cor;
}

//grafico estatística descritiva//
function graphDescritiva(variavel=null,names=null,values=null){

    $('.graphDESC').html('');
    $('.graphDESC').append('<canvas id="myChart" width="600" height="400"></canvas>');

    var labels = [], datas = [], label = '', backCOLORS = [], borderCOLORS = [];
    var tipoGraph = new Object();
    

    for(var i=0; i<names.length;i++){
        var cor = gera_cor()
        backCOLORS.push(cor);
    }
    
    switch(variavel){
        case 'NOMINAL':
            tipoGraph.type = 'pie';
        break;
        case 'ORDINAL':
            tipoGraph.type = 'pie';
        break;
        case 'DISCRETA':
            tipoGraph.type = 'bar';
        break;
        case 'CONTINUA':
            tipoGraph.type = 'bar';

        break;
    }


    setTimeout(function(){
        var ctx = document.getElementById('myChart').getContext('2d');

        var myChart = new Chart(ctx, {
            type: tipoGraph.type,
            data: {
                labels: names,
                datasets: [{
                    data: values,
                    backgroundColor: backCOLORS,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                }
            }
        });
    },1000)
    
}

//gráfico continua//
function graphContinua(variavel=null, names=null,values=null){

    $('.graphDESC').html('');
    $('.graphDESC').append('<canvas id="myChart" width="600" height="400"></canvas>');

    var  backCOLORS = [];
    var tipoGraph = new Object();

    tipoGraph.type = 'bar';
    
    for(var i=0; i<names.length;i++){
        var cor = gera_cor()
        backCOLORS.push(cor);
    }

    var ctx = document.getElementById("myChart").getContext('2d');

    var myChart = new Chart(ctx, {
        type: tipoGraph.type,
        data: {
            labels: names,
            datasets: [{
                label: variavel ,
                data: values,
                backgroundColor: backCOLORS,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
              xAxes: [{
                display: false, //false
                barPercentage: 1.3,
                ticks: {
                    min: names[1],
                    max: names[names.length-2],
                }
             }, {
                display: true,
                barPercentage: 1.3,
                ticks: {
                    autoSkip: false,
                    max: names[names.length-1],
                }
              }],
              yAxes: [{
                ticks: {
                  beginAtZero:true
                }
              }]
            }
        }
    });
}

//gráfico correlacao//
function graphCorrelacao(valX,valY,b=null,a=null){

    $('.graphCorr').html('');
    $('#myChartCorr').remove();
    $('.graphCorr').append('<canvas id="myChartCorr" width="400" height="200"></canvas>');

    var ctx = document.getElementById("myChartCorr").getContext('2d');


    var dados = [];

    //Monta os pontos no grafico//
    for(var i=0; i<valX.length; i++){
        var dd = {
            x: valY[i],
            y: valX[i]
        }
        dados.push(dd)
    }
    

    var reta = [{x:Math.min(...valY),y:(Math.min(...valY)-b)/a}, {x:Math.max(...valY),y:(Math.max(...valY)-b)/a}];
  

    var chart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            type: 'line',
            label: 'Projeção:',
            data: reta,
            fill: false,
            backgroundColor: "rgba(218,83,79, .7)",
            borderColor: "rgba(218,83,79, .7)",
            pointRadius: 0
          }, {
            type: 'bubble',
            label: 'Dados:',
            data: dados,
            backgroundColor: "rgba(76,78,80, .7)",
            borderColor: "transparent",
          }]
        },
        options: {
          scales: {
            xAxes: [{
              type: 'linear',
              position: 'bottom'
            }],
           
          }
        }
      });   
}
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//








// ESTATÍSTICA DESCRITIVA - FUNÇÕES DE TRATAMENTO //

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

        //calcula a moda//
        var freq = quali_fi[0];
        var moda = [];
            for (var i=0;i<quali_names.length;i++){
                if (quali_fi[i]>freq){
                    freq = quali_fi[i];
                };
            };
            for (var i=0;i<quali_names.length; i++){
                if(freq==quali_fi[i]){
                    moda.push(quali_names[i]);
                }
            }
            

        //calcula a mediana
        var mediana = [];
        if (tot%2==0){
           var pos1 = (tot/2)-1;
           var pos2 = pos1 + 1;
           mediana.push(arr[pos1],arr[pos2]);
           
        }
        else {
           var pos1 = Math.ceil(tot/2);
           mediana.push(arr[pos1]);
           
           
        };

        /* LEGENDA - array de retorno :
            0 - Elementos (Nomes das Variaveis Pesquisadas) 
            1 - FI 
            2 - FR %
            3 - FAC
            4 - FAC %
            5 - Tamanho do Array
            6 - Array inteiro ordenado
            7 - Moda 
            8 - Mediana 
        */

        //montando o array de retorno//
        quali_struct_tb[0] = quali_names;
        quali_struct_tb[1] = quali_fi;
        quali_struct_tb[2] = quali_fr;
        quali_struct_tb[3] = quali_fac;
        quali_struct_tb[4] = quali_fac_percent;
        quali_struct_tb[5] = [tot];
        quali_struct_tb[6] = arr;
        quali_struct_tb[7] = moda;
        quali_struct_tb[8] = mediana;

        //retorna o array com os valores prontos//
        return quali_struct_tb;
    }

    //variavel quantitativa discreta//
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
        //Para população //
        if (prop=='POPULACAO'){
            var v_x = 0, soma = 0, coef_varia = 0, parcial = 0, percent = 0;
            for (i=0;i<quanti_names.length;i++){
                parcial = (Math.pow((quanti_names[i]-media),2)*quanti_fi[i])
                soma += parcial;
            }
            v_x = Math.sqrt(soma/tot);
            coef_varia =  v_x/media;
            percent = coef_varia * 100;
            
            //Guarda o desvio padrão de população//
            quanti_struct_tb[10] = v_x;
            quanti_struct_tb[11] = percent;
        }
        //para amostra //
        else{
            var v_x = 0, soma = 0, coef_varia = 0, parcial = 0, percent = 0;
            for (i=0;i<quanti_names.length;i++){
                parcial = (Math.pow((quanti_names[i]-media),2)*quanti_fi[i])
                soma += parcial;
            }
            v_x = Math.sqrt(soma/(tot-1));
            coef_varia =  v_x/media;
            percent = coef_varia * 100;

            //Guarda o desvio padrão para amostra//
            quanti_struct_tb[10] = v_x;
            quanti_struct_tb[11] = percent;
        }
    
        /* LEGENDA - array de retorno :
            0 - Elementos (quantidades calculadas) 
            1 - FI 
            2 - FR %
            3 - FAC
            4 - FAC %
            5 - Tamanho do array original
            6 - Array inteiro ordenado
            7 - Moda (função externa)
            8 - Mediana (função função externa)
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
        //posição 10 - desvio padrão já calculado acima//
        //posição 11 - coeficiente de variação //
    
        //retorno do array com os dados prontos//
        return quanti_struct_tb;
    }

    //variavel quantitativa continua//
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
        if (prop=='POPULACAO'){
            var v_x = 0, soma = 0, coef_varia = 0, parcial = 0, percent = 0;
            for (i=0;i<pontos_medios.length;i++){
                parcial = (Math.pow((pontos_medios[i]-media),2)*quanti_fi[i])
                soma += parcial;
            }
            v_x = Math.sqrt(soma/tot);
            coef_varia =  v_x/media;
            percent = coef_varia * 100;

            //Guarda o desvio padrão de população//
            quanti_struct_tb[12] = v_x;
            quanti_struct_tb[13] = percent;
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

            //Guarda o desvio padrão de Amostra//
            quanti_struct_tb[12] = v_x;
            quanti_struct_tb[13] = percent;
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
        12 - desvio padrão
        13 - coeficiente de variação
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
        // Posição 12 // - Desvio Padrão já calculado acima//
        // Posição 13 // - Coeficiente de variação //
    
        //retorna o array com os valores prontos//
        return quanti_struct_tb;
    }
    
//################################################//

// FUNÇÕES ADICIONAIS ESTATÍSTICA DESCRITIVA - MODA, MEDIANA E MEDIDA SEPARATRIZ //
    
    // moda //
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
            
            return moda;
    }

    // mediana //
    function mediana(matriz){
        /* Cálculo da mediana para as funções qualitativas e quantitativa discreta
            5 - Tamanhao do Array
            6 - Array completo ordenado 
        */
        
        var med = 0;
        
        if (matriz[5]%2==0){
            var pos1 = matriz[5]/2;
            var pos2 = pos1 + 1;
            med = (matriz[6][pos1] + matriz[6][pos2])/2;
            

        }
        else {
            var pos1 = Math.ceil(matriz[5]/2);
            med = matriz[6][pos1];

        };
        return med;
    }

    // medida separatriz //
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


    // moda - variavel continua // 
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
            
            return moda;
        
    }

    // mediana - variavel continua //
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
            
            if(linha == 0){
                fac_anterior = matriz[3][linha];
            }else if(linha == 1){
                fac_anterior = matriz[3][linha-1];
            }else{
                fac_anterior = matriz[3][linha-2];
            }
           
        
            //pega o FI da linha correspondente//
            fi_da_med = matriz[1][linha-1];
            

            //captura o valor da mediana//
            md = Number((I + ((posicao - fac_ant)/fi_da_med) * matriz[8]).toFixed(2));
            
            //retorna//
            return md;
    }

    // medida separatriz - variavel continua //
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
    

        if(linha == 0){
            fac_anterior = arr[3][linha];
        }else if(linha == 1){
            fac_anterior = arr[3][linha-1];
        }else{
            fac_anterior = arr[3][linha-1];
        }
        
    
        //FI - da linha//
        fi_linha = arr[1][linha];
        
        //H - da formula (intervalo)//
        H = Number(arr[8].toFixed(2));
        
        //medida separatriz recebe//
        ms = I + ( (pos - fac_anterior) /fi_linha ) * H;

        return Number(ms.toFixed(2));
    }
    

//########################################################//


// --------------- ESTATÍSTICA - PROBABILIDADE -----------//


    // Distribuição Uniforme //
    function distribuicao_uniforme(max,min,tipo,qtd1=null, qtd2=null){
        var result = [], media = 0, cv = 0, dp = 0, intervalo = 0;

        switch(tipo){
            case 'MENOR_QUE':
                //media//
                media = Number(parseFloat((max + min)/2).toFixed(2));
                //Intervalo F(X)//
                intervalo = Number(parseFloat(((1 / (max-min))*(qtd1-min))*100).toFixed(2));
                
                result[0] = intervalo;
                result[1] = media;
                return result;
            break;
            case 'MAIOR_QUE':
                //media//
                media = parseFloat(((max + min)/2).toFixed(2));
                //Intervalo F(x)//
                intervalo = parseFloat((((1 / (max-min))*(max-qtd1))*100).toFixed(2));  

                result[0] = intervalo;
                result[1] = media;
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

                result[0] = intervalo;
                result[1] = media;
                result[2] = dp;
                result[3] = cv;
                return result;
            break;
        }
    }

    // Distribuição Binomial //
    function distribuicao_binomial(n,p,q,k){
    
        var analise_combinatoria = [], probabilidade = [i], media = 0, dp = 0, result = [], soma_prob = 0 ; 

        if(Array.isArray(k)){
            for(var i=0; i<k.length; i++){
                
                analise_combinatoria[i] = factorial(n) / (factorial(k[i]) * factorial(n-k[i]));

                probabilidade[i] = analise_combinatoria[i] * Math.pow(p,k[i]) * Math.pow(q,(n-k[i]));
                
                soma_prob += parseFloat((probabilidade[i] * 100).toFixed(2))
            }    
        }
    
        media = Number(n*p).toFixed(2);
    
        dp = Math.sqrt(n*p*q);
    
        //Resultados//
        result[0] = Number((soma_prob).toFixed(2));
        result[1] = Number(media);
        result[2] = dp;
    
        return result;
    }

    // Distribuição Normal //
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
                if(media <= qtd1){
                    var prob = ((0.5 - parseFloat(tbz[indice][pos])) * 100 ).toFixed(2);
                }else{
                    var prob = ((0.5 - parseFloat(tbz[indice][pos])) * 100 ).toFixed(2);
                }
    
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
                if(media <= qtd1){
                    var prob = ((0.5 + parseFloat(tbz[indice][pos])) * 100 ).toFixed(2);
                }else{
                    var prob = ((0.5 + parseFloat(tbz[indice][pos])) * 100 ).toFixed(2);
                }
    
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
                if(qtd1 < media && qtd2 > media){
                    var prob = []; 
                    prob[0] = ((parseFloat(tbz[indice][pos]) + parseFloat(tbz[indice1][pos1])) * 100 ).toFixed(2);
                    return prob;
                }else if(qtd1 < media && qtd2 < media){
                    var prob = [];
                    prob[0] = ((parseFloat(tbz[indice][pos]) - parseFloat(tbz[indice1][pos1])) * 100 ).toFixed(2);
                    return prob;
                }else if(qtd1 > media && qtd2 > media){
                    var prob = [];
                    prob[0] = ((parseFloat(tbz[indice][pos]) - parseFloat(tbz[indice1][pos1])) * 100 ).toFixed(2);
                    return prob;
                }else if( qtd1==media && qtd2>media){

                    //calcula o (Z)//
                    var t = parseFloat((qtd2 - media)/dp).toFixed(2);
                    
                    //Verifica se o intervalo existe na tabela//
                    if(t > 3.9 || t < -3.9){
                        return "Error: Intervalos maior do que 3,9";
                    }
        
                    //Verifica se o resultado é negativo//
                    if(Math.sign(t) == -1 || Math.sign(t) == '-0' || Math.sign(t) == -0){
                        t = Math.abs(t).toString();
                    }
                    
                    //trata o valor do indice//
                    var indicet = t.slice(0,3).replace('.',',');

                    //trata i valor da posição//
                    var post = (t.charAt(3) == '' || t.charAt(3) == '0')? 0 : Number(t.slice(-1));  
                    
                    //retorna a probabilidade//
                    var prob = [];
                    prob[0] = parseFloat((tbz[indicet][post]) * 100).toFixed(2);
                    
                    return prob;

                }else if(qtd1==media && qtd2<media){
                     //calcula o (Z)//
                     var t = parseFloat((qtd2 - media)/dp).toFixed(2);
                    
                     //Verifica se o intervalo existe na tabela//
                     if(t > 3.9 || t < -3.9){
                         return "Error: Intervalos maior do que 3,9";
                     }
         
                     //Verifica se o resultado é negativo//
                     if(Math.sign(t) == -1 || Math.sign(t) == '-0' || Math.sign(t) == -0){
                         t = Math.abs(t).toString();
                     }
 
                     //trata o valor do indice//
                     var indicet = t.slice(0,3).replace('.',',');
 
                     //trata i valor da posição//
                     var post = (t.charAt(3) == '' || t.charAt(3) == '0')? 0 : Number(t.slice(-1));  
 
                     //calcula a probabilidade//
                     var prob = [];
                     
                     //Retorno//
                     /* 0 - probabilidade */
                     prob[0] = parseFloat((tbz[indicet][post]) * 100 ).toFixed(2)
 
                     return prob;
                }
            break;
        }  
    }


//################### FIM PROBABILIDADE ##################//

// --------- FUNÇÕES ADICIONAIS - ESTATÍSTICA  - PROBABILIDADE //

    // fatorial //
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

//#############################################################//






// ------- ESTATÍSTICA - CORRELAÇÃO E REGRESSÃO ----------//

    // correlação e regressão //
    function correlacao_regressao(arrX,arrY){
       
    
        var somaX=0,somaY=0,somaX_x_Y=0,somax2=0,somay2=0,correlacao=0,a=0,b=0, 
             Y_r_formula=0, X_r_formula=0,resultado =[];
    
        //Se existir o mesmo número de variáveis dependentes e independentes//
        if(arrX.length == arrY.length){
    
            //Calcula os valores diante dos arrays de variáveis//
            for(var i=0; i<arrX.length; i++){
    
                //calcula a somatória das variáveis Y //
                somaY += arrY[i];
                
                //calcula a somatória das variáveis X //
                somaX += arrX[i];
    
                //calcula a somatória de X * Y //
                somaX_x_Y += arrX[i] * arrY[i]
    
                //calcula a somatória de x² //
                somax2 += Math.pow(arrX[i],2);
    
                //calcula a somatória de x² //
                somay2 += Math.pow(arrY[i],2);
            }
    
            //Calcula a relação//
            correlacao = ((arrX.length * somaX_x_Y) - (somaX * somaY) ) / Math.sqrt( ( (arrX.length * somax2) -  Math.pow(somaX,2) ) * ( (arrX.length * somay2) - Math.pow(somaY,2) )) 
            
    
            //calculos de Regressao//
    
            //calcula o a //
            a = ( (arrX.length * somaX_x_Y) - (somaX * somaY) ) / ((arrX.length * somax2) - Math.pow(somaX,2));
    
            //calcula o X da formula //
            X_r_formula = somaX / arrX.length;
    
            //calcula o Y da formula //
            Y_r_formula = somaY / arrX.length;
    
            //calcula o valor de b //
            b = Y_r_formula - (a * X_r_formula);
    
            //Monta o resultado//
            /* 
                [0] - correlacao
                [1] - valor de a
                [2] - valor de b
            */
            resultado[0] = parseFloat((correlacao*100).toFixed(2));
            resultado[1] = parseFloat(a.toFixed(2));
            resultado[2] = parseFloat(b.toFixed(2));
    
            return resultado;
        }else{
            //caso o número de variáveis esteja diferente//
            return "Error: Dados incompletos";
        }
    }

//########################################################//






//------------- FUNÇÕES DE ESTRUTURA ------------ //

    //Controle de equação//
    $('#equa_xx').on("focus",function(){
        $('#equa_y').val('');
    })
    $('#equa_y').on('focus',function(){
        $('#equa_xx').val('');
    })

    //Controlador SELECT PROBABILIDADE - uniforme //
    $('#selTipoUni').on('change',function(){
        if($('#selTipoUni').val()=='ENTRE_'){
            $('#qtd_uni').val('');
            $('#qtd_uni').attr('disabled','disabled');
            $('#de_ate').css("display","block");
        }else{
            $('#de_ate').css("display","none");
            $('#qtd_uni').attr('disabled',false);
        }

        if($('#selTipoUni').val()=='EQUILIBRIO'){
            $('#qtd_uni').attr("placeholder","Digite o valor de Equilíbrio");
        }else{
            $('#qtd_uni').attr("placeholder","Insira a quantidade");
        }
    })

    //Controlador SELECT PROBABILIDADE - Normal//
    $('#selTipoNormal').on('change',function(){
        if($('#selTipoNormal').val()=='ENTRE_'){
            $('#qtd_normal').val('');
            $('#qtd_normal').attr('disabled','disabled');
            $('#de_ate_normal').css("display","block");
        }else{
            $('#de_ate_normal').css("display","none");
            $('#qtd_normal').attr('disabled',false);
        }
    })


    //controlador de opções de distribuição - probabilidade//
    $('#lb_uniforme').on('click',function(){
        $('#moldeBino').css("display","none");
        $('#moldeNormal').css("display","none");
        $('#moldeUni').css("display","block");
        animaScroll('tabs2');
    })
    $('#lb_binomial').on('click',function(){
        $('#moldeNormal').css("display","none");
        $('#moldeUni').css("display","none");
        $('#moldeBino').css("display","block");
        animaScroll('tabs2');
    })
    $('#lb_normal').on('click',function(){
        $('#moldeBino').css("display","none");
        $('#moldeUni').css("display","none");
        $('#moldeNormal').css("display","block");
        animaScroll('tabs2');
    })

    //controlador select de medida separatriz//
    $('#selSeparatriz').on('change',function(){
        
        var valor = parseInt($(this).val());
        var input = $('#parcela');
        
        switch(valor){
            case 4:
                input.attr("max","4");
            break;
            case 5:
                input.attr("max","5");
            break;
            case 10:
                input.attr("max","10");
            break;
            case 100:
                input.attr("max","100");
            break;
        }
        
        input.val('');
        input.focus();
    });

    //função de animação scroll//
    function animaScroll(local){
        if(local === 'menu'){
            $('html,body').animate({scrollTop: $('#myTabContent').offset().top},3000); 
        }

        if(local === 'tabs'){
            $('html,body').animate({scrollTop: $('#myTabContent').offset().top},1500);
        }

        if(local == 'menu2'){
            $('html,body').animate({scrollTop: $('#myTabProbContent').offset().top},1500);
        }

        if(local === 'tabs2'){
            $('html,body').animate({scrollTop: $('#myTabProbContent').offset().top},1500);
        }
        
        if(local === 'tabs3'){
            $('html,body').animate({scrollTop: $('#myChartCorr').offset().top+300},1500);
        }
    }

    //controlador dropdown//
    function trigger(id){

        var obj =  document.getElementById('varPes');
        var objProb = document.getElementById('varPesProb');
        var objCorr = document.getElementById('varPesCorrelacao');

        var indice = document.getElementById('indice');
        var indiceProb = document.getElementById('indice_prob');
        var indiceCorr = document.getElementById('indice_correlacao');

        var comando = {
            corrige : function(e=null){
                
                //Desmarca os buttons de amostra ou população//                
               switch(e){
                case 'discreta':
                    $('#lb_amostra').removeClass('active');
                    $('#lb_populacao').removeClass('active');
                    $('.graphDESC').html('');
                break;
                case 'probabilidade':
                    $('#lb_uniforme').removeClass('active');
                    $('#lb_binomial').removeClass('active');
                    $('#lb_normal').removeClass('active');
                    $('.graphDESC').html('');
                break;
                case 'correlacao':
                    $('#y_value').val('');
                    $('#x_value').val('');
                    $('#x_value').focus();    
                    $('.graphDESC').html('');
                break;
                }
                

                //limpa a tabela//
                $('#tabul').html('');
                $('#tit_table').text('');

            },
            mostra : function(e){
                //Mostra a div//
                switch(e){
                    case 'discreta':
                        $('#trigger_correlacao').css("display","none"); 
                        $('#resultadoCorrelacao').css("display","none");
                        $('#calcularCorr').css("display","none");
                        $('#moldeBino').css("display","none");
                        $('#moldeUni').css("display","none");
                        $('#moldeNormal').css("display","none");
                        $("#trigger_prob").css("display","none");
                        $('.graphCorr').html('')
                        $("#projecao").fadeOut('slow');
                        $("#trigger").css("display","block");
                        $('#moldeDesc').css("display","block");
                    break;
                    case 'probabilidade':
                        $('#trigger_correlacao').css("display","none"); 
                        $('#resultadoCorrelacao').css("display","none");
                        $('#calcularCorr').css("display","none");
                        $('#moldeDesc').css("display","none")
                        $('#moldeUni').css("display","none");
                        $("#trigger").css("display","none");
                        $("#projecao").fadeOut('slow');
                        $("#trigger_prob").css("display","block");
                        $('.graphCorr').html('')
                        $("#tab_coleta_prob").trigger("click");
                    break;
                    case 'correlacao':
                        $('#trigger_prob').css("display","none");
                        $('#trigger').css("display","none");
                        $('#trigger_correlacao').css("display","block");   
                        $('#tab_coletaCorrelacao').trigger("click");
                    break;
                }

                //da foco no input principal//
                $('#nameVariable').val('');
                $('#variable').val('');
                $('#nameVariable').focus();

                $('#tab_coleta').trigger('click');

            }
        }


        switch(id){
            case 'quali_nomi':
                comando.corrige('discreta');
                obj.innerHTML = 'Qualitativa Nominal';
                indice.value = 'NOMINAL';
                comando.mostra('discreta');
            break;
            case 'quali_ordi':
                comando.corrige('discreta');
                obj.innerHTML = 'Qualitativa Ordinal';
                indice.value = 'ORDINAL';
                comando.mostra('discreta');
            break;
            case 'quati_disc':
                comando.corrige('discreta');
                obj.innerHTML = 'Quantitativa Discreta';
                indice.value = 'DISCRETA';
                comando.mostra('discreta');
            break;
            case 'quati_cont':
                comando.corrige('discreta');
                obj.innerHTML = 'Quantitativa Contínua';
                indice.value = 'CONTINUA';
                comando.mostra('discreta');
            break;        
            case 'dist_probabilidade':
                comando.corrige('probabilidade');
                objProb.innerHTML = 'Estatística Probabilidade';
                indiceProb.value = 'PROBABILIDADE';
                comando.mostra('probabilidade');
            break;
            case 'navCorrelacao':
                comando.corrige('correlacao');
                objCorr.innerHTML = 'Correlação e Regressão';
                indiceCorr.value = 'CORRELACAO';
                comando.mostra('correlacao');
            break;
            case 'navSair':
                window.location.href = 'index.html';
            break;
        }
        
        
    
        //move o scroll//
        animaScroll('menu');

    }


    //tabulação genérica - nominal, ordinal e discreta//
    function table_builder(arr,selValor=null,selDivisao=null){
        
        var tabela = '';   
        var tabela2 = '';
        
        document.getElementById('tabul').innerHTML = '';
        document.getElementById('tabulMetricaDesc').innerHTML = '';
    
        for(var i=0; i<arr[1].length; i++){
            tabela += '<tr>';
            tabela += '<td>'+arr[0][i]+'</td><td>'+arr[1][i]+'</td><td>'+arr[2][i]+'</td><td>'+arr[3][i]+'</td><td>'+arr[4][i]+'</td>';
            tabela += '</tr>';
            
        }

        if($('#indice').val() == 'NOMINAL' || $('#indice').val() == 'ORDINAL'){
            
            tabela2 += '<thead>';
            tabela2 +=   '<th>Moda</th>';
            tabela2 +=   '<th>'+(arr[7])+'</th>';
            tabela2 +=   '<th>Mediana</th>';
            tabela2 +=   '<th>'+(arr[8])+'</th>';
            tabela2 +=   '<th>Medida Separatriz</th>';
            tabela2 +=   '<th>' + medida_separatriz(arr,parseInt(selValor),parseInt(selDivisao)) + '</th>';
            tabela2 += '</thead>';
        
        }else if($('#indice').val() == 'DISCRETA'){
            tabela2 += '<thead>';
            tabela2 +=   '<tr>';
            tabela2 +=   '<th>Moda</th>';
            tabela2 +=   '<th>'+parseFloat(arr[7]).toFixed(2)+'</th>';
            tabela2 +=   '<th>Mediana</th>';
            tabela2 +=   '<th>'+parseFloat(arr[8]).toFixed(2)+'</th>';
            tabela2 +=   '<th>Média</th>';
            tabela2 +=   '<th>'+parseFloat(arr[9]).toFixed(2)+'</th>';
            tabela2 +=   '</tr>';
            tabela2 +=  '<tr>';
            tabela2 +=   '<th>Desvio Padrão</th>';
            tabela2 +=   '<th>'+parseFloat(arr[10]).toFixed(2)+'</th>';
            tabela2 +=   '<th>Coeficiente Variação</th>';
            tabela2 +=   '<th>'+parseFloat(arr[11]).toFixed(2)+'</th>';
            tabela2 +=   '<th>Medida Separatriz</th>';
            tabela2 +=   '<th>' + parseFloat(medida_separatriz(arr,parseInt(selValor),parseInt(selDivisao))).toFixed(2) + '</th>';
            tabela2 +=   '</tr>';
            tabela2 += '</thead>';

        }
        
       
        document.getElementById('tabul').innerHTML += tabela; 
        document.getElementById('tabulMetricaDesc').innerHTML += tabela2;
    }


    //tabulação variável continua//
    function table_builder_continua(arr, selValor=null,selDivisao=null){

        var tabela = '';
        var tabela2 = '';
        
        document.getElementById('tabul').innerHTML = ''; 
        document.getElementById('tabulMetricaDesc').innerHTML = '';
    
        for(var i=0; i<arr[1].length; i++){
            tabela += '<tr>';
            tabela += '<td>'+arr[0][i]+' |--------- '+arr[0][i+1]+'</td><td>'+arr[1][i]+'</td><td>'+arr[2][i]+'</td><td>'+arr[3][i]+'</td><td>'+arr[4][i]+'</td>';
            tabela += '</tr>';    
        }

        if($('#indice').val() == 'CONTINUA'){
            tabela2 += '<thead>';
            tabela2 +=   '<th>Moda</th>';
            tabela2 +=   '<th>'+parseFloat(arr[11]).toFixed(2)+'</th>';
            tabela2 +=   '<th>Mediana</th>';
            tabela2 +=   '<th>'+parseFloat(arr[10]).toFixed(2)+'</th>';
            tabela2 +=   '<th>Média</th>';
            tabela2 +=   '<th>'+parseFloat(arr[9]).toFixed(2)+'</th>';
            tabela2 +=  '</tr>'; 
            tabela2 +=  '<tr>';
            tabela2 +=   '<th>Desvio Padrão</th>';
            tabela2 +=   '<th>'+parseFloat(arr[12]).toFixed(2)+'</th>';
            tabela2 +=   '<th>Coeficiente Variação</th>';
            tabela2 +=   '<th>'+parseFloat(arr[13]).toFixed(2)+'<th>';
            tabela2 +=   '<th>Medida Separatriz</th>';
            tabela2 +=   '<th>'+ parseFloat(medida_separatriz_cont(arr,parseInt(selValor),parseInt(selDivisao))).toFixed(2)+'</th>';
            tabela2 +=  '</tr>';
            tabela2 += '</thead>';
        }

        document.getElementById('tabul').innerHTML += tabela; 
        document.getElementById('tabulMetricaDesc').innerHTML += tabela2;

    }


    //tabulação de resultados Probabilidade//
    function tableBuilderProb(arr,tipo){
        
        var tabela = '';
        document.getElementById('tabulProbMetrica').innerHTML = '';

        switch(tipo){
            case 'UNI':
                tabela += '<tr>';
                tabela += '<td>'+parseFloat(arr[1]).toFixed(2)+'</td>';
                tabela += '<td>'+parseFloat(arr[0]).toFixed(2)+'</td>';
                tabela += '<td>'+parseFloat(arr[2]).toFixed(2)+'</td>';
                tabela += '<td>'+parseFloat(arr[3]).toFixed(2)+'</td>';
                tabela += '<tr>';
                $('#tab_tabulacao_prob').trigger('click');
            break;
            case 'BIN':
                tabela += '<tr>';
                tabela += '<td>'+parseFloat(arr[1]).toFixed(2)+'</td><td>'+parseFloat(arr[0]).toFixed(2)+'</td><td>'+parseFloat(arr[2]).toFixed(2)+'</td>';
                tabela += '</tr>';
                $('#tab_tabulacao_prob').trigger('click');
            break;
            case 'NOR':
                tabela += '<tr>';
                tabela += '<td> - </td><td>'+arr+'</td><td> - </td><td> - </td>';
                tabela += '</tr>';
                $('#tab_tabulacao_prob').trigger('click');
            break;
        }

        document.getElementById('tabulProbMetrica').innerHTML = tabela;
    }
//################################################//










//&&&&&&&&&&&&&&&&&&&&&&7 MOTOR DA APLICAÇÃO &&&&&&&&&&&&&&&&&&&&&&&&&//

//Função de recebimento dos dados//
function entrada(){
        //Caso esteja preenchido//
        var indicador = document.getElementById('indice').value;
        var indicador_prob = document.getElementById('indice_prob').value;
        var indicador_corr = document.getElementById('indice_correlacao').value;
        var arr_ent = [], numString = document.getElementById('variable').value.toUpperCase();

        //verifica o item escolhido no select de separatriz e faz a conversão para o numero esperado na função
        var selValor = $('#selSeparatriz').val();
        var selDivisao = $('#parcela').val();
        
        //Verifica se é amostra ou população//
        var proporcao = '';
        if($('#lb_amostra').hasClass('active')){
            proporcao = 'AMOSTRA';
        }else{
            proporcao = 'POPULACAO';
        }
        /* lembrar de adicionar uma logica para impedir que o usuario entre sem escolher amostrao ou populacao */


        
        //determina se o valor digitado é número ou caractere, a partir disso, monta o array
        var teste = numString.split(';').map(function(e){
            return parseFloat(e.trim());
        });
        
        //Se o primeiro resultado em teste der NaN, então converta tudo para um array de string//
        if (isNaN(teste[0]) == true){

            //Converte para um array de string//
            arr_ent = numString.split(';').map(function(e){
                return e.trim();
            });    
        

            switch(indicador){
                case 'NOMINAL':
                    table_builder(quali_nominal_ordinal(proporcao,indicador,arr_ent),selValor,selDivisao);
                    $("#variable").val('');
                    $("#tit_table").html($('#nameVariable').val());
                    $("#tab_tabulacao").trigger('click');
                    
                    

                   
                    graphDescritiva('NOMINAL',quali_nominal_ordinal(proporcao,indicador,arr_ent)[0],quali_nominal_ordinal(proporcao,indicador,arr_ent)[2]);
                    

                break;
                case 'ORDINAL':
                    table_builder(quali_nominal_ordinal(proporcao,indicador,arr_ent),selValor,selDivisao);
                    $("#variable").val('');
                    $("#tit_table").html($('#nameVariable').val());
                    $("#tab_tabulacao").trigger('click');


                  
                    graphDescritiva('ORDINAL',quali_nominal_ordinal(proporcao,indicador,arr_ent)[0],quali_nominal_ordinal(proporcao,indicador,arr_ent)[2]);
                    

                break;
            }

        
        }
        else
        { //Senão, o array é qualitativo, converta tudo para numero//
           
            //Converte para um array numérico flutuante//
            arr_ent = numString.split(';').map(parseFloat);

            switch(indicador){
                case 'DISCRETA':
                    table_builder(quanti_discreta(proporcao,arr_ent),selValor,selDivisao);
                    $("#tit_table").html($('#nameVariable').val());
                    $("#tab_tabulacao").trigger('click');

                    graphDescritiva('DISCRETA',quanti_discreta(proporcao,arr_ent)[0],quanti_discreta(proporcao,arr_ent)[2]);               

                break;
                case 'CONTINUA':
                    table_builder_continua(quanti_continua(proporcao,arr_ent),selValor,selDivisao);
                    $("#tit_table").html($('#nameVariable').val());
                    $("#tab_tabulacao").trigger('click');

                    graphContinua($('#nameVariable').val(),quanti_continua(proporcao,arr_ent)[0],quanti_continua(proporcao,arr_ent)[2]);
                
                break;
            }


            


        }

        //caso o usuario clique na aba de probabilidade//
        if(indicador_prob == 'PROBABILIDADE'){


            // UNIFORME //
            if($('#lb_uniforme').hasClass('active') && $('#selTipoUni').val()=='ENTRE_'){
                var min = parseFloat($('#min_uni').val())
                var max = parseFloat($('#max_uni').val())
                var de_uni = parseFloat($('#de_uni').val())
                var ate_uni = parseFloat($('#ate_uni').val());
                var tipo = $('#selTipoUni').val();

                tableBuilderProb(distribuicao_uniforme(max,min,tipo,de_uni,ate_uni),'UNI');
            }

            if($('#lb_uniforme').hasClass('active') && $('#selTipoUni').val()=='MAIOR_QUE'){
                var qtd = parseFloat($('#qtd_uni').val());
                var min = parseFloat($('#min_uni').val());
                var max = parseFloat($('#max_uni').val());
                var tipo = $('#selTipoUni').val();

                tableBuilderProb(distribuicao_uniforme(max,min,tipo,qtd),'UNI');

            } 

            if($('#lb_uniforme').hasClass('active') && $('#selTipoUni').val()=='MENOR_QUE'){
                var qtd = parseFloat($('#qtd_uni').val());
                var min = parseFloat($('#min_uni').val());
                var max = parseFloat($('#max_uni').val());
                var tipo = $('#selTipoUni').val();

                tableBuilderProb(distribuicao_uniforme(max,min,tipo,qtd),'UNI');
            }

            if($('#lb_uniforme').hasClass('active') && $('#selTipoUni').val()=='EQUILIBRIO'){
                var qtd = parseFloat($('#qtd_uni').val());
                var min = parseFloat($('#min_uni').val());
                var max = parseFloat($('#max_uni').val());
                var tipo = $('#selTipoUni').val();

                tableBuilderProb(distribuicao_uniforme(max,min,tipo,qtd),'UNI');
            }


            //BINOMIAL//
            if($('#lb_binomial').hasClass('active')){
                var amostra = parseFloat($('#amostra_bino').val());
                var sucesso = parseFloat($('#succes_bino').val());
                var fracasso = parseFloat($('#failed_bino').val());
                
                if($('#event_bino').val().indexOf(';') != -1){
                    var evento = $('#event_bino').val().split(';').map(parseFloat);
                }else{
                    var evento = []; 
                    evento.push($('#event_bino').val());
                }
                


                tableBuilderProb(distribuicao_binomial(amostra,sucesso,fracasso,evento),'BIN');
            }
            

            //NORMAL//
             // UNIFORME //
             if($('#lb_normal').hasClass('active') && $('#selTipoNormal').val()=='ENTRE_'){
                var de_uni = parseFloat($('#de_normal').val())
                var ate_uni = parseFloat($('#ate_normal').val());
                var dp = parseFloat($('#dp_normal').val());
                var media = parseFloat($('#media_normal').val());
                var tipo = $('#selTipoNormal').val();

                tableBuilderProb(distribuicao_normal(media,dp,tipo,de_uni,ate_uni),'NOR');
              
            }

            if($('#lb_normal').hasClass('active') && $('#selTipoNormal').val()=='MAIOR_QUE'){
                var qtd = parseFloat($('#qtd_normal').val());
                var dp = parseFloat($('#dp_normal').val());
                var media = parseFloat($('#media_normal').val());
                var tipo = $('#selTipoNormal').val();

                tableBuilderProb(distribuicao_normal(media,dp,tipo,qtd),'NOR');

            } 

            if($('#lb_normal').hasClass('active') && $('#selTipoNormal').val()=='MENOR_QUE'){
                var qtd = parseFloat($('#qtd_normal').val());
                var dp = parseFloat($('#dp_normal').val());
                var media = parseFloat($('#media_normal').val());
                var tipo = $('#selTipoNormal').val();

                tableBuilderProb(distribuicao_normal(media,dp,tipo,qtd),'NOR');
            }



        }

        


        if(indicador_corr == 'CORRELACAO'){
            var x_value = document.getElementById('x_value').value;   
            var y_value = document.getElementById('y_value').value;
            var xvalue = x_value.split(';').map(parseFloat);
            var yvalue = y_value.split(';').map(parseFloat);
            if( isNaN(xvalue[0]) || isNaN(yvalue[0])){
                alert('Valores incorretos !');
                
                $('#y_value').val('');
                $('#x_value').val('');
                $('#x_value').focus();
                return false;
            }else{
                //Calcula a correlacao e regressao//
                var res = correlacao_regressao(xvalue,yvalue);
                
                //Monta os valores da equação na tela//
                $('#resCorrelacao').text('Correlação de ' + res[0] + ' %');
                $('#equa_a').text(res[1]);
                $('#equa_b').text(' + (' + res[2] + ' )');

                //Mostra os valores na tela//
                $('#resultadoCorrelacao').css("display","block");
                $('#calcularCorr').css("display","block");
                
                //Constroi o gráfico de dispersão//
                var a = res[1];               
                graphCorrelacao(xvalue,yvalue,res[2],a)

                $('#tab_graficosCorrelacao').trigger('click');
                animaScroll('tabs3');


                //Calcula a projeção com base na variável escolhida//
                function calcProjecao(x=null,tipo){
                    var projecao = 0;

                    // Y projetando em X//
                    if(x!=null && tipo=='Y'){
                        projecao = (parseFloat($('#equa_y').val()) - res[2])/res[1];
                        return projecao;
                    }
                    // X projetando em Y//
                    if(x!=null && tipo=='X'){
                        projecao = (parseFloat($('#equa_xx').val()) * res[1])+res[2];
                        return projecao;
                    }
                }


           

                //Calculo de equação dinamico//
                $('#equa_xx').on('change',function(){
                    $('#projecao').text('Projetando X em : '+ $('#equa_xx').val() + ', Y vale : '+calcProjecao(1,'X').toFixed(2))
                    $('#projecao').fadeIn('fast');
                })

                $('#equa_y').on('change',function(){
                    $('#projecao').text('Projetando Y em : '+ $('#equa_y').val() + ', X vale : '+calcProjecao(1,'Y').toFixed(2))
                    $('#projecao').fadeIn('fast');
                })
            }



        }

        
}


    const input = document.querySelector('input[type=file]');


    input.addEventListener('change',function(e){
        const reader = new FileReader();
        reader.onload = function(){
            const linhas = reader.result.split('\n').map(function(line){
                return line.split(';');
            })
            var pacoteX = [], pacoteY = [];
            for(var i=0; i<linhas.length; i++){
                if(linhas[i][0] != ''){
                    pacoteX.push(parseFloat(linhas[i][0]))
                    pacoteY.push(parseFloat(linhas[i][1]))
                }
                
            }
            
            //Envia valores para a função e monta o gráfico//
            var pp = correlacao_regressao(pacoteX,pacoteY);

            graphCorrelacao(pacoteX,pacoteY,pp[2],pp[1]);

            //Monta os valores da equação na tela//
            $('#resCorrelacao').text('Correlação de ' + pp[0] + ' %');
            $('#equa_a').text(pp[1]);
            $('#equa_b').text(' + (' + pp[2] + ' )');

            //Mostra os valores na tela//
            $('#resultadoCorrelacao').css("display","block");
            $('#calcularCorr').css("display","block");
            $('#tab_graficosCorrelacao').trigger("click");
            animaScroll('tabs3');



            //Calcula a projeção com base na variável escolhida//
            function calcProjecao(x=null,tipo){
                var projecao = 0;

                // Y projetando em X//
                if(x!=null && tipo=='Y'){
                    projecao = (parseFloat($('#equa_y').val()) - pp[2])/pp[1];
                    return projecao;
                }
                // X projetando em Y//
                if(x!=null && tipo=='X'){
                    projecao = (parseFloat($('#equa_xx').val()) * pp[1])+pp[2];
                    return projecao;
                }
            }



            $('#equa_xx').on('change',function(){
                $('#projecao').text('Projetando X em : '+ $('#equa_xx').val() + ', Y vale : '+calcProjecao(1,'X').toFixed(2))
                $('#projecao').fadeIn('fast');
            })

            $('#equa_y').on('change',function(){
                $('#projecao').text('Projetando Y em : '+ $('#equa_y').val() + ', X vale : '+calcProjecao(1,'Y').toFixed(2))
                $('#projecao').fadeIn('fast');
            })


        }
        reader.readAsText(input.files[0])
    },false);

//-------------------------------//





//quando todo o documento for carregado, faça//
$(document).ready(function(){
    
    //Mostra o conteúdo com efeito slow//
    $('#restante').show('slow');






    
});
// ################################################################## //









































