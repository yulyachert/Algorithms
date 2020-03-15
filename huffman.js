var str = 'abcababa';
function node(name, fr, used, code, link)
{
    this.name = name;
    this.fr = fr;
    this.used = used;
    this.code = code;
    this.link = link;
}

function minimalLetter(str, tree, codenum)
{
    var fr1 = str.length;
    var num = 0;
    for (var i = 0; i < tree.length; i++)
        if ((tree[i].fr < fr1) && (tree[i].used == 0))
        {
            fr1 = tree[i].fr;
            num = i;
        }
    tree[num].used = 1;
    tree[num].code = codenum;
    tree[num].link = tree.length;
    return num;
}

var alph = new Array();
for (var i = 0; i < str.length; i++)
    alph[str.charAt(i)] = 0;
for (var i = 0; i < str.length; i++)
    alph[str.charAt(i)]++;

var tree = new Array();

for (var letter in alph)
{
    var character = new node(letter, alph[letter], 0, "", null);
    tree.push(character);
}

if (tree.length == 0)
{
    console.log('Sorry, your string is empty');
}
else
{
    if (tree.length == 1)
    {
        tree[0].code = 0;
    }
    else
    {
        for (var i = 1; i < tree.length; i++)
        {
            num1 = minimalLetter(str, tree, 0);
            num2 = minimalLetter(str, tree, 1);
            var n = new node(tree[num1].name + tree[num2].name, tree[num1].fr + tree[num2].fr, 0, "", null);
            tree.push(n);
        }
    }
}
console.log(tree);