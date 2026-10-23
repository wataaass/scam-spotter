# map: scam-tactics

問い: 詐欺見抜きゲーム（メール・SMS・SNS の画面を見て本物か詐欺かを選ぶ）の問題と解説を、公的機関の公表に沿って作るには、どんな手口と見抜き方の情報があるか。とくに最近の「巧妙な」手口（見た目では本物と区別しにくいもの）は何か。
最初の検索語: フィッシング 手口 警察庁 / 不在通知 SMS / smishing / phishing training game effectiveness

## 要る主張
- [x] 1. 詐欺の手口と見抜き方の知見はどこ（どの公的機関・団体のどのページ）に集まっているか（場） — npa-2025-cyber-jousei.txt:1173「フィッシング対策協議会によれ…ば」、:2063「JC3 では」／antiphishing-2026-09-monthly-report.md:105
- [x] 2. 企画書の5題材のそれぞれに、公的機関が公表した手口の説明がある — 宅配: ipa-2021-sms-tsushin.md:57「宅配便業者をかたり」／銀行・カード: antiphishing-2026-isp-auth.md:88「VISA力一ド ご利用制限」／懸賞: saitama-2020-tousen.md:97「有名人の賞金企画に当選」（県）／知人 SNS: kagoshima-police-line-nottori.md:53「LINEの「友だち」に電子マネー等の番号」（県警）／サブスク: antiphishing-2026-09-monthly-report.md:132「決済情報や契約更新」（名指しの注意喚起は無し）
- [x] 3. 最近の巧妙な手口で、見た目では本物と区別しにくくなった点 — antiphishing-2026-09-monthly-report.md:115「なりすまし」約 37.8 %、:133「受信者の氏名」、:136「きれいな体裁」／antiphishing-2026-isp-auth.md:84「ISPの認証情報…乗っ取り」／antiphishing-report2026-page.md:566「似たドメイン名」／npa-2025-cyber-jousei.txt:1178「リアルタイム型フィッシング」、:2067「生成 AI」／npa-2025-nise-keisatsu.md:52「代表電番号を偽装表示」
- [x] 4. 見た目で見抜けないとき、公的機関は利用者に何をするよう勧めているか — antiphishing-for-users.md:100「リンクは開かない」、:108「公式サイトや公式アプリから」／antiphishing-2026-isp-auth.md:122「ブックマークから」／npa-2025-nise-keisatsu.md:17「警察は以下の事項をすることはありません」／fsa-2022-phishing.md:31
- [x] 5. 被害の規模と増減 — npa-2025-cyber-jousei.txt:1175「103 億 9,700 万円」／npa-2026-tokushu-sagi-202602.md:37「593.8億円」／antiphishing-2026-09-monthly-report.md:84「94,661 件」／antiphishing-report2026-page.md:558「6.0%」
- [x] 6. 見抜く訓練（クイズ・ゲーム）の効果と、どこで失敗するか — sheng-2007-anti-phishing-phil.txt:20「better able to identify」／sheng-2010-who-falls-for-phish.txt:20「slightly decreased … legitimate links」、:527「avoidance strategy」／arxiv-2112.07498-phishing-in-organizations.txt:30「even more susceptible」／ho-2025-phishing-training-efficacy.txt:15「limited value」

