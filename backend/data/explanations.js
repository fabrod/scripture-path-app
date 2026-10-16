'use strict';

const EXPLANATIONS = {
  'Genesis 1': {
    summary: 'God creates the heavens and the earth in six days, speaking light, sky, land, vegetation, sun and moon, sea creatures, birds, animals, and finally humanity into existence. On the seventh day He rests, blessing it and making it holy. The chapter establishes God as the intentional, powerful Creator of all things.',
    context: 'Genesis was written for the Israelites as they prepared to enter Canaan, likely during the wilderness period under Moses\' leadership. Against the backdrop of Egyptian and Canaanite creation myths featuring warring gods, this account presents one sovereign God who creates by His word alone — orderly, purposeful, and good.',
    themes: ['Creation', 'God\'s sovereignty', 'Human dignity']
  },
  'Exodus 20': {
    summary: 'At Mount Sinai, God speaks the Ten Commandments directly to Israel: worship God alone, no idols, honor His name, keep the Sabbath, honor parents, and the prohibitions against murder, adultery, theft, false witness, and coveting. The people tremble at God\'s voice and ask Moses to speak for them.',
    context: 'Fresh from slavery in Egypt, Israel needed more than freedom — they needed identity. The commandments were given at Sinai around 1446 BC as the covenant terms between God and His newly redeemed people, forming the moral foundation for their life as a nation set apart.',
    themes: ['Covenant', 'Holiness', 'Moral law']
  },
  'Psalm 23': {
    summary: 'David declares the LORD as his shepherd who provides, guides, restores, and protects. He walks through the valley of the shadow of death without fear, is comforted by God\'s presence, and is hosted at a table of blessing even before his enemies. He concludes with confidence: goodness and mercy will follow him all his days.',
    context: 'Written by David, who spent his youth as an actual shepherd in Bethlehem\'s fields, this psalm draws on intimate firsthand knowledge of a shepherd\'s care. It is the most beloved psalm in history, read at countless funerals, bedsides, and moments of fear across three thousand years.',
    themes: ['God\'s provision', 'Trust in hardship', 'Divine guidance']
  },
  'Psalm 91': {
    summary: 'The psalmist promises divine protection for those who dwell in the secret place of the Most High: rescue from traps and plagues, angelic guardianship, and triumph over danger. God Himself speaks in the closing verses, pledging deliverance, honor, long life, and salvation to those who love Him.',
    context: 'Traditionally associated with Moses or David, this psalm was likely used as a prayer of protection for Israel\'s king going into battle or for pilgrims facing dangerous journeys. Satan himself quoted it when tempting Jesus in the wilderness, twisting its promise — a reminder that Scripture must be read in full context.',
    themes: ['Divine protection', 'Refuge in God', 'God\'s promises']
  },
  'Proverbs 3': {
    summary: 'Solomon urges his son to trust in the LORD with all his heart rather than his own understanding, to honor God with his wealth, and to accept the LORD\'s discipline as a father\'s love. Wisdom is portrayed as more precious than silver or gold, bringing long life, peace, and favor.',
    context: 'Proverbs collects the wisdom tradition of ancient Israel, much of it attributed to Solomon, the wisest king of Israel\'s golden age (c. 970–930 BC). In the ancient Near East, wisdom literature was how fathers passed practical, God-centered life instruction to the next generation.',
    themes: ['Trust in God', 'Wisdom', 'Divine guidance']
  },
  'Isaiah 53': {
    summary: 'The prophet describes the Suffering Servant: despised and rejected, bearing our griefs and carrying our sorrows. He is wounded for our transgressions and bruised for our iniquities; by His stripes we are healed. Like a lamb led to slaughter He does not open His mouth, yet He will see His offspring and be satisfied.',
    context: 'Written around 700 BC, centuries before Christ, this is the most detailed Old Testament prophecy of the Messiah\'s suffering. The New Testament quotes it repeatedly — Philip used it to explain the gospel to the Ethiopian eunuch, and the early church saw in it an unmistakable portrait of Jesus\' crucifixion.',
    themes: ['Substitutionary atonement', 'Messianic prophecy', 'Suffering servant']
  },
  'Jeremiah 29': {
    summary: 'Jeremiah writes to the Jewish exiles in Babylon, telling them to settle down, build houses, plant gardens, and seek the welfare of the city where God sent them. He promises that after seventy years God will bring them home, declaring His plans to prosper them and give them hope and a future.',
    context: 'Written around 597 BC to Israelites deported to Babylon, this letter confronted false prophets who promised a quick return. God\'s message was startling: bloom where you are planted, even in exile. The famous promise of hope was given not to comfortable people, but to captives far from home.',
    themes: ['Hope in exile', 'God\'s plans', 'Faithful waiting']
  },
  'Matthew 5': {
    summary: 'Jesus opens the Sermon on the Mount with the Beatitudes — blessings on the poor in spirit, mourners, the meek, and peacemakers — then teaches that His followers are salt and light. He deepens the law\'s demands on anger, lust, divorce, oaths, retaliation, and love of enemies, calling for a righteousness that exceeds the Pharisees\'.',
    context: 'Delivered early in Jesus\' Galilean ministry (c. AD 28–30) to His disciples with crowds listening, this sermon is the most famous teaching in history. Jesus spoke as one with authority, reinterpreting the law not as external rule-keeping but as heart transformation — the constitution of His kingdom.',
    themes: ['Kingdom ethics', 'Heart transformation', 'Blessedness']
  },
  'Matthew 6': {
    summary: 'Jesus warns against practicing righteousness for show — in giving, prayer, and fasting — teaching that the Father rewards what is done in secret. He gives the Lord\'s Prayer as a model, teaches forgiveness as a condition of being forgiven, and calls His followers to store treasures in heaven and seek first God\'s kingdom rather than worrying about daily needs.',
    context: 'Continuing the Sermon on the Mount, Jesus directly challenged the performative religion of the Pharisees, who prayed loudly on street corners and disfigured their faces when fasting. Against that backdrop, He revealed a Father who sees in secret and cares for His children\'s needs better than they can.',
    themes: ['Secret devotion', 'The Lord\'s Prayer', 'Trust over worry']
  },
  'Luke 15': {
    summary: 'Jesus tells three parables of lost things: a shepherd who leaves ninety-nine sheep to find one, a woman who sweeps her house for one lost coin, and a father who runs to embrace his prodigal son — then gently rebukes the older brother who resents the celebration. Heaven rejoices over one sinner who repents.',
    context: 'The Pharisees grumbled that Jesus welcomed tax collectors and sinners and ate with them. In response, Jesus painted His most vivid picture of God\'s heart: a Father who watches the road for returning rebels. The parable of the prodigal son remains the greatest short story ever told about grace.',
    themes: ['Repentance', 'God\'s mercy', 'Joy over the found']
  },
  'John 1': {
    summary: 'John opens with the cosmic claim that the Word was with God and was God, and that all things were made through Him. The Word became flesh and dwelt among us. John the Baptist testifies to Jesus as the Lamb of God, and Jesus calls His first disciples — including Nathanael, who confesses Him as the Son of God.',
    context: 'Written around AD 85–95 by the apostle John, likely from Ephesus, this Gospel was composed so readers would believe Jesus is the Christ. The prologue echoes Genesis 1 ("In the beginning") deliberately: John presents Jesus as the Creator stepping into His creation.',
    themes: ['Christ\'s divinity', 'The Incarnation', 'Witness and belief']
  },
  'John 3': {
    summary: 'Nicodemus, a Pharisee, visits Jesus at night and hears he must be born again to see God\'s kingdom. Jesus explains the new birth by the Spirit, lifts up the bronze serpent as a picture of His coming crucifixion, and declares the gospel in miniature: God so loved the world that He gave His only Son.',
    context: 'Nicodemus came by night — perhaps from fear, perhaps for uninterrupted conversation. As a ruler of the Jews he had religion, knowledge, and morality, yet Jesus told him it was not enough. This nighttime conversation produced the most quoted verse in all of Scripture.',
    themes: ['New birth', 'God\'s love', 'Eternal life']
  },
  'John 14': {
    summary: 'On the night before His death, Jesus comforts His troubled disciples: He is going to prepare a place for them and will return. He declares Himself the way, the truth, and the life, promises the Holy Spirit as another Helper, and leaves them His peace — not as the world gives.',
    context: 'Spoken in the upper room after Judas departed (c. AD 30), these are farewell words — the most intimate teaching of Jesus\' ministry. The disciples were confused and afraid; Jesus answered with promises about heaven, the Spirit, and answered prayer that have comforted believers ever since.',
    themes: ['Comfort in trouble', 'The Holy Spirit', 'Christ the way']
  },
  'Acts 2': {
    summary: 'On the day of Pentecost, the Holy Spirit falls on the disciples with wind and tongues of fire; they speak in languages the crowds understand. Peter preaches Christ crucified and risen, three thousand believe and are baptized, and the newborn church devotes itself to teaching, fellowship, breaking bread, and prayer.',
    context: 'Fifty days after the resurrection (c. AD 30), during the Jewish feast of Pentecost when Jerusalem overflowed with pilgrims, God fulfilled Joel\'s prophecy by pouring out His Spirit. This is the birthday of the church — the moment a frightened band of followers became a Spirit-empowered movement.',
    themes: ['The Holy Spirit', 'Birth of the church', 'Repentance and baptism']
  },
  'Romans 3': {
    summary: 'Paul concludes his case that all humanity — Jew and Gentile alike — stands guilty before God: "there is none righteous, no, not one." But now God\'s righteousness is revealed through faith in Jesus Christ, who justifies sinners freely by His grace through the redemption in His blood, received by faith apart from works.',
    context: 'Written from Corinth around AD 57 to the church in Rome, Romans is Paul\'s most systematic letter. Chapters 1–3 build an airtight prosecution: Gentiles are guilty, Jews are guilty, all are guilty — setting up the glorious "but now" of grace that follows.',
    themes: ['Universal sin', 'Justification by faith', 'Grace']
  },
  'Romans 8': {
    summary: 'Paul proclaims there is no condemnation for those in Christ Jesus. The Spirit gives life, makes us God\'s children, and intercedes for us in our weakness. All things work together for good for those who love God, and nothing — neither death nor life, angels nor demons — can separate us from God\'s love in Christ.',
    context: 'The climax of Romans\' doctrinal section, chapter 8 moves from the struggle of chapter 7 ("who will deliver me?") to triumphant assurance. Written to believers in the empire\'s capital, it remains the greatest chapter on the Spirit-led life and unshakeable security ever written.',
    themes: ['No condemnation', 'Life in the Spirit', 'Unbreakable love']
  },
  '1 Corinthians 13': {
    summary: 'Paul describes love as patient, kind, not envious or proud, keeping no record of wrongs, and enduring all things — greater than tongues, prophecy, or knowledge. He contrasts childish partial understanding with the fullness to come, concluding that faith, hope, and love remain, but the greatest is love.',
    context: 'The Corinthian church was gifted but divided — competing over spiritual gifts, suing each other, and tolerating sin. Paul placed this hymn to love between his teaching on gifts (ch. 12) and their use (ch. 14): without love, every gift is noise. It was likely read at gatherings and memorized early.',
    themes: ['Agape love', 'Love over gifts', 'Enduring virtues']
  },
  'Galatians 5': {
    summary: 'Paul warns the Galatians not to trade gospel freedom for law-keeping, then contrasts the works of the flesh with the fruit of the Spirit: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control. Those who belong to Christ have crucified the flesh and must walk by the Spirit.',
    context: 'Written around AD 48–49 to churches in Galatia being pressured by Judaizers to add circumcision to faith, Galatians is Paul\'s fiercest defense of grace. Chapter 5 answers the key question: if we are free from the law, how then shall we live? By the Spirit, bearing His fruit.',
    themes: ['Freedom in Christ', 'Fruit of the Spirit', 'Walking by the Spirit']
  },
  'Ephesians 2': {
    summary: 'Paul reminds the Ephesians they were dead in trespasses but God, rich in mercy, made them alive with Christ — saved by grace through faith, not works, created for good works. Christ has broken down the dividing wall between Jew and Gentile, reconciling both to God in one body through the cross.',
    context: 'Written from prison around AD 60–62 to the church in Ephesus, a cosmopolitan hub of emperor worship and magic. Paul\'s sweeping vision of grace answered both Jewish exclusivism and pagan despair: in Christ, outsiders become family, and the dead are raised to life.',
    themes: ['Salvation by grace', 'Unity in Christ', 'New creation']
  },
  'Philippians 4': {
    summary: 'Paul urges the Philippians to rejoice always, to pray about everything with thanksgiving, and to dwell on whatever is true, noble, and praiseworthy. He promises God\'s peace will guard their hearts, shares his secret of contentment in every circumstance, and declares that God will supply all their needs.',
    context: 'Written from prison around AD 60–62 to Paul\'s most generous supporting church, Philippians overflows with joy despite chains. The apostle who had nothing modeled contentment; the church that gave sacrificially received the promise that God would meet every need.',
    themes: ['Joy', 'Peace through prayer', 'Contentment']
  },
  'Hebrews 11': {
    summary: 'The great hall of faith: Abel, Enoch, Noah, Abraham, Sarah, Moses, Rahab, and others who trusted God\'s promises without seeing their fulfillment. By faith they conquered kingdoms, shut lions\' mouths, and endured suffering — commended for faith, yet not receiving all that was promised in their lifetime.',
    context: 'Written to Jewish Christians tempted to abandon Christ and return to Judaism under persecution (c. AD 60s), Hebrews argues Christ is better than every old-covenant shadow. Chapter 11 anchors that argument in their own story: the heroes they revered were all people of faith, not of sight.',
    themes: ['Faith', 'Perseverance', 'God\'s promises']
  },
  'James 2': {
    summary: 'James confronts favoritism toward the rich and argues that faith without works is dead. Abraham was justified by works when he offered Isaac, and Rahab by works when she sheltered the spies — faith perfected by action. As the body without the spirit is dead, so faith without works is dead.',
    context: 'Written by James, the brother of Jesus and leader of the Jerusalem church, likely in the mid-40s AD — among the earliest New Testament books. To scattered Jewish believers facing trials, James insisted that genuine faith inevitably produces a changed life; anything less is empty profession.',
    themes: ['Faith and works', 'Impartiality', 'Living faith']
  },
  '1 John 4': {
    summary: 'John teaches believers to test the spirits, then unfolds the great truth that God is love: love comes from God, and everyone who loves is born of God. God demonstrated His love by sending His Son as the atoning sacrifice for our sins, and we love because He first loved us.',
    context: 'Written around AD 85–95 by the aged apostle John to churches threatened by false teachers denying Christ\'s humanity, 1 John returns repeatedly to three tests of genuine faith: right belief, righteous living, and real love. Chapter 4 contains the letter\'s beating heart.',
    themes: ['God is love', 'Discerning truth', 'Loving one another']
  },
  'Revelation 21': {
    summary: 'John sees a new heaven and a new earth, and the holy city, New Jerusalem, descending from God. God will dwell with His people, wiping every tear; death, sorrow, crying, and pain will be no more. The city shines with God\'s glory, its gates never shut, and only the redeemed enter.',
    context: 'Written by the exiled apostle John on Patmos around AD 95, Revelation encouraged persecuted churches under Roman oppression. After visions of judgment and cosmic conflict, chapter 21 gives the destination: not escape from creation, but its renewal — heaven come to earth, God dwelling with His people forever.',
    themes: ['New creation', 'God with us', 'Eternal hope']
  }
};

module.exports = { EXPLANATIONS };
