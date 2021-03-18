const handleVariableListeners = () => {
    dvListener = {
        dvInternal: dependent_variables,
        dvListener: function (val) {},
        set dv(val) {
            this.dvInternal = val;
            this.dvListener(val);
        },
        get dv() {
            return this.dvInternal;
        },
        registerListener: function (listener) {
            this.dvListener = listener;
        }
    }

    ivListener = {
        ivInternal: conditions,
        ivListener: function (val) {},
        set iv(val) {
            this.ivInternal = val;
            this.ivListener(val);
        },
        get iv() {
            return this.ivInternal;
        },
        registerListener: function (listener) {
            this.ivListener = listener;
        }
    }

    hypothesisPairListener = {
        pInternal: hypothesisPair,
        pListener: function (val) {},
        set pair(val) {
            this.pInternal = val;
            this.pListener(val);
        },
        get pair() {
            return this.pInternal;
        },
        registerListener: function (listener) {
            this.pListener = listener;
        }
    }

    dvListener.registerListener(function (dvs) {
        $(".hypothesis-dv").empty();
        $(`#${DV_ID}_preregistea .displayarea`).empty();

        let sections = {};
        sections[DV_ID] = $(`#${DV_ID}_preregistea .displayarea`);
        sections[ANALYSIS_ID] = $(`#${ANALYSIS_ID}_preregistea .displayarea .hypothesis-dv`)
        populateCards(DV_ID, sections, dvs); // In relevant sections
    });

    ivListener.registerListener(function (conditions) {
        $(".hypothesis-iv").empty();
        $(`#${CONDITION_ID}_preregistea .displayarea`).empty();
        let sections = {}
        sections[CONDITION_ID] = $(`#condition_preregistea .displayarea`);
        sections[ANALYSIS_ID] = $(`#analysis_preregistea .displayarea .hypothesis-iv`);
        populateCards(CONDITION_ID, sections, conditions);
    });

    hypothesisPairListener.registerListener(function(pair) {
        const inputArea = $(`#analysis_preregistea .inputarea`);
        inputArea.empty();

        if(pair['dv'] !== '' && pair['iv'] !== '') {
            updateHypothesisFormArea(pair, inputArea);
        } else {
            inputArea.append("Please add some value here");
        }
    })
}

const updateHypothesisFormArea = (hypothesisPair, inputArea) => {
    let dv = hypothesisPair['dv'];
    let iv = hypothesisPair['iv'];
    let hypothesisFormArea;
    if(iv.type === 'nominal') hypothesisFormArea = createHypothesisConditionIsNominal();
    else hypothesisFormArea = createHypothesisConditionIsNotNominal();

    inputArea.append(hypothesisFormArea);
}

const updateVariable = (section_id, inputForm, variable = null) => {
    let initial = variable;
    let nameArea = inputForm.find(".variable-name").first();
    let typeArea = inputForm.find(".var-type input[type='radio']:checked");
    let categoriesArea = inputForm.find('.add-category .categories');

    if(variable === null) {
        variable = new Variable(nameArea.val(), typeArea.val(), getCurrentCategories(categoriesArea));
        variable.section = section_id;
        variable.card_id = section_id + "_" + variable.name;
    } else {
        variable.set(nameArea.val(), typeArea.val(), getCurrentCategories(categoriesArea));
    }


    // Update variableMap, dependent_variables, and conditions
    variableMap[variable.card_id] = variable;
    if(section_id === DV_ID) {
        dependent_variables.push(variable);
        if(!variable.isEditing) dvListener.dv = dependent_variables;
    } else if(section_id === CONDITION_ID) {
        conditions.push(variable);
        if(!variable.isEditing) ivListener.iv = conditions;
    }

    console.log(variableMap);
    console.log(variable);

    return variable;
}

const deleteVariable = (section_id, inputForm, variable) => {
    delete variableMap[variable.card_id];
    if(section_id === DV_ID) {
        let pos = 0;
        for(let i = 0; i < dependent_variables.length; i++) {
            if(variable.name === dependent_variables[i].name) {
                pos = i;
                break;
            }
        }
        dependent_variables.splice(pos, 1);
    } else if(section_id === CONDITION_ID) {
        alert("?");
        let pos = 0;
        for(let i = 0; i < conditions.length; i++) {
            if(variable.name === conditions[i].name) {
                pos = i;
                break;
            }
        }
        conditions.splice(pos, 1);
    }//

    console.log(dependent_variables);
    console.log("??")
    console.log(conditions);
    inputForm.find(variable.card_id).remove();
}


