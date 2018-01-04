var superagent = require("superagent"),
	cheerio = require("cheerio"), // Works like jQuery in node.js
	CronJob = require("cron").CronJob, // Repeating the program
	Datastore = require("nedb"); // Database: NeDB

// Targeting webpage.
var pageUrl = "http://www.boc.cn/sourcedb/whpj/index.html";

// Creating database.
var db = new Datastore({
		filename: '/Users/Rawtimmy/Documents/GitHub/ForexRateWebCrawler/db/GBPCNY.db', // Path of Database
		autoload: true // Have to use loadDatabase() if no "autoload".
	});

// Main Program
function start(){
	new CronJob('0 */5 * * * *', // Run the function every 5 minutes
		function(){
			superagent
				.get(pageUrl)
				.end(function(err,pres){

					let date = new Date();
					console.log("开始时间: " + date.toTimeString());
					console.log("爬取中行英镑汇率数据...\n");

					// Targeting into specific HTML part wanted, in this case GBPCNY part.
					let $ = cheerio.load(pres.text,{ decodeEntities: false });
					let targetTable = $('.main').nextAll().html();
					let startPos = targetTable.indexOf("<td>英镑</td>")
					let targetStr = targetTable.substring(startPos,startPos+300);

					// Use regular expression to pull out all wanted elements.
					let tdRex = /<td>(.*)<\/td>/g;
					let found = targetStr.match(tdRex);
					for(let i = 0; i < found.length; i++){
						let temp = found[i].length;
						found[i] = found[i].slice(4,temp - 5);
					}

					// Use object to save all wanted elements.
					let title = ["现汇买入价","现钞买入价","现汇卖出价","现钞卖出价","中行折算价","发布日期","发布时间"];
					let doc = {};
					for(let i = 1; i < found.length; i++){
						if(i < 6){
							doc[title[i-1]] = parseFloat(found[i]);
						}else{
							doc[title[i-1]] = found[i];
						}
					}

					// Display data on console.
					console.log("每100英镑: ");
					console.log("现汇买入价: ¥" + found[1]);
					console.log("现钞买入价: ¥" + found[2]);
					console.log("现汇卖出价: ¥" + found[3]);
					console.log("现钞卖出价: ¥" + found[4]);
					console.log("发布时间: " + found[6] + " " + found[7] + "\n");
					console.log("爬取结束。\n");

					// Inserting Data into dataBase.
					db.insert(doc,function(err,newDoc){});
					db.find({'发布日期':'2018-01-04'},function(err,docs){
						console.log("数据库已录入"+ docs.length + "份数据。\n");
					});
					console.log("录入数据到数据库...");
					console.log("录入完毕。");
				});
			},null,true,null);
}

exports.start = start;
