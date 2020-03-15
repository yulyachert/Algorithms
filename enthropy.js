function stat(str)
{
  	var str = process.argv[2];
	if (!str)
		return 0;
	else
	{
		var stat = [];
      	var probab = [];
		for ( var i = 0; i < str.length; i++)
		{
			var letter = str.charAt(i);
			if(!(letter in stat))
				stat[letter] = 1;
			stat[letter]++;
		}
      	
      	for (letter in stat)
        {
          probab[letter] = stat[letter]/str.length;
        }
		return probab;
	}
}
function entropy (probab)
{
	var enthropy = 0;
	for ( var letter in probab)
	{
		enthropy -= probab[letter] * Math.log(probab[letter]) / Math.log(2);
	}
	return enthropy;
}
console.log(entropy(stat(str)).toFixed(2));