## 用語
- スミッシング（Smishing＝SMS＋phishing）— antiphishing-2026-09-monthly-report.md:105、apwg-2025q4-trends.txt:265
- なりすまし送信（差出人に実在のドメインを使う）— antiphishing-2026-09-monthly-report.md:115
- 送信ドメイン認証（DMARC）・BIMI（認証済みメールにロゴを出す仕組み）— antiphishing-2026-09-monthly-report.md:117, 164
- リアルタイム型フィッシング（二段階認証の突破）— npa-2025-cyber-jousei.txt:1178
- ボイスフィッシング（ビッシング＝電話でだまし、メールを送る）— antiphishing-report2026-pdf.txt:629
- ニセ警察詐欺 — npa-2025-nise-keisatsu.md、npa-2026-tokushu-sagi-202602.md:23
- SNS型投資詐欺・SNS型ロマンス詐欺 — npa-2026-tokushu-sagi-202602.md:31
- サポート詐欺（偽のウイルス警告）— ipa-2024-fake-alert.md、antiphishing-2026-09-monthly-report.md:143
- 偽基地局（SMS blaster）— scan-2025-soumu-fake-bts.md:25
- 共通ショートコード「0005」（正規の SMS 用の発信番号）— antiphishing-2026-09-monthly-report.md:169
- 埋め込み型訓練（embedded training）— arxiv-2112.07498-phishing-in-organizations.txt:30
- クイッシング（QR コードのフィッシング）— https://arxiv.org/abs/2407.16230（未確認）

## 人
- Lorrie Cranor（カーネギーメロン大学）— Anti-Phishing Phil、Who Falls for Phish?（未確認：所属は検索役の報告）
- Steve Sheng（カーネギーメロン大学・当時）— Anti-Phishing Phil 2007、Who Falls for Phish? 2010
- Ponnurangam Kumaraguru — PhishGuru（未確認）
- Daniele Lain, Kari Kostiainen, Srdjan Čapkun（ETH Zurich）— Phishing in Organizations 2022
- Grant Ho（UC San Diego・当時）— Understanding the Efficacy of Phishing Training in Practice 2025
- Sarah Tabassum, Cori Faklaris, Heather Lipford（UNC Charlotte）— What Drives SMiShing Susceptibility? SOUPS 2024（未確認）

## 場
- 警察庁 特殊詐欺対策ページ（SOS47）— https://www.npa.go.jp/bureau/safetylife/sos47/
- 警察庁「サイバー空間をめぐる脅威の情勢等」（年次）— https://www.npa.go.jp/publications/statistics/cybersecurity/
- フィッシング対策協議会（緊急情報・月次報告書・フィッシングレポート・利用者向け対策）— https://www.antiphishing.jp/
- IPA 安心相談窓口だより — https://www.ipa.go.jp/security/anshin/
- 国民生活センター 報道発表 — https://www.kokusen.go.jp/
- JC3（日本サイバー犯罪対策センター）— https://www.jc3.or.jp/（未確認：原文に届かず）
- 金融庁 — https://www.fsa.go.jp/
- 総務省 — 偽基地局の注意喚起（2025-05-02、原文未取得）
- 都道府県警・都道府県の消費生活センター（県ごとの手口ページ）— 例 鹿児島県警、埼玉県
- 日本クレジットカード協会 啓発サイト — https://www.jcca-office.gr.jp/feature/phishing/
- APWG Phishing Activity Trends Report — https://apwg.org/trendreports
- 学会: SOUPS、IEEE S&P、CHI、USENIX Security

