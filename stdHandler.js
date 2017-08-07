"use strict";
var Race = require("./race").Race;
var Bet = require("./bet").Bet;
var Dividend = require("./dividend").Dividend;
var ProductType = require("./enums").ProductType;

exports.computeStdin = input => {
  if (input) {
    const race = new Race();
    const lines = input.split(/\r|\n/);
    for (let line of lines) {
      if (line) {
        let parsedLine = this.parseLine(line);
        if (parsedLine) {
          if (parsedLine instanceof Bet) {
            race.placeBet(
              parsedLine.product,
              parsedLine.selection,
              parsedLine.stake
            );
          } else if (Array.isArray(parsedLine)) {
            race.setResult(parsedLine);
            return this.writeDividend(race.computeDividend());
          }
        }
      }
    }
  } else {
    return "No input has been specified, please run again:\n";
  }
};

exports.parseLine = line => {
  if (!line.startsWith("Bet") && !line.startsWith("Result")) return undefined;
  if (line.startsWith("Bet")) {
    return this.parseBetLine(line);
  } else {
    return this.parseResultLine(line);
  }
};

exports.parseBetLine = line => {
  if (line.startsWith("Bet")) {
    let splitBet = line.split(":");
    if (splitBet.length === 4) {
      splitBet = splitBet.slice(1, 4);
      if (ProductType.isIdentifier(splitBet[0])) {
        const product = ProductType.getValue(splitBet[0]);
        let selection;
        const stake = parseFloat(splitBet[2]);
        switch (product) {
          case ProductType.W:
          case ProductType.P:
            const chosenHorse = parseInt(splitBet[1]);
            if (chosenHorse) selection = [chosenHorse];
            break;
          case ProductType.E:
            const chosenHorses = splitBet[1].split(",");
            if (Array.isArray(chosenHorses) && chosenHorses.length === 2) {
              selection = chosenHorses.reduce((filtered, horse) => {
                const horseNumber = parseInt(horse);
                if (horseNumber) {
                  filtered.push(horseNumber);
                }
                return filtered;
              }, []);
            }
            break;
          default:
            return undefined;
        }
        return new Bet(product, selection, stake);
      } else return undefined;
    } else return undefined;
  } else return undefined;
};

exports.parseResultLine = line => {
  if (line.startsWith("Result")) {
    let splitResult = line.split(":");
    splitResult = splitResult.slice(1, line.length);
    return splitResult.reduce((filtered, horse) => {
      const horseNumber = parseInt(horse);
      if (horseNumber) {
        filtered.push(horseNumber);
      }
      return filtered;
    }, []);
  }
};

exports.writeDividend = dividends => {
  if (Array.isArray(dividends)) {
    dividends.map(dividend => {
      if (dividend && dividend instanceof Dividend) {
        console.log(dividend.toString());
      }
    });
  }
};
