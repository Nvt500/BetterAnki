function master_vocab()
{
    // MAKE SURE THERE ISN'T A COMMA AFTER THE LAST ARRAY CAUSE IT WON'T WORK THEN. HAHAHAHAHAHAHAH HAHAHAHAHHA
    
    const xhttp = new XMLHttpRequest();
    
    let URL = document.getElementById("input_vocab_list").value;
    
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            let j = JSON.parse(this.responseText);
            create_master_vocab(j);
        }
    };
    
    xhttp.open("GET", URL, true);
    
    xhttp.send();
}

function get_table()
{
    let table;
    
    if (localStorage) {
        table = localStorage.getItem("table");
    } else {
        table = $.cookies.get("table");
    }
    
    table = JSON.parse(table);
    
    create_master_vocab(table);
    
}

function create_master_vocab(json)
{
    let master_list = new Map([
        ["active", null],
        ["list", []]
    ]);
    
    let lists = new Array();
    let items = new Array([0]);
    let index = 0;
    
    for (let key of Object.keys(json))
    {
        lists.push(
            new _Words(key, master_list)
        );
        
        for (let map of json[key])
        {
            items.pop();
            items.push( new Word(map[0], map[1], map[2], lists[index]) );
        }
        
        index++;
    }
    
    master_list.set("active", master_list.get("list").at(0));
    master_list.get("active").next();
    
    CHOSEN = master_list;
    
    create_words_list();
    
    reset();
}

let give_random = false;
function switch_give_random()
{
    if (give_random)
    {
        give_random = false;
        document.getElementById("random_label").innerHTML = "Off";
    }
    else
    {
        give_random = true;
        document.getElementById("random_label").innerHTML = "On";
    }
}

// _Words because static ain't working so just make a object of it.
class _Words
{
    constructor(name, list)
    {
        this.active = "water";
        this.words = [];
        this.place = -1;
        this.name = name;
        list.get("list").push(this)
    }
    
    next()
    {
        if (give_random)
        {
            let temp;
            do
            {
                temp = this.words.at(Math.floor( Math.random() * this.words.length ));
            } while(temp == this.active);
            this.active = temp;
            return this.active;
        }
        
        this.place++;
        if (this.place == this.words.length)
        {
            this.place = 0;
        }
        this.active = this.words.at(this.place);
        return this.active;
    }
    
    back()
    {
        if (give_random)
        {
             let temp;
            do
            {
                temp = this.words.at(Math.floor( Math.random() * this.words.length ));
            } while(temp == this.active);
            this.active = temp;
            return this.active;
        }
        
        this.place--;
        if (this.place == -1)
        {
            this.place = this.words.length - 1;
        }
        this.active = this.words.at(this.place);
        return this.active;
    }
    
    toString()
    {
        return this.name;
    }
}

HIRAGANA_TABLE = new Map([
    ["あ", "a"],
    ["い", "i"],
    ["う", "u"],
    ["え", "e"],
    ["お", "o"],
    ["か", "ka"],
    ["き", "ki"],
    ["く", "ku"],
    ["け", "ke"],
    ["こ", "ko"],
    ["さ", "sa"],
    ["し", "shi"],
    ["す", "su"],
    ["せ", "se"],
    ["そ", "so"],
    ["た", "ta"],
    ["ち", "chi"],
    ["つ", "tsu"],
    ["て", "te"],
    ["と", "to"],
    ["な", "na"],
    ["に", "ni"],
    ["ぬ", "nu"],
    ["ね", "ne"],
    ["の", "no"],
    ["は", "ha"],
    ["ひ", "hi"],
    ["ふ", "fu"],
    ["へ", "he"],
    ["ほ", "ho"],
    ["ま", "ma"],
    ["み", "mi"],
    ["む", "mu"],
    ["め", "me"],
    ["も", "mo"],
    ["や", "ya"],
    ["ゆ", "yu"],
    ["よ", "yo"],
    ["ら", "ra"],
    ["り", "ri"],
    ["る", "ru"],
    ["れ", "re"],
    ["ろ", "ro"],
    ["わ", "wa"],
    ["を", "wo"],
    ["ん", "n"],
    ["が", "ga"],
    ["ぎ", "gi"],
    ["ぐ", "gu"],
    ["げ", "ge"],
    ["ご", "go"],
    ["ざ", "za"],
    ["じ", "ji"],
    ["ず", "zu"],
    ["ぜ", "ze"],
    ["ぞ", "zo"],
    ["だ", "da"],
    ["ぢ", "di"],
    ["づ", "zu"],
    ["で", "de"],
    ["ど", "do"],
    ["ば", "ba"],
    ["び", "bi"],
    ["ぶ", "bu"],
    ["べ", "be"],
    ["ぼ", "bo"],
    ["ぱ", "pa"],
    ["ぴ", "pi"],
    ["ぷ", "pu"],
    ["ぺ", "pe"],
    ["ぽ", "po"],
    ["きゃ", "kya"],
    ["きゅ", "kyu"],
    ["きょ", "kyo"],
    ["しゃ", "sha"],
    ["しゅ", "shu"],
    ["しょ", "sho"],
    ["ちゃ", "cha"],
    ["ちゅ", "chu"],
    ["ちょ", "cho"],
    ["にゃ", "nya"],
    ["にゅ", "nyu"],
    ["にょ", "nyo"],
    ["ひゃ", "hya"],
    ["ひゅ", "hyu"],
    ["ひょ", "hyo"],
    ["みゃ", "mya"],
    ["みゅ", "myu"],
    ["みょ", "myo"],
    ["りゃ", "rya"],
    ["りゅ", "ryu"],
    ["りょ", "ryo"],
    ["ぎゃ", "gya"],
    ["ぎゅ", "gyu"],
    ["ぎょ", "gyo"],
    ["じゃ", "jya"],
    ["じゅ", "jyu"],
    ["じょ", "jyo"],
    ["ぢゃ", "dya"],
    ["ぢゅ", "dyu"],
    ["ぢょ", "dyo"],
    ["びゃ", "bya"],
    ["びゅ", "byu"],
    ["びょ", "byo"],
    ["ぴゃ", "pya"],
    ["ぴゅ", "pyu"],
    ["ぴょ", "pyo"]
]);

