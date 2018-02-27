const env = require('../.env');
const Telegraf = require('telegraf');
const axios = require('axios');
const bot = new Telegraf(env.token);

bot.on('voice', async ctx => {
  const id = ctx.update.message.voice.file_id;
  // a resposta é o metadaos que contem o path do arquivo
  const res = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`);
  // O arquivo fica disponivel por 1 hora
  ctx.replyWithVoice({ url: `${env.apiFileUrl}/${res.data.result.file_path}` });
});

bot.on('photo', async ctx => {
  const id = ctx.update.message.photo[0].file_id;
  const res = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`);
  ctx.replyWithPhoto({ url: `${env.apiFileUrl}/${res.data.result.file_path}` });
});

bot.startPolling();
