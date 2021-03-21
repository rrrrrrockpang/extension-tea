const createPreregisteaForm = (id) => {
    return $(`<div class="col-xs-12" id="${id}" style="display: flex; flex-direction: column">
                <div class="preregistea h-100 w-100">
                    <div class='container'>
                        <div class="row h-100 description">I'm describing</div>
                        <div class="row h-100" style="border-top: 2px solid">
                            <div class="col-xs-4 inputarea"></div>
                            <div class="col-xs-8 displayarea"></div>
                        </div>
                    </div>
                </div>
            </div>`);
}

const createAnalysisTwoColumnsForm = () => {
    return $(`<div class='container'>
                <div class="row">
                    <div class="col-xs-6 hypothesis-dv" style="border:teal">
                    </div>
                    <div class="col-xs-6 hypothesis-iv">
                    </div>
                </div>
            </div>`);
}

const createConstructForm = () => {
    return $(`<div class="container" style="min-height: 80%">
                    <form class='inputarea-form'>
                        <div class="form-group">
                            <label for='name' class='col-form-label'>Construct:
                            <input type='text' class='form-control construct'>
                            </label>
                        </div>
                        <div class="form-group">
                            <label for='name' class='col-form-label'>Measure:
                            <input type='text' class='form-control measure'>
                            </label>
                        </div>
                    </form>
              </div>`);
}

const createVariableForm = (id) => {
    return $(`
            <div class="container" style="min-height: 80%">
                <form class="inputarea-form">
                    <div class="form-group">
                        <label for='name' class='col-form-label'>Variable Name:
                        <input type='text' class='form-control variable-name ${id}'>
                        </label>
                    </div>
    
                    <div class='form-group var-type'>
                        <label class="radio control-label">Variable Type:</label>
    
                        <div class="form-inline type-radio">
                        
                            <label class='form-check-label' for='nominalRadio'><input class='form-check-input' type='radio' name='variableTypeRadios' value='nominal'>
                                Nominal
                            </label>
                            <label class='form-check-label' for='ordinalRadio'>
                                <input class='form-check-input' type='radio' name='variableTypeRadios' value='ordinal'>
                                Ordinal
                            </label>
                            <label class='form-check-label' for='intervalRadio'>
                                <input class='form-check-input' type='radio' name='variableTypeRadios' value='interval'>
                                Interval
                            </label>
                            <label class='form-check-label' for='ratioRadio'>
                                <input class='form-check-input' type='radio' name='variableTypeRadios' value='ratio'>
                                Ratio
                            </label>
                        </div>
                    </div>
                              
                    <div>
                        <div class="form-group construct-group"> 
                              <label class="radio control-label construct-label">Construct:</label>
                              <div class="construct-card"></div>
                        </div>
                    </div>
                </form>  
            </div>  
    `);
}

const createCategoricalVariableInputFormArea = (text, className) => {
    return $(`<div class="form-group add-category ${className}">
                    <div class="container w-100">
                        <div class="row">
                            <label for='name' class='col-form-label'>${text}:</label>
                            
                            <div class="form-inline">
                                <input type='text' class='form-control input-category'>
                                <button type="button" class="btn btn-success add-category-btn">Add</button>
                            </div>
                        </div>
                        <div class="row categories"></div>
                    </div>
                </div>`);
}

const createStudyDesignRadioArea = () => {
    return $(`
        <div class="form-group study-design">
            <label class="radio control-label">Study Design:</label>
            <label class='form-check-label' for='withinSubject'>
                    <input class='form-check-input' type='radio' name='studyDesignRadio' value='within'>
                    Within-Subject
            </label>
            <label class='form-check-label' for='withinSubject'>
                <input class='form-check-input' type='radio' name='studyDesignRadio' value='between'>
                Between-Subject
            </label>
        </div>
    `)
}

const createInitialButton = (id, text) => {
    return $(`<button type="button" id="${id}" class="btn btn-success initial_btn">${text}</button>`)
        .css({
            right: 0,
        })
}

