var fetch = require('node-fetch');
const { Telegraf } = require('telegraf')
var cron = require('node-cron');

const bot = new Telegraf('BOT_TOKEN')

async function currency() {
    let usd = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&valcode=USD').then(res => res.json()).then(data => data[0].rate)
    let eur = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&valcode=EUR').then(res => res.json()).then(data => data[0].rate)
    let rub = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&valcode=RUB').then(res => res.json()).then(data => data[0].rate)
    let message = `💰Курс валют на сьогодні: \nUSD - ${usd} \nEUR - ${eur} \nRUB - ${rub}`
    bot.telegram.sendMessage('CHANNEL_NAME', message)
}


cron.schedule('00 08 * * *', () => {
    currency()
  });
