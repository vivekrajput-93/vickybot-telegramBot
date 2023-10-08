const { Telegraf } = require("telegraf");
require('dotenv').config();
const axios = require('axios'); 

const bot = new Telegraf(process.env.TOKEN_BOT);

bot.start((ctx) => ctx.reply("Hey, Welcome to Vivek-bot, Know Everthing about your fav movies. ?"));


// Use bot.command to handle a specific command, e.g., /search
bot.command('search', async (ctx) => {
  await ctx.reply("Please enter the name of the movie:");

  // Listen for the user's input as text
  bot.on('text', async (ctx) => {
    const movieName = ctx.message.text;

    try {
      const apiKey = "edd3c9be"; 
      const response = await axios.get(`https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`);
      
      if (response.data.Response === 'True') {
        const movieInfo = response.data;
        // Display movie information to the user
        await ctx.reply(`Title: ${movieInfo.Title}\nYear: ${movieInfo.Year}\nPlot: ${movieInfo.Plot}\nReleased :${movieInfo.Released}\n Director : ${movieInfo.Director}\n Actors : ${movieInfo.Actors}`);
      } else {
        await ctx.reply(`Movie not found.`);
      }
    } catch (error) {
      console.error(error);
      await ctx.reply(`An error occurred while fetching movie information.`);
    }
   
  });
});

bot.on('sticker', (ctx) => ctx.reply("❤️"));

bot.launch();
