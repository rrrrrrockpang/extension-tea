const createPreregisteaForm = (id) => {
    return $(`<div class="col-xs-12" id="${id}" style="display: flex; flex-direction: column">
                <div class="preregistea h-100 w-100">
                    <div class='container'>
                        <div class="row h-100">
                            <div class="col-xs-8 displayarea"></div>
                            <div class="col-xs-4 inputarea"></div>
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
                </form>  
            </div>  
    `);
}

const createNominalRadioBtn = () => {
    return $(`<label class='form-check-label' for='nominalRadio'>
                <input class='form-check-input' type='radio' name='variableTypeRadios' value='nominal'>
                Nominal
              </label>`);
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

const createInitialButton = (id, text) => {
    return $(`<button type="button" id="${id}" class="btn btn-success initial_btn">${text}</button>`)
        .css({
            right: 0,
        })
}

const createHypothesisConditionIsNominal = () => {
    return $(`<form class='hypothesis_display_form'>
                    <div class="form-group">
                        <label for='name' class='col-form-label'>Hypothesis:
                        <div class="form-inline">
                            <label>The mean value of</label>
                            <label class="dv-in-form"></label>
                            <label>in</label>
                            <select class="iv-group-custom-select-1">
<!--                                <option value="CI" selected>CI</option>-->
<!--                                <option value="PI">PI</option>-->
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
<!--                                <option value="CI" selected>CI</option>-->
<!--                                <option value="PI">PI</option>-->
                            </select>
                        </div>
                    </div>
                </form>`);
}

const createHypothesisConditionIsNotNominal = () => {
    return $(`
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
            `)
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
