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
        .domain([5, 70])
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
                                <label class='form-check-label'><input class='form-check-input' type='radio' name='effectSizeRadios' value='0.4'>
                                    Medium Effect (0.5)
                                </label>
                                <label class='form-check-label'><input class='form-check-input' type='radio' name='effectSizeRadios' value='0.8'>
                                    Large Effect (0.8)
                                </label>
                            </div>
                        </div>
                    </form>
              </div>`).on("change", function() {
                  const checked = $(".form-check-label input[type='radio']:checked");
                  if($(this).has(checked)) {
                      const val = checked.val();
                      $(this).find("#effectSizeNumber").val(val);
                  }
    })
}