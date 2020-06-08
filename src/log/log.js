function showAndSaveLog(log_text, hour) {
    const string = `[${hour}] ${log_text}`
    
    const filesystem = require('fs')
    filesystem.writeFile('src/log/logs.txt', string+'\n', {flag: 'a'}, function (err) {
        if(err) {
            throw err
        }
    })
    
    console.log(string)
}

module.exports = showAndSaveLog
