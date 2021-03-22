let report = {
    design: {
        within: false,
        between: false,
        analysis: "",
        dependent: [],
        independent: []
    },
    participants: {
        number: "",
        power_analysis: "",
        alpha: "",
        effectSize: ""
    },
    hypothesis: [],
    exclusion: ""
}

let dependent_variables = [];
let conditions = [];
let constructs = [];
let suggested = [];
let variableMap = {};
let hypothesisPair = {
    dv: '',
    iv: ''
};

let constructMap = {};
let constructMeasureMap = {};

let teaCode = {
    "variables": [],
    "study_design": {
        "study type": "experiment",
        "independent variables": [],
        "dependent variables":[]
    },
    "hypothesis": []
};


const updateDependentVariableContent = () => {
    let text = [];

    for(let i = 0; i < teaCode["study_design"]["dependent variables"].length; i++) {
        console.log(teaCode["study_design"]["dependent variables"][i])
        text.push(variableMap["dv_" + teaCode["study_design"]["dependent variables"][i]].type);
    }

    alert(text);

    dependentVariableTextAreaNode.val(text.toString());
}