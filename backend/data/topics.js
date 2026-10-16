'use strict';

const TOPICS = {
  love: [
    { reference: 'John 3:16', text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." },
    { reference: '1 John 4:8', text: "He that loveth not knoweth not God; for God is love." },
    { reference: '1 John 4:19', text: "We love him, because he first loved us." },
    { reference: '1 Corinthians 13:4-5', text: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil;" },
    { reference: '1 Corinthians 13:13', text: "And now abideth faith, hope, charity, these three; but the greatest of these is charity." },
    { reference: 'Romans 5:8', text: "But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us." },
    { reference: 'John 15:13', text: "Greater love hath no man than this, that a man lay down his life for his friends." },
    { reference: 'Romans 8:38-39', text: "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord." }
  ],
  faith: [
    { reference: 'Hebrews 11:1', text: "Now faith is the substance of things hoped for, the evidence of things not seen." },
    { reference: '2 Corinthians 5:7', text: "For we walk by faith, not by sight:" },
    { reference: 'Mark 11:24', text: "Therefore I say unto you, What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them." },
    { reference: 'Ephesians 2:8', text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God:" },
    { reference: 'Romans 10:17', text: "So then faith cometh by hearing, and hearing by the word of God." },
    { reference: 'Hebrews 11:6', text: "But without faith it is impossible to please him: for he that cometh to God must believe that he is, and that he is a rewarder of them that diligently seek him." },
    { reference: 'Matthew 17:20', text: "If ye have faith as a grain of mustard seed, ye shall say unto this mountain, Remove hence to yonder place; and it shall remove; and nothing shall be impossible unto you." },
    { reference: 'Galatians 2:20', text: "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me." }
  ],
  hope: [
    { reference: 'Jeremiah 29:11', text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end." },
    { reference: 'Romans 15:13', text: "Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost." },
    { reference: 'Romans 8:28', text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose." },
    { reference: 'Lamentations 3:22-23', text: "It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness." },
    { reference: 'Psalm 42:11', text: "Why art thou cast down, O my soul? and why art thou disquieted within me? hope thou in God: for I shall yet praise him, who is the health of my countenance, and my God." },
    { reference: 'Hebrews 6:19', text: "Which hope we have as an anchor of the soul, both sure and stedfast, and which entereth into that within the veil;" },
    { reference: '1 Peter 1:3', text: "Blessed be the God and Father of our Lord Jesus Christ, which according to his abundant mercy hath begotten us again unto a lively hope by the resurrection of Jesus Christ from the dead," },
    { reference: 'Revelation 21:4', text: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away." }
  ],
  forgiveness: [
    { reference: '1 John 1:9', text: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness." },
    { reference: 'Ephesians 1:7', text: "In whom we have redemption through his blood, the forgiveness of sins, according to the riches of his grace;" },
    { reference: 'Colossians 3:13', text: "Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye." },
    { reference: 'Matthew 6:14', text: "For if ye forgive men their trespasses, your heavenly Father will also forgive you:" },
    { reference: 'Psalm 103:12', text: "As far as the east is from the west, so far hath he removed our transgressions from us." },
    { reference: 'Isaiah 1:18', text: "Come now, and let us reason together, saith the LORD: though your sins be as scarlet, they shall be as white as snow; though they be red like crimson, they shall be as wool." },
    { reference: 'Micah 7:19', text: "He will turn again, he will have compassion upon us; he will subdue our iniquities; and thou wilt cast all their sins into the depths of the sea." },
    { reference: 'Luke 15:20', text: "And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him." }
  ],
  peace: [
    { reference: 'John 14:27', text: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid." },
    { reference: 'Philippians 4:6-7', text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus." },
    { reference: 'Isaiah 26:3', text: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee." },
    { reference: 'Psalm 4:8', text: "I will both lay me down in peace, and sleep: for thou, LORD, only makest me dwell in safety." },
    { reference: 'Colossians 3:15', text: "And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful." },
    { reference: 'Numbers 6:24-26', text: "The LORD bless thee, and keep thee: The LORD make his face shine upon thee, and be gracious unto thee: The LORD lift up his countenance upon thee, and give thee peace." },
    { reference: 'Romans 5:1', text: "Therefore being justified by faith, we have peace with God through our Lord Jesus Christ:" },
    { reference: 'Psalm 29:11', text: "The LORD will give strength unto his people; the LORD will bless his people with peace." }
  ],
  strength: [
    { reference: 'Philippians 4:13', text: "I can do all things through Christ which strengtheneth me." },
    { reference: 'Isaiah 41:10', text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness." },
    { reference: 'Isaiah 40:31', text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint." },
    { reference: 'Psalm 46:1', text: "God is our refuge and strength, a very present help in trouble." },
    { reference: 'Joshua 1:9', text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest." },
    { reference: '2 Timothy 1:7', text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind." },
    { reference: 'Deuteronomy 31:6', text: "Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee." },
    { reference: 'Psalm 28:7', text: "The LORD is my strength and my shield; my heart trusted in him, and I am helped: therefore my heart greatly rejoiceth; and with my song will I praise him." }
  ],
  prayer: [
    { reference: 'Matthew 7:7', text: "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you:" },
    { reference: 'Mark 11:24', text: "Therefore I say unto you, What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them." },
    { reference: '1 John 5:14', text: "And this is the confidence that we have in him, that, if we ask any thing according to his will, he heareth us:" },
    { reference: '1 Thessalonians 5:17', text: "Pray without ceasing." },
    { reference: 'Jeremiah 33:3', text: "Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not." },
    { reference: 'Psalm 145:18', text: "The LORD is nigh unto all them that call upon him, to all that call upon him in truth." },
    { reference: 'Matthew 21:22', text: "And all things, whatsoever ye shall ask in prayer, believing, ye shall receive." },
    { reference: 'James 5:16', text: "Confess your faults one to another, and pray one for another, that ye may be healed. The effectual fervent prayer of a righteous man availeth much." }
  ],
  salvation: [
    { reference: 'Acts 16:31', text: "And they said, Believe on the Lord Jesus Christ, and thou shalt be saved, and thy house." },
    { reference: 'Romans 10:9', text: "That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved." },
    { reference: 'John 14:6', text: "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me." },
    { reference: 'Ephesians 2:8', text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God:" },
    { reference: 'Romans 6:23', text: "For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord." },
    { reference: 'John 1:12', text: "But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name:" },
    { reference: 'Titus 3:5', text: "Not by works of righteousness which we have done, but according to his mercy he saved us, by the washing of regeneration, and renewing of the Holy Ghost;" },
    { reference: '2 Corinthians 5:17', text: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new." }
  ],
  wisdom: [
    { reference: 'James 1:5', text: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him." },
    { reference: 'Proverbs 3:5-6', text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths." },
    { reference: 'Proverbs 3:13', text: "Happy is the man that findeth wisdom, and the man that getteth understanding." },
    { reference: 'Proverbs 4:23', text: "Keep thy heart with all diligence; for out of it are the issues of life." },
    { reference: 'Proverbs 16:3', text: "Commit thy works unto the LORD, and thy thoughts shall be established." },
    { reference: 'Psalm 111:10', text: "The fear of the LORD is the beginning of wisdom: a good understanding have all they that do his commandments: his praise endureth for ever." },
    { reference: 'James 3:17', text: "But the wisdom that is from above is first pure, then peaceable, gentle, and easy to be intreated, full of mercy and good fruits, without partiality, and without hypocrisy." },
    { reference: 'Proverbs 2:6', text: "For the LORD giveth wisdom: out of his mouth cometh knowledge and understanding." }
  ],
  joy: [
    { reference: 'Psalm 16:11', text: "Thou wilt shew me the path of life: in thy presence is fulness of joy; at thy right hand there are pleasures for evermore." },
    { reference: 'Psalm 118:24', text: "This is the day which the LORD hath made; we will rejoice and be glad in it." },
    { reference: 'Nehemiah 8:10', text: "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord: neither be ye sorry; for the joy of the LORD is your strength." },
    { reference: 'John 15:11', text: "These things have I spoken unto you, that my joy might remain in you, and that your joy might be full." },
    { reference: 'Galatians 5:22', text: "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith," },
    { reference: '1 Thessalonians 5:16', text: "Rejoice evermore." },
    { reference: 'Philippians 4:4', text: "Rejoice in the Lord alway: and again I say, Rejoice." },
    { reference: 'Psalm 30:5', text: "For his anger endureth but a moment; in his favour is life: weeping may endure for a night, but joy cometh in the morning." }
  ]
};

module.exports = { TOPICS };
