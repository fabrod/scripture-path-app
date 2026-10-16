// Translation catalog: public-domain + licensed (via backend proxy).
// bible-api.com serves the public-domain ones directly (no key).
// ESV / NLT / NKJV go through our backend (keys server-side).

export const TRANSLATIONS = [
  // Public domain — served via bible-api.com, no key needed
  { id: 'kjv', name: 'King James Version', short: 'KJV', license: 'public-domain', api: 'bible-api' },
  { id: 'asv', name: 'American Standard Version', short: 'ASV', license: 'public-domain', api: 'bible-api' },
  { id: 'web', name: 'World English Bible', short: 'WEB', license: 'public-domain', api: 'bible-api' },
  { id: 'ylt', name: "Young's Literal Translation", short: 'YLT', license: 'public-domain', api: 'bible-api' },
  { id: 'bbe', name: 'Bible in Basic English', short: 'BBE', license: 'public-domain', api: 'bible-api' },
  { id: 'darby', name: 'Darby Bible', short: 'Darby', license: 'public-domain', api: 'bible-api' },
  { id: 'cuv', name: '和合本 Chinese Union Version', short: 'CUV', license: 'public-domain', api: 'bible-api', note: '1919 original text' },
  { id: 'lsg', name: 'Louis Segond', short: 'LSG', license: 'public-domain', api: 'bible-api', lang: 'French' },
  { id: 'lut', name: 'Luther Bibel 1912', short: 'LUT', license: 'public-domain', api: 'bible-api', lang: 'German' },
  { id: 'rv09', name: 'Reina-Valera 1909', short: 'RV09', license: 'public-domain', api: 'bible-api', lang: 'Spanish' },
  { id: 'svd', name: 'Smith-Van Dyke', short: 'SVD', license: 'public-domain', api: 'bible-api', lang: 'Arabic' },
  { id: 'dio', name: 'Diodati 1649', short: 'DIO', license: 'public-domain', api: 'bible-api', lang: 'Italian' },
  // Licensed — served via our backend proxy (keys server-side)
  { id: 'esv', name: 'English Standard Version', short: 'ESV', license: 'crossway', api: 'backend', attribution: 'Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), © 2001 by Crossway.' },
  { id: 'nlt', name: 'New Living Translation', short: 'NLT', license: 'tyndale', api: 'backend', attribution: 'Scripture quotations are from the Holy Bible, New Living Translation, © 1996–2015 by Tyndale House Foundation.' },
  { id: 'nkjv', name: 'New King James Version', short: 'NKJV', license: 'api-bible', api: 'backend', attribution: 'Scripture quotations from the New King James Version®, © 1982 by Thomas Nelson.' },
];

export const translationById = (id) =>
  TRANSLATIONS.find((t) => t.id === id) || TRANSLATIONS[0];

export const BIBLE_BOOKS = [
  'Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth',
  '1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra',
  'Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon',
  'Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos',
  'Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi',
  'Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians',
  'Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians',
  '1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter',
  '1 John','2 John','3 John','Jude','Revelation',
];