// KATAKANA COMING SOON; NOT FINISHED add ー and キェ (kye)
KATAKANA_TABLE = new Map([
    ["ア", "a"],
    ["イ", "i"],
    ["ウ", "u"],
    ["エ", "e"],
    ["オ", "o"],
    ["カ", "ka"],
    ["キ", "ki"],
    ["ク", "ku"],
    ["ケ", "ke"],
    ["コ", "ko"],
    ["サ", "sa"],
    ["シ", "shi"],
    ["ス", "su"],
    ["セ", "se"],
    ["ソ", "so"],
    ["タ", "ta"],
    ["チ", "chi"],
    ["ツ", "tsu"],
    ["テ", "te"],
    ["ト", "to"], 
    ["ナ", "na"],
    ["ニ", "ni"],
    ["ヌ", "nu"],
    ["ネ", "ne"],
    ["ノ", "no"],
    ["ハ", "ha"],
    ["ヒ", "hi"],
    ["フ", "fu"],
    ["ヘ", "he"],
    ["ホ", "ho"],
    ["マ", "ma"],
    ["ミ", "mi"],
    ["ム", "mu"],
    ["メ", "me"],
    ["モ", "mo"],
    ["ヤ", "ya"],
    ["ユ", "yu"],
    ["ヨ", "yo"],
    ["ラ", "ra"],
    ["リ", "ri"],
    ["ル", "ru"],
    ["レ", "re"],
    ["ロ", "ro"],
    ["ワ", "wa"],
    ["ヲ", "wo"],
    ["ン", "n"],
    ["ガ", "ga"],
    ["ギ", "gi"],
    ["グ", "gu"],
    ["ゲ", "ge"],
    ["ゴ", "go"],
    ["ザ", "za"],
    ["ジ", "ji"],
    ["ズ", "zu"],
    ["ゼ", "ze"],
    ["ゾ", "zo"],
    ["ダ", "da"],
    ["ヂ", "di"],
    ["ヅ", "zu"],
    ["デ", "de"],
    ["ド", "do"],
    ["バ", "ba"],
    ["ビ", "bi"],
    ["ブ", "bu"],
    ["ベ", "be"],
    ["ボ", "bo"],
    ["パ", "pa"],
    ["ピ", "pi"],
    ["プ", "pu"],
    ["ペ", "pe"],
    ["ポ", "po"],
    ["キャ", "kya"],
    ["キュ", "kyu"],
    ["キョ", "kyo"],
    ["シャ", "sha"],
    ["シュ", "shu"],
    ["ショ", "sho"],
    ["チャ", "cha"],
    ["チュ", "chu"],
    ["チョ", "cho"],
    ["ニャ", "nya"],
    ["ニュ", "nyu"],
    ["ニョ", "nyo"],
    ["ヒャ", "hya"],
    ["ヒュ", "hyu"],
    ["ヒョ", "hyo"],
    ["ミャ", "mya"],
    ["ミュ", "myu"],
    ["ミョ", "myo"],
    ["リャ", "rya"],
    ["リュ", "ryu"],
    ["リョ", "ryo"],
    ["ギャ", "gya"],
    ["ギュ", "gyu"],
    ["ギョ", "gyo"],
    ["ジャ", "jya"],
    ["ジュ", "jyu"],
    ["ジョ", "jyo"],
    ["ヂャ", "dya"],
    ["ヂュ", "dyu"],
    ["ヂョ", "dyo"],
    ["ビャ", "bya"],
    ["ビュ", "byu"],
    ["ビョ", "byo"],
    ["ピャ", "pya"],
    ["ピュ", "pyu"],
    ["ピョ", "pyo"]
]);


