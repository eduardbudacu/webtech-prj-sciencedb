var bibtexParse = require('bibtex-parse-js');
var transliteration = require('transliteration');
var fs = require('fs');
var tr = transliteration.transliterate;

var http = require('http');

function createArticle(article) {
    var post_req  = null;
    var post_data = JSON.stringify(article);
        
    var post_options = {
        hostname: 'agileresearch-sciencedb.azurewebsites.net',
        path    : '/articles',
        method  : 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Content-Length': post_data.length
        }
    };
    
    post_req = http.request(post_options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ', chunk);
        });
    });
    
    post_req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    
    post_req.write(post_data);
    post_req.end();
}


var year = "2016";
var fileContent = fs.readFileSync("data/"+year+".bib", 'utf8');
fileContent = tr(fileContent);

var parts = fileContent.split("@");

var success = 0;
var err = 0;
var results = [];

var errors = [];
parts.forEach(function(value){
	try{
		success++;
		var article = bibtexParse.toJSON("@"+value);
		results.push(article[0]);
		var data = {};
		data.title = article[0]['entryTags']['title'];
		data.abstract = article[0]['entryTags']['abstract'];
		data.authors = article[0]['entryTags']['author'];
		if(article[0]['entryTags']['keywords']) {
			data.keywords = article[0]['entryTags']['keywords'].join(",");
		}
		data.url = article[0]['entryTags']['url'];
		createArticle(data);
		console.log(article[0]['entryTags']['title']);
	} catch (e) {
		err++;
		errors.push("@"+value);
		errors.push(e.message);
	}
});

console.log(success);
console.log(err);

//write json file
var jsonString = JSON.stringify(results);
fs.appendFile("data/"+year+".json", jsonString, function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log("The json file was saved!");
	}
}); 


fs.appendFile("data/"+year+".err", errors.join("\r\n"), function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log("The error file was saved!");
	}
});