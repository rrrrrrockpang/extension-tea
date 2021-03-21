////////////////////////////////////////////////////////////////////////////
////////////////   Add the components to static layout   ///////////////////
////////////////////////////////////////////////////////////////////////////
const addPreregistea = (id, rowElement) => {
    const display_id = id + '_preregistea';
    const preregistea = createPreregisteaForm(display_id);
    // const height = rowElement.find('textarea').height();
    // form.css('height', height);  // TODO: Figure out the best height
    addDisplayArea(id, preregistea);
    addInputArea(id, preregistea.find('.inputarea'));

    return preregistea;
}

const addDisplayArea = (id, playground) => {
    const preregistea = playground.find('.displayarea');

    if(id === ANALYSIS_ID) {
        preregistea.append(createAnalysisTwoColumnsForm());
    } else if(id === SAMPLESIZE_ID) {
        preregistea.append(createPowerChart());
    }

}

const addInputArea = (id, playground) => {
    const form_id = id + '_form';
    playground.append(addInputForm(id, form_id));
    addSubmitButton(id, playground);
    $(".construct-group").hide();
}

const addInputForm = (id, form_id) => {
    let inputForm;
    if(id === CONDITION_ID || id === DV_ID) {
        inputForm = createVariableForm(form_id);
        handleCategoricalVariable(id, inputForm);
    } else if(id === HYPOTHESIS_ID) {
        inputForm = createConstructForm();
    } else if(id === SAMPLESIZE_ID) {
        inputForm = createPowerInputForm();
    }
    return inputForm;
}

const addSubmitButton = (id, playground) => {
    const inputFormArea = playground.find('.inputarea-form')
    const btn_id = id + "_initial_btn";
    let btn_text;

    if(id === DV_ID || id === CONDITION_ID) {
        btn_text = "Add Variable";
        const initialBtn = createInitialButton(btn_id, btn_text);
        initialBtn.on("click", function () {
            const variable = updateVariable(id, inputFormArea);
            clearInputFormArea(inputFormArea);
        })
        inputFormArea.append(initialBtn);
    } else if(id === HYPOTHESIS_ID) {
        btn_text = "Add Construct";
        const initialBtn = createInitialButton(btn_id, btn_text);
        initialBtn.on("click", function() {
            updateConstruct(id, inputFormArea);
            clearConstructInputFormArea(inputFormArea);
        })
        inputFormArea.append(initialBtn);
    }
}

////////////////////////////////////////////////////////////////////////////
////////////////   Handle all the static js interaction   //////////////////
////////////////////////////////////////////////////////////////////////////
const handleCategoricalVariable = (area_id, inputFormTemplate) => {
    // Add the nominal and ordinal form
    addCategoricalForm(inputFormTemplate);

    // Manipulate the changes
    inputFormTemplate.find(".var-type input[type='radio']").on("change", function(){
        const selected = inputFormTemplate.find("input[type='radio']:checked");
        let nominalArea = inputFormTemplate.find(".nominal-category");
        let ordinalArea = inputFormTemplate.find(".ordinal-category");
        let studyDesignArea = inputFormTemplate.find(".study-design");

        if(selected.val() === "nominal") {
            if(ordinalArea.is(":visible")) ordinalArea.hide();
            nominalArea.show();
            if(area_id === CONDITION_ID) studyDesignArea.show();
            handleCategoryBtn(nominalArea.find(".add-category-btn")); // Manipulate Add category button
        } else if(selected.val() === "ordinal"){
            if(nominalArea.is(":visible")) nominalArea.hide();
            ordinalArea.show();
            handleCategoryBtn(ordinalArea.find(".add-category-btn"));
        } else {
            nominalArea.hide();
            ordinalArea.hide();
        }
    });
}

// const handleCategoryBtn = (categoryArea) => {
//     /**
//      * categoryArea is the nominal or ordinal area
//      */
//     categoryArea.find(".add-category-btn").on('click', function() {
//         let categories = getCurrentCategories(categoryArea);
//         const newCategory = categoryArea.find(".input-category").val();
//         categories.push(newCategory);
//
//         const card = createCategoryCard(newCategory);
//         card.find(".delete-category").on("click", function() {
//             const cardComponent = $(this).parent();
//             const deletedCategory = cardComponent.find('.category-name').text();
//             categories = deleteCategory(categories, deletedCategory);
//             cardComponent.remove();
//         });
//         categoryArea.find(".input-category").val('');
//         categoryArea.find(".categories").append(card);
//     })
// }
const handleCategoryBtn = (categoryAreaBtn) => {
    /**
     * categoryArea is the nominal or ordinal area
     */
    const categoryArea = categoryAreaBtn.closest(".add-category");
    categoryAreaBtn.on('click', function() {
        let categories = getCurrentCategories(categoryArea);
        const newCategory = categoryArea.find(".input-category:visible").val();
        if(newCategory.length === 0) return;
        categories.push(newCategory);

        const card = createCategoryCard(newCategory);
        card.find(".delete-category").on("click", function() {
            const cardComponent = $(this).parent();
            const deletedCategory = cardComponent.find('.category-name:visible').text();
            categories = deleteCategory(categories, deletedCategory);
            cardComponent.remove();
        });
        categoryArea.find(".input-category:visible").val('');
        categoryArea.find(".categories:visible").append(card);
    })
}

// Helper Function
const addCategoricalForm = (inputFormTemplate) => {
    const nominalArea = createCategoricalVariableInputFormArea("Categories", "nominal-category")
    const ordinalArea = createCategoricalVariableInputFormArea("Orders", "ordinal-category")
    const studyDesign = createStudyDesignRadioArea();
    studyDesign.insertAfter(inputFormTemplate.find(".var-type"));
    nominalArea.insertAfter(inputFormTemplate.find(".var-type"));
    ordinalArea.insertAfter(inputFormTemplate.find(".var-type"));
    studyDesign.hide();
    nominalArea.hide();
    ordinalArea.hide();
}

