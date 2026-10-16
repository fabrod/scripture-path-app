'use strict';

const BOOKS = {
  'Genesis': {
    overview: 'Traditionally attributed to Moses, Genesis was written to give Israel its origin story as they prepared to enter Canaan. It traces creation, the fall, the flood, and the patriarchs Abraham, Isaac, Jacob, and Joseph — showing how God chose one family to bless all nations.',
    themes: ['Creation', 'Covenant', 'God\'s promises'],
    keyVerse: 'Genesis 1:1'
  },
  'Exodus': {
    overview: 'Moses recounts Israel\'s deliverance from Egyptian slavery through the plagues and the Red Sea, the giving of the law at Sinai, and the building of the tabernacle. It is the defining redemption story of the Old Testament, pointing forward to a greater exodus in Christ.',
    themes: ['Redemption', 'Covenant law', 'God\'s presence'],
    keyVerse: 'Exodus 14:14'
  },
  'Leviticus': {
    overview: 'Written for Israel\'s priests and people at Sinai, Leviticus details sacrifices, purity laws, and holy living. Its central message — "be holy, for I am holy" — reveals both the seriousness of sin and God\'s provision for atonement, foreshadowing Christ\'s perfect sacrifice.',
    themes: ['Holiness', 'Atonement', 'Worship'],
    keyVerse: 'Leviticus 19:2'
  },
  'Numbers': {
    overview: 'Moses records Israel\'s forty years of wilderness wandering — census lists, rebellions, and God\'s patient provision. A faithless generation dies in the desert while a new one prepares to enter the land, teaching that unbelief has consequences but God remains faithful.',
    themes: ['Faithfulness', 'Consequences of unbelief', 'God\'s provision'],
    keyVerse: 'Numbers 6:24'
  },
  'Deuteronomy': {
    overview: 'Moses\' farewell addresses on the plains of Moab restate the law for a new generation about to enter Canaan. He pleads with Israel to love God wholeheartedly, remember His works, and choose life — the book Jesus quoted most when tempted in the wilderness.',
    themes: ['Obedience', 'Remembering God', 'Choosing life'],
    keyVerse: 'Deuteronomy 6:5'
  },
  'Joshua': {
    overview: 'Joshua leads Israel into Canaan, witnessing the fall of Jericho, the conquest of the land, and its division among the tribes. The book demonstrates that God keeps His promises to those who trust and obey, closing with Joshua\'s charge to choose whom they will serve.',
    themes: ['Courage', 'God\'s faithfulness', 'Obedience'],
    keyVerse: 'Joshua 1:9'
  },
  'Judges': {
    overview: 'Covering roughly 300 years between Joshua and Saul, Judges recounts cycles of sin, oppression, repentance, and deliverance through leaders like Deborah, Gideon, and Samson. Its refrain — everyone did what was right in his own eyes — shows humanity\'s desperate need for a true King.',
    themes: ['Cycles of sin', 'God\'s deliverance', 'Need for a king'],
    keyVerse: 'Judges 21:25'
  },
  'Ruth': {
    overview: 'Set during the dark days of the judges, Ruth tells of a Moabite widow whose loyal love for her Israelite mother-in-law leads her to Bethlehem, to Boaz the kinsman-redeemer, and into the lineage of King David — and ultimately of Christ. A quiet story of redemption through faithful love.',
    themes: ['Loyal love', 'Redemption', 'God\'s providence'],
    keyVerse: 'Ruth 1:16'
  },
  '1 Samuel': {
    overview: 'Samuel, Israel\'s last judge, anoints Saul as the first king and later David as his replacement after Saul\'s disobedience. The book traces David\'s rise from shepherd boy to giant-slayer to fugitive, establishing the Davidic line through which the Messiah would come.',
    themes: ['Leadership', 'Obedience vs. rebellion', 'God\'s anointing'],
    keyVerse: '1 Samuel 16:7'
  },
  '2 Samuel': {
    overview: 'David\'s reign over Israel brings military triumph and national unity, but also his grievous sin with Bathsheba and its painful consequences. Through repentance and restoration, God reaffirms His covenant: David\'s throne will endure forever — fulfilled in Christ.',
    themes: ['Repentance', 'Davidic covenant', 'Consequences of sin'],
    keyVerse: '2 Samuel 7:16'
  },
  '1 Kings': {
    overview: 'From Solomon\'s wisdom and temple-building to the kingdom\'s tragic split and the ministry of Elijah, 1 Kings shows how idolatry unravels a nation. Israel\'s kings are measured by one standard: faithfulness to the LORD.',
    themes: ['Wisdom', 'Idolatry\'s cost', 'Prophetic courage'],
    keyVerse: '1 Kings 8:61'
  },
  '2 Kings': {
    overview: 'The ministries of Elijah and Elisha give way to the fall of both kingdoms — Israel to Assyria in 722 BC, Judah to Babylon in 586 BC. Yet even in judgment, God preserves a remnant and a promise, keeping the lamp of David\'s line burning.',
    themes: ['Judgment', 'God\'s sovereignty', 'Remnant hope'],
    keyVerse: '2 Kings 17:13'
  },
  '1 Chronicles': {
    overview: 'Written after the exile to encourage returning Jews, 1 Chronicles retells Israel\'s history from Adam to David with emphasis on worship, the temple, and God\'s covenant promises. Genealogies anchor the discouraged remnant in their identity as God\'s chosen people.',
    themes: ['Worship', 'Covenant identity', 'God\'s promises'],
    keyVerse: '1 Chronicles 16:11'
  },
  '2 Chronicles': {
    overview: 'Continuing the post-exilic retelling, 2 Chronicles focuses on Judah\'s kings, Solomon\'s temple, and the reforms of godly rulers like Hezekiah and Josiah. It ends with Cyrus\' decree to rebuild — history retold as hope for a restored people.',
    themes: ['Temple worship', 'Reform and revival', 'Hope after exile'],
    keyVerse: '2 Chronicles 7:14'
  },
  'Ezra': {
    overview: 'Ezra records the return of Jewish exiles from Babylon under Zerubbabel and later under Ezra himself, culminating in the temple\'s rebuilding. It is the story of God stirring pagan kings and broken people to restore His house and His holiness.',
    themes: ['Restoration', 'God\'s sovereignty over kings', 'Holiness'],
    keyVerse: 'Ezra 7:10'
  },
  'Nehemiah': {
    overview: 'Nehemiah, cupbearer to Persia\'s king, leads the rebuilding of Jerusalem\'s walls in fifty-two days despite fierce opposition, then joins Ezra in a national revival of Scripture reading and repentance. A masterclass in prayerful, determined leadership.',
    themes: ['Leadership', 'Prayer and action', 'Revival'],
    keyVerse: 'Nehemiah 8:10'
  },
  'Esther': {
    overview: 'In Persian exile, the Jewish orphan Esther becomes queen and risks her life to expose Haman\'s plot to annihilate the Jews. God\'s name never appears, yet His providence orchestrates every "coincidence" — a book about divine sovereignty behind the scenes.',
    themes: ['Providence', 'Courage', 'God\'s hidden hand'],
    keyVerse: 'Esther 4:14'
  },
  'Job': {
    overview: 'Job, a righteous man, loses everything and wrestles with suffering through poetic dialogues with his friends. God answers not with explanations but with Himself, and Job repents in dust and ashes — learning that trust matters more than answers.',
    themes: ['Suffering', 'Trust beyond understanding', 'God\'s sovereignty'],
    keyVerse: 'Job 38:4'
  },
  'Psalms': {
    overview: 'Israel\'s hymnbook across a thousand years — 150 songs of lament, praise, thanksgiving, and wisdom, many by David. The Psalms give words to every human emotion directed at God, teaching us to pray honestly in joy and in sorrow.',
    themes: ['Prayer', 'Praise', 'Lament and hope'],
    keyVerse: 'Psalm 46:1'
  },
  'Proverbs': {
    overview: 'Largely from Solomon, Proverbs offers practical wisdom for everyday life — work, speech, money, relationships — rooted in the fear of the LORD. Short, memorable sayings train the reader to choose the wise path over the foolish one.',
    themes: ['Wisdom', 'Fear of the LORD', 'Practical righteousness'],
    keyVerse: 'Proverbs 3:5'
  },
  'Ecclesiastes': {
    overview: 'The Preacher (traditionally Solomon) tests every earthly pursuit — pleasure, wealth, work, wisdom — and finds them "vanity" apart from God. The conclusion: fear God and keep His commandments, for this is the whole duty of man.',
    themes: ['Meaning of life', 'Vanity of earthly pursuits', 'Fear God'],
    keyVerse: 'Ecclesiastes 12:13'
  },
  'Song of Solomon': {
    overview: 'A poetic celebration of marital love between Solomon and his bride, rich with imagery of desire, delight, and devotion. Beyond its literal beauty, believers have long seen in it a picture of Christ\'s love for His church.',
    themes: ['Marital love', 'Beauty of commitment', 'Christ and the church'],
    keyVerse: 'Song of Solomon 8:7'
  },
  'Isaiah': {
    overview: 'The prince of prophets ministered in Judah for over forty years, warning of judgment while unveiling stunning visions of the Messiah — His virgin birth, suffering, and eternal kingdom. No book paints Christ more vividly centuries before His coming.',
    themes: ['Judgment and hope', 'The Suffering Servant', 'God\'s holiness'],
    keyVerse: 'Isaiah 53:5'
  },
  'Jeremiah': {
    overview: 'The weeping prophet warned Judah of coming Babylonian judgment for fifty years, enduring rejection and persecution. Through tears he delivered both doom and the promise of a new covenant — God\'s law written on human hearts.',
    themes: ['Judgment', 'New covenant', 'Faithful warning'],
    keyVerse: 'Jeremiah 29:11'
  },
  'Lamentations': {
    overview: 'Jeremiah\'s funeral dirge over fallen Jerusalem — five acrostic poems of grief confessing that God\'s judgment was just. Yet in the center burns hope: God\'s mercies are new every morning, and great is His faithfulness.',
    themes: ['Grief', 'Confession', 'Hope in judgment'],
    keyVerse: 'Lamentations 3:22'
  },
  'Ezekiel': {
    overview: 'Exiled in Babylon, Ezekiel delivered bizarre, dramatic visions — dry bones living, a valley of vision, God\'s glory departing and returning. He confronted Israel\'s idolatry while promising a new heart, a new spirit, and a restored temple.',
    themes: ['God\'s glory', 'New heart', 'Restoration'],
    keyVerse: 'Ezekiel 36:26'
  },
  'Daniel': {
    overview: 'Daniel served pagan kings with integrity while receiving apocalyptic visions of coming kingdoms and the Son of Man. From the lions\' den to the fiery furnace, the book proves God rules over every empire and honors those who honor Him.',
    themes: ['Faithfulness under pressure', 'God\'s sovereignty', 'Prophecy'],
    keyVerse: 'Daniel 3:17'
  },
  'Hosea': {
    overview: 'God commanded Hosea to marry an unfaithful wife as a living parable of Israel\'s spiritual adultery — and of God\'s relentless, redeeming love that buys back His people. The most tender portrait of divine love in the prophets.',
    themes: ['God\'s faithful love', 'Repentance', 'Redemption'],
    keyVerse: 'Hosea 6:6'
  },
  'Joel': {
    overview: 'After a devastating locust plague, Joel calls Judah to repentance and promises the outpouring of God\'s Spirit on all flesh. Peter quoted this prophecy at Pentecost as the Spirit fell — Joel\'s vision fulfilled in the church age.',
    themes: ['Repentance', 'Day of the LORD', 'Outpouring of the Spirit'],
    keyVerse: 'Joel 2:28'
  },
  'Amos': {
    overview: 'A shepherd from Tekoa, Amos confronted Israel\'s wealthy elite for exploiting the poor while maintaining empty religious rituals. His cry — "let justice roll down like waters" — remains Scripture\'s sharpest demand for social righteousness.',
    themes: ['Justice', 'True worship', 'Judgment on hypocrisy'],
    keyVerse: 'Amos 5:24'
  },
  'Obadiah': {
    overview: 'The shortest Old Testament book pronounces judgment on Edom for gloating over Judah\'s fall and aiding her enemies. Its closing promise: the kingdom shall be the LORD\'s — pride falls, but God\'s reign endures.',
    themes: ['Pride\'s downfall', 'God\'s justice', 'The LORD\'s kingdom'],
    keyVerse: 'Obadiah 1:21'
  },
  'Jonah': {
    overview: 'Jonah fled God\'s call to preach to Nineveh, was swallowed by a great fish, repented, preached, and then sulked when the city repented. The book exposes reluctant mercy — God cares about pagan cities, and His prophet must learn to care too.',
    themes: ['God\'s mercy to all', 'Repentance', 'Second chances'],
    keyVerse: 'Jonah 2:9'
  },
  'Micah': {
    overview: 'A contemporary of Isaiah, Micah denounced corrupt leaders and false prophets in Judah while foretelling the Messiah\'s birth in Bethlehem. His famous summary — do justice, love mercy, walk humbly — distills true religion into one verse.',
    themes: ['Justice and mercy', 'Messianic hope', 'Humble walking'],
    keyVerse: 'Micah 6:8'
  },
  'Nahum': {
    overview: 'Over a century after Jonah, Nahum prophesies Nineveh\'s doom — the Assyrian empire that terrorized the world will fall. To oppressed Judah this was gospel: God will not let evil triumph forever; He is a stronghold in the day of trouble.',
    themes: ['God\'s justice', 'Fall of the proud', 'Refuge for the oppressed'],
    keyVerse: 'Nahum 1:7'
  },
  'Habakkuk': {
    overview: 'Habakkuk dares to question God: why do the wicked prosper? God answers that the righteous shall live by faith — a phrase that would ignite the Reformation. The prophet ends rejoicing in God even if the fields are empty.',
    themes: ['Questioning God honestly', 'Living by faith', 'Joy in hardship'],
    keyVerse: 'Habakkuk 3:19'
  },
  'Zephaniah': {
    overview: 'Prophesying before Josiah\'s reforms, Zephaniah warns of the coming day of the LORD against Judah and the nations, then ends with one of Scripture\'s most tender images: God rejoicing over His people with singing.',
    themes: ['Day of the LORD', 'Judgment and mercy', 'God\'s delight'],
    keyVerse: 'Zephaniah 3:17'
  },
  'Haggai': {
    overview: 'After the exile, returned Jews stalled on rebuilding the temple while paneling their own houses. Haggai\'s four sermons in four months jolted them into action — consider your ways, build the house, and God will bless.',
    themes: ['Priorities', 'God\'s presence', 'Obedience brings blessing'],
    keyVerse: 'Haggai 1:8'
  },
  'Zechariah': {
    overview: 'Zechariah encouraged the temple rebuilders with night visions of God\'s plans and detailed prophecies of the Messiah — the humble king riding a donkey, the shepherd struck, the pierced one. The most Messianic of the minor prophets.',
    themes: ['Messianic prophecy', 'Encouragement', 'God\'s future kingdom'],
    keyVerse: 'Zechariah 9:9'
  },
  'Malachi': {
    overview: 'The Old Testament\'s final voice confronts post-exilic Israel\'s spiritual apathy — polluted offerings, broken marriages, withheld tithes — while promising the coming Messenger and the Sun of Righteousness. Then four hundred years of silence before Christ.',
    themes: ['Wholehearted worship', 'Covenant faithfulness', 'Coming Messiah'],
    keyVerse: 'Malachi 3:10'
  }
};

