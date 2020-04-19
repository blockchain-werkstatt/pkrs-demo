"use strict";

module.exports = {

    /*
    for the success callback result contains success as a true
    */

    successCallback: (data, callback) => {
        callback({
            success: true,
            data: data
        });
    },

    /*
    for the failed callback result contains success as a false
    */

    errorCallback: (data, callback) => {
        callback({
            success: false,
            data: data
        });
    }
};
//# sourceMappingURL=callback.js.map