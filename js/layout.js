////////////////////////////////////////////////////////////////////////////
////////////////   Add the components to static layout   ///////////////////
////////////////////////////////////////////////////////////////////////////
const addPreregistea = (id, rowElement) => {
    const display_id = id + '_preregistea';
    const preregistea = createPreregisteaForm(display_id);
    // const height = rowElement.find('textarea').height();
    // form.css('height', height);  // TODO: Figure out the best height

    addDisplayArea(id, preregistea);
    addInputArea(id, preregistea);

    return preregistea;
}

const addDisplayArea = (id, playground) => {
    const preregistea = playground.find('.displayarea');

    if(id === ANALYSIS_ID) {
        preregistea.append(createAnalysisTwoColumnsForm());
    }

}

const addInputArea = (id, playground) => {
    const form_id = id + '_form';
    let inputFormArea = playground.find('.inputarea');
    let inputForm;
    if(id === CONDITION_ID || id === DV_ID) {
        inputForm = createVariableForm(form_id);
        if(id === CONDITION_ID) {
            inputForm.find(".form-inline.type-radio").prepend(createNominalRadioBtn())
        }
        handleCategoricalVariable(form_id, inputForm);
    }
    inputFormArea.append(inputForm);
    addSubmitButton(id, inputFormArea);
}

const addSubmitButton = (id, playground) => {
    const inputFormArea = playground.find('.inputarea-form')
    const btn_id = id + "_initial_btn";
    let btn_text;

    if(id === DV_ID) {
        btn_text = "Add a Variable";
    } else if (id === CONDITION_ID) {
        btn_text = "Add a Variable";
    } else if (id === HYPOTHESIS_ID) {
        btn_text = "Define a construct";
    } else if (id === ANALYSIS_ID) {
        btn_text = "Find the right statistical test with Tea";
    } else if(id === SAMPLESIZE_ID) {
        btn_text = "Determine Sample Size";
    }

    const initialBtn = createInitialButton(btn_id, btn_text);
    initialBtn.on("click", function() {
        if(id === DV_ID) {
            dependent_variables.push(new Variable("hi"));
            dvListener.dv = dependent_variables;
        } else if(id === CONDITION_ID) {
            conditions.push(new Variable("jjj"));
            console.log(conditions)
            ivListener.iv = conditions;
        }
    })
    inputFormArea.append(initialBtn);
}

////////////////////////////////////////////////////////////////////////////
////////////////   Handle all the static js interaction   //////////////////
////////////////////////////////////////////////////////////////////////////
const handleCategoricalVariable = (id, inputFormTemplate) => {
    // Add the nominal and ordinal form
    addCategoricalForm(inputFormTemplate);

    // Manipulate the changes
    inputFormTemplate.find(".var-type input[type='radio']").on("change", function(){
        const selected = inputFormTemplate.find("input[type='radio']:checked");
        let nominalArea = inputFormTemplate.find(".nominal-category");
        let ordinalArea = inputFormTemplate.find(".ordinal-category");

        if(selected.val() === "nominal") {
            if(ordinalArea.is(":visible")) ordinalArea.hide();
            nominalArea.show();
            handleCategoryBtn(nominalArea); // Manipulate Add category button
        } else if(selected.val() === "ordinal"){
            if(nominalArea.is(":visible")) nominalArea.hide();
            ordinalArea.show();
            handleCategoryBtn(ordinalArea);
        } else {
            nominalArea.hide();
            ordinalArea.hide();
        }
    });
}

const handleCategoryBtn = (categoryArea) => {
    /**
     * categoryArea is the nominal or ordinal area
     */
    categoryArea.find(".add-category").on('click', function() {
        let categories = getCurrentCategories(categoryArea);
        const newCategory = categoryArea.find("input[type=text]").val();
        categories.push(newCategory);

        const card = createCategoryCard(newCategory);
        card.find(".delete-category").on("click", function() {
            const cardComponent = $(this).parent();
            const deletedCategory = cardComponent.find('.category-name').text();
            categories = deleteCategory(categories, deletedCategory);
            cardComponent.remove();
        });
        categoryArea.find(".input-category").val('');
        categoryArea.find(".categories").append(card);
    })
}

// Helper Function
const addCategoricalForm = (inputFormTemplate) => {
    const nominalArea = createCategoricalVariableInputFormArea("Categories", "nominal-category")
    const ordinalArea = createCategoricalVariableInputFormArea("Orders", "ordinal-category")
    nominalArea.insertAfter(inputFormTemplate.find(".var-type"));
    ordinalArea.insertAfter(inputFormTemplate.find(".var-type"));
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