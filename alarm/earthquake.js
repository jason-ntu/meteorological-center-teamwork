const { read } = require("@popperjs/core")

collection = "earthquake"

function listening() {
    var isUpdated = false
    while (true) {
        if (isUpdated) {
            newConent = read(collection)
            alarm = detect(newConent)
            write(collection, alarm)
        }
        newContents = false
    }
}

function read(collection) {

}

function detect(newConent) {
    // detect whether there is any earthquake
    // return true or false
}

function write(collection, alarm) {
    // write the alarm to the firstore "earthquake" collection
}

