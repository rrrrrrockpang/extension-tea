const handleVariableListeners = () => {
    dvListener = {
        dvInternal: dependent_variables,
        dvListener: function (val) {
        },
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
        ivListener: function (val) {
        },
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

    dvListener.registerListener(function (dvs) {
        $(".hypothesis-dv").empty();
        $(`#${DV_ID}_preregistea .displayarea`).empty();

        populateCards({
            DV_ID: $(`#${DV_ID}_preregistea .displayarea`),
            ANALYSIS_ID: $(`#dv_preregistea .displayarea .hypothesis-dv`)
        }, dvs); // In relevant sections
    });

    ivListener.registerListener(function (conditions) {
        $(".hypothesis-iv").empty();
        $(`#${CONDITION_ID}_preregistea .displayarea`).empty();
        let sections = {}
        sections[CONDITION_ID] = $(`#condition_preregistea .displayarea`);
        sections[ANALYSIS_ID] = $(`#analysis_preregistea .display .hypothesis-iv`);
        populateCards(CONDITION_ID, sections, conditions);
    })
}

const updateVariable = (section_id, inputForm, variable = null) => {
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

    return variable;
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
            } else {
                card = addCard(variable.name, section_id + "_" + variable.name);
            }

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
            template.find(".add-category").find(".categories").append(card).show();
        }
    }

    const cancelBtn = $("<button type='button' class='btn btn-secondary'>Close</button>");
    const changeBtn = $("<button type='button' class='btn btn-success'>Change</button>");

    cancelBtn.on("click", function(){
        card.popover("hide");
    })

    changeBtn.on("click", function() {
        updateVariable(section_id, template, variable);
    })

    return template;
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