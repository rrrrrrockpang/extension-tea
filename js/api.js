const updateTeaCodeVariables = () => {
    let variables = [];
    let dv_study_design = [];
    let iv_study_design = [];

    updateVariableLst(dependent_variables, variables, dv_study_design);
    updateVariableLst(conditions, variables, iv_study_design);

    teaCode["variables"] = variables;
    teaCode["study_design"]["independent variables"] = iv_study_design;
    teaCode["study_design"]["dependent variables"] = dv_study_design;
}

const updateTeaCodeHypothesis = (iv, dv, relationship) => {
    const condition_type = relationship['condition_type'];
    const two_side = relationship['two-side'];
    const categories = relationship['categories'];
    let hypothesis = [];

    if(categories.length !== 2) console.error("Has to compare 2 categories.");

    hypothesis.push([iv.name, dv.name]);

    if(condition_type === "nominal") {
        if(two_side) {
            hypothesis.push([`${iv.name}: ${categories[0]} != ${categories[1]}`]);
        } else {
            hypothesis.push([`${iv.name}: ${categories[0]} > ${categories[1]}`]);
        }
    } else {
        const positive = relationship['positive'];
        if(positive) {
            hypothesis.push([`${iv.name} ~ ${dv.name}`]);
        } else {
            hypothesis.push([`${iv.name} ~ -${dv.name}`]);
        }
    }
    teaCode["hypothesis"].push(hypothesis);
}

const stringifyTeaCode = () => {
    let finalString = "";
    const v = teaCode["variables"];
    const vString = `variables = ${JSON.stringify(v, null, '\t')}\n`
    finalString += vString + `tea.define_variables(variables)\n\n`;

    const s = teaCode["study_design"];
    const sString = `study = ${JSON.stringify(s, null, '\t')} \n`
    finalString += sString + `tea.define_study_design(study_design) \n\n`

    const hs = teaCode["hypothesis"];
    let hString = "";
    for(let i = 0; i < hs.length; i++) {
        const h = hs[i];
        hString += `tea.hypothesize(${JSON.stringify(h[0])}, ${JSON.stringify(h[1])}) \n`
    }

    finalString += hString + "\n";

    return finalString// let string = JSON.stringify(teaCode, null, '\t');
    // String.prototype.replaceAt = function(index, replacement) {
    //     return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    // }
    // string = string.replaceAt(string.indexOf(`"variables":`), `"variables"=`);
    // string = string.replaceAt(string.indexOf(`"study_design":`), `"study_design"=`);
    // string = string.replaceAt(string.indexOf(`"hypothesis":`), `"hypothesis"=`);
    return string;
}
// const teaAPI = (condition, dv, relationship) => {
//
//     console.log(get_variables(condition, dv));
//     console.log(get_study_design(condition, dv));
//     console.log(get_hypothesis(condition, dv, relationship));
//     const tea_code = {
//         variables: get_variables(condition, dv),
//         study_design: get_study_design(condition, dv),
//         hypothesis: get_hypothesis(condition, dv, relationship)
//     }
//
//     let string = JSON.stringify(tea_code, null, '\t');
//
//     String.prototype.replaceAt = function(index, replacement) {
//         return this.substr(0, index) + replacement + this.substr(index + replacement.length);
//     }
//     string = string.replaceAt(string.indexOf(`"variables":`), `"variables"=`);
//     string = string.replaceAt(string.indexOf(`"study_design":`), `"study_design"=`);
//     string = string.replaceAt(string.indexOf(`"hypothesis":`), `"hypothesis"=`);
//     console.log(string);
// }
//
// const get_variables = (condition, dv) => {
//     let variables = [];
//     let tea_condition = {
//         name: condition.name,
//         'data type': condition.type
//     };
//     if(condition.type === "nominal") {
//         tea_condition.categories = condition.categories;
//     }
//
//     // TODO: handle ordinal
//     let tea_dv = {
//         name: dv.name,
//         'data type': dv.type
//     }
//
//     if(dv.type === "ordinal") {
//         tea_dv.categories = dv.categories;
//     }
//
//     variables.push(tea_dv);
//     variables.push(tea_condition);
//     return variables;
// }
//
// const get_study_design = (condition, dv) => {
//     return {
//         'study type': 'experiment',
//         'independent variable': condition.name,
//         'dependent variable': dv.name
//     }
// }
//
// const get_hypothesis = (dv, iv, relationship) => {
//     const condition_type = relationship['condition_type'];
//     const two_side = relationship['two-side'];
//     const categories = relationship['categories'];
//     let hypothesis = [];
//
//     if(categories.length !== 2) console.error("Has to compare 2 categories.");
//
//     hypothesis.push([iv.name, dv.name]);
//
//     if(condition_type === "nominal") {
//         if(two_side) {
//             hypothesis.push([`${iv.name}: ${categories[0]} != ${categories[1]}`]);
//         } else {
//             hypothesis.push([`${iv.name}: ${categories[0]} > ${categories[1]}`]);
//         }
//     } else {
//         const positive = relationship['positive'];
//         if(positive) {
//             hypothesis.push([`${iv.name} ~ ${dv.name}`]);
//         } else {
//             hypothesis.push([`${iv.name} ~ -${dv.name}`]);
//         }
//     }
//     return hypothesis;
// }