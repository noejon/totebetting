"use strict";
const prompt = require("prompt-promise");
const clear = require("clear");
const stdHandler = require("./stdHandler");

clear();

function getActions(callback) {
  prompt
    .multiline(
      "\nPlease enter your bets and when the race is finished, enter the result to get the dividends\n"
    )
    .then(result => {
      return callback(result);
    })
    .then(() => {
      prompt.end();
    })
    .catch(error => {
      prompt.end();
      console.log(error);
    });
}

getActions(stdHandler.computeStdin);