const getCurrentCategories = (categoryArea) => {
    let categories = [];
    $(categoryArea).find('span .category-name').each(function() {
        if($(this).is(":visible")) categories.push($(this).text());
    })
    return categories;
}

const clearInputFormArea = (inputForm) => {
    let nameArea = inputForm.find(".variable-name").first();
    let typeArea = inputForm.find(".var-type input[type='radio']:checked");
    let categoriesArea = inputForm.find('.add-category .categories');

    nameArea.val("");
    typeArea.prop("checked", false);
    categoriesArea.empty();
    categoriesArea.parent().parent().hide();
}

const clearConstructInputFormArea = (inputForm) => {
    let constructArea = inputForm.find(".construct");
    let measureArea = inputForm.find(".measure");

    constructArea.val("");
    measureArea.val("");
}


////////////////////////////////////////////////////////////////////////////
////////////////   Add the floating window to display Tea   ///////////////////
////////////////////////////////////////////////////////////////////////////
const addTeaFloatingBtn = () => {
    return btn = $(`
        <button id="tea-floating-btn" class="floating-btn" data-toggle="modal" data-target="#exampleModal">Tea Code</button>
    `);
}

const addMethodFloatingBtn = () => {
    return btn = $(`
        <button id="method-floating-btn" class="floating-btn" data-toggle="modal" data-target="#exampleModal">Method Section</button>
    `);
}

const addTeaModal = (body) => {
    const modal = $(`
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
    `);

    modal.on("show.bs.modal", function(event) {
        const button = $(event.relatedTarget);
        const btn_id = button.attr("id");

        const modal = $(this);
        if (btn_id === "tea-floating-btn") {
            modal.find('.modal-title').html("Tea Code");
            modal.find('.modal-body').html(`<code>${stringifyTeaCode()}</code>`).css("white-space", "pre");
        } else if(btn_id === "method-floating-btn") {
            modal.find('.modal-title').html("Method Section");
            modal.find('.modal-body').html("Hi \n Great comments").css("white-space", "pre");
        }
    })

    body.append(modal);
}

////////////////////////////////////////////////////////////////////////////
////////////////   Add Power Analysis button  ///////////////////
////////////////////////////////////////////////////////////////////////////

const addPowerAnalysisBtn = () => {
    const icon = $(`<button id="sample-size-btn" class="btn btn-success">Power Analysis</button>`)
    icon.popover({
        html: true,
        sanitize: false,
        container: 'body',
        placement: 'right',
        title: "Power Analysis",
        content: powerAnalysisForm()
    })
    return icon;
}

const powerAnalysisForm = () => {
    const data = [
        {"sample": 12, "power": 0.25, "d": 0.4},
        {"sample": 18, "power": 0.4, "d": 0.4},
        {"sample": 24, "power": 0.5, "d": 0.4},
        {"sample": 30, "power": 0.65, "d": 0.4},
        {"sample": 36, "power": 0.75, "d":0.4},
        {"sample": 42, "power": 0.81, "d": 0.4},
        {"sample": 48, "power": 0.85, "d": 0.4},
        {"sample": 12, "power": 0.2, "d": 0.2},
        {"sample": 18, "power": 0.35, "d": 0.2},
        {"sample": 24, "power": 0.45, "d": 0.2},
        {"sample": 30, "power": 0.5, "d": 0.2},
        {"sample": 36, "power": 0.6, "d":0.2},
        {"sample": 42, "power": 0.65, "d": 0.2},
        {"sample": 48, "power": 0.67, "d": 0.2}
      ]

    const display = $(`<div class="power-analysis">
                        </div>`);
    const effectSizeRadioArea = $(`
<form class="form-group">
<div class="form-inline effect-radio-area">
    <label for="effectSize1">0.2<input class='form-check-input' type="radio" value="0.2"></label>
    <label for="effectSize2">0.4<input class='form-check-input' type="radio" value="0.4"></label>    
</div></form>`);
    display.append(effectSizeRadioArea);

    let graph = d3.select(display[0]);
    // const allGroup = ["0.2", "0.4"];
    // const j = 0.1;
    // d3.select(effectSizeRadioArea[0])
    //   .selectAll('label')
    //  	.data(allGroup)
    //   .enter()
    // 	.append('label')
    //   .text(function (d) { return d; }) // text showed in the menu
    //     .insert("input")
    //     .attr({
    //         type: "radio",
    //         name: "effectSizeRadios",
    //         value: function (d) { return d; }
    //     });

    // Graph
    const margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 230 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = graph.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
        .domain([8, 48])
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

    // Add the line
    var initialData = data.filter(function(d) {
            return d.d === 0.2;
        });
    console.log(initialData)
    var line = svg.append('g').append("path")
        .datum(initialData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return x(d.sample) })
            .y(function(d) { return y(d.power) })
        );

    function update(selectedGroup) {
        // var dataFilter = data.map(function(d){
        //     return {sample: d.sample, power:d[selectedGroup]}
        // })
        var dataFilter = data.filter(function(d) {
            return d.d === parseFloat(selectedGroup);
        });
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

    d3.select(effectSizeRadioArea[0]).on("change", function(d) {
        // recover the option that has been chosen
        console.log(effectSizeRadioArea[0]);
        var selectedOption = d3.select(this).select("input[type='radio']:checked").property("value")
        console.log(selectedOption);
        // run the updateChart function with this selected option
        update(selectedOption)
    })

    return display;
}



