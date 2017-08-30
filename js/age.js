var margin = { top: 40, right: 0, bottom: 100, left: 55 },
        width = 1300 - margin.left ,
        height = 700 - margin.top - margin.bottom;
    var formatPercent = d3.format("");
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .4);
    var y = d3.scale.linear()
        .range([height, 0]);
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(formatPercent);
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<strong> Literate: </strong> <span style='color:red'>" + d.totalliterate + "</span>";
        })
        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.call(tip);
    d3.json("../json/ageWise.json", function(error, data) {
        x.domain(data.map(function(d) { return d.AgeGroup; }));
        y.domain([0, d3.max(data, function(d) { return d.totalliterate; })]);
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("literate");
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.AgeGroup); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.totalliterate); })
            .attr("height", function(d) { return height - y(d.totalliterate); })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
    });
