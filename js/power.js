$(document).ready(function() {
    const sampleInputArea = $("#sample_size_preregistea");
    sampleInputArea.find(".inputarea").append(createPowerInputForm());
    sampleInputArea.find(".displayarea").append(createPowerChart());

})

const createPowerChart = () => {
    const display = $(`<div class="power-analysis"></div>`)
    let graph = d3.select(display[0]);

    const margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 500 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    const svg = graph.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .domain([5, 100])
        .range([ 0, width ]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 1])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));

    var dashLine = svg.append("line")
        .style("stroke", "red")
        .style("stroke-dasharray", ("3, 3"))
        .attr("x1", 0)
        .attr("y1", y(0.8))
        .attr("x2", width)
        .attr("y2", y(0.8));

      var bisect = d3.bisector(function(d) { return d.sample; }).left;

    var focus = svg
    .append('g')
    .append('circle')
      .style("fill", "none")
      .attr("stroke", "black")
      .attr('r', 8.5)
      .style("opacity", 0)

    var focusText = svg
    .append('g')
    .append('text')
      .style("opacity", 0)
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle")

    svg
    .append('rect')
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout);



    var lower = power_data.filter(function(d) {
        return d.effect === 0.75;
    })

    var higher = power_data.filter(function(d) {
        return d.effect === 0.85;
    })

    var initialData = power_data.filter(function(d) {
        return d.effect === 0.8;
    })

    initialData = initialData.map(function(d, i) {
        d.lower = lower[i].power;
        d.higher = higher[i].power;
        return d
    })

    var confidence = svg.append("path")
      .datum(initialData)
      .attr("fill", "#69b3a2")
      .attr("fill-opacity", .3)
      .attr("stroke", "none")
      .attr("d", d3.area()
        .x(function(d) { return x(d.sample) })
        .y0(function(d) { return y(d.lower) })
        .y1(function(d) { return y(d.higher) })
        )

    var line = svg.append('g').append("path")
        .datum(initialData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return x(d.sample) })
            .y(function(d) { return y(d.power) })
        );

    function update(number) {
        // var dataFilter = data.map(function(d){
        //     return {sample: d.sample, power:d[selectedGroup]}
        // })
                console.log(number)

        var lower = power_data.filter(function(d) {
            const n = number - 0.05;
            return Math.abs(d.effect - n) < Number.EPSILON;
        })

        var higher = power_data.filter(function(d) {
            const n = number + 0.05;
            return Math.abs(d.effect - n) < Number.EPSILON;
        })

        var dataFilter = power_data.filter(function(d) {
            return d.effect === number;
        });

        dataFilter = dataFilter.map(function(d, i) {
            d.lower = lower[i].power;
            d.higher = higher[i].power;
            return d
        })


        confidence
          .datum(dataFilter)
          .transition().duration(1000)
          .attr("d", d3.area()
            .x(function(d) { return x(d.sample) })
            .y0(function(d) { return y(d.lower) })
            .y1(function(d) { return y(d.higher) })
            )
        // Give these new data to update line
        line.datum(dataFilter)
            .transition()
            .duration(1000)
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return x(+d.sample) })
                .y(function(d) { return y(+d.power) })
            );
    }

         // What happens when the mouse move -> show the annotations at the right positions.
  function mouseover() {
    focus.style("opacity", 1)
    focusText.style("opacity",1)
  }

  function mousemove(event) {
    // recover coordinate we need
    var x0 = x.invert(d3.pointer(event)[0]);
    console.log(x0);
    var i = bisect(initialData, x0, 1);
    console.log(i)
    selectedData = initialData[i]
    focus
      .attr("cx", x(+selectedData.sample))
      .attr("cy", y(+selectedData.power))
    focusText
      .html("Size:" + selectedData.sample + "  -  " + "Power:" + selectedData.power)
      .attr("x", x(+selectedData.sample)+15)
      .attr("y", y(+selectedData.power))
    }
  function mouseout() {
    focus.style("opacity", 0)
    focusText.style("opacity", 0)
  }

  update(0.8);

    d3.select("#effectSizeNumber").on("change", function(d) {
        var number = d3.select(this).property("value");
        update(parseFloat(number));
    })

    return display;
}


const createPowerInputForm = () => {
    return $(`<div class="container"
                    <form class='inputarea-form'>
                        <div class="form-group">
                            <label class="radio control-label">Effect Size:</label>
    
                            <div class="form-inline type-radio">
                            
                                <label for="effectSizeNumber">Cohen's d
                                    <input type="number" id="effectSizeNumber" name="effectSizeNumber" min="0" max="1" step="0.05">
                                    with a margin of 0.05
                                </label>
                                <label class='form-check-label'><input class='form-check-input' type='radio' name='effectSizeRadios' value='0.2'>
                                    Small Effect (0.2)
                                </label>
                                <label class='form-check-label'><input class='form-check-input' type='radio' name='effectSizeRadios' value='0.5'>
                                    Medium Effect (0.5)
                                </label>
                                <label class='form-check-label'><input class='form-check-input' type='radio' name='effectSizeRadios' value='0.8'>
                                    Large Effect (0.8)
                                </label>
                            </div>
                        </div>
                    </form>
              </div>`);
}