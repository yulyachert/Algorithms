function prefixFunc(str){
    pf = new Array(str.length);
    pf[0]=0;
    k=0;
    for (var i=1; i<str.length; i++){
        while ((k>0)&&(str.charAt(k)!==str.charAt(i)))
            k=pf[k-1];
        if (str.charAt(k)==str.charAt(i))
            k++;
        pf[i]=k;
    }
    return pf;
}
function makeTableOfRightEntries(substr){
    var tableOfRightEntries = new Array();
    for (var i=0; i<substr.length; i++)
        tableOfRightEntries[substr[i]]=i;
    return tableOfRightEntries;
}
function badSymbol(tableOfRightEntries,symbol,substrLength,k){
    if (symbol in tableOfRightEntries)
        var shift=Math.max(1,(substrLength-tableOfRightEntries[symbol]-k-1));
    else var shift=substrLength-k;
    return shift;
}
function makeSuffixTable(substrPrefixes, reversedSubstrPrefixes, substrLen){
    var suffixTable = new Array(substrLen);
    for (var i=0; i<substrLen; i++)
        suffixTable[i]=substrLen-substrPrefixes[substrLen-1];
    for (var i=1; i<substrLen; i++){
        var j=reversedSubstrPrefixes[i];
        suffixTable[j]=Math.min(suffixTable[j],i-reversedSubstrPrefixes[i]+1);
    }
    suffixTable[0]=0;
    suffixTable.reverse();
    return suffixTable;
}
function goOverStr(str, substr){
    var substrLength = substr.length;
    var indexesOfEntries=[];
    var countOfEntries=0, i=0, same=0;
    var reversedSubstr=substr.split("").reverse("").join("");
    var tableOfRightEntries=makeTableOfRightEntries(substr);
    var suffixTable=makeSuffixTable(prefixFunc(substr),prefixFunc(reversedSubstr),substrLength);
    while (i<=str.length-substrLength)
        for (var j=substrLength-1+i; j>=i; j--)
            if (substr[j-i]===str[j]){
                same++;
                if (same===substrLength){
                    same=0;
                    indexesOfEntries[countOfEntries]=i;
                    countOfEntries++;
                    i+=Math.max(suffixTable[same],1)
                    break;
                }
            }
            else
            {
                i+=Math.max(badSymbol(tableOfRightEntries,str[j],substrLength,same), suffixTable[j-i]);
                same=0;
                break;
            }
    return indexesOfEntries;
}
function writeFirstNEntries(indexes, n){
    if (indexes.length>n)
        indexes=indexes.splice(0,n);
    return indexes.join(", ");
}
function getTime(str,substr){
    var timer="Time";
    console.time(timer);
    goOverStr(str,substr);
    console.timeEnd(timer);
}
var fs=require('fs');
var str=fs.readFileSync(process.argv[2], 'UTF-8').toString().toLowerCase();
var substr=fs.readFileSync(process.argv[3], 'UTF-8').toString().toLowerCase();
var needTimer=false;
var n=-1;
for (var i=4; i<process.argv.length; i++){
    if (process.argv[i]==="-t")
        needTimer=true;
    if (process.argv[i]=="-n")
        n=process.argv[i+1];
}
indexes=goOverStr(str,substr);
if (n===-1)
    n=indexes.length;
console.log(writeFirstNEntries(indexes,n));
if (needTimer)
    getTime(str,substr);
