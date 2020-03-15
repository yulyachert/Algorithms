function sameSymbol(string, substring) {
    var bool = true;
    for (var i = 0; i < substring.length; i++)
        if (string[i] !== substring[i])
            bool = false;
    return bool;

}

function rabinCarpHashes(string, substring) {
    var sumOfHashes = 0;
    var sumOfLineHashes = 0;
    var countOfCollisions = 0;
    var indexes = [];
    var m = 0;
    var startTime = Date.now();
    const base = 2;
    for (var i = 0; i < substring.length; i++)
        sumOfHashes += substring.charCodeAt(i) * Math.pow(base, i);
    for (var j = 0; j < substring.length; j++) {
        sumOfLineHashes += string.charCodeAt(j) * Math.pow(base, j);
    }
    while (m !== string.length - substring.length+1) {
        if (sumOfLineHashes !== sumOfHashes)
            m++;
        else {
            if (compareBySymbol(string.substring(m, m + j + 1), substring))
                indexes.push(k);
            else
                countOfCollisions++;
        }

        sumOfLineHashes-=string.charCodeAt(m);
        sumOfLineHashes/=base;
        sumOfLineHashes+=string.charCodeAt(substring.length)*Math.pow(base,substring.length-1);
        m++;

    }
    var finalTime = Date.now();
    console.log(indexes);
}
module.exports.find =rabinCarpHashes;
