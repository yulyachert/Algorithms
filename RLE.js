function encodeRLE(s)
{
    var answer = "";
    for (var i = 0; i < s.length; ++i)
    {
        var count = 1;
        while (((s.charAt(i) === '#' && count < 256 ) || (count < 259 && s.charAt(i) !== '#'))&& (i + 1 < s.length) && (s.charAt(i) === s.charAt(i+ 1)))
        {
            ++count;
            ++i;
        }
        if (count < 4 && s.charAt(i) !== '#')
        {
            for (var j = 0; j < count; ++j)
                answer += s.charAt(i);
        }
        else if (s.charAt(i)=== '#')
        {
            answer += '#' + String.fromCharCode(count - 1) + s.charAt(i);
        }
        else
        {
            answer += '#' + String.fromCharCode(count - 4) + s.charAt(i);
        }
    }
    return answer;
}

function decodeRLE(s)
{
    var answer = "";
    for (var i = 0; i < s.length; ++i)
    {
        if (s.charAt(i) === '#')
        {
            var count = s.charCodeAt(i + 1);
            if (s.charAt(i+2) === '#')
                var shift = 1;
            else
                shift = 4;
            for(var j = 0;j < count + shift;j++) {
                answer+=s.charAt(i+2);
            }
            i += 2;
        }
        else
        {
            answer += s.charAt(i);
        }
    }
    return answer;
}

var fs = require('fs');
var com = process.argv[2];
var input = process.argv[3];
var output = process.argv[4];
try {
    var s = fs.readFileSync(input, 'binary');
} catch (exeption) {
    console.log("Error. Cannot read file ");
    return 1;
}
if (typeof com == 'undefined')
    console.log("ERROR EMPTY LINE");
else
{
    if (com == "encode")
        fs.writeFileSync(output, encodeRLE(s),'binary');
    else if (com == "decode")
        fs.writeFileSync(output, decodeRLE(s),'binary');
    else
        console.log("INCORRECT QUIER");
}