'use strict';

const DEVOTIONALS = [
  {
    theme: 'Faith',
    title: 'The Anchor of the Unseen',
    verse: 'Now faith is the substance of things hoped for, the evidence of things not seen.',
    reference: 'Hebrews 11:1',
    reflection: `Faith is not wishful thinking. The writer of Hebrews describes it as substance — something solid you can stand on — and evidence, something real enough to build a case on. Faith gives weight to hope. It treats the promises of God as more certain than the circumstances in front of you.\n\nThink about what that means for the thing you are worried about today. You cannot see the outcome yet. Faith does not require you to. It asks you to trust the character of the One who promised, the way you trust a chair before you sit down — not because you inspected every joint, but because it has held you before.\n\nEvery hero listed in Hebrews 11 lived this way. They did not receive everything they hoped for in their lifetime, yet they lived as if God's word were the truest thing about their situation. That is the invitation for you today.`,
    application: 'Name one worry you have been carrying, speak God\'s promise over it out loud, and take one practical step today as if the outcome were already settled.'
  },
  {
    theme: 'Hope',
    title: 'Mercies New Every Morning',
    verse: 'It is of the LORD\'s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.',
    reference: 'Lamentations 3:22-23',
    reflection: `Jeremiah wrote these words from the rubble of Jerusalem. His city was destroyed, his people carried away, and everything he had warned about had come true. Hope would have seemed unreasonable. Yet in the middle of Lamentations — a whole book of grief — he plants this flag: God's mercies are new every morning.\n\nNotice he does not say yesterday's mercies carry over. Each sunrise is a fresh delivery. You do not have to ration grace or stretch last week's strength into this week's trouble. The God who was faithful in the night is faithful again at dawn, with compassion that has not diminished one bit.\n\nWhatever yesterday held, it does not get the final word on today. Morning has come again, and with it, mercy. Great is His faithfulness — not was, not will be, but is.`,
    application: 'Before you check your phone tomorrow morning, pause and thank God for one specific mercy He is giving you fresh today.'
  },
  {
    theme: 'Love',
    title: 'Loved Before You Moved',
    verse: 'We love him, because he first loved us.',
    reference: '1 John 4:19',
    reflection: `Our love for God did not start the relationship — His did. Before you ever prayed, repented, or even knew His name, He loved you. Every step you take toward Him is a response to a step He took toward you first, long before you were aware of it.\n\nThis changes everything about how you approach Him today. You are not trying to earn love; you are answering it. You are not performing for acceptance; you are resting in a love that was already settled at the cross. When you feel distant from God, remember: the distance is never on His side.\n\nAnd the love you received was never meant to stop with you. The same verse that tells you why you love God tells you how to love people — because the love you pour out is simply the overflow of the love poured into you first.`,
    application: 'Do one deliberate act of kindness today for someone who cannot repay you, as a response to the love God gave you first.'
  },
  {
    theme: 'Peace',
    title: 'Peace That Stands Guard',
    verse: 'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
    reference: 'Philippians 4:7',
    reflection: `Paul wrote about peace from a prison cell. Not from a quiet retreat, not after the problems were solved — from chains. That tells you something essential: the peace of God is not the absence of trouble. It is the presence of a guard.\n\nThe word "keep" here is a military word. It means to stand watch, like a soldier at the gate of a city. God's peace does not just comfort your heart; it guards it. It stands posted at the door of your mind while the battle rages outside, deciding what gets in and what does not.\n\nNotice the order in the verses before: pray about everything, with thanksgiving — then peace comes. Peace is not something you chase; it is something that arrives when you hand the worry over. What are you still holding that you could hand to Him today?`,
    application: 'Write down the one thing stealing your peace, pray over it with thanksgiving, then physically set the paper aside as an act of handing it to God.'
  },
  {
    theme: 'Strength',
    title: 'Wings Like Eagles',
    verse: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
    reference: 'Isaiah 40:31',
    reflection: `Isaiah gives this promise to people who are exhausted — not the strong, but the weary. Notice the progression: flying, running, walking. Most of us want the soaring. God promises that too, but He also promises strength for the ordinary Tuesday walk, the slow faithful plodding when there is no wind beneath your wings.\n\nThe key is the waiting. "Wait upon the LORD" does not mean sitting idle; the Hebrew carries the picture of a rope twisted tighter, of strands bound together. Waiting on God is intertwining your weakness with His strength until you cannot tell where yours ends and His begins.\n\nYou do not need to manufacture strength today. You need to stay connected to the source of it. Eagles do not flap their way to altitude — they spread their wings and let the wind do the work. Spread yours.`,
    application: 'Identify one area where you have been striving in your own strength, and replace ten minutes of striving with ten minutes of quiet prayer.'
  },
  {
    theme: 'Gratitude',
    title: 'Enter With Thanksgiving',
    verse: 'Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name.',
    reference: 'Psalm 100:4',
    reflection: `Thanksgiving is described here as a doorway. You do not wait until you feel grateful to enter God's presence — gratitude is how you enter. It is the posture that opens the gates. Praise is not the reward for a good day; it is the path into God's courts on any day.\n\nThis psalm was sung by pilgrims climbing toward the temple, and it is sung by us climbing through ordinary life. The command is not "feel thankful" but "be thankful" — gratitude as a decision, not a mood. Feelings follow obedience more often than we expect.\n\nWhat is remarkable is the reason given in the next verse: "For the LORD is good; his mercy is everlasting." Gratitude is not pretending everything is fine. It is anchoring yourself to the one thing that is always true: He is good, and His mercy never runs out.`,
    application: 'List five specific things you are thankful for right now — no repeats from yesterday — and thank God for each one by name.'
  },
  {
    theme: 'Wisdom',
    title: 'Ask, and Keep Asking',
    verse: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.',
    reference: 'James 1:5',
    reflection: `James makes an astonishing promise: if you lack wisdom, ask — and God will give it, generously, without making you feel foolish for asking. The phrase "upbraideth not" means He will not scold you, shame you, or say "you should know this by now." He gives liberally, the way a good father gives, delighted to be asked.\n\nNotice the condition is simply lacking. Not being worthy, not having it all figured out, not asking perfectly. Just recognizing the gap between the decision in front of you and the wisdom you have for it. That gap is not a failure; it is an invitation.\n\nSo many of us agonize over decisions in circles, asking everyone except God. Today, bring the decision to Him first — before the group chat, before the pros-and-cons list. He has promised to answer.`,
    application: 'Bring your hardest current decision to God in prayer today, specifically asking for wisdom, and write down the first clear direction you sense.'
  },
  {
    theme: 'Faith',
    title: 'Walk by Faith, Not by Sight',
    verse: 'For we walk by faith, not by sight.',
    reference: '2 Corinthians 5:7',
    reflection: `Six words that reorder an entire life. Sight is a good servant but a terrible master. It reports only what is visible right now — the bank balance, the diagnosis, the closed door — and calls it the whole truth. Faith walks by a deeper report: what God has said.\n\nWalking implies motion. Faith is not standing still waiting for certainty; it is moving forward with confidence in the One who goes before you. Abraham walked to a land he had never seen. Peter walked on water toward a voice. Every step of faith in Scripture was taken before the outcome was visible.\n\nWhat step is in front of you today? You may not see the whole staircase, but you can see the next step. Take it. Sight will catch up eventually — it always does — but faith goes first.`,
    application: 'Take one concrete step today toward the thing God has been nudging you about, even though you cannot yet see how it will work out.'
  },
  {
    theme: 'Hope',
    title: 'An Expected End',
    verse: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.',
    reference: 'Jeremiah 29:11',
    reflection: `God spoke this to exiles — people dragged from their homes, living in a foreign land, wondering if He had abandoned them. Into that despair He declares: I know My thoughts toward you. They are thoughts of peace. There is an expected end — a future, a hope — and I am the one writing it.\n\nHere is what changes when you believe this: your circumstances stop being the author of your story. The exile was real, the pain was real, but neither got the final word. God's thoughts toward you are not an afterthought or a reaction to your mess. They were planned, they are peaceful, and they end well.\n\nYou may not see the expected end from where you stand. The exiles could not either — the promise was seventy years out. But hope is not the absence of waiting; it is the presence of trust while you wait. His thoughts toward you have not changed.`,
    application: 'Write down one area where you feel stuck, then write beside it: "God\'s thoughts toward me here are peace, not evil." Revisit it whenever doubt creeps in.'
  },
  {
    theme: 'Love',
    title: 'Greater Love Has No One',
    verse: 'Greater love hath no man than this, that a man lay down his life for his friends.',
    reference: 'John 15:13',
    reflection: `Jesus spoke these words on the night He would lay down His own life. He was not describing a theoretical ideal — He was narrating what He was about to do. The greatest love is not a feeling or a sentiment. It is a laying down: of comfort, of rights, of self, for the sake of another.\n\nAnd then He calls us friends. Not servants who must earn favor, but friends for whom He willingly gave everything. When you grasp that you are loved like this — loved to the point of sacrifice — it rewires how you see yourself. You are not tolerated by God. You are treasured.\n\nThis love also sets the pattern for ours. We may not be called to die for our friends, but we are called daily to lay down smaller things: our time, our preferences, our need to be right. Great love shows up in small layings-down.`,
    application: 'Lay down one small thing today for someone you love — your schedule, your preference, your pride — and do it quietly, without telling them.'
  },
  {
    theme: 'Peace',
    title: 'I Will Lie Down in Peace',
    verse: 'I will both lay me down in peace, and sleep: for thou, LORD, only makest me dwell in safety.',
    reference: 'Psalm 4:8',
    reflection: `David wrote this while people were actively working against him — verse 2 shows his enemies turning his glory to shame. Yet he ends the psalm talking about sleep. Not anxious tossing, not rehearsing tomorrow's battles, but peaceful rest. How? Because safety, for David, was not the absence of enemies. It was the presence of God.\n\n"Thou, LORD, only" — that word "only" does heavy lifting. Not God plus a good plan. Not God plus enough money. Not God plus everyone's approval. Only the LORD makes him dwell in safety. Everything else is a supplement; God alone is the source.\n\nMany of us carry the day into the night, replaying conversations and previewing worries. David's example is a nightly surrender: the day is done, the outcomes belong to God, and sleep is an act of trust. You can rest because He does not.`,
    application: 'Tonight, before sleep, name each lingering worry and consciously hand it to God — then put the phone down and rest.'
  },
  {
    theme: 'Strength',
    title: 'Our Refuge and Strength',
    verse: 'God is our refuge and strength, a very present help in trouble.',
    reference: 'Psalm 46:1',
    reflection: `Psalm 46 opens with a declaration, not a wish. God IS our refuge — present tense, settled fact. A refuge is not a place you visit when life is calm; it is where you run when the storm hits. And the psalmist adds "very present," as if to say: not distant, not delayed, not theoretical. Here. Now. In this trouble.\n\nThe rest of the psalm describes the worst imaginable chaos — mountains falling into the sea, nations raging, kingdoms tottering. And through it all, the refrain holds: God is with us. The trouble is real, but it is not ultimate. There is a river of gladness flowing through the city of God even while the world shakes.\n\nWhatever is shaking in your life today, you do not have to be unshaken to be safe. You just have to be in the refuge. Run there now — not after you have calmed down, but as you are.`,
    application: 'When trouble hits today, pause and pray Psalm 46:1 aloud before doing anything else — make God your first refuge, not your last resort.'
  },
  {
    theme: 'Gratitude',
    title: 'Give Thanks in Everything',
    verse: 'In every thing give thanks: for this is the will of God in Christ Jesus concerning you.',
    reference: '1 Thessalonians 5:18',
    reflection: `Paul does not say give thanks FOR everything — he says IN everything. That is a crucial distinction. He is not asking you to call pain good or pretend hardship is a gift. He is saying that even inside the hard thing, there is ground for gratitude, because God is in it with you and He is still good.\n\nAnd then Paul raises the stakes: "this is the will of God." We spend so much energy trying to discover God's will for our lives — which job, which city, which decision — while overlooking the will He has stated plainly. A thankful heart is not a suggestion; it is His revealed will for you.\n\nGratitude in hard places is not denial; it is defiance. It declares that trouble does not get to define your story. Practice it today, especially where it feels hardest — that is where it matters most.`,
    application: 'Find one difficult circumstance in your life right now and thank God for one true thing about Him that has not changed inside it.'
  },
  {
    theme: 'Wisdom',
    title: 'A Lamp for Your Feet',
    verse: 'Thy word is a lamp unto my feet, and a light unto my path.',
    reference: 'Psalm 119:105',
    reflection: `Notice what the psalmist does NOT say: God's word is a floodlight for the whole journey. It is a lamp for the feet — enough light for the next step. God rarely shows us the entire map. He shows us the next faithful move, and asks us to trust Him with the rest of the road.\n\nThis is both comforting and challenging. Comforting, because you do not need to have it all figured out. Challenging, because a lamp only helps if you are moving. Light for your feet does no good standing still. The promise is for the walking.\n\nIf you feel in the dark about a decision, the question is not "where is the spotlight?" but "am I in the Word?" Scripture will not answer every question you bring to it, but it will steady every step you take with it. Open it today — even for five minutes — and watch the next step become clear.`,
    application: 'Read one short passage of Scripture today specifically asking God to show you the next step — then take that step.'
  }
];

module.exports = { DEVOTIONALS };