// Word class.
class Word
{
    constructor(kanji, hiragana, english, list)
    {
        this.kanji = kanji;
        this.hiragana = hiragana;
        this.english = english;
        list.words.push(this);
        this.h_to_e = this.translate_h_to_e();
    }
    
    translate_h_to_e()
    {
        function getFromTable(key)
        {
            if ( HIRAGANA_TABLE.get(key) === undefined )
            {
                if ( KATAKANA_TABLE.get(key) === undefined )
                {
                    return key;
                }
                
                return KATAKANA_TABLE.get(key);
            }
            
            return HIRAGANA_TABLE.get(key);
        }
        
        let en = "";
        
        
        for (let i = 0; i < this.hiragana.length; i++)
        {
            if ( 
                this.hiragana.charAt(i) === "ッ" ||
                this.hiragana.charAt(i) === "っ"
                )
            {
                en += getFromTable( this.hiragana.charAt(i+1) ).charAt(0);
            }
            else if (
                this.hiragana.charAt(i) === "ー"
                )
            {
                if (["ャ", "ュ", "ョ"].includes( this.hiragana.charAt(i-1) ))
                {
                    let t = getFromTable( this.hiragana.substr(i-2, 2) );
                    en += t.charAt( t.length - 1 );
                }
                else
                {
                    let t = getFromTable( this.hiragana.charAt(i-1) );
                    en += t.charAt( t.length - 1 );
                }
            }
            else if (
                ["ゃ", "ゅ", "ょ"].includes(this.hiragana.charAt(i+1)) || 
                ["ャ", "ュ", "ョ"].includes(this.hiragana.charAt(i+1))
                )
            {
                en += getFromTable( this.hiragana.substr(i, 2) );
            }
            else if (
                ["ゃ", "ゅ", "ょ"].includes(this.hiragana.charAt(i)) || 
                ["ャ", "ュ", "ョ"].includes(this.hiragana.charAt(i))
                )
            {
                continue;
            }
            else
            {
                en += getFromTable( this.hiragana.charAt(i) );
            }
        }
        
        
        return en;
    }
    
    toString()
    {
        return `${this.kanji}, ${this.hiragana}, ${this.h_to_e}, ${this.english}`;
    }
}

let words_list = new Map([
    ["active", null],
    ["list", []]
]);

let CHOSEN = words_list;

// Create objects.
{
const Nouns = new _Words("Nouns", words_list);
const Verbs = new _Words("Verbs", words_list);
const Adjectives = new _Words("Adjectives", words_list);

const water = new Word("水", "みず", "water", Nouns);
const woman = new Word("女", "おんな", "woman", Nouns);
const eat = new Word("食べる", "たべる", "eat", Verbs);
const drink = new Word("飲む", "のむ", "drink", Verbs);
const tall = new Word("高い", "たかい", "tall", Adjectives);
const here = new Word("こっち", "こっち", "here", Nouns);
const hundred = new Word("百", "ひゃく", "hundred", Nouns);
const check = new Word("チェック", "チェック", "check", Nouns);
const guitar = new Word("ギター", "ギター", "guitar", Nouns);
const choke = new Word("チョーク", "チョーク", "choke", Nouns);
}

words_list.set("active", words_list.get("list").at(0));
words_list.get("active").next();

function create_words_list()
{
    const parent = document.getElementById("words_list");
    
    if (parent.hasChildNodes())
    {
        parent.innerHTML = "";
    }
    
    for (let i = 0; i < CHOSEN.get("list").length; i++)//(const list of words_list.get("list"))
    {
        
        const button = document.createElement("input");
        button.type = "button";
        
        if (i != CHOSEN.get("list").length - 1)
        {
            button.style.margin = "0 6% 0 0";
        }
        
        button.value = CHOSEN.get("list").at(i) + ": " + CHOSEN.get("list").at(i).words.length;
        
        button.onclick = switch_words_list;
        
        if (CHOSEN.get("list").at(i) === CHOSEN.get("active"))
        {
            button.disabled = true;
        }
        
        parent.appendChild(button);
    }
}

