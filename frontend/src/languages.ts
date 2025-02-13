const WIKI_BASE = "https://";
const WIKI_API_SUFFIX = ".wikipedia.org/w/api.php?origin=*&";
const WIKI_ARTICLE_SUFFIX = ".wikipedia.org/wiki/";

type Language = {
  id: string;
  name: string;
};

const LANGUAGE_LIST: Language[] = [
  {
    id: "ab",
    name: "Abkhazian",
  },
  {
    id: "ace",
    name: "Acehnese",
  },
  {
    id: "ady",
    name: "Adyghe",
  },
  {
    id: "af",
    name: "Afrikaans",
  },
  {
    id: "alt",
    name: "Southern Altai",
  },
  {
    id: "am",
    name: "Amharic",
  },
  {
    id: "ami",
    name: "Amis",
  },
  {
    id: "an",
    name: "Aragonese",
  },
  {
    id: "ang",
    name: "Old English",
  },
  {
    id: "ann",
    name: "Obolo",
  },
  {
    id: "anp",
    name: "Angika",
  },
  {
    id: "ar",
    name: "Arabic",
  },
  {
    id: "arc",
    name: "Aramaic",
  },
  {
    id: "ary",
    name: "Moroccan Arabic",
  },
  {
    id: "arz",
    name: "Egyptian Arabic",
  },
  {
    id: "as",
    name: "Assamese",
  },
  {
    id: "ast",
    name: "Asturian",
  },
  {
    id: "atj",
    name: "Atikamekw",
  },
  {
    id: "av",
    name: "Avaric",
  },
  {
    id: "avk",
    name: "Kotava",
  },
  {
    id: "awa",
    name: "Awadhi",
  },
  {
    id: "ay",
    name: "Aymara",
  },
  {
    id: "az",
    name: "Azerbaijani",
  },
  {
    id: "azb",
    name: "South Azerbaijani",
  },
  {
    id: "ba",
    name: "Bashkir",
  },
  {
    id: "ban",
    name: "Balinese",
  },
  {
    id: "bar",
    name: "Bavarian",
  },
  {
    id: "bbc",
    name: "Batak Toba",
  },
  {
    id: "bcl",
    name: "Central Bikol",
  },
  {
    id: "bdr",
    name: "West Coast Bajau",
  },
  {
    id: "be",
    name: "Belarusian",
  },
  {
    id: "be-tarask",
    name: "Belarusian (Taraškievica orthography)",
  },
  {
    id: "bew",
    name: "Betawi",
  },
  {
    id: "bg",
    name: "Bulgarian",
  },
  {
    id: "bh",
    name: "Bhojpuri",
  },
  {
    id: "bi",
    name: "Bislama",
  },
  {
    id: "bjn",
    name: "Banjar",
  },
  {
    id: "blk",
    name: "Pa\\'O",
  },
  {
    id: "bm",
    name: "Bambara",
  },
  {
    id: "bn",
    name: "Bangla",
  },
  {
    id: "bo",
    name: "Tibetan",
  },
  {
    id: "bpy",
    name: "Bishnupriya",
  },
  {
    id: "br",
    name: "Breton",
  },
  {
    id: "bs",
    name: "Bosnian",
  },
  {
    id: "btm",
    name: "Batak Mandailing",
  },
  {
    id: "bug",
    name: "Buginese",
  },
  {
    id: "bxr",
    name: "Russia Buriat",
  },
  {
    id: "ca",
    name: "Catalan",
  },
  {
    id: "cbk-zam",
    name: "Chavacano",
  },
  {
    id: "cdo",
    name: "Mindong",
  },
  {
    id: "ce",
    name: "Chechen",
  },
  {
    id: "ceb",
    name: "Cebuano",
  },
  {
    id: "ch",
    name: "Chamorro",
  },
  {
    id: "chr",
    name: "Cherokee",
  },
  {
    id: "chy",
    name: "Cheyenne",
  },
  {
    id: "ckb",
    name: "Central Kurdish",
  },
  {
    id: "co",
    name: "Corsican",
  },
  {
    id: "cr",
    name: "Cree",
  },
  {
    id: "crh",
    name: "Crimean Tatar",
  },
  {
    id: "cs",
    name: "Czech",
  },
  {
    id: "csb",
    name: "Kashubian",
  },
  {
    id: "cu",
    name: "Church Slavic",
  },
  {
    id: "cv",
    name: "Chuvash",
  },
  {
    id: "cy",
    name: "Welsh",
  },
  {
    id: "da",
    name: "Danish",
  },
  {
    id: "dag",
    name: "Dagbani",
  },
  {
    id: "de",
    name: "German",
  },
  {
    id: "dga",
    name: "Southern Dagaare",
  },
  {
    id: "din",
    name: "Dinka",
  },
  {
    id: "diq",
    name: "Dimli",
  },
  {
    id: "dsb",
    name: "Lower Sorbian",
  },
  {
    id: "dtp",
    name: "Central Dusun",
  },
  {
    id: "dty",
    name: "Doteli",
  },
  {
    id: "dv",
    name: "Divehi",
  },
  {
    id: "dz",
    name: "Dzongkha",
  },
  {
    id: "ee",
    name: "Ewe",
  },
  {
    id: "el",
    name: "Greek",
  },
  {
    id: "eml",
    name: "Emiliano-Romagnolo",
  },
  {
    id: "en",
    name: "English",
  },
  {
    id: "eo",
    name: "Esperanto",
  },
  {
    id: "es",
    name: "Spanish",
  },
  {
    id: "et",
    name: "Estonian",
  },
  {
    id: "eu",
    name: "Basque",
  },
  {
    id: "ext",
    name: "Extremaduran",
  },
  {
    id: "fa",
    name: "Persian",
  },
  {
    id: "fat",
    name: "Fanti",
  },
  {
    id: "ff",
    name: "Fula",
  },
  {
    id: "fi",
    name: "Finnish",
  },
  {
    id: "fj",
    name: "Fijian",
  },
  {
    id: "fo",
    name: "Faroese",
  },
  {
    id: "fon",
    name: "Fon",
  },
  {
    id: "fr",
    name: "French",
  },
  {
    id: "frp",
    name: "Arpitan",
  },
  {
    id: "frr",
    name: "Northern Frisian",
  },
  {
    id: "fur",
    name: "Friulian",
  },
  {
    id: "fy",
    name: "Western Frisian",
  },
  {
    id: "ga",
    name: "Irish",
  },
  {
    id: "gag",
    name: "Gagauz",
  },
  {
    id: "gan",
    name: "Gan",
  },
  {
    id: "gcr",
    name: "Guianan Creole",
  },
  {
    id: "gd",
    name: "Scottish Gaelic",
  },
  {
    id: "gl",
    name: "Galician",
  },
  {
    id: "glk",
    name: "Gilaki",
  },
  {
    id: "gn",
    name: "Guarani",
  },
  {
    id: "gom",
    name: "Goan Konkani",
  },
  {
    id: "gor",
    name: "Gorontalo",
  },
  {
    id: "got",
    name: "Gothic",
  },
  {
    id: "gpe",
    name: "Ghanaian Pidgin",
  },
  {
    id: "gsw",
    name: "Alemannic",
  },
  {
    id: "gu",
    name: "Gujarati",
  },
  {
    id: "guc",
    name: "Wayuu",
  },
  {
    id: "gur",
    name: "Frafra",
  },
  {
    id: "guw",
    name: "Gun",
  },
  {
    id: "gv",
    name: "Manx",
  },
  {
    id: "ha",
    name: "Hausa",
  },
  {
    id: "hak",
    name: "Hakka Chinese",
  },
  {
    id: "haw",
    name: "Hawaiian",
  },
  {
    id: "he",
    name: "Hebrew",
  },
  {
    id: "hi",
    name: "Hindi",
  },
  {
    id: "hif",
    name: "Fiji Hindi",
  },
  {
    id: "hr",
    name: "Croatian",
  },
  {
    id: "hsb",
    name: "Upper Sorbian",
  },
  {
    id: "ht",
    name: "Haitian Creole",
  },
  {
    id: "hu",
    name: "Hungarian",
  },
  {
    id: "hy",
    name: "Armenian",
  },
  {
    id: "hyw",
    name: "Western Armenian",
  },
  {
    id: "ia",
    name: "Interlingua",
  },
  {
    id: "iba",
    name: "Iban",
  },
  {
    id: "id",
    name: "Indonesian",
  },
  {
    id: "ie",
    name: "Interlingue",
  },
  {
    id: "ig",
    name: "Igbo",
  },
  {
    id: "igl",
    name: "Igala",
  },
  {
    id: "ik",
    name: "Inupiaq",
  },
  {
    id: "ilo",
    name: "Iloko",
  },
  {
    id: "inh",
    name: "Ingush",
  },
  {
    id: "io",
    name: "Ido",
  },
  {
    id: "is",
    name: "Icelandic",
  },
  {
    id: "it",
    name: "Italian",
  },
  {
    id: "iu",
    name: "Inuktitut",
  },
  {
    id: "ja",
    name: "Japanese",
  },
  {
    id: "jam",
    name: "Jamaican Creole English",
  },
  {
    id: "jbo",
    name: "Lojban",
  },
  {
    id: "jv",
    name: "Javanese",
  },
  {
    id: "ka",
    name: "Georgian",
  },
  {
    id: "kaa",
    name: "Kara-Kalpak",
  },
  {
    id: "kab",
    name: "Kabyle",
  },
  {
    id: "kbd",
    name: "Kabardian",
  },
  {
    id: "kbp",
    name: "Kabiye",
  },
  {
    id: "kcg",
    name: "Tyap",
  },
  {
    id: "kg",
    name: "Kongo",
  },
  {
    id: "kge",
    name: "Komering",
  },
  {
    id: "ki",
    name: "Kikuyu",
  },
  {
    id: "kk",
    name: "Kazakh",
  },
  {
    id: "kl",
    name: "Kalaallisut",
  },
  {
    id: "km",
    name: "Khmer",
  },
  {
    id: "kn",
    name: "Kannada",
  },
  {
    id: "knc",
    name: "Central Kanuri",
  },
  {
    id: "ko",
    name: "Korean",
  },
  {
    id: "koi",
    name: "Komi-Permyak",
  },
  {
    id: "krc",
    name: "Karachay-Balkar",
  },
  {
    id: "ks",
    name: "Kashmiri",
  },
  {
    id: "ksh",
    name: "Colognian",
  },
  {
    id: "ku",
    name: "Kurdish",
  },
  {
    id: "kus",
    name: "Kusaal",
  },
  {
    id: "kv",
    name: "Komi",
  },
  {
    id: "kw",
    name: "Cornish",
  },
  {
    id: "ky",
    name: "Kyrgyz",
  },
  {
    id: "la",
    name: "Latin",
  },
  {
    id: "lad",
    name: "Ladino",
  },
  {
    id: "lb",
    name: "Luxembourgish",
  },
  {
    id: "lbe",
    name: "Lak",
  },
  {
    id: "lez",
    name: "Lezghian",
  },
  {
    id: "lfn",
    name: "Lingua Franca Nova",
  },
  {
    id: "lg",
    name: "Ganda",
  },
  {
    id: "li",
    name: "Limburgish",
  },
  {
    id: "lij",
    name: "Ligurian",
  },
  {
    id: "lld",
    name: "Ladin",
  },
  {
    id: "lmo",
    name: "Lombard",
  },
  {
    id: "ln",
    name: "Lingala",
  },
  {
    id: "lo",
    name: "Lao",
  },
  {
    id: "lt",
    name: "Lithuanian",
  },
  {
    id: "ltg",
    name: "Latgalian",
  },
  {
    id: "lv",
    name: "Latvian",
  },
  {
    id: "lzh",
    name: "Literary Chinese",
  },
  {
    id: "mad",
    name: "Madurese",
  },
  {
    id: "mai",
    name: "Maithili",
  },
  {
    id: "map-bms",
    name: "Banyumasan",
  },
  {
    id: "mdf",
    name: "Moksha",
  },
  {
    id: "mg",
    name: "Malagasy",
  },
  {
    id: "mhr",
    name: "Eastern Mari",
  },
  {
    id: "mi",
    name: "Māori",
  },
  {
    id: "min",
    name: "Minangkabau",
  },
  {
    id: "mk",
    name: "Macedonian",
  },
  {
    id: "ml",
    name: "Malayalam",
  },
  {
    id: "mn",
    name: "Mongolian",
  },
  {
    id: "mni",
    name: "Manipuri",
  },
  {
    id: "mnw",
    name: "Mon",
  },
  {
    id: "mos",
    name: "Mossi",
  },
  {
    id: "mr",
    name: "Marathi",
  },
  {
    id: "mrj",
    name: "Western Mari",
  },
  {
    id: "ms",
    name: "Malay",
  },
  {
    id: "mt",
    name: "Maltese",
  },
  {
    id: "mwl",
    name: "Mirandese",
  },
  {
    id: "my",
    name: "Burmese",
  },
  {
    id: "myv",
    name: "Erzya",
  },
  {
    id: "mzn",
    name: "Mazanderani",
  },
  {
    id: "nah",
    name: "Nahuatl",
  },
  {
    id: "nan",
    name: "Minnan",
  },
  {
    id: "nap",
    name: "Neapolitan",
  },
  {
    id: "nds",
    name: "Low German",
  },
  {
    id: "nds-nl",
    name: "Low Saxon",
  },
  {
    id: "ne",
    name: "Nepali",
  },
  {
    id: "new",
    name: "Newari",
  },
  {
    id: "nia",
    name: "Nias",
  },
  {
    id: "nl",
    name: "Dutch",
  },
  {
    id: "nn",
    name: "Norwegian Nynorsk",
  },
  {
    id: "no",
    name: "Norwegian",
  },
  {
    id: "nov",
    name: "Novial",
  },
  {
    id: "nqo",
    name: "N’Ko",
  },
  {
    id: "nr",
    name: "South Ndebele",
  },
  {
    id: "nrm",
    name: "Norman",
  },
  {
    id: "nso",
    name: "Northern Sotho",
  },
  {
    id: "nv",
    name: "Navajo",
  },
  {
    id: "ny",
    name: "Nyanja",
  },
  {
    id: "oc",
    name: "Occitan",
  },
  {
    id: "olo",
    name: "Livvi-Karelian",
  },
  {
    id: "om",
    name: "Oromo",
  },
  {
    id: "or",
    name: "Odia",
  },
  {
    id: "os",
    name: "Ossetic",
  },
  {
    id: "pa",
    name: "Punjabi",
  },
  {
    id: "pag",
    name: "Pangasinan",
  },
  {
    id: "pam",
    name: "Pampanga",
  },
  {
    id: "pap",
    name: "Papiamento",
  },
  {
    id: "pcd",
    name: "Picard",
  },
  {
    id: "pcm",
    name: "Nigerian Pidgin",
  },
  {
    id: "pdc",
    name: "Pennsylvania German",
  },
  {
    id: "pfl",
    name: "Palatine German",
  },
  {
    id: "pi",
    name: "Pali",
  },
  {
    id: "pih",
    name: "Pitcairn-Norfolk",
  },
  {
    id: "pl",
    name: "Polish",
  },
  {
    id: "pms",
    name: "Piedmontese",
  },
  {
    id: "pnb",
    name: "Western Punjabi",
  },
  {
    id: "pnt",
    name: "Pontic",
  },
  {
    id: "ps",
    name: "Pashto",
  },
  {
    id: "pt",
    name: "Portuguese",
  },
  {
    id: "pwn",
    name: "Paiwan",
  },
  {
    id: "qu",
    name: "Quechua",
  },
  {
    id: "rm",
    name: "Romansh",
  },
  {
    id: "rmy",
    name: "Vlax Romani",
  },
  {
    id: "rn",
    name: "Rundi",
  },
  {
    id: "ro",
    name: "Romanian",
  },
  {
    id: "roa-tara",
    name: "Tarantino",
  },
  {
    id: "rsk",
    name: "Pannonian Rusyn",
  },
  {
    id: "ru",
    name: "Russian",
  },
  {
    id: "rue",
    name: "Rusyn",
  },
  {
    id: "rup",
    name: "Aromanian",
  },
  {
    id: "rw",
    name: "Kinyarwanda",
  },
  {
    id: "sa",
    name: "Sanskrit",
  },
  {
    id: "sah",
    name: "Yakut",
  },
  {
    id: "sat",
    name: "Santali",
  },
  {
    id: "sc",
    name: "Sardinian",
  },
  {
    id: "scn",
    name: "Sicilian",
  },
  {
    id: "sco",
    name: "Scots",
  },
  {
    id: "sd",
    name: "Sindhi",
  },
  {
    id: "se",
    name: "Northern Sami",
  },
  {
    id: "sg",
    name: "Sango",
  },
  {
    id: "sgs",
    name: "Samogitian",
  },
  {
    id: "sh",
    name: "Serbo-Croatian",
  },
  {
    id: "shi",
    name: "Tachelhit",
  },
  {
    id: "shn",
    name: "Shan",
  },
  {
    id: "si",
    name: "Sinhala",
  },
  {
    id: "simple",
    name: "Simple English",
  },
  {
    id: "sk",
    name: "Slovak",
  },
  {
    id: "skr",
    name: "Saraiki",
  },
  {
    id: "sl",
    name: "Slovenian",
  },
  {
    id: "sm",
    name: "Samoan",
  },
  {
    id: "smn",
    name: "Inari Sami",
  },
  {
    id: "sn",
    name: "Shona",
  },
  {
    id: "so",
    name: "Somali",
  },
  {
    id: "sq",
    name: "Albanian",
  },
  {
    id: "sr",
    name: "Serbian",
  },
  {
    id: "srn",
    name: "Sranan Tongo",
  },
  {
    id: "ss",
    name: "Swati",
  },
  {
    id: "st",
    name: "Southern Sotho",
  },
  {
    id: "stq",
    name: "Saterland Frisian",
  },
  {
    id: "su",
    name: "Sundanese",
  },
  {
    id: "sv",
    name: "Swedish",
  },
  {
    id: "sw",
    name: "Swahili",
  },
  {
    id: "szl",
    name: "Silesian",
  },
  {
    id: "szy",
    name: "Sakizaya",
  },
  {
    id: "ta",
    name: "Tamil",
  },
  {
    id: "tay",
    name: "Atayal",
  },
  {
    id: "tcy",
    name: "Tulu",
  },
  {
    id: "tdd",
    name: "Tai Nuea",
  },
  {
    id: "te",
    name: "Telugu",
  },
  {
    id: "tet",
    name: "Tetum",
  },
  {
    id: "tg",
    name: "Tajik",
  },
  {
    id: "th",
    name: "Thai",
  },
  {
    id: "ti",
    name: "Tigrinya",
  },
  {
    id: "tig",
    name: "Tigre",
  },
  {
    id: "tk",
    name: "Turkmen",
  },
  {
    id: "tl",
    name: "Tagalog",
  },
  {
    id: "tly",
    name: "Talysh",
  },
  {
    id: "tn",
    name: "Tswana",
  },
  {
    id: "to",
    name: "Tongan",
  },
  {
    id: "tpi",
    name: "Tok Pisin",
  },
  {
    id: "tr",
    name: "Turkish",
  },
  {
    id: "trv",
    name: "Taroko",
  },
  {
    id: "ts",
    name: "Tsonga",
  },
  {
    id: "tt",
    name: "Tatar",
  },
  {
    id: "tum",
    name: "Tumbuka",
  },
  {
    id: "tw",
    name: "Twi",
  },
  {
    id: "ty",
    name: "Tahitian",
  },
  {
    id: "tyv",
    name: "Tuvinian",
  },
  {
    id: "udm",
    name: "Udmurt",
  },
  {
    id: "ug",
    name: "Uyghur",
  },
  {
    id: "uk",
    name: "Ukrainian",
  },
  {
    id: "ur",
    name: "Urdu",
  },
  {
    id: "uz",
    name: "Uzbek",
  },
  {
    id: "ve",
    name: "Venda",
  },
  {
    id: "vec",
    name: "Venetian",
  },
  {
    id: "vep",
    name: "Veps",
  },
  {
    id: "vi",
    name: "Vietnamese",
  },
  {
    id: "vls",
    name: "West Flemish",
  },
  {
    id: "vo",
    name: "Volapük",
  },
  {
    id: "vro",
    name: "Võro",
  },
  {
    id: "wa",
    name: "Walloon",
  },
  {
    id: "war",
    name: "Waray",
  },
  {
    id: "wo",
    name: "Wolof",
  },
  {
    id: "wuu",
    name: "Wu",
  },
  {
    id: "xal",
    name: "Kalmyk",
  },
  {
    id: "xh",
    name: "Xhosa",
  },
  {
    id: "xmf",
    name: "Mingrelian",
  },
  {
    id: "yi",
    name: "Yiddish",
  },
  {
    id: "yo",
    name: "Yoruba",
  },
  {
    id: "yue",
    name: "Cantonese",
  },
  {
    id: "za",
    name: "Zhuang",
  },
  {
    id: "zea",
    name: "Zeelandic",
  },
  {
    id: "zgh",
    name: "Standard Moroccan Tamazight",
  },
  {
    id: "zh",
    name: "Chinese",
  },
  {
    id: "zu",
    name: "Zulu",
  },
];

export const LANGUAGES = LANGUAGE_LIST.map(({ id, name }) => ({
  id,
  name,
  api: `${WIKI_BASE}${id}${WIKI_API_SUFFIX}`,
  article: `${WIKI_BASE}${id}${WIKI_ARTICLE_SUFFIX}`,
}));
