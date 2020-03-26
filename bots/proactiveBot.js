// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory, TurnContext, ActivityTypes,ActionTypes, CardFactory } = require('botbuilder');

class ProactiveBot extends ActivityHandler {
    constructor(conversationReferences) {
    const url = 'https://moroccostats.herokuapp.com/stats/coronavirus/countries/morocco/';
    const url2 = 'https://moroccostats.herokuapp.com/stats/coronavirus/countries/morocco/regions';
var request = require("request")
 var Data;
 var Regions;
 var value;
  var val;
request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       Data=body;
    }
})
var req = require("request")
req({
    url: url2,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       val=body;
    }
})
        super();


        this.conversationReferences = conversationReferences;

        this.onConversationUpdate(async (context, next) => {

            this.addConversationReference(context.activity);

            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    const welcomeMessage = 'Welcome to the Moroccovid-19 Bot !';
                    await context.sendActivity(welcomeMessage);
                }
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
this.onMessage(async (context, next) => {
this.addConversationReference(context.activity);
const reply = { type: ActivityTypes.Message };
request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       Data=body;
    }
})

	if (context.activity.text === 'wait') {
		 context.sendActivities([
			{ type: ActivityTypes.Typing },
			{ type: 'delay', value: 3000 },
			{ type: ActivityTypes.Message, text: `You said '${ context.activity.text }'.` }
		]);
	} else if (context.activity.text === 'Get'){
	    const buttons = [
            { type: ActionTypes.ImBack, title: 'Regions', value: 'Regions' }
        ];
        const card = CardFactory.heroCard('', undefined,
            buttons, { text: `Morocco\nTotal Cases: '${ Data.totalcases }'.\nNewcases: '${ Data.newcases }'.\nTotal Deaths: '${ Data.totaldeaths }'.\nNew Deaths: '${ Data.newdeaths }'.\nRecovered: '${ Data.recovered }'.\nActive cases: '${ Data.activecases }'.\n` });

        reply.attachments = [card];
	   await context.sendActivity(reply);
	 await next();
	}
	else if (context.activity.text === 'Regions'){
req({
    url: url2,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       val=body;
    }
})
	 reply.text=` Beni Mellal Khenifra: '${ val.BeniMellalKhnifra }'.\nDaraa tafilalet: '${ val.Daraatafilalet }'.\nFès Meknes: '${ val.Fsmeknes }'.\nOriental: '${ val.Oriental }'.\nSouss Massa: '${ val.SoussMassa }'.\nCasa Settat: '${ val.CasaSettat }'.\nGuelmim OuedNoun: '${ val.GuelmimOuedNoun }'.\nMarrakech Safi: '${ val.MarrakechSafi }'.\nRabat Salé Kenitra: '${ val.RabatSalKenitra }'.\nTanger Tetouan AlHoceima: '${ val.TangerTetouanAlHoceima }'.\n`;
	 await context.sendActivity(reply);
	 await next();	
	}
	 else {
request({
    url: url,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
       value=JSON.stringify(body);
       console.log(value) // Print the json response
    }
})
	 reply.text=value;
	 //await context.sendActivity(reply);
	 await next();	        
	}
	
	
});
    }

    addConversationReference(activity) {
        const conversationReference = TurnContext.getConversationReference(activity);
        this.conversationReferences[conversationReference.conversation.id] = conversationReference;
    }
}

module.exports.ProactiveBot = ProactiveBot;
