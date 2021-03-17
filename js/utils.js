/**
 * Take in a category list read in the DOM and delete the one specified
 * @param categories
 */
const deleteCategory = (categories, deletedCategory) => {
    return categories.filter(function(value, index, arr){
        return value !== category;
    });
}