module.exports = { BOOKS };

Object.assign(BOOKS, {
  'Matthew': {
    overview: 'Matthew, the tax collector turned apostle, presents Jesus as the promised King and Son of David, structuring his Gospel around five great teaching blocks. Written especially for Jewish readers, it shows Jesus fulfilling prophecy — and commissioning His followers to disciple all nations.',
    themes: ['Kingdom of heaven', 'Fulfilled prophecy', 'Discipleship'],
    keyVerse: 'Matthew 28:19'
  },
  'Mark': {
    overview: 'The shortest Gospel, likely recording Peter\'s preaching, portrays Jesus as the suffering Servant who acts with urgency — "immediately" appears over forty times. Written for Romans, it moves swiftly to the cross, where a centurion confesses what the disciples were slow to see.',
    themes: ['Servanthood', 'Christ\'s authority', 'The cross'],
    keyVerse: 'Mark 10:45'
  },
  'Luke': {
    overview: 'Luke, the beloved physician, wrote the longest Gospel with careful research for Theophilus, emphasizing Jesus\' compassion for outcasts — women, Samaritans, tax collectors, the poor. His Gospel pairs with Acts as a two-volume history of salvation.',
    themes: ['Compassion for outcasts', 'Prayer', 'Joy and the Spirit'],
    keyVerse: 'Luke 19:10'
  },
  'John': {
    overview: 'The beloved disciple writes so readers will believe Jesus is the Christ, the Son of God, and have life in His name. Through seven signs and seven "I am" sayings, John unveils Christ\'s divinity more explicitly than any other Gospel — the Word made flesh.',
    themes: ['Belief', 'Christ\'s divinity', 'Eternal life'],
    keyVerse: 'John 3:16'
  },
  'Acts': {
    overview: 'Luke\'s second volume traces the gospel\'s explosion from Jerusalem to Rome through the Spirit\'s power — Pentecost, Stephen\'s martyrdom, Saul\'s conversion, and Paul\'s missionary journeys. The unstoppable advance of the church, "to the ends of the earth."',
    themes: ['Holy Spirit\'s power', 'Mission', 'Church growth'],
    keyVerse: 'Acts 1:8'
  },
  'Romans': {
    overview: 'Paul\'s theological masterpiece, written to Rome around AD 57, systematically explains the gospel: all are guilty, all are justified freely by faith, and all in Christ are transformed. No letter has shaped Christian thought more profoundly.',
    themes: ['Justification by faith', 'Grace', 'New life in Christ'],
    keyVerse: 'Romans 8:1'
  },
  '1 Corinthians': {
    overview: 'Paul confronts a gifted but fractured church in Corinth — divisions, immorality, lawsuits, and disorderly worship — with the cross as the answer to every problem. Chapter 13\'s hymn to love stands at its center as the more excellent way.',
    themes: ['Unity', 'Love', 'Resurrection'],
    keyVerse: '1 Corinthians 13:13'
  },
  '2 Corinthians': {
    overview: 'Paul\'s most personal letter defends his apostleship against critics while unveiling the paradox of ministry: strength in weakness, comfort in suffering, generosity in poverty. Written with a heart laid bare, it reveals the cost and glory of serving Christ.',
    themes: ['Strength in weakness', 'Reconciliation', 'Generous giving'],
    keyVerse: '2 Corinthians 12:9'
  },
  'Galatians': {
    overview: 'Paul\'s fiercest letter battles Judaizers demanding circumcision, insisting we are justified by faith alone — "a man is not justified by the works of the law." Freedom in Christ, he argues, leads not to license but to Spirit-produced fruit.',
    themes: ['Justification by faith alone', 'Freedom', 'Fruit of the Spirit'],
    keyVerse: 'Galatians 5:1'
  },
  'Ephesians': {
    overview: 'From prison, Paul unfolds the cosmic scope of the gospel: chosen before creation, saved by grace, united Jew and Gentile in one body. The second half applies it — walk worthy, put on the armor of God, and stand firm.',
    themes: ['Grace', 'Unity of the church', 'Spiritual warfare'],
    keyVerse: 'Ephesians 2:8'
  },
  'Philippians': {
    overview: 'Paul\'s joy-filled letter from prison thanks his most generous supporters and models contentment in every circumstance. Christ\'s humility in chapter 2 becomes the pattern for unity — and joy becomes a command, not a mood.',
    themes: ['Joy', 'Humility of Christ', 'Contentment'],
    keyVerse: 'Philippians 4:13'
  },
  'Colossians': {
    overview: 'Paul exalts Christ\'s supremacy over every rival philosophy threatening Colossae — He is the image of the invisible God, firstborn over all creation. Rooted in Him, believers are complete; no additions of rules or visions required.',
    themes: ['Supremacy of Christ', 'Fullness in Him', 'New identity'],
    keyVerse: 'Colossians 3:2'
  },
  '1 Thessalonians': {
    overview: 'Paul\'s earliest letter encourages a young church facing persecution, commending their faith, love, and hope. He teaches them about Christ\'s return — the dead in Christ rising first — urging holy, watchful living until that day.',
    themes: ['Christ\'s return', 'Holy living', 'Encouragement in suffering'],
    keyVerse: '1 Thessalonians 5:16'
  },
  '2 Thessalonians': {
    overview: 'Correcting confusion that Christ had already returned, Paul explains the man of lawlessness must come first and urges steady, hardworking faithfulness. A short letter with an urgent message: don\'t be shaken, don\'t be idle.',
    themes: ['Second coming', 'Steadfastness', 'Diligent work'],
    keyVerse: '2 Thessalonians 3:3'
  },
  '1 Timothy': {
    overview: 'Paul instructs his young protégé Timothy on leading the Ephesian church — appointing qualified elders, guarding sound doctrine, and modeling godliness. A pastoral manual on ordering Christ\'s church with truth and love.',
    themes: ['Church leadership', 'Sound doctrine', 'Godliness'],
    keyVerse: '1 Timothy 3:16'
  },
  '2 Timothy': {
    overview: 'Paul\'s final letter, written from a Roman dungeon facing execution, charges Timothy to guard the gospel, endure hardship, and preach the word. His closing testimony — "I have fought the good fight" — is a dying charge to every generation.',
    themes: ['Endurance', 'Guarding the gospel', 'Faithful to the end'],
    keyVerse: '2 Timothy 3:16'
  },
  'Titus': {
    overview: 'Paul directs Titus in organizing the churches of Crete: appoint elders, silence false teachers, and teach all ages to live godly lives. Sound doctrine, he insists, must produce sound living — "adorn the doctrine of God our Savior."',
    themes: ['Godly leadership', 'Sound doctrine', 'Good works'],
    keyVerse: 'Titus 2:11'
  },
  'Philemon': {
    overview: 'Paul\'s shortest letter asks Philemon to receive his runaway slave Onesimus back — not as a slave but as a beloved brother. A deeply personal plea that quietly undermines slavery itself through the gospel\'s transforming power.',
    themes: ['Forgiveness', 'Reconciliation', 'Brotherhood in Christ'],
    keyVerse: 'Philemon 1:16'
  },
  'Hebrews': {
    overview: 'Written to Jewish Christians tempted to abandon Christ, Hebrews proves He is better — better than angels, Moses, and the old covenant\'s priests and sacrifices. Chapter 11\'s hall of faith urges perseverance: keep your eyes on Jesus, the author and finisher of faith.',
    themes: ['Supremacy of Christ', 'Perseverance', 'Faith'],
    keyVerse: 'Hebrews 11:1'
  },
  'James': {
    overview: 'James, the Lord\'s brother, writes the New Testament\'s most practical letter: genuine faith works. He confronts favoritism, uncontrolled tongues, and dead orthodoxy, insisting that pure religion cares for orphans and widows and keeps unstained from the world.',
    themes: ['Faith and works', 'Taming the tongue', 'Practical holiness'],
    keyVerse: 'James 1:22'
  },
  '1 Peter': {
    overview: 'Peter writes to scattered believers suffering for their faith, calling them to hope, holiness, and courage. Like Christ they may suffer unjustly — but suffering for righteousness is never wasted, and their inheritance is imperishable.',
    themes: ['Hope in suffering', 'Holiness', 'Christ\'s example'],
    keyVerse: '1 Peter 5:7'
  },
  '2 Peter': {
    overview: 'Peter\'s farewell warns against false teachers and scoffers denying Christ\'s return, urging growth in virtue and knowledge. The day of the Lord will come — so live holy, watchful lives, hastening that day.',
    themes: ['Warning against false teachers', 'Christ\'s return', 'Spiritual growth'],
    keyVerse: '2 Peter 3:9'
  },
  '1 John': {
    overview: 'The aged apostle writes to assure believers and expose deceivers: true faith shows in right belief about Christ, righteous living, and love for one another. "God is light" and "God is love" — and those born of Him reflect both.',
    themes: ['Assurance', 'God is love', 'Obedience'],
    keyVerse: '1 John 4:8'
  },
  '2 John': {
    overview: 'John\'s brief letter to "the elect lady" warns against welcoming false teachers who deny Christ\'s coming in the flesh. Truth and love must walk together — love without truth is sentimentality, truth without love is harshness.',
    themes: ['Truth', 'Love', 'Discerning false teachers'],
    keyVerse: '2 John 1:6'
  },
  '3 John': {
    overview: 'John commends Gaius for his hospitality to traveling missionaries and rebukes Diotrephes for his prideful opposition. A personal note celebrating those who support gospel work — and warning against those who hinder it.',
    themes: ['Hospitality', 'Supporting missions', 'Humility vs. pride'],
    keyVerse: '3 John 1:11'
  },
  'Jude': {
    overview: 'Jude urgently warns against godless teachers who twist grace into license, urging believers to contend for the faith once delivered. He closes with one of Scripture\'s most glorious benedictions to the God who keeps us from stumbling.',
    themes: ['Contending for the faith', 'Warning against apostasy', 'God\'s keeping power'],
    keyVerse: 'Jude 1:24'
  },
  'Revelation': {
    overview: 'The exiled John receives visions of the risen Christ, letters to seven churches, cosmic judgment, and the final triumph — a new heaven and new earth where God dwells with His people. Written to persecuted believers, it declares: Jesus wins, and so do His people.',
    themes: ['Christ\'s victory', 'Perseverance', 'New creation'],
    keyVerse: 'Revelation 21:4'
  }
});

module.exports = { BOOKS };
