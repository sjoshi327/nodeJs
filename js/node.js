var result = [];
var result1 = [];
var statearray = [];
var final = [];
var fs = require("fs");
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('../csv/india2011.csv')
});
var myWriteStreamAge = require("fs").createWriteStream("../json/ageWise.json")
var myWriteStreamgender = require("fs").createWriteStream("../json/graduatePopulation.json")
var myWriteStreameducation = require("fs").createWriteStream("../json/educationCategory.json")

//For first Agewise population

lineReader.on('line',
    function(line) {
        var jsonFromLine = {};
        var lineSplit = line.split(',');
        if (lineSplit[4] === "Total") {
            if (lineSplit[5] != "All ages") {
                jsonFromLine.Total_Urban_Rural = lineSplit[4];
                jsonFromLine.AgeGroup = lineSplit[5];
                jsonFromLine.literate = lineSplit[12];
                result.push(jsonFromLine);
            }
        }
    }
);
lineReader.on('close', function() {
    var i = 0;
    while (i != 28) {
        var j = i.toString();


        jsonResult = result.filter(function(agegroup) {

            return agegroup['Total_Urban_Rural'] === "Total" && agegroup['AgeGroup'] === result[j]['AgeGroup']
        });


        sum = jsonResult.reduce(function(total, agegroup) {

            total = total + parseInt(agegroup.literate);
            return total;
        }, 0);

        var array = {};
        array.AgeGroup = result[j]['AgeGroup'];
        array.totalliterate = sum;
        final.push(array);
        i++;

    }

});


lineReader.on('close', function(line) {
    myWriteStreamAge.write(JSON.stringify(final, null, 2))
});

//For Second Statewise and gender wise Graduate Population


lineReader.on('line', function(line) {
    var jsonFromLine2 = {};
    var lineSplit = line.split(',');
    if (lineSplit[4] === "Total") {
        if (lineSplit[5] === "All ages") {
            jsonFromLine2.state = lineSplit[3];
            jsonFromLine2.Graduatepop = parseInt(lineSplit[39]);
            jsonFromLine2.gradM = parseInt(lineSplit[40]);
            jsonFromLine2.gradF = parseInt(lineSplit[41]);
            result1.push(jsonFromLine2);
        }
    }
})
lineReader.on('close', function() {
    var i = 0;
    while (i != 35) {
        var array = {
            AreaName: result1[i].state,
            Graduate_Male: result1[i].gradM,
            Graduate_Female: result1[i].gradF
        }
        statearray.push(array);
        i++;
    }
    myWriteStreamgender.write(JSON.stringify(statearray, null, 2))
});

//For Third Graduate population 
var a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
lineReader.on('line', function(line) {
    var jsonFromLine_three = {};
    var lineSplit_three = line.split(',')
    if (lineSplit_three[4] == 'Total' && lineSplit_three[5] == 'All ages') {
        for (let i = 0, j = 15; i < 10; i++, j += 3) {
            a[i] = a[i] + parseInt(lineSplit_three[j])
        }
    }
});
var arr = ['Literate_without_educational_level_persons', 'Below_Primary_persons', 'Below_Primary_persons', 'Middle_persons', 'Matric_Secondary_persons', 'Higher_secondary_Senior_secondary_persons',
    'Non_technical_diploma_degree_persons', ' Technical_diploma_persons', 'Graduate_above_persons', 'Unclassified_persons'
]
lineReader.on('close',
    function() {
        obj = []
        for (var i = 0; i < 10; i++) {
            obj[i] = {
                name: arr[i],
                value: a[i]
            }

        }
        myWriteStreameducation.write(JSON.stringify(obj, null, 2))
    })