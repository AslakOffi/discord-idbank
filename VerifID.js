const Discord = require('discord.js');
const client = new Discord.Client();
const colors = require('colors');
const request = require('request');


const config = require('./config.json');
const key = config.api_key;
const token = config.token;
const prefix = config.prefix;

// Démarrage du bot.

client.on("ready", function() {
    console.log("[".white + "+".cyan + "]".white + " -".cyan + " VerifID V1.0 crée et développé par".white + " Aslak#001".cyan + ".".white);
    console.log("[".white + "+".cyan + "]".white + " -".cyan + " Le vérificateur utilise l'api bincodes (".white + "https://bincodes.com/".cyan + ")".white + ".".white);
});


client.on("message", function(m) {
    if(message.channel.type !== "text") return;
    var args = message.content.split(/ +/);

    switch(args[0]) {

        // Lorsque l'utilisateur exécute la commande...

        case `${prefix}verif`:
            if(message.deletable) m.delete()
            if(!args[1]) {

                // Si le NIB n'est pas valide...

                message.channel.send(":x: | Merci de bien vouloir préciser un numéro d'identification bancaire valide.\n__**Exemple**__ : " + prefix + "verif 624680")
                return;
            } else {

                // Si le NIB est valide alors envoyé le résultat.

                if(message.deletable) message.delete()
                request(`http://api.bincodes.com/bin/?format=json&api_key=${key}&bin=${args[1]}`, function(error, response, body) {
                    if(!error && response.statusCode === 200) {
                        let page = JSON.parse(body);
                        message.channel.send("> N°ID Bancaire : " + args[1] + "\n> Banque : " + page.bank + "\n> Marque : " + page.card + "\n> Type : " + page.type + "\n> Niveau : " + page.level + "\n> Pays : " + page.country)
                    }
                })
            }
            break;

    };

});

// Veuillez entrer le token de votre bot à la place de "token".

client.login(token);
