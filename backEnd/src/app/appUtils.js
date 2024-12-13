const utils = {};


utils.printObject = function (obj, descricao = "") {
    console.log(descricao, '\n\n', JSON.stringify(obj, null, 2));
}

module.exports = utils;