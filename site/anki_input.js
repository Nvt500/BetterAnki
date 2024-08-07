// Get input and compute.
function getInput()
{
    const text = document.getElementById("user").value;
    if (text.includes("\n"))
    {
        compute(text.trim());
    }
}

const SEPARATORS = ["Kanji", "Hiragana", "English"];

function compute(value)
{
    let arr = value.split("\n")
    
    arr = arr.filter( (cv) => {
        return !(cv === " " || cv === "\n" || cv === "")
    });
    
    let tables = {};
    let indices = new Array();
    let cols = new Array();
    
    for (let i = 0, skip = false, e = 0; i < arr.length; i++)
    {
        if (skip)
        {
            if (SEPARATORS.includes(arr.at(i)))
            {
                cols[e] += 1;
                continue;
            }
            e++;
            skip = false;
        }
        
        if (SEPARATORS.includes(arr.at(i)))
        {
            if (e > 0)
            {
                if (!tables[ arr.at( indices.at(e-1) ) ]
                .includes( arr.at( indices.at(e)) ) )
                {
                    tables[ arr.at(indices.at(e-1)) ].pop();
                }
                
            }
            
            tables[ arr.at(i-1) ] = new Array();
            indices.push(i-1);
            cols.push(1);
            skip = true;
        }
        else
        {
            if (indices.at(e-1) == undefined)
            {
                continue;
            }
            tables[ arr.at( indices.at(e-1) ) ]
            .push(arr.at(i));
        }
    }
    
    let e = 0;
    for (let key in tables)
    {
        let temparr = new Array([]);
        let i = 0;
        let idx = 0;
        for (item of tables[key])
        {
            if (idx == cols.at(e))
            {
                temparr.push([]);
                i++;
                idx = 0;
            }
            temparr.at(i).push(item);
            idx++;
        }
        tables[key] = temparr;
        e++;
    }
    //document.getElementById("output").innerHTML +=  tables["Nouns"];
    
    storeTable(JSON.stringify(tables));
    
    /*
    const xhttp = new XMLHttpRequest();
    
    xhttp.open("POST", "input.txt", true);
    
    let fileData = new FormData();
    fileData.append("file", JSON.stringify(tables))
    
    xhttp.send(fileData);
    */
    
    document.getElementById("output").innerHTML += JSON.parse(getTable());
    
    /*
    for (let i of Object.keys(tables))
    {
        document.getElementById("output").innerHTML += i + "<br>";
        document.getElementById("output").innerHTML += tables[i].join("<br>") + "<br>";
    }
    */
}

function storeTable(value)
{
    if (localStorage) {
        localStorage.setItem("table", value);
    } else {
        $.cookies.set("table", value);
    }
}

function getTable()
{
    if (localStorage) {
        return localStorage.getItem("table");
    } else {
        return $.cookies.get("table");
    }
}