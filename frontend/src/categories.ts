export interface Category {
  id: string;
  name: string;
  translations: Partial<Record<string, string>>;
  icon?: string;
  subcategories?: {
    [key: string]: string[]; // language code -> subcategories array
  };
}

export const CATEGORIES: Category[] = [
  {
    id: "arts",
    name: "Arts",
    translations: {
      en: "Arts",
      de: "Kunst",
      fr: "Art",
      es: "Arte",
      it: "Arte",
      pt: "Arte",
      ru: "Искусство",
      zh: "艺术",
      ja: "芸術",
      ar: "فن",
      fa: "هنر",
      he: "אומנות",
      hi: "कला",
      tr: "Sanat",
      id: "Seni",
      nl: "Kunst",
      cs: "Umění",
      sk: "Umenie",
      pl: "Sztuka",
      eu: "Artea"
    },
    icon: "🎨",
    subcategories: {
      en: [
        "Visual arts",
        "Performing arts",
        "Literature",
        "Music",
        "Architecture"
      ],
      de: [
        "Bildende Kunst",
        "Darstellende Kunst",
        "Literatur",
        "Musik",
        "Architektur"
      ],
      fr: [
        "Arts visuels",
        "Arts du spectacle",
        "Littérature",
        "Musique",
        "Architecture"
      ],
      es: [
        "Artes visuales",
        "Artes escénicas",
        "Literatura",
        "Música",
        "Arquitectura"
      ],
      it: [
        "Arti visive",
        "Arti dello spettacolo",
        "Letteratura",
        "Musica",
        "Architettura"
      ],
      pt: [
        "Artes visuais",
        "Artes performativas",
        "Literatura",
        "Música",
        "Arquitetura"
      ],
      ru: [
        "Изобразительное искусство",
        "Исполнительские искусства",
        "Литература",
        "Музыка",
        "Архитектура"
      ],
      zh: [
        "视觉艺术",
        "表演艺术",
        "文学",
        "音乐",
        "建筑"
      ],
      ja: [
        "視覚芸術",
        "舞台芸術",
        "文学",
        "音楽",
        "建築"
      ],
      ar: [
        "الفنون البصرية",
        "فنون الأداء",
        "الأدب",
        "الموسيقى",
        "العمارة"
      ],
      fa: [
        "هنرهای تجسمی",
        "هنرهای نمایشی",
        "ادبیات",
        "موسیقی",
        "معماری"
      ],
      he: [
        "אמנות חזותית",
        "אמנויות הבמה",
        "ספרות",
        "מוזיקה",
        "אדריכלות"
      ],
      hi: [
        "दृश्य कला",
        "प्रदर्शन कला",
        "साहित्य",
        "संगीत",
        "वास्तुकला"
      ],
      tr: [
        "Görsel sanatlar",
        "Sahne sanatları",
        "Edebiyat",
        "Müzik",
        "Mimari"
      ],
      id: [
        "Seni visual",
        "Seni pertunjukan",
        "Sastra",
        "Musik",
        "Arsitektur"
      ],
      nl: [
        "Beeldende kunst",
        "Podiumkunsten",
        "Literatuur",
        "Muziek",
        "Architectuur"
      ],
      cs: [
        "Výtvarné umění",
        "Scénické umění",
        "Literatura",
        "Hudba",
        "Architektura"
      ],
      sk: [
        "Výtvarné umenie",
        "Scénické umenie",
        "Literatúra",
        "Hudba",
        "Architektúra"
      ],
      pl: [
        "Sztuki wizualne",
        "Sztuki performatywne",
        "Literatura",
        "Muzyka",
        "Architektura"
      ],
      eu: [
        "Arte bisualak",
        "Arte eszenikoak",
        "Literatura",
        "Musika",
        "Arkitektura"
      ]
    }
  },
  {
    id: "science",
    name: "Science",
    translations: {
      en: "Science",
      de: "Wissenschaft",
      fr: "Science",
      es: "Ciencia",
      it: "Scienza",
      pt: "Ciência",
      ru: "Наука",
      zh: "科学",
      ja: "科学",
      ar: "علوم",
      fa: "علوم",
      he: "מדע",
      hi: "विज्ञान",
      tr: "Bilim",
      id: "Ilmu",
      nl: "Wetenschap",
      cs: "Věda",
      sk: "Veda",
      pl: "Nauka",
      eu: "Zientzia"
    },
    icon: "🔬",
    subcategories: {
      en: [
        "Physics",
        "Chemistry",
        "Biology",
        "Astronomy",
        "Mathematics"
      ],
      de: [
        "Physik",
        "Chemie",
        "Biologie",
        "Astronomie",
        "Mathematik"
      ],
      fr: [
        "Physique",
        "Chimie",
        "Biologie",
        "Astronomie",
        "Mathématiques"
      ],
      es: [
        "Física",
        "Química",
        "Biología",
        "Astronomía",
        "Matemáticas"
      ],
      it: [
        "Fisica",
        "Chimica",
        "Biologia",
        "Astronomia",
        "Matematica"
      ],
      pt: [
        "Física",
        "Química",
        "Biologia",
        "Astronomia",
        "Matemática"
      ],
      ru: [
        "Физика",
        "Химия",
        "Биология",
        "Астрономия",
        "Математика"
      ],
      zh: [
        "物理学",
        "化学",
        "生物学",
        "天文学",
        "数学"
      ],
      ja: [
        "物理学",
        "化学",
        "生物学",
        "天文学",
        "数学"
      ],
      ar: [
        "فيزياء",
        "كيمياء",
        "علم الأحياء",
        "علم الفلك",
        "رياضيات"
      ],
      fa: [
        "فیزیک",
        "شیمی",
        "زیست‌شناسی",
        "ستاره‌شناسی",
        "ریاضیات"
      ],
      he: [
        "פיזיקה",
        "כימיה",
        "ביולוגיה",
        "אסטרונומיה",
        "מתמטיקה"
      ],
      hi: [
        "भौतिकी",
        "रसायन विज्ञान",
        "जीव विज्ञान",
        "खगोल विज्ञान",
        "गणित"
      ],
      tr: [
        "Fizik",
        "Kimya",
        "Biyoloji",
        "Astronomi",
        "Matematik"
      ],
      id: [
        "Fisika",
        "Kimia",
        "Biologi",
        "Astronomi",
        "Matematika"
      ],
      nl: [
        "Natuurkunde",
        "Scheikunde",
        "Biologie",
        "Astronomie",
        "Wiskunde"
      ],
      cs: [
        "Fyzika",
        "Chemie",
        "Biologie",
        "Astronomie",
        "Matematika"
      ],
      sk: [
        "Fyzika",
        "Chémia",
        "Biológia",
        "Astronómia",
        "Matematika"
      ],
      pl: [
        "Fizyka",
        "Chemia",
        "Biologia",
        "Astronomia",
        "Matematyka"
      ],
      eu: [
        "Fisika",
        "Kimika",
        "Biologia",
        "Astronomia",
        "Matematika"
      ]
    }
  },
  {
    id: "technology",
    name: "Technology",
    translations: {
      en: "Technology",
      de: "Technologie",
      fr: "Technologie",
      es: "Tecnología",
      it: "Tecnologia",
      pt: "Tecnologia",
      ru: "Технология",
      zh: "技术",
      ja: "技術",
      ar: "تكنولوجيا",
      fa: "تکنولوژی",
      he: "טכנולוגיה",
      hi: "प्रौद्योगिकी",
      tr: "Teknoloji",
      id: "Teknologi",
      nl: "Technologie",
      cs: "Technologie",
      sk: "Technológia",
      pl: "Technologia",
      eu: "Teknologia"
    },
    icon: "💻",
    subcategories: {
      en: [
        "Computing",
        "Internet",
        "Artificial Intelligence",
        "Robotics",
        "Electronics"
      ],
      de: [
        "Informatik",
        "Internet",
        "Künstliche Intelligenz",
        "Robotik",
        "Elektronik"
      ],
      fr: [
        "Informatique",
        "Internet",
        "Intelligence artificielle",
        "Robotique",
        "Électronique"
      ],
      es: [
        "Informática",
        "Internet",
        "Inteligencia artificial",
        "Robótica",
        "Electrónica"
      ],
      it: [
        "Informatica",
        "Internet",
        "Intelligenza artificiale",
        "Robotica",
        "Elettronica"
      ],
      pt: [
        "Computação",
        "Internet",
        "Inteligência artificial",
        "Robótica",
        "Eletrônica"
      ],
      ru: [
        "Информатика",
        "Интернет",
        "Искусственный интеллект",
        "Робототехника",
        "Электроника"
      ],
      zh: [
        "计算机科学",
        "互联网",
        "人工智能",
        "机器人技术",
        "电子学"
      ],
      ja: [
        "コンピュータ",
        "インターネット",
        "人工知能",
        "ロボット工学",
        "電子工学"
      ],
      ar: [
        "الحوسبة",
        "الإنترنت",
        "الذكاء الاصطناعي",
        "الروبوتات",
        "الإلكترونيات"
      ],
      fa: [
        "رایانش",
        "اینترنت",
        "هوش مصنوعی",
        "رباتیک",
        "الکترونیک"
      ],
      he: [
        "מחשוב",
        "אינטרנט",
        "בינה מלאכותית",
        "רובוטיקה",
        "אלקטרוניקה"
      ],
      hi: [
        "कम्प्यूटिंग",
        "इंटरनेट",
        "कृत्रिम बुद्धिमत्ता",
        "रोबोटिक्स",
        "इलेक्ट्रॉनिक्स"
      ],
      tr: [
        "Bilgisayar",
        "İnternet",
        "Yapay Zeka",
        "Robotik",
        "Elektronik"
      ],
      id: [
        "Komputasi",
        "Internet",
        "Kecerdasan Buatan",
        "Robotika",
        "Elektronika"
      ],
      nl: [
        "Informatica",
        "Internet",
        "Kunstmatige intelligentie",
        "Robotica",
        "Elektronica"
      ],
      cs: [
        "Výpočetní technika",
        "Internet",
        "Umělá inteligence",
        "Robotika",
        "Elektronika"
      ],
      sk: [
        "Výpočtová technika",
        "Internet",
        "Umelá inteligencia",
        "Robotika",
        "Elektronika"
      ],
      pl: [
        "Informatyka",
        "Internet",
        "Sztuczna inteligencja",
        "Robotyka",
        "Elektronika"
      ],
      eu: [
        "Informatika",
        "Internet",
        "Adimen artifiziala",
        "Robotika",
        "Elektronika"
      ]
    }
  },
  {
    id: "history",
    name: "History",
    translations: {
      en: "History",
      de: "Geschichte",
      fr: "Histoire",
      es: "Historia",
      it: "Storia",
      pt: "História",
      ru: "История",
      zh: "历史",
      ja: "歴史",
      ar: "تاريخ",
      fa: "تاریخ",
      he: "היסטוריה",
      hi: "इतिहास",
      tr: "Tarih",
      id: "Sejarah",
      nl: "Geschiedenis",
      cs: "Dějiny",
      sk: "Dejiny",
      pl: "Historia",
      eu: "Historia"
    },
    icon: "📚",
    subcategories: {
      en: [
        "Ancient history",
        "Medieval history",
        "Modern history",
        "Military history",
        "Cultural history"
      ],
      de: [
        "Alte Geschichte",
        "Mittelalterliche Geschichte",
        "Moderne Geschichte",
        "Militärgeschichte",
        "Kulturgeschichte"
      ],
      fr: [
        "Histoire ancienne",
        "Histoire médiévale",
        "Histoire moderne",
        "Histoire militaire",
        "Histoire culturelle"
      ],
      es: [
        "Historia antigua",
        "Historia medieval",
        "Historia moderna",
        "Historia militar",
        "Historia cultural"
      ],
      it: [
        "Storia antica",
        "Storia medievale",
        "Storia moderna",
        "Storia militare",
        "Storia culturale"
      ],
      pt: [
        "História antiga",
        "História medieval",
        "História moderna",
        "História militar",
        "História cultural"
      ],
      ru: [
        "Древняя история",
        "Средневековая история",
        "Новая история",
        "Военная история",
        "История культуры"
      ],
      zh: [
        "古代历史",
        "中世纪历史",
        "现代历史",
        "军事历史",
        "文化历史"
      ],
      ja: [
        "古代史",
        "中世史",
        "近現代史",
        "軍事史",
        "文化史"
      ],
      ar: [
        "التاريخ القديم",
        "تاريخ العصور الوسطى",
        "التاريخ الحديث",
        "التاريخ العسكري",
        "التاريخ الثقافي"
      ],
      fa: [
        "تاریخ باستان",
        "تاریخ قرون وسطی",
        "تاریخ معاصر",
        "تاریخ نظامی",
        "تاریخ فرهنگی"
      ],
      he: [
        "היסטוריה עתיקה",
        "היסטוריה של ימי הביניים",
        "היסטוריה מודרנית",
        "היסטוריה צבאית",
        "היסטוריה תרבותית"
      ],
      hi: [
        "प्राचीन इतिहास",
        "मध्ययुगीन इतिहास",
        "आधुनिक इतिहास",
        "सैन्य इतिहास",
        "सांस्कृतिक इतिहास"
      ],
      tr: [
        "Antik tarih",
        "Orta Çağ tarihi",
        "Modern tarih",
        "Askeri tarih",
        "Kültür tarihi"
      ],
      id: [
        "Sejarah kuno",
        "Sejarah abad pertengahan",
        "Sejarah modern",
        "Sejarah militer",
        "Sejarah budaya"
      ],
      nl: [
        "Oude geschiedenis",
        "Middeleeuwse geschiedenis",
        "Moderne geschiedenis",
        "Militaire geschiedenis",
        "Cultuurgeschiedenis"
      ],
      cs: [
        "Starověké dějiny",
        "Středověké dějiny",
        "Moderní dějiny",
        "Vojenské dějiny",
        "Kulturní dějiny"
      ],
      sk: [
        "Staroveké dejiny",
        "Stredoveké dejiny",
        "Moderné dejiny",
        "Vojenské dejiny",
        "Kultúrne dejiny"
      ],
      pl: [
        "Historia starożytna",
        "Historia średniowieczna",
        "Historia nowożytna",
        "Historia wojskowości",
        "Historia kultury"
      ],
      eu: [
        "Antzinako historia",
        "Erdi Aroko historia",
        "Historia modernoa",
        "Historia militarra",
        "Kultura historia"
      ]
    }
  },
  {
    id: "geography",
    name: "Geography",
    translations: {
      en: "Geography",
      de: "Geographie",
      fr: "Géographie",
      es: "Geografía",
      it: "Geografia",
      pt: "Geografia",
      ru: "География",
      zh: "地理",
      ja: "地理",
      ar: "جغرافيا",
      fa: "جغرافیا",
      he: "גאוגרפיה",
      hi: "भूगोल",
      tr: "Coğrafya",
      id: "Geografi",
      nl: "Geografie",
      cs: "Geografie",
      sk: "Geografia",
      pl: "Geografia",
      eu: "Geografia"
    },
    icon: "🌍",
    subcategories: {
      en: [
        "Physical geography",
        "Human geography",
        "Climate",
        "Cartography",
        "Geology"
      ],
      de: [
        "Physische Geographie",
        "Humangeographie",
        "Klima",
        "Kartographie",
        "Geologie"
      ],
      fr: [
        "Géographie physique",
        "Géographie humaine",
        "Climat",
        "Cartographie",
        "Géologie"
      ],
      es: [
        "Geografía física",
        "Geografía humana",
        "Clima",
        "Cartografía",
        "Geología"
      ],
      it: [
        "Geografia fisica",
        "Geografia umana",
        "Clima",
        "Cartografia",
        "Geologia"
      ],
      pt: [
        "Geografia física",
        "Geografia humana",
        "Clima",
        "Cartografia",
        "Geologia"
      ],
      ru: [
        "Физическая география",
        "Социальная география",
        "Климат",
        "Картография",
        "Геология"
      ],
      zh: [
        "自然地理",
        "人文地理",
        "气候",
        "地图学",
        "地质学"
      ],
      ja: [
        "自然地理",
        "人文地理",
        "気候",
        "地図学",
        "地質学"
      ],
      ar: [
        "الجغرافيا الطبيعية",
        "الجغرافيا البشرية",
        "المناخ",
        "علم الخرائط",
        "علم الأرض"
      ],
      fa: [
        "جغرافیای طبیعی",
        "جغرافیای انسانی",
        "اقلیم",
        "نقشه‌نگاری",
        "زمین‌شناسی"
      ],
      he: [
        "גאוגרפיה פיזית",
        "גאוגרפיה אנושית",
        "אקלים",
        "קרטוגרפיה",
        "גאולוגיה"
      ],
      hi: [
        "भौतिक भूगोल",
        "मानव भूगोल",
        "जलवायु",
        "मानचित्र विज्ञान",
        "भूविज्ञान"
      ],
      tr: [
        "Fiziki coğrafya",
        "Beşeri coğrafya",
        "İklim",
        "Kartografya",
        "Jeoloji"
      ],
      id: [
        "Geografi fisik",
        "Geografi manusia",
        "Iklim",
        "Kartografi",
        "Geologi"
      ],
      nl: [
        "Fysische geografie",
        "Sociale geografie",
        "Klimaat",
        "Cartografie",
        "Geologie"
      ],
      cs: [
        "Fyzická geografie",
        "Humánní geografie",
        "Klima",
        "Kartografie",
        "Geologie"
      ],
      sk: [
        "Fyzická geografia",
        "Humánna geografia",
        "Klíma",
        "Kartografia",
        "Geológia"
      ],
      pl: [
        "Geografia fizyczna",
        "Geografia społeczna",
        "Klimat",
        "Kartografia",
        "Geologia"
      ],
      eu: [
        "Geografia fisikoa",
        "Giza geografia",
        "Klima",
        "Kartografia",
        "Geologia"
      ]
    }
  },
  {
    id: "culture",
    name: "Culture",
    translations: {
      en: "Culture",
      de: "Kultur",
      fr: "Culture",
      es: "Cultura",
      it: "Cultura",
      pt: "Cultura",
      ru: "Культура",
      zh: "文化",
      ja: "文化",
      ar: "ثقافة",
      fa: "فرهنگ",
      he: "תרבות",
      hi: "संस्कृति",
      tr: "Kültür",
      id: "Budaya",
      nl: "Cultuur",
      cs: "Kultura",
      sk: "Kultúra",
      pl: "Kultura",
      eu: "Kultura"
    },
    icon: "🎭",
    subcategories: {
      en: ["Traditions", "Customs", "Festivals", "Food and cuisine", "Fashion"],
      de: ["Traditionen", "Bräuche", "Feste", "Essen und Küche", "Mode"],
      fr: ["Traditions", "Coutumes", "Festivals", "Gastronomie", "Mode"],
      es: ["Tradiciones", "Costumbres", "Festivales", "Gastronomía", "Moda"],
      it: ["Tradizioni", "Costumi", "Festival", "Gastronomia", "Moda"],
      pt: ["Tradições", "Costumes", "Festivais", "Gastronomia", "Moda"],
      ru: ["Традиции", "Обычаи", "Фестивали", "Кулинария", "Мода"],
      zh: ["传统", "习俗", "节日", "饮食", "时尚"],
      ja: ["伝統", "習慣", "祭り", "料理", "ファッション"],
      ar: ["تقاليد", "عادات", "مهرجانات", "طعام وطبخ", "أزياء"],
      fa: ["سنت‌ها", "آداب و رسوم", "جشنواره‌ها", "غذا و آشپزی", "مد"],
      he: ["מסורות", "מנהגים", "פסטיבלים", "אוכל ובישול", "אופנה"],
      hi: ["परंपराएं", "रीति-रिवाज", "त्योहार", "खाना और पाक-कला", "फैशन"],
      tr: ["Gelenekler", "Görenekler", "Festivaller", "Yemek kültürü", "Moda"],
      id: ["Tradisi", "Adat istiadat", "Festival", "Kuliner", "Mode"],
      nl: ["Tradities", "Gebruiken", "Festivals", "Keuken", "Mode"],
      cs: ["Tradice", "Zvyky", "Festivaly", "Gastronomie", "Móda"],
      sk: ["Tradície", "Zvyky", "Festivaly", "Gastronómia", "Móda"],
      pl: ["Tradycje", "Zwyczaje", "Festiwale", "Gastronomia", "Moda"],
      eu: ["Tradizioak", "Ohiturak", "Jaialdiak", "Gastronomia", "Moda"]
    }
  },
  {
    id: "sports",
    name: "Sports",
    translations: {
      en: "Sports",
      de: "Sport",
      fr: "Sport",
      es: "Deportes",
      it: "Sport",
      pt: "Desporto",
      ru: "Спорт",
      zh: "体育",
      ja: "スポーツ",
      ar: "رياضة",
      fa: "ورزش",
      he: "ספורט",
      hi: "खेल",
      tr: "Spor",
      id: "Olahraga",
      nl: "Sport",
      cs: "Sport",
      sk: "Šport",
      pl: "Sport",
      eu: "Kirola"
    },
    icon: "⚽",
    subcategories: {
      en: ["Team sports", "Individual sports", "Olympic sports", "Extreme sports", "Combat sports"],
      de: ["Mannschaftssport", "Einzelsport", "Olympische Sportarten", "Extremsport", "Kampfsport"],
      fr: ["Sports d'équipe", "Sports individuels", "Sports olympiques", "Sports extrêmes", "Sports de combat"],
      es: ["Deportes de equipo", "Deportes individuales", "Deportes olímpicos", "Deportes extremos", "Deportes de combate"],
      it: ["Sport di squadra", "Sport individuali", "Sport olimpici", "Sport estremi", "Sport da combattimento"],
      pt: ["Desportos coletivos", "Desportos individuais", "Desportos olímpicos", "Desportos radicais", "Desportos de combate"],
      ru: ["Командные виды спорта", "Индивидуальные виды спорта", "Олимпийские виды спорта", "Экстремальные виды спорта", "Боевые искусства"],
      zh: ["团队运动", "个人运动", "奥运项目", "极限运动", "格斗运动"],
      ja: ["チームスポーツ", "個人スポーツ", "オリンピック競技", "エクストリームスポーツ", "格闘技"],
      ar: ["رياضات جماعية", "رياضات فردية", "رياضات أولمبية", "رياضات متطرفة", "رياضات قتالية"],
      fa: ["ورزش‌های تیمی", "ورزش‌های انفرادی", "ورزش‌های المپیک", "ورزش‌های مهیج", "ورزش‌های رزمی"],
      he: ["ספורט קבוצתי", "ספורט יחידני", "ספורט אולימפי", "ספורט אתגרי", "אומנויות לחימה"],
      hi: ["टीम खेल", "एकल खेल", "ओलंपिक खेल", "साहसिक खेल", "मार्शल आर्ट"],
      tr: ["Takım sporları", "Bireysel sporlar", "Olimpik sporlar", "Ekstrem sporlar", "Dövüş sporları"],
      id: ["Olahraga tim", "Olahraga individu", "Olahraga olimpiade", "Olahraga ekstrem", "Olahraga tempur"],
      nl: ["Teamsporten", "Individuele sporten", "Olympische sporten", "Extreme sporten", "Vechtsporten"],
      cs: ["Týmové sporty", "Individuální sporty", "Olympijské sporty", "Extrémní sporty", "Bojové sporty"],
      sk: ["Tímové športy", "Individuálne športy", "Olympijské športy", "Extrémne športy", "Bojové športy"],
      pl: ["Sporty zespołowe", "Sporty indywidualne", "Sporty olimpijskie", "Sporty ekstremalne", "Sporty walki"],
      eu: ["Talde kirolak", "Banakako kirolak", "Olinpiar kirolak", "Muturreko kirolak", "Borroka kirolak"]
    }
  },
  {
    id: "nature",
    name: "Nature",
    translations: {
      en: "Nature",
      de: "Natur",
      fr: "Nature",
      es: "Naturaleza",
      it: "Natura",
      pt: "Natureza",
      ru: "Природа",
      zh: "自然",
      ja: "自然",
      ar: "طبيعة",
      fa: "طبیعت",
      he: "טבע",
      hi: "प्रकृति",
      tr: "Doğa",
      id: "Alam",
      nl: "Natuur",
      cs: "Příroda",
      sk: "Príroda",
      pl: "Przyroda",
      eu: "Natura"
    },
    icon: "🌿",
    subcategories: {
      en: ["Wildlife", "Plants", "Ecosystems", "Conservation", "Natural phenomena"],
      de: ["Tierwelt", "Pflanzen", "Ökosysteme", "Naturschutz", "Naturphänomene"],
      fr: ["Faune", "Flore", "Écosystèmes", "Conservation", "Phénomènes naturels"],
      es: ["Fauna", "Flora", "Ecosistemas", "Conservación", "Fenómenos naturales"],
      it: ["Fauna", "Flora", "Ecosistemi", "Conservazione", "Fenomeni naturali"],
      pt: ["Fauna", "Flora", "Ecossistemas", "Conservação", "Fenômenos naturais"],
      ru: ["Дикая природа", "Растения", "Экосистемы", "Охрана природы", "Природные явления"],
      zh: ["野生动物", "植物", "生态系统", "自然保护", "自然现象"],
      ja: ["野生生物", "植物", "生態系", "自然保護", "自然現象"],
      ar: ["الحياة البرية", "النباتات", "النظم البيئية", "الحفاظ على البيئة", "پدیده‌های طبیعی"],
      fa: ["حیات وحش", "گیاهان", "اکوسیستم‌ها", "حفاظت از محیط زیست", "پدیده‌های طبیعی"],
      he: ["חיות בר", "צמחים", "מערכות אקולוגיות", "שימור הטבע", "תופעות טבע"],
      hi: ["वन्यजीव", "वनस्पति", "पारिस्थितिक तंत्र", "संरक्षण", "प्राकृतिक घटनाएं"],
      tr: ["Yaban hayatı", "Bitkiler", "Ekosistemler", "Koruma", "Doğal olaylar"],
      id: ["Margasatwa", "Tumbuhan", "Ekosistem", "Konservasi", "Fenomena alam"],
      nl: ["Wildlife", "Planten", "Ecosystemen", "Natuurbehoud", "Natuurverschijnselen"],
      cs: ["Divoká příroda", "Rostliny", "Ekosystémy", "Ochrana přírody", "Přírodní jevy"],
      sk: ["Divá príroda", "Rastliny", "Ekosystémy", "Ochrana prírody", "Prírodné javy"],
      pl: ["Dzika przyroda", "Rośliny", "Ekosystemy", "Ochrona przyrody", "Zjawiska naturalne"],
      eu: ["Basabereak", "Landareak", "Ekosistemak", "Kontserbazioa", "Natura fenomenoak"]
    }
  },
  {
    id: "economics",
    name: "Economics",
    translations: {
      en: "Economics",
      de: "Wirtschaft",
      fr: "Économie",
      es: "Economía",
      it: "Economia",
      pt: "Economia",
      ru: "Экономика",
      zh: "经济学",
      ja: "経済学",
      ar: "اقتصاد",
      fa: "اقتصاد",
      he: "כלכלה",
      hi: "अर्थशास्त्र",
      tr: "Ekonomi",
      id: "Ekonomi",
      nl: "Economie",
      cs: "Ekonomie",
      sk: "Ekonómia",
      pl: "Ekonomia",
      eu: "Ekonomia"
    },
    icon: "💰",
    subcategories: {
      en: ["Macroeconomics", "Microeconomics", "International trade", "Finance", "Business"],
      de: ["Makroökonomie", "Mikroökonomie", "Internationaler Handel", "Finanzen", "Geschäft"],
      fr: ["Macroéconomie", "Microéconomie", "Commerce international", "Finance", "Entreprise"],
      es: ["Macroeconomía", "Microeconomía", "Comercio internacional", "Finanzas", "Negocios"],
      it: ["Macroeconomia", "Microeconomia", "Commercio internazionale", "Finanza", "Affari"],
      pt: ["Macroeconomia", "Microeconomia", "Comércio internacional", "Finanças", "Negócios"],
      ru: ["Макроэкономика", "Микроэкономика", "Международная торговля", "Финансы", "Бизнес"],
      zh: ["宏观经济学", "微观经济学", "国际贸易", "金融", "商业"],
      ja: ["マクロ経済学", "ミクロ経済学", "国際貿易", "金融", "ビジネス"],
      ar: ["الاقتصاد الكلي", "الاقتصاد الجزئي", "التجارة الدولية", "المالية", "الأعمال"],
      fa: ["اقتصاد کلان", "اقتصاد خرد", "تجارت بین‌المللی", "امور مالی", "کسب و کار"],
      he: ["מקרו-כלכלה", "מיקרו-כלכלה", "סחר בינלאומי", "פיננסים", "עסקים"],
      hi: ["समष्टि अर्थशास्त्र", "व्यष्टि अर्थशास्त्र", "अंतर्राष्ट्रीय व्यापार", "वित्त", "व्यवसाय"],
      tr: ["Makroekonomi", "Mikroekonomi", "Uluslararası ticaret", "Finans", "İş dünyası"],
      id: ["Makroekonomi", "Mikroekonomi", "Perdagangan internasional", "Keuangan", "Bisnis"],
      nl: ["Macro-economie", "Micro-economie", "Internationale handel", "Financiën", "Bedrijfsleven"],
      cs: ["Makroekonomie", "Mikroekonomie", "Mezinárodní obchod", "Finance", "Podnikání"],
      sk: ["Makroekonómia", "Mikroekonómia", "Medzinárodný obchod", "Financie", "Podnikanie"],
      pl: ["Makroekonomia", "Mikroekonomia", "Handel międzynarodowy", "Finanse", "Biznes"],
      eu: ["Makroekonomia", "Mikroekonomia", "Nazioarteko merkataritza", "Finantzak", "Negozioak"]
    }
  },
  {
    id: "politics",
    name: "Politics",
    translations: {
      en: "Politics",
      de: "Politik",
      fr: "Politique",
      es: "Política",
      it: "Politica",
      pt: "Política",
      ru: "Политика",
      zh: "政治",
      ja: "政治",
      ar: "سياسة",
      fa: "سیاست",
      he: "פוליטיקה",
      hi: "राजनीति",
      tr: "Siyaset",
      id: "Politik",
      nl: "Politiek",
      cs: "Politika",
      sk: "Politika",
      pl: "Polityka",
      eu: "Politika"
    },
    icon: "🏛️",
    subcategories: {
      en: ["Government", "International relations", "Political systems", "Public policy", "Law and justice"],
      de: ["Regierung", "Internationale Beziehungen", "Politische Systeme", "Öffentliche Politik", "Recht und Gerechtigkeit"],
      fr: ["Gouvernement", "Relations internationales", "Systèmes politiques", "Politique publique", "Droit et justice"],
      es: ["Gobierno", "Relaciones internacionales", "Sistemas políticos", "Política pública", "Derecho y justicia"],
      it: ["Governo", "Relazioni internazionali", "Sistemi politici", "Politiche pubbliche", "Diritto e giustizia"],
      pt: ["Governo", "Relações internacionais", "Sistemas políticos", "Políticas públicas", "Direito e justiça"],
      ru: ["Правительство", "Международные отношения", "Политические системы", "Государственная политика", "Право и правосудие"],
      zh: ["政府", "国际关系", "政治制度", "公共政策", "法律与司法"],
      ja: ["政府", "国際関係", "政治体制", "公共政策", "法と正義"],
      ar: ["الحكومة", "العلاقات الدولية", "الأنظمة السياسية", "السياسة العامة", "القانون والعدالة"],
      fa: ["دولت", "روابط بین‌الملل", "نظام‌های سیاسی", "سیاست عمومی", "قانون و عدالت"],
      he: ["ממשל", "יחסים בינלאומיים", "מערכות פוליטיות", "מדיניות ציבורית", "חוק ומשפט"],
      hi: ["सरकार", "अंतर्राष्ट्रीय संबंध", "राजनीतिक प्रणालियां", "सार्वजनिक नीति", "कानून और न्याय"],
      tr: ["Hükümet", "Uluslararası ilişkiler", "Siyasi sistemler", "Kamu politikası", "Hukuk ve adalet"],
      id: ["Pemerintahan", "Hubungan internasional", "Sistem politik", "Kebijakan publik", "Hukum dan keadilan"],
      nl: ["Overheid", "Internationale betrekkingen", "Politieke systemen", "Overheidsbeleid", "Recht en justitie"],
      cs: ["Vláda", "Mezinárodní vztahy", "Politické systémy", "Veřejná politika", "Právo a spravedlnost"],
      sk: ["Vláda", "Medzinárodné vzťahy", "Politické systémy", "Verejná politika", "Právo a spravodlivosť"],
      pl: ["Rząd", "Stosunki międzynarodowe", "Systemy polityczne", "Polityka publiczna", "Prawo i sprawiedliwość"],
      eu: ["Gobernua", "Nazioarteko harremanak", "Sistema politikoak", "Politika publikoa", "Zuzenbidea eta justizia"]
    }
  },
  {
    id: "philosophy",
    name: "Philosophy",
    translations: {
      en: "Philosophy",
      de: "Philosophie",
      fr: "Philosophie",
      es: "Filosofía",
      it: "Filosofia",
      pt: "Filosofia",
      ru: "Философия",
      zh: "哲学",
      ja: "哲学",
      ar: "فلسفة",
      fa: "فلسفه",
      he: "פילוסופיה",
      hi: "दर्शन",
      tr: "Felsefe",
      id: "Filsafat",
      nl: "Filosofie",
      cs: "Filozofie",
      sk: "Filozofia",
      pl: "Filozofia",
      eu: "Filosofia"
    },
    icon: "🤔",
    subcategories: {
      en: ["Ethics", "Logic", "Metaphysics", "Epistemology", "Philosophy of mind"],
      de: ["Ethik", "Logik", "Metaphysik", "Erkenntnistheorie", "Philosophie des Geistes"],
      fr: ["Éthique", "Logique", "Métaphysique", "Épistémologie", "Philosophie de l'esprit"],
      es: ["Ética", "Lógica", "Metafísica", "Epistemología", "Filosofía de la mente"],
      it: ["Etica", "Logica", "Metafisica", "Epistemologia", "Filosofia della mente"],
      pt: ["Ética", "Lógica", "Metafísica", "Epistemologia", "Filosofia da mente"],
      ru: ["Этика", "Логика", "Метафизика", "Эпистемология", "Философия сознания"],
      zh: ["伦理学", "逻辑学", "形而上学", "认识论", "心灵哲学"],
      ja: ["倫理学", "論理学", "形而上学", "認識論", "心の哲学"],
      ar: ["الأخلاق", "المنطق", "الميتافيزيقا", "نظرية المعرفة", "فلسفة العقل"],
      fa: ["اخلاق", "منطق", "متافیزیک", "معرفت‌شناسی", "فلسفه ذهن"],
      he: ["אתיקה", "לוגיקה", "מטאפיזיקה", "תורת ההכרה", "פילוסופיה של התודעה"],
      hi: ["नैतिकता", "तर्कशास्त्र", "तत्वमीमांसा", "ज्ञानमीमांसा", "मन का दर्शन"],
      tr: ["Etik", "Mantık", "Metafizik", "Epistemoloji", "Zihin felsefesi"],
      id: ["Etika", "Logika", "Metafisika", "Epistemologi", "Filsafat pikiran"],
      nl: ["Ethiek", "Logica", "Metafysica", "Kennisleer", "Filosofie van de geest"],
      cs: ["Etika", "Logika", "Metafyzika", "Epistemologie", "Filosofie mysli"],
      sk: ["Etika", "Logika", "Metafyzika", "Epistemológia", "Filozofia mysle"],
      pl: ["Etyka", "Logika", "Metafizyka", "Epistemologia", "Filozofia umysłu"],
      eu: ["Etika", "Logika", "Metafisika", "Epistemologia", "Gogoaren filosofia"]
    }
  },
  {
    id: "religion",
    name: "Religion",
    translations: {
      en: "Religion",
      de: "Religion",
      fr: "Religion",
      es: "Religión",
      it: "Religione",
      pt: "Religião",
      ru: "Религия",
      zh: "宗教",
      ja: "宗教",
      ar: "دين",
      fa: "دین",
      he: "דת",
      hi: "धर्म",
      tr: "Din",
      id: "Agama",
      nl: "Religie",
      cs: "Náboženství",
      sk: "Náboženstvo",
      pl: "Religia",
      eu: "Erlijioa"
    },
    icon: "🕊️",
    subcategories: {
      en: [
        "World religions",
        "Religious practices",
        "Sacred texts",
        "Spirituality",
        "Religious history"
      ],
      de: [
        "Weltreligionen",
        "Religiöse Praktiken",
        "Heilige Texte",
        "Spiritualität",
        "Religionsgeschichte"
      ],
      fr: [
        "Religions du monde",
        "Pratiques religieuses",
        "Textes sacrés",
        "Spiritualité",
        "Histoire religieuse"
      ],
      es: [
        "Religiones del mundo",
        "Prácticas religiosas",
        "Textos sagrados",
        "Espiritualidad",
        "Historia religiosa"
      ],
      it: [
        "Religioni del mondo",
        "Pratiche religiose",
        "Testi sacri",
        "Spiritualità",
        "Storia religiosa"
      ],
      pt: [
        "Religiões do mundo",
        "Práticas religiosas",
        "Textos sagrados",
        "Espiritualidade",
        "História religiosa"
      ],
      ru: [
        "Мировые религии",
        "Религиозные практики",
        "Священные тексты",
        "Духовность",
        "История религии"
      ],
      zh: [
        "世界宗教",
        "宗教习俗",
        "圣典",
        "灵性",
        "宗教历史"
      ],
      ja: [
        "世界宗教",
        "宗教の実践",
        "聖典",
        "スピリチュアリティ",
        "宗教史"
      ],
      ar: [
        "الأديان العالمية",
        "الممارسات الدينية",
        "النصوص المقدسة",
        "الروحانية",
        "التاريخ الديني"
      ],
      fa: [
        "ادیان جهان",
        "اعمال مذهبی",
        "متون مقدس",
        "معنویت",
        "تاریخ دین"
      ],
      he: [
        "דתות העולם",
        "פרקטיקות דתיות",
        "כתבי קודש",
        "רוחניות",
        "היסטוריה דתית"
      ],
      hi: [
        "विश्व धर्म",
        "धार्मिक प्रथाएं",
        "पवित्र ग्रंथ",
        "आध्यात्मिकता",
        "धार्मिक इतिहास"
      ],
      tr: [
        "Dünya dinleri",
        "Dini uygulamalar",
        "Kutsal metinler",
        "Maneviyat",
        "Din tarihi"
      ],
      id: [
        "Agama dunia",
        "Praktik keagamaan",
        "Teks suci",
        "Spiritualitas",
        "Sejarah agama"
      ],
      nl: [
        "Wereldreligies",
        "Religieuze praktijken",
        "Heilige teksten",
        "Spiritualiteit",
        "Religieuze geschiedenis"
      ],
      cs: [
        "Světová náboženství",
        "Náboženské praktiky",
        "Posvátné texty",
        "Spiritualita",
        "Historie náboženství"
      ],
      sk: [
        "Svetové náboženstvá",
        "Náboženské praktiky",
        "Posvätné texty",
        "Spiritualita",
        "História náboženstva"
      ],
      pl: [
        "Religia świata",
        "Praktyki religijne",
        "Święte teksty",
        "Duchowość",
        "Historia religii"
      ],
      eu: [
        "Munduko erlijioak",
        "Erlijio-praktikak",
        "Testu sakratuak",
        "Espiritualtasuna",
        "Erlijioaren historia"
      ]
    }
  },
  {
    id: "education",
    name: "Education",
    translations: {
      en: "Education",
      de: "Bildung",
      fr: "Éducation",
      es: "Educación",
      it: "Istruzione",
      pt: "Educação",
      ru: "Образование",
      zh: "教育",
      ja: "教育",
      ar: "تعليم",
      fa: "آموزش",
      he: "חינוך",
      hi: "शिक्षा",
      tr: "Eğitim",
      id: "Pendidikan",
      nl: "Onderwijs",
      cs: "Vzdělávání",
      sk: "Vzdelávanie",
      pl: "Edukacja",
      eu: "Hezkuntza"
    },
    icon: "📚",
    subcategories: {
      en: [
        "Teaching methods",
        "Educational systems",
        "Academic disciplines",
        "Learning theory",
        "Educational technology"
      ],
      de: [
        "Lehrmethoden",
        "Bildungssysteme",
        "Akademische Disziplinen",
        "Lerntheorie",
        "Bildungstechnologie"
      ],
      fr: [
        "Méthodes d'enseignement",
        "Systèmes éducatifs",
        "Disciplines académiques",
        "Théorie de l'apprentissage",
        "Technologie éducative"
      ],
      es: [
        "Métodos de enseñanza",
        "Sistemas educativos",
        "Disciplinas académicas",
        "Teoría del aprendizaje",
        "Tecnología educativa"
      ],
      it: [
        "Metodi di insegnamento",
        "Sistemi educativi",
        "Discipline accademiche",
        "Teoria dell'apprendimento",
        "Tecnologia educativa"
      ],
      pt: [
        "Métodos de ensino",
        "Sistemas educacionais",
        "Disciplinas acadêmicas",
        "Teoria da aprendizagem",
        "Tecnologia educacional"
      ],
      ru: [
        "Методы обучения",
        "Образовательные системы",
        "Академические дисциплины",
        "Теория обучения",
        "Образовательные технологии"
      ],
      zh: [
        "教学方法",
        "教育体系",
        "学科",
        "学习理论",
        "教育技术"
      ],
      ja: [
        "教授法",
        "教育制度",
        "学問分野",
        "学習理論",
        "教育工学"
      ],
      ar: [
        "طرق التدريس",
        "النظم التعليمية",
        "التخصصات الأكاديمية",
        "نظرية التعلم",
        "تكنولوجيا التعليم"
      ],
      fa: [
        "روش‌های تدریس",
        "نظام‌های آموزشی",
        "رشته‌های دانشگاهی",
        "نظریه یادگیری",
        "فناوری آموزشی"
      ],
      he: [
        "שיטות הוראה",
        "מערכות חינוך",
        "תחומי לימוד",
        "תיאוריית למידה",
        "טכנולוגיה חינוכית"
      ],
      hi: [
        "शिक्षण विधियां",
        "शैक्षिक प्रणालियां",
        "शैक्षणिक विषय",
        "अधिगम सिद्धांत",
        "शैक्षिक प्रौद्योगिकी"
      ],
      tr: [
        "Öğretim yöntemleri",
        "Eğitim sistemleri",
        "Akademik disiplinler",
        "Öğrenme teorisi",
        "Eğitim teknolojisi"
      ],
      id: [
        "Metode pengajaran",
        "Sistem pendidikan",
        "Disiplin akademik",
        "Teori pembelajaran",
        "Teknologi pendidikan"
      ],
      nl: [
        "Onderwijsmethoden",
        "Onderwijssystemen",
        "Academische disciplines",
        "Leertheorie",
        "Onderwijstechnologie"
      ],
      cs: [
        "Výukové metody",
        "Vzdělávací systémy",
        "Akademické disciplíny",
        "Teorie učení",
        "Vzdělávací technologie"
      ],
      sk: [
        "Vyučovacie metódy",
        "Vzdelávacie systémy",
        "Akademické disciplíny",
        "Teória učenia",
        "Vzdelávacia technológia"
      ],
      pl: [
        "Metody nauczania",
        "Systemy edukacyjne",
        "Dyscypliny akademickie",
        "Teoria uczenia się",
        "Technologia edukacyjna"
      ],
      eu: [
        "Irakaskuntza metodoak",
        "Hezkuntza sistemak",
        "Diziplina akademikoak",
        "Ikaskuntza teoria",
        "Hezkuntza teknologia"
      ]
    }
  }
]; 