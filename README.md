# Tote betting

This program calculates the dividends for a simplified form of Tote betting.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have the latest version of [npm](https://docs.npmjs.com/getting-started/installing-node) and node installed.

### Installing

Once node and npm are installed, open a terminal or command prompt at the location of your project

```
cd path/to/my/project
```

And then run npm install to install all the required dependencies

```
npm install
```


## Running the tests

As for the install process, you will need to open a terminal or command prompt at the location of the project. 

```
cd path/to/my/project
```

To run the unit tests, execute the following command

```
./node_modules/mocha/bin/mocha test
```

Alternatively, if you have mocha installed globally, you can run
```
mocha test
```

## Running the console app

As for the install and tests process, you will need to open a terminal or command prompt at the location of the project.

```
cd path/to/my/project
```

Run following command

```
node ./index.js
```

You will be asked for your inputs. Copy the content of the [inputs.txt](input.txt) file, and paste it in the terminal.
Alternatively you can add bets and inputs manually.
If you do so, make sure to follow the following syntax for bets:
Bet:<product>:<selections>:<stake> where:
- product is W (Win), P (Place) or E (Exacta).
- selection is the chosen horse number W & P (i.e: 1), or the chosen horses numbers separated by comma for E (i.e: 2,3)
- stake is the bet amount in dollars
Here are some examples
```
Bet:W:1:3
```
```
Bet:P:2:16
```
```
Bet:E:1,3:93
```

Here is the format for results:
Result:<first>:<second>:<third> where first, second and third are the horses number in the order of arrival.
Here is an example:
```
Result:2:3:1
```

Once a result is given as input, the software computes the dividend, displays the dividend in the command line and exits.

## Assumptions

I made the assumption that if no horse makes it to the finish line, or not enough horses make it to the finish line, there will be no dividend for the punters.

## Code organisation

I have created:
- 3 classes: [Race](race.js), [Bet](bet.js) and [Dividend](dividend.js)
- 3 helper services: a [general helper](general.service.js), a [bet helper](bet.service.js) and a [race helper](race.helper.js). The bet and race helpers have functions that are not manipulating the class instance directly.
- 1 [enumeration](enums.js), representing the product type (W, P or E). As JavaScript does not have enumerations, I created an object that mimics an enumeration as in Java for example. I improved the enumeration by adding some helper methods to it, as well as some properties.
- [stdHandler.js](stdHandler.js), which reads the input and uses the Race, Bet and Dividend classes to compute the dividend and display them in the prompt.
- [index.js](index.js), the bootstrap file. It simply clears the prompt the user to set the inputs.

## Sample file

There is a sample test case in [inputs.txt](inputs.txt)

## Authors

* **Jonathan Noe** - Software engineer for more than 6 years.
