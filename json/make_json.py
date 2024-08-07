import zipfile
import sqlite3
import tempfile
import json

with zipfile.ZipFile("Core 2k_6k Optimized Japanese Vocabulary.apkg", "r") as z:
    
    with z.open("collection.anki2", "r") as f:
        
        with tempfile.NamedTemporaryFile(dir='/tmp', delete=False) as fp:
            
            fp.write(f.read())
            con = sqlite3.connect(fp.name)
            cur = con.cursor()
            res = cur.execute("SELECT flds FROM notes")
            
            res = res.fetchall()
            
            master = []
            
            for e in range(len(res)):
                try:
                    arr = res[e][0].split("\x1f")
                    arr.pop(4)
                    arr = arr[:5]

                    master.append({
                        "speech": arr[4],
                        "kanji": arr[0],
                        "furigana": arr[1],
                        "hiragana": arr[2],
                        "english": arr[3]
                    })
                except Exception:
                    print(e)
                    break
            
            parts_of_speech = set()
            
            for i in master:
                parts_of_speech.add(i.get("speech"))
            
            table = {}
            
            def func(x, i):
                if x.get("speech") == i:
                    return x
            
            for i in parts_of_speech:
                table[i] = [i for i in list(map(lambda x: func(x, i), master)) if i is not None]
            
            for key in table:
                table[key] = [[i.get("kanji"), i.get("hiragana"), i.get("english")] for i in table[key]]
            
            JSON = json.dumps(table, sort_keys=True, indent=4)
            
            with open("anki.json", "w") as f:
                f.write(JSON)
