
$(function(){
    var svg = $('svg');   
    var boxText = $('#boxText');
    createColumns(svg,data);
    scale(svg,eixos);
    repositionSvg(svg,15);


    $('.colorLegend')
    .on('mouseover', function(event){
        openTextBox(event);
        boxText.html('<h4>Eu sou a cor da legenda</h4>');
        boxText.append(`id: ${$(this).attr('id')}<br/>`);
        boxText.append(`class: ${$(this).attr('class')}`);
    }).on('mouseout', function(){
        boxText.css('display','none');
    });

    $('.textLegend')
    .on('mouseover', function(event){
        openTextBox(event);
        boxText.html('<h4>Eu sou o texto da legenda</h4>');
        boxText.append(`id: ${$(this).attr('id')}<br/>`);
        boxText.append(`class: ${$(this).attr('class')}`);
    }).on('mouseout', function(){
        boxText.css('display','none');
    });

    $('.column')
    .on('mouseover', function(event){
        openTextBox(event);
        boxText.html('<h4>Eu sou uma coluna</h4>');
        boxText.append(`class: ${$(this).attr('class')}<br/>`);
        boxText.append(`valor: ${$(this).attr('height')}`);
    }).on('mouseout', function(){
        boxText.css('display','none');
    });
    

    $('.eixo')
    .on('mouseover', function(event){
        openTextBox(event);
        boxText.html('<h4>Eu sou um eixo do gráfico</h4>');
        boxText.append(`id: ${$(this).attr('id')}<br/>`);
        boxText.append(`class: ${$(this).attr('class')}`);
    }).on('mouseout', function(){
        boxText.css('display','none');
    });

    $('.scaleX')
    .on('mouseover', function(event){
        openTextBox(event);
        boxText.html('<h4>Eu sou uma categoria da escala X</h4>');
        boxText.append(`${$(this).text()}<br/>`);
        boxText.append(`class: ${$(this).attr('class')}`);
    }).on('mouseout', function(){
        boxText.css('display','none');
    });

    $('.scaleY')
    .on('mouseover', function(event){
        openTextBox(event);
        boxText.html('<h4>Eu sou um valor da escala Y</h4>');
        boxText.append(`${$(this).text()}<br/>`);
        boxText.append(`class: ${$(this).attr('class')}`);
    }).on('mouseout', function(){
        boxText.css('display','none');
    });

    $('#font')
    .on('mouseover', function(event){
        openTextBox(event);
        boxText.html('<h4>Eu sou a fonte dos dados do gráfico</h4>');
        boxText.append('<h4>CONFIA</h4>');
        boxText.append(`${$(this).text()}<br/>`);
    }).on('mouseout', function(){
        boxText.css('display','none');
    });


    
    function repositionSvg(svg,s){
        let w = svg.attr('width');
        let h = svg.attr('height');

        svg.attr('viewBox',`0 -${h} ${w} ${h}`)

        svg.children().each(function(){
            reposition($(this),s);
        });

    }
    
    function reposition(e,s){
        let y = e.attr('y');
        e.attr('y',`calc(-${y} - ${s}px)`);
    }

    function createColumns(svg,data){
        let count = 30;
        for(group in data){
    
            for(column in data[group]){
                svg.append(`<rect x="${count}px" y="${data[group][column]}%" height="${data[group][column]}%" class="${column} column"/>`)
                count = count+20;
            }
            count = count+20;
        }
    
        svg.html(svg.html());
    }

    function scale(svg,eixos){
        svg.append('<text x="10px" y="0px" class="scaleY"> 0 </text>');
        let repet = (eixos.y.end - eixos.y.start)/eixos.y.scale
        
        for(let i = 1; i<= repet; i++){
            svg.append(`<text x="5px" y="${i*eixos.y.scale + 5}%" class="scaleY">${i*eixos.y.scale}</text>`);
        }
        
        repet = (eixos.x.end - eixos.x.start)/eixos.x.scale

        for(let i = 0; i < repet-1; i++){
            svg.append(`<text x="${i*eixos.x.scale + 30}px" y="0px" class="scaleX">${eixos.x.legends[i]}</text>`);
        }

        svg.html(svg.html());
    }


    function openTextBox(event){

        boxText.css({
            'display':'block',
            'top':event.clientY,
            'left':event.clientX
        });
    }
});