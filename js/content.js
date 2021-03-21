$(document).ready(function() {

    handleVariableListeners();

    // add plugin DOM element
    for(let i = 0; i < TEXTAREA_NODES.length; i++) {
        let id = IDS[i];
        let textarea = TEXTAREA_NODES[i];
        let row = textarea.parent().parent().parent();
        // Add the plugin section
        row.prepend(addPreregistea(id, row));
    }

    // Deal with power analysis
    // sampleSizeTextAreaNode.parent().append(addPowerAnalysisBtn());


    // Add floating button
    addTeaModal($("body"));
    $(".center1").append(addTeaFloatingBtn());
    $(".center1").append(addMethodFloatingBtn());
});