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

const reply = { type: ActivityTypes.Message };
request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       Data=body;
    }
})
switch(context.activity.text) {
  case 'Get Started':
  context.sendActivities([
   { type: ActivityTypes.Typing },
   { type: 'delay', value: 3000 },
   { type: ActivityTypes.Message, text: `Welcome {{user_first_name}}! Thank you for subscribing. You will receive the incoming news of Covid-19 in Morocco soon, stay tuned!\r\n
   If you ever want to unsubscribe just type 'stop'` }
 ]);
    break;
  case 'Get':
  const buttons = [
        { type: ActionTypes.ImBack, title: 'Regions', value: 'Regions' }
    ];
    const card = CardFactory.heroCard('', undefined,
        buttons, { text: `Morocco\r\nTotal Cases: '${ Data.totalcases }'\r\nNewcases: '${ Data.newcases }'\r\nTotal Deaths: '${ Data.totaldeaths }'\r\nNew Deaths: '${ Data.newdeaths }'\r\nRecovered: '${ Data.recovered }'\r\nActive cases: '${ Data.activecases }'\r\n` });

    reply.attachments = [card];
 await context.sendActivity(reply);
await next();
    break;
    case 'Regions':
    req({
        url: url2,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
           val=body;
        }
    })
    	 reply.text=` Beni Mellal Khenifra: '${ val.BeniMellalKhnifra }'\r\nDaraa tafilalet: '${ val.Daraatafilalet }'\r\nFès Meknes: '${ val.Fsmeknes }'\r\nOriental: '${ val.Oriental }'\r\nSouss Massa: '${ val.SoussMassa }'\r\nCasa Settat: '${ val.CasaSettat }'\r\nGuelmim OuedNoun: '${ val.GuelmimOuedNoun }'\r\nMarrakech Safi: '${ val.MarrakechSafi }'\r\nRabat Salé Kenitra: '${ val.RabatSalKenitra }'\r\nTanger Tetouan AlHoceima: '${ val.TangerTetouanAlHoceima }'.\n`;
    	 await context.sendActivity(reply);
    	 await next();
    break;
    case 'stop':
	this.delConversationReference(context.activity);
  reply.text="We are sorry for the incovenience. If you ever want to go back, and subscribe please type 'start' ";
  await context.sendActivity(reply);
  await next();
    break;
    case 'Help':
    reply.text="Moroccovid-19 Bot\r\nUsage: 'Get' to get the latest news of Morocco\r\n\t'Regions' to get the latest news of the regions of Morocco\r\nThank you!";
    await context.sendActivity(reply);
    await next();
    break;

  default:
  // request({
  //     url: url,
  //     json: true
  // }, function (error, response, body) {
  //     if (!error && response.statusCode === 200) {
  //        value=JSON.stringify(body);
  //        console.log(value) // Print the json response
  //     }
  // })
     //reply.text=value;
     //await context.sendActivity(reply);
     await next();
}

});
    }
    delConversationReference(activity) {
        const conversationReference = TurnContext.getConversationReference(activity);
        delete this.conversationReferences[conversationReference.conversation.id] ;
        console.log(this.conversationReferences)
    }
    addConversationReference(activity) {
        const conversationReference = TurnContext.getConversationReference(activity);
        console.log(conversationReference)
        this.conversationReferences[conversationReference.conversation.id] = conversationReference;
        console.log(this.conversationReferences)
    }
}

module.exports.ProactiveBot = ProactiveBot;
