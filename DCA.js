var stringFile = process.argv[2];
var substringFile = process.argv[3];
var fs = require('fs');
try {
    string = fs.readFileSync(stringFile, 'binary');
} catch (exception) {
    throw new Error('Please write the string');
}
try {
    var substring = fs.readFileSync(substringFile, 'binary');

} catch (exception) {
    throw new Error('Please write the substring');
}
var keys = getKeys(keys, process.argv);
var startTime = Date.now();
var automat = createAutomaton(substring);
var result = findSubstring(string, substring, automat, keys.numberOfResults);
var finalTime = Date.now();
var time = finalTime - startTime;

function getKeys(keys, array) {
    var keys = {
        computeTime: false,
        showAutomat: false,
        numberOfResults: -1
    };
    consoleKeys = process.argv.slice(4);
    for (var i = 0; i < consoleKeys.length; i++)
        switch (consoleKeys[i]) {
            case '-s':
                keys.showAutomat = true;
                continue;
            case '-n':
                keys.numberOfResults = consoleKeys[i + 1];
                continue;
            case '-t':
                keys.computeTime = true;
                continue;
        }
    return keys;
}

function createAutomaton(str) {
    var alphabet = [],
        automaton = [];
    for (var i = 0; i < str.length; i++) {
        alphabet[str.charAt(i)] = 1;
        automaton[i] = [];
    }
    automaton[str.length] = [];

    for (var letter in alphabet)
        automaton[0][letter] = 0;

    for (var state = 0; state < str.length; state++) {
        var prev = automaton[state][str.charAt(state)];
        automaton[state][str.charAt(state)] = state + 1;
        for (var letter in alphabet)
            automaton[state + 1][letter] = automaton[prev][letter];
    }
    return automaton;
}

function findSubstring(string, substring, automat, numberOfResults) {
    var state = 0;
    var indexes = [];
    var i = 0;
    while ((i < string.length) && (indexes.length != numberOfResults)) {
        if (string.charAt(i) in automat[state])
            state = automat[state][string.charAt(i)];
        else
            state = 0;
        if (state === substring.length)
            indexes.push(i - substring.length + 1)
        i++;
    }

    return indexes;
}

function printAutomaton(automaton) {
    line = '     ';
    for (var symbol in automaton[0])
        line += symbol + '    ';
    console.log(line);
    for (var i = 0; i < automaton.length; i++) {
        line = i;
        for (var j = 0; j < 5 - (i + '').length; j++)
            line += ' ';
        for (var k in automaton[i]) {
            line += automaton[i][k] + '';
            for (var l = 0; l < 5 - (automaton[i][k] + '').length; l++)
                line += ' ';
        }
        console.log(line);
    }

}

console.log(result.join(', '));
if (keys.computeTime) {
    console.log('Time: ' + String(time) + 'ms');
}
if (keys.showAutomat) {
    printAutomaton(automat);
}
