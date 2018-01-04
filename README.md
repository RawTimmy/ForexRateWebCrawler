# ForexWebCrawler 外汇爬虫

## Introduction 介绍

#### English Version
This webcrawler aims to grab and gather foreign exchange currency rate infomation from boc.cn exchange rate page. Currently this webcrawler only aims to the chinese version site.

| Chinese Version Site | English Version Site |
| --- | --- |
| http://www.boc.cn/sourcedb/whpj/index.html | http://www.boc.cn/sourcedb/whpj/enindex.html |

The main programming language used is javascript. Using node.js as an open source sever framework, this aims to create either a personalised website or program of foreign exhcnage currency rate, however so far it is only a script.

It is created by interest, there is no commercial purpose involved.

#### 中文版本
这只爬虫主要用于抓取中国银行官网外汇牌价页中的外汇信息，中行网页有分中文版本和英文版本，目前爬虫只用于中文版本。

| 中文版本网页 | 英文版本网页 |
| --- | --- |
| http://www.boc.cn/sourcedb/whpj/index.html | http://www.boc.cn/sourcedb/whpj/enindex.html |

这爬虫是由编程语言Javascript编写的。最终目的是创建一个用于显示外汇信息的个人定制网页或程序，但目前它也就只是个脚本。它由兴趣而生，不带有任何商业目的。

## Getting Start 简单入门
```
$ node index.js
```

## Change Log 更新日志
### `0.0.1` (2018-01-04)
#### Added 添加
* Targeting Forex info website: boc.cn
* Gathering infomation about foreign currency exchange: British Sterling(GBP) to Chinese Yuan(CNY).
* Install "cron" module to allow webcrawler to run automatically and periodically: every 5 minutes.
* Install "nedb" module to implement a database to store the data.
* 锁定 boc.cn 为爬虫目标网站。
* 爬取 英镑（GBP）兑人民币(CNY) 的外汇信息。
* 添加“cron”模块让爬虫自动定时运行：5分钟一次。
* 添加“nedb”模块作为数据库存储爬取到的数据。
