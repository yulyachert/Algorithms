function caesarEncode (str,shift){
    str = str.toLowerCase();
    str = str.split('');// поменять название
    var firstLetterCode = 'a'.charCodeAt(0);
    var lastLetterCode = 'z'.charCodeAt(0);
    var tempStr = [];// поменяю название
    for (;shift < 0;shift += 26);// сделать взятие остатка
    for (var i = 0; i < str.length; i++) {
        if (str[i].charCodeAt(0) >= firstLetterCode && str[i].charCodeAt(0) <= lastLetterCode)
            tempStr.push(String.fromCharCode((str[i].charCodeAt(0) - firstLetterCode + shift) % 26 + firstLetterCode));
    }
    return tempStr.join('');
}

var str = 'frnwefdpfpekix';
var shift = -5;
console.log(caesarEncode(str,shift));

function caesarDecode (str){
    var alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g','h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u' , 'v', 'w', 'x', 'y', 'z'];
    var numbAlph = [];
    for (i = 0; i < alph.length; i++)
        numbAlph[alph[i]] = i;

    var currfreq = [];
    for (i = 0; i < alph.length; i++)
        currfreq[alph[i]] = 0;

    var charCount = 0;
    for(var i = 0; i < code.length; i++)
        if (isLetter(code.charAt(i)))
        {
            currfreq[code.charAt(i).toLowerCase()]++;
            charCount++;
        }

    for (var i in currfreq)
        currfreq[i] /= charCount;

    var checksum = [];

    for (var shift = 0; shift < alph.length; shift++)
    {
        var sum = 0;
        for (var i = 0; i < alph.length; i++)
        {
            var fr1 = freq[alph[i]]
            var fr2 = currfreq[alph[(i + shift) % alph.length]]
            sum += Math.pow(fr1-fr2, 2)
        }
        checksum[shift] = sum;
    }

    var min = checksum[0];
    var shift = 0;
    for (var i = 1; i < checksum.length; i++)
        if (checksum[i] < min)
        {
            min = checksum[i];
            shift = i;
        }

    console.log(alph.length - shift);
}


}