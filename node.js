var result = [];
var result1 = [];
var statearray = [];
var final = [];
var fs = require("fs");
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('India2011.csv')
});
var myWriteStreamAge = require("fs").createWriteStream("JSON/ageWise.json")
var myWriteStreamgender = require("fs").createWriteStream("JSON/graduatePopulation.json")
var myWriteStream = require("fs").createWriteStream("JSON/educationCategory.json")
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

var final_three = [];
var s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

lineReader.on('line', function(line) {
    var jsonFromLine_three = {};
    var lineSplit_three = line.split(',')

    if (lineSplit_three[4] == 'Total' && lineSplit_three[5] == 'All ages') {
        for (let i = 0, j = 15; i < 10; i++, j += 3)

        {
            s[i] = s[i] + parseInt(lineSplit_three[j])
        }
    }
});

lineReader.on('close', function() {
    obj = {
        literate: s[0],
        belowprimary: s[1],
        primary: s[2],
        middle: s[3],
        secondary: s[4],
        higher_secondary: s[5],
        non_diploma: s[6],
        tech_diploma: s[7],
        graduate: s[8],
        unclassified: s[9]
    }
    final_three.push(obj)
    myWriteStream.write(JSON.stringify(final_three, null, 2))
})
//For Second Statewise and gender wise Graduate Population
lineReader.on('line',
    function(line) {
        var jsonFromLine2 = {};
        var lineSplit = line.split(',');
        var statearray = [];
        if (lineSplit[4] === "Total") {
            if (lineSplit[5] === "All ages") {
                var x = lineSplit[1]
                if (x == '01' || x == '02' || x == '03' || x == '04' || x == '05' || x == '06' || x == '07' || x == '08' || x == '09')
                    x = x.charAt(1)
                jsonFromLine2.statecode = x
                jsonFromLine2.state = lineSplit[3];
                jsonFromLine2.Graduatepop = parseInt(lineSplit[39]);
                jsonFromLine2.gradM = parseInt(lineSplit[40]);
                jsonFromLine2.gradF = parseInt(lineSplit[41]);
                result1.push(jsonFromLine2);
            }
        }
    });
lineReader.on('close',
    function() {
        var i = 1;

        while (i != 36) {

            jsonResult1 = result1.filter(function(agegp) {

                return agegp['statecode'] === i.toString();
            });


            var array = {};
            array = jsonResult1[0];
            statearray.push(array);

            i++;
        }
        myWriteStreamgender.write(JSON.stringify(statearray, null, 2))
    });