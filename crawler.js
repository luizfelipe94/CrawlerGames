var mongoose = require('mongoose');
var async = require('async');
var fs = require('fs');

var host = 'mongodb://localhost/melhoresjogos';

var jogoSchema = new mongoose.Schema({
    title: String, 
    data: Date,
    fonte: String
});

var jogoModel = mongoose.model('Jogos', jogoSchema);

module.exports = function(itens){

    var jogos = [];

    itens.forEach(function(item){
        var jogo = new jogoModel();
        jogo.title = item;
        jogo.data = new Date();
        jogo.fonte = 'www.comparegames.com.br';
        jogos.push(jogo);
    });

    files = ['jogos.txt'];
    async.each(files, function(file, callback){
        fs.writeFile(file, jogos, function(err, contents){
            console.log('Jogos salvos no arquivo 65'+file);
            callback(null);
        })
    });

    //salvar no banco de dados (mongodb).
    mongoose.connect(host, function(error){
        if(!error){

            //insertMany retorna uma promise
            jogoModel.insertMany(jogos)
                .then(function(docs){
                    console.log('operação realizada com sucesso.');
                    mongoose.disconnect();
                })
                .catch(function(error){
                    console.log(error);
                    process.exit(2);
                });

        }else{
            console.log(error);
            process.exit(1);
        }
    });

}