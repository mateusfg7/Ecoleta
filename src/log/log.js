function showAndSaveLog(log_text, hour) {
    const string = `[${hour}] ${log_text}`
    
    const filesystem = require('fs')
    filesystem.writeFile('logs.txt', string, function (err) {
        if(err) {
            throw err
        }
    })
    
    console.log(string)
}

module.exports = showAndSaveLog