function switch_words_list()
{
    this.disabled = true;
    
    for (let i = 0, arr = this.parentNode.children; i < arr.length; i++)
    {
        
        if (arr.item(i).value.substring(0, arr.item(i).value.lastIndexOf(":") ) == CHOSEN.get("active"))
        {
            arr.item(i).disabled = false;
            
            for (let list of CHOSEN.get("list"))
            {
                if (this.value.substring(0, this.value.lastIndexOf(":") ) == list)
                {
                    CHOSEN.set("active", list);
                    break;
                }
            }
            break;
        }
    }
    
    CHOSEN.get("active").next();
    reset();
}

// Reset prompt, user, and output.
function reset()
{
    if (document.getElementById("learn").checked)
    {
        document.getElementById("prompt").innerHTML = `${CHOSEN.get("active").active.kanji}\n${CHOSEN.get("active").active.hiragana}\n${CHOSEN.get("active").active.h_to_e}\n${CHOSEN.get("active").active.english}`;
    }
    else
    {
        document.getElementById("prompt").innerHTML = CHOSEN.get("active").active.kanji;
    }
    document.getElementById("user").value = "";
    document.getElementById("output").innerHTML = "";
    //document.getElementById("test").innerHTML = CHOSEN.get("active").active.h_to_e;
}

let answer_with_english = true;

function switch_answer()
{
    if (answer_with_english)
    {
        answer_with_english = false;
        document.getElementById("english").disabled = false;
        document.getElementById("hiragana").disabled = true;
    }
    else
    {
        answer_with_english = true;
        document.getElementById("english").disabled = true;
        document.getElementById("hiragana").disabled = false;
    }
}

function shuffle_words()
{
    const array = new Array();
    
    for (let i = 0, len = CHOSEN.get("active").words.length; i < len; i++)
    {
        let r = Math.floor( Math.random() * CHOSEN.get("active").words.length );
        array.push( CHOSEN.get("active").words.splice( r, 1 )[0] );
    }
    
    CHOSEN.get("active").words = array;
    CHOSEN.get("active").place = -1;
    CHOSEN.get("active").next();
    reset();
}

reset();

// Get input and compute.
function getInput()
{
    const text = document.getElementById("user").value;
    if (text.includes("\n"))
    {
        reset();
        compute(text.trim().toLowerCase());
    }
}

// If correct do stuff, if giveup do stuff, if nothing go next, if wrong do stuff.
function compute(value)
{
    switch (value)
    {
        case CHOSEN.get("active").active.english:
            if (!answer_with_english)
            {
                document.getElementById("output").innerHTML = `Incorrect: ${value} != ${CHOSEN.get("active").active}`;
                break;
            }
            document.getElementById("prompt").innerHTML = `${CHOSEN.get("active").active.kanji}\n${CHOSEN.get("active").active.hiragana}\n${CHOSEN.get("active").active.h_to_e}\n${CHOSEN.get("active").active.english}`;
            document.getElementById("output").innerHTML = "Correct";
            break;
            
        case CHOSEN.get("active").active.hiragana:
        case CHOSEN.get("active").active.h_to_e:
            if (answer_with_english)
            {
                document.getElementById("output").innerHTML = `Incorrect: ${value} != ${CHOSEN.get("active").active}`;
                break;
            }
            document.getElementById("prompt").innerHTML = `${CHOSEN.get("active").active.kanji}\n${CHOSEN.get("active").active.hiragana}\n${CHOSEN.get("active").active.h_to_e}\n${CHOSEN.get("active").active.english}`;
            document.getElementById("output").innerHTML = "Correct";
            break;
        
        case "giveup":
        case "g":
        case "ｇ":
            document.getElementById("prompt").innerHTML = `${CHOSEN.get("active").active.kanji}\n${CHOSEN.get("active").active.hiragana}\n${CHOSEN.get("active").active.h_to_e}\n${CHOSEN.get("active").active.english}`;
            break;
        
        case "b":
        case "l":
        case "ｂ":
        case "ｌ":
            CHOSEN.get("active").back();
            reset();
            break;
            
        case "":
            CHOSEN.get("active").next();
            reset();
            break;
            
        case "r":
        case "ｒ":
            reset();
            break;
            
        default:
            document.getElementById("output").innerHTML = `Incorrect: ${value} != ${CHOSEN.get("active").active}`;
    }
}