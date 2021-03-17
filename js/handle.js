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
            ANALYSIS_ID: $(`#${ANALYSIS_ID}_preregistea .displayarea .hypothesis-dv`)
        }, dvs); // In relevant sections
    });

    ivListener.registerListener(function (conditions) {
        alert("Hi");
        $(".hypothesis-iv").empty();
        $(`#${CONDITION_ID}_preregistea .displayarea`).empty();
        populateCards({
            CONDITION_ID: $(`#${CONDITION_ID}_preregistea .displayarea`),
            ANALYSIS_ID: $(`#${ANALYSIS_ID}_preregistea .display .hypothesis-iv`)
        }, conditions);
    })
}



const populateCards = (object, variables) => {
    for(id in object) {
        let cards = [];
        const element = object[id];
        for(let i = 0; i < variables.length; i++) {
            const variable = variables[i];
            let card;
            if(id === ANALYSIS_ID) {
                card = addHypothesisCard(variable.name, "hypothesis_dv" + variable.name);
            } else {
                card = addCard(variable.name, id + "_" + variable.name);
            }
            cards.push(card);
        }
        element.append(cards);
    }
}