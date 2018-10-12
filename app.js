var request = require('request');
var cheerio = require('cheerio');
var save = require('./crawler');

var url = 'https://www.comparegames.com.br/melhores-jogos-de-pc-em-2018'
var jogos = [];

request(url, function(error, response, body){
    
    var $ = cheerio.load(body);

    $('.nm').text( function(){
        jogos.nome.push($(this).text());
    }); 

    save(jogos);
});