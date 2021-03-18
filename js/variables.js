let dependent_variables = [];
let conditions = [];
let suggested = [];
let variableMap = {};
let hypothesisPair = {
    dv: '',
    iv: ''
};


const hypothesisTextAreaNode = $("[name='text1']");
const dependentVariableTextAreaNode = $("[name='text2']");
const independentVariableTextAreaNode = $("[name='text3']"); // conditions
const analysisTextAreaNode = $("[name='text4']");
const exclusionTextAreaNode = $("[name='text5']");
const sampleSizeTextAreaNode = $("[name='text6']");
const otherNodeTextArea = $("[name='text7']");

const TEXTAREA_NODES = [
    hypothesisTextAreaNode,
    dependentVariableTextAreaNode,
    independentVariableTextAreaNode,
    analysisTextAreaNode,
    exclusionTextAreaNode,
    sampleSizeTextAreaNode,
    otherNodeTextArea
];

const HYPOTHESIS_ID = "hypothesis";
const DV_ID = "dv";
const CONDITION_ID = "condition";
const ANALYSIS_ID = "analysis";
const OUTLIER_ID = "outlier";
const SAMPLESIZE_ID = "sample_size";
const OTHER_ID = "other";


const IDS = [
    HYPOTHESIS_ID,
    DV_ID,
    CONDITION_ID,
    ANALYSIS_ID,
    OUTLIER_ID,
    SAMPLESIZE_ID,
    OTHER_ID
]

analysisConditionClicked = false;
analysisCondition = null;
analysisConditionElement = null;

analysisDVClicked = false;
analysisDV = null;
analysisDVElement = null;

class Variable {
    constructor(name, type='', categories=[]) {
        this.name = name;
        this.type = type;
        this.categories = categories;
        this.isEditing = false;
    }

    set(name, type, categories=[]) {
        this.name = name;
        this.type = type;
        this.categories = categories;
    }

    isEditing() {
        this.isEditing = true;
    }
}