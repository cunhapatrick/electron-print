// In the main process.
const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron')
let win = null
const fs = require('fs')
const path = require('path')

require('electron-reload')(__dirname,{
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

app.on('ready', () => {
    // Create window
    win = new BrowserWindow({
         width: 800, 
         height: 600
        //comment the sizes below, uncomment the show attribute
        //show: true
    })
    
    win.loadFile('index.html')
    const eventinfo = JSON.parse(fs.readFileSync('data.json','utf8'))

    win.webContents.on('did-finish-load', () => {
        win.webContents.send('info',eventinfo)
        let printersInfo = win.webContents.getPrinters();
        let printer = printersInfo.filter(printer => printer.isDefault === true)[0]
        
        ipcMain.on('finish',(event,res)=>{
            win.webContents.print({
                // uncomment this attribute to print without confirmation of the user
                //silent: true,
                printBackground:false,
                deviceName: printer.name
            },()=>{
                win.close()
            })
        })
    })
})