## 原文（sources/）
| 論文・資料 | ファイル | 元の URL | どこから来たか（周・動き） |
|---|---|---|---|
| 〔公式〕警察庁「令和8年2月末における特殊詐欺の認知・検挙状況等（暫定値）」2026-04 | npa-2026-tokushu-sagi-202602.md | https://www.npa.go.jp/bureau/safetylife/sos47/new-topics/260420/01.html | 1周・検索役A |
| 〔公式〕警察庁「ニセ警察詐欺に注意！」2025-11 | npa-2025-nise-keisatsu.md | https://www.npa.go.jp/bureau/safetylife/sos47/new-topics/241218/02.html | 1周・検索役A |
| 〔公式〕警察庁 特殊詐欺対策トップ | npa-sos47-top.md（未読） | https://www.npa.go.jp/bureau/safetylife/sos47/ | 1周・検索役A |
| 〔公式〕警察庁「令和7年におけるサイバー空間をめぐる脅威の情勢等について」2026-03 | npa-2025-cyber-jousei.txt | https://www.npa.go.jp/publications/statistics/cybersecurity/data/R7/R07_cyber_jousei.pdf | 1周・親が言葉で引き直す |
| 〔まとめ〕@IT 警察庁レポートの記事 2026-04 | atmarkit-2026-npa-cyber.md（未読） | https://atmarkit.itmedia.co.jp/ait/articles/2604/27/news047.html | 1周・親 |
| 〔公式〕IPA「宅配便業者に加えて通信事業者をかたる偽SMSが増加中」2021-12 | ipa-2021-sms-tsushin.md | https://www.ipa.go.jp/security/anshin/attention/2021/mgdayori20211222.html | 1周・検索役A |
| 〔公式〕IPA「偽のウイルス感染警告を表示させるサポート詐欺に注意」2024-11 | ipa-2024-fake-alert.md（未読） | https://www.ipa.go.jp/security/anshin/attention/2024/mgdayori20241119.html | 1周・検索役A |
| 〔公式〕国民生活センター「国民生活センターをかたるニセのハガキ」2026-10 | kokusen-2026-saishu-kakunin.md | https://www.kokusen.go.jp/news/data/n-20261020_1.html | 1周・検索役A |
| 〔公式〕金融庁「金融庁ウェブサイトの偽サイトにご注意ください」2022-06（2024-10更新） | fsa-2022-phishing.md | https://www.fsa.go.jp/news/r3/sonota/20220615.html | 1周・検索役A |
| 〔公式〕JPNIC 総会講演 フィッシング対策協議会資料 2026-03 | nic-2026-phishing-council.txt（未読） | https://www.nic.ad.jp/ja/materials/after/20260317/20260317-phishing.pdf | 1周・検索役A |
| 〔公式〕フィッシング対策協議会 トップ | antiphishing-council-top.md | https://www.antiphishing.jp/ | 1周・検索役A |
| 〔公式〕同 月次報告書 2026/09 | antiphishing-2026-09-monthly-report.md | https://www.antiphishing.jp/report/monthly/202609.html | 1周・後ろへ（協議会トップから） |
| 〔公式〕同 お知らせ 2026/09 | antiphishing-2026-09-monthly.md | https://www.antiphishing.jp/news/info/202609.html | 1周・後ろへ |
| 〔公式〕同 緊急情報一覧 | antiphishing-alert-list.md（未読） | https://www.antiphishing.jp/news/alert/ | 1周・後ろへ |
| 〔公式〕同 緊急情報「国内ISPの認証情報を不正利用して送信されたフィッシングメール」2026-06 | antiphishing-2026-isp-auth.md | https://www.antiphishing.jp/news/alert/isp_20260626.html | 1周・後ろへ |
| 〔公式〕同 緊急情報「不正アプリのインストールへ誘導するフィッシングメール」2026-09 | antiphishing-2026-malapp.md（未読） | https://www.antiphishing.jp/news/alert/malapp_20260908.html | 1周・後ろへ |
| 〔公式〕同 緊急情報「国民年金の納付依頼をよそおうフィッシング」2026-05 | antiphishing-2026-nenkin.md（未読） | https://www.antiphishing.jp/news/alert/nenkin_20260518.html | 1周・後ろへ |
| 〔公式〕同 今すぐできるフィッシング対策 | antiphishing-for-users.md | https://www.antiphishing.jp/consumer/antiphishing-for-users.html | 1周・後ろへ |
| 〔公式〕同 マンガでわかるフィッシング詐欺対策5ヶ条 | antiphishing-5articles.md（未読） | https://www.antiphishing.jp/phishing-5articles.html | 1周・後ろへ |
| 〔公式〕同 フィッシングレポート一覧 | antiphishing-report-list.md | https://www.antiphishing.jp/report/report/ | 1周・後ろへ |
| 〔公式〕同 フィッシングレポート2026（ページ・PDF）2026-06 | antiphishing-report2026-page.md, antiphishing-report2026-pdf.txt | https://www.antiphishing.jp/report/report/phishing_report2026.html, https://www.antiphishing.jp/report/phishing_report_2026.pdf | 1周・後ろへ |
| 〔公式〕日本クレジットカード協会 啓発サイト | jcca-phishing.md（未読） | https://www.jcca-office.gr.jp/feature/phishing/ | 1周・後ろへ（協議会トップのリンク） |
| 〔公式〕鹿児島県警「不正アクセス（LINE乗っ取り）」2025-06更新 | kagoshima-police-line-nottori.md | https://www.pref.kagoshima.jp/ja13/cyber_teguchi08.html | 1周・親が言葉で引き直す |
| 〔公式〕埼玉県「高額当選しました」詐欺メールに注意 2026-02掲載 | saitama-2020-tousen.md | https://www.pref.saitama.lg.jp/b0304/shohisoudan/jirei/fushin/20201215.html | 1周・親が言葉で引き直す |
| 〔公式〕LINEヤフー プレスリリース（警察庁等と協力した注意喚起） | lycorp-2025-sokin-sagi.md | https://www.lycorp.co.jp/ja/news/release/007842/ | 1周・親 |
| 〔まとめ〕ScanNetSecurity 総務省 偽基地局 2025-05 | scan-2025-soumu-fake-bts.md | https://scan.netsecurity.ne.jp/article/2025/05/06/52793.html | 1周・検索役A |
| 〔まとめ〕ScanNetSecurity JC3 生成AIの偽SMS 2025-11 | scan-2025-jc3-genai-sms.md | https://scan.netsecurity.ne.jp/article/2025/11/18/54047.html | 1周・親 |
| 〔まとめ〕APWG Phishing Activity Trends Report Q4 2025 | apwg-2025q4-trends.txt | https://docs.apwg.org/reports/apwg_trends_report_q4_2025.pdf | 1周・検索役B |
| 〔論文〕Lain, Kostiainen, Čapkun 2022 "Phishing in Organizations" IEEE S&P 測定あり | arxiv-2112.07498-phishing-in-organizations.txt | https://arxiv.org/pdf/2112.07498 | 1周・検索役B |
| 〔論文〕Ho ら 2025 "Understanding the Efficacy of Phishing Training in Practice" IEEE S&P 測定あり | ho-2025-phishing-training-efficacy.txt | https://sysnet.ucsd.edu/~voelker/pubs/phishtrain-oakland25.pdf | 1周・検索役B |
| 〔論文〕Sheng ら 2007 "Anti-Phishing Phil" SOUPS 測定あり | sheng-2007-anti-phishing-phil.txt | https://cups.cs.cmu.edu/soups/2007/proceedings/p88_sheng.pdf | 1周・検索役B |
| 〔論文〕Sheng ら 2010 "Who Falls for Phish?" CHI 測定あり | sheng-2010-who-falls-for-phish.txt | http://lorrie.cranor.org/pubs/pap1162-sheng.pdf | 1周・検索役B |
| 〔論文〕Rahman ら "Users Really Do Respond To Smishing" arXiv 測定あり | arxiv-2212.13312-users-respond-smishing.txt | https://arxiv.org/pdf/2212.13312 | 1周・検索役B |

## 次の手がかり
- JC3 の原文（jc3.or.jp）— 生成 AI の偽 SMS、宅配スミッシングの注意喚起の一次情報
- 総務省の偽基地局の注意喚起の原文
- 国民生活センターの宅配不在通知 SMS（2020-11）の原文 — 推測 URL は別記事だった
- Tabassum ら 2024 SOUPS（スミッシングで人は何を見て判断するか）— PDF が 404。著者のページを当たる
- Sheng 2010 の参考文献から PhishGuru（Kumaraguru ら 2007・2009）へ後ろへたどる — 「本物も混ぜる」設計の根拠になりうる
- Google Jigsaw の Phishing Quiz の評価（検索役Bは見つけられず）
- フィッシング対策協議会の緊急情報一覧（antiphishing-alert-list.md）から、5題材に近い件名の実例を拾う
- QR コードのフィッシング（クイッシング）— arXiv 2407.16230