const createHypothesisConditionIsNominal = (dv, iv) => {
    const template = $(`<form class='hypothesis_display_form'>
                    <div class="form-group">
                        <label for='name' class='col-form-label'>Hypothesis:
                        <div class="form-inline">
                            <label>The mean value of</label>
                            <label class="dv-in-form"></label>
                            <label>in</label>
                            <select class="iv-group-custom-select-1">
                            </select>
                            <label>group will be</label>
                            <select class="custom-select two-side">
                                <option value="greater" selected>greater than</option>
                                <option value="less">less than</option>
                                <option value="different">different from</option>
                                <option value="same">same as</option>
                            </select>
                            <label>that in</label>
                            <select class="iv-group-custom-select-2">
                            </select>
                        </div>
                    </div>
                </form>`);

    template.find(".dv-in-form").append(dv.name);
    let categoryOptions = [];
    let categoryOptions2 = [];
    for(let i = 0; i < iv.categories.length; i++) {
        const option = $(`<option value="${iv.categories[i]}">${iv.categories[i]}</option>`);
        categoryOptions.push(option);
        categoryOptions2.push(option.clone());
    }

    categoryOptions[0].prop("selected", true);
    categoryOptions2[1].prop("selected", true);

    template.find(".iv-group-custom-select-1").append(categoryOptions);
    template.find(".iv-group-custom-select-2").append(categoryOptions2);

    return template;
}

const createHypothesisConditionIsNotNominal = (dv, iv) => {
    const template = $(`
                <form class='hypothesis_display_form'>
                    <div class="form-group">
                        <label for='name' class='col-form-label'>Hypothesis:
                        <div class="form-inline" style="display: inline-block;">
                            <label>The greater value of</label>
                            <label class="iv-in-form mr-sm-2"></label>
                            <label>will lead to</label>
                            <select class="custom-select positive-negative">
                                <option value="greater" selected>greater</option>
                                <option value="less">less</option>
                                <option value="different">different</option>
                                <option value="same">the same</option>
                            </select>
                            <label class="dv-in-form"></label>
                        </div>
                    </div>
                </form>
            `);
    template.find(".dv-in-form").append(dv.name);
    template.find(".iv-in-form").append(iv.name);
    return template;
}

//////////////  Add a bunch of cards //////////////
const addCard = (text, id) => {
    return $(`
        <div class="variable-card" id="${id}">
            <div class="container">
                <div class="row w-100">
                    <div class="col-sm-10">
                        <p>${text}</p>
                    </div>
                    <div class="col-sm-2">
                        <button type='button' class='delete close' data-dismiss='alert' aria-label='Close'>×</button>
                    </div>
                </div>
            </div>
        </div>
    `);
}

const addNewCard = (section_id, variable) => {
    let card = $(`
            <div class="uml-card" id="${variable.name}" style="width: 200px; height: 150px; position: relative">
                <div class="form-group mb-1" style="border-bottom: 1px solid #0f0f0f; text-align: center">
                    <label class="card-header-name"></label>
                </div>
            </div>
        `);

    if(section_id === DV_ID || section_id === CONDITION_ID) {
        card.find(".card-header-name").append(`<p>${variable.name}</p>`);
        let lst = [addRowInCard("Type", variable.type)];
        if(variable.categories.length > 0) {
            lst.push(addRowInCard("Categories", variable.categories.toString()));
        }

        if(typeof variable.construct !== "undefined") {
            lst.push(addRowInCard("Construct", variable.construct));
        }

        card.append(lst);
    } else if(section_id === HYPOTHESIS_ID) {
        card.find(".card-header-name").text(variable.name);
        card.append(addRowInCard("Measure", variable.measure));
    }

    const cancel = $(`<button type='button' class='delete close' data-dismiss='alert' aria-label='Close' style="position: absolute; top: 0; right: 0">×</button>`)
    card.append(cancel)

    return card;
}

const addRowInCard = (name, text) => {
    return $(`
        <div class="form-group mb-0 card-details">
             <label>${name}: ${text}</label>
        </div>
    `);
}

const addHypothesisCard = (text, id) => {
    return $(`
        <div class="variable-card" id="${id}">
            <div class="container">
                <div class="row w-100">
                    <div class="col-sm-12">
                        <p>${text}</p>
                    </div>
                </div>
            </div>
        </div>
    `);
};

const createCategoryCard = (text) => {
    return $(`
        <span>
            <span class="category-name">${text}</span> &nbsp;
            <a class="btn btn-light delete-category">x</a>
        </span>
    `).css({
        border: "solid",
        "border-color": "yellow",
        padding: "2px",
        "margin-left": "2px",
        "margin-right": "2px"
    })
}