const populateCards = (section_id, object, variables) => {
    for(const section_id in object) {
        let cards = [];
        const element = object[section_id];
        for(let i = 0; i < variables.length; i++) {
            const variable = variables[i];
            let card;
            if(section_id === ANALYSIS_ID) {
                card = addHypothesisCard(variable.name, "hypothesis_dv" + variable.name);
                card.on("click", function() {
                    addListenertoHypothesisCard(card, variable);
                });
            } else {
                card = addCard(variable.name, section_id + "_" + variable.name);
                card.find(".delete").on("click", function(){
                    console.log("variable deleted");
                    deleteVariable(section_id, element, variableMap[section_id + "_" + variable.name]);
                    card.remove();
                });
                card.popover({
                    html: true,
                    sanitize: false,
                    container: 'body',
                    placement: 'right',
                    title: " ",
                    content: function() {
                        return popoverForm(card, section_id, variable);
                    }
                })
            }
            cards.push(card);
        }
        element.append(cards);
    }
}

const popoverForm = (card, section_id, variable) => {
    const template = addInputForm(section_id, variable.name + "_popover_form");
    template.find('.variable-name').val(variable.name);
    template.find(`input[type='radio'][value='${variable.type}'`).prop("checked", true);
    if(variable.type === "nominal") {  // TODO: Need to consider ordinal as well
        for(let i = 0; i < variable.categories.length; i++) {
            const card = createCategoryCard(variable.categories[i]);
            card.find(".delete-category").on("click", function() {
                const cardComponent = $(this).parent();
                const deletedCategory = cardComponent.find('.category-name').text();
                variable.categories = deleteCategory(variable.categories, deletedCategory);
                cardComponent.remove();
            });
            template.find(".nominal-category .categories").append(card);
        }
        handleCategoryBtn(template.find(".nominal-category .add-category-btn"));
        template.find(".nominal-category").show();
    }

    const cancelBtn = $("<button type='button' class='btn btn-secondary'>Close</button>");
    const changeBtn = $("<button type='button' class='btn btn-success'>Change</button>");

    cancelBtn.on("click", function(){
        card.popover("hide");
    })

    changeBtn.on("click", function() {
        variable.isEditing = true;
        updateVariable(section_id, template, variable);
        console.log("check name")
        console.log(variable)
        variable.isEditing = false;
        card.popover("hide");
    })

    template.append([cancelBtn, changeBtn]);

    return template;
}

const addListenertoHypothesisCard = (card, variable) => {
    card.css("background", "grey");

    if(variable.section === DV_ID) {
        if(analysisDVClicked) {
            analysisDVElement.css("background", "none");
            if(analysisDV.name === variable.name) {
                analysisDVClicked = false;
                analysisDVElement = null;
                analysisDV = null;
                hypothesisPair['dv'] = '';
            } else {
                analysisDVClicked = true;
                analysisDVElement = card;
                analysisDV = variable;
                hypothesisPair['dv'] = analysisDV;
            }
        } else {
            analysisDVClicked = true;
            analysisDVElement = card;
            analysisDV = variable;
            hypothesisPair['dv'] = analysisDV;
        }
        hypothesisPairListener.pair = hypothesisPair;
    } else {
        if(analysisConditionClicked) {
            analysisConditionElement.css("background", "none");
            if(analysisCondition.name === variable.name) {
                analysisConditionClicked = false;
                analysisConditionElement = null;
                analysisCondition = null;
                hypothesisPair['iv'] = '';
            } else {
                analysisConditionClicked = true;
                analysisConditionElement = card;
                analysisCondition = variable;
                hypothesisPair['iv'] = analysisCondition;
            }
        } else {
            analysisConditionClicked = true;
            analysisConditionElement = card;
            analysisCondition = variable;
            hypothesisPair['iv'] = analysisCondition;
        }
        hypothesisPairListener.pair = hypothesisPair;
    }

    console.log(analysisDV);
    console.log(analysisCondition);
}

// const editInputFormArea = (card_id) => {
//     const variable = variableMap[card_id];
//     variable.isEditing = true;
//     if(variable.section === "condition") currentCondition = variable;
//     else if(variable.section === "dependent") currentDV = variable;
//
//
//     const preregistea = $(`#${card_id}`).parent().parent().parent();
//     const inputArea = preregistea.find('.inputarea')
//
//     inputArea.find(".variable-name").val(variable.name);
//     inputArea.find(`input[type="radio"][value="${variable.type}"]`).prop('checked', true);
//     if(variable.type === "nominal") {  // TODO: Need to consider ordinal as well
//         for(let i = 0; i < variable.categories.length; i++) {
//             const card = createCategoryCard(variable.categories[i]);
//             card.find(".delete-category").on("click", function() {
//                 const cardComponent = $(this).parent();
//                 const deletedCategory = cardComponent.find('.category-name').text();
//                 variable.categories = deleteCategory(variable.categories, deletedCategory);
//                 cardComponent.remove();
//             });
//             inputArea.find(".add-category").find(".categories").append(card).show();
//         }
//     }
// }