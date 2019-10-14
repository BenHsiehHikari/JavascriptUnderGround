# 正則表達式

由於之前一直有聽到這個東西,想說現在來做個理解,對於驗證,比對的時候很好用。

先上[ＭＤＮ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions),主要都是從這裡參考而來的

然後有個檢測正規表達式的網站 [參考](https://regex101.com/) 

開始介紹吧

| ^        | 開頭符合                                            |
| -------- | :-------------------------------------------------- |
| $        | 結尾符合                                            |
| .        | 與任何一個字元符合                                  |
| \w       | 與所有大/小寫英文、數字、底線符合(與A-Za-z0-9_符合) |
| \d       | 與所有數字符合(與0-9符合)                           |
| \D       | 除了數字以外的字元(與0-9不符合)                     |
| \n       | 與換行符合                                          |
| \r       | 與Enter符合                                         |
| \s       | 與空白字元符合                                      |
| \S       | 與空白字元不符合                                    |
| [ ]      | 指定的範圍，例如[a-f]                               |
| [^]      | 字串中不含有裡面字元的匹配                          |
| [0-9]    | 若含0到9的字元則匹配                                |
| [a-z]    | 若含a到z的字元則匹配                                |
| ?        | 未出現或出現一次                                    |
| *        | 未出現或出現多次                                    |
| +        | 出現一次或多次,至少一次                             |
| {a}      | 出現 a 次                                           |
| {a,}     | 至少出現 a 次以上                                   |
| {,b}     | 最多出現 b 次                                       |
| {a,b}    | 最少出現 a 次，最多出現 b 次                        |
| /ben/    | 含有ben的字串                                       |
| /./      | 含有任意字元的字串                                  |
| /ben./   | 含有apple後面接任意字元的字串                       |
| /ben/i   | 不分英文大小寫                                      |
| /apple/g | 全域匹配                                            |
| m        | 多行匹配                                            |
| y        | Sticky matching 對最後一次符合地方比對,(lastIndex)  |
| u        | Unicode 數值跳脫字元                                |
|          |                                                     |



參考資料
https://5xruby.tw/posts/learn-regular-expression/

https://ithelp.ithome.com.tw/articles/10205643?sc=iThelpR

http://larry850806.github.io/2016/06/23/regex/

http://f2e-veru.com/%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98/JavaScript%E6%AD%A3%E5%89%87%E8%A1%A8%E9%81%94%E5%BC%8F(Regular-Expression)/

https://neohsuxoops.blogspot.com/2018/09/jqueryfunction.html

https://dotblogs.com.tw/tingi/2018/07/02/164004

https://www.youtube.com/watch?v=r6I-Ahc0HB4&list=PL4cUxeGkcC9g6m_6Sld9Q4jzqdqHd2HiD



