# Electron print application

## Description
This project is based on a application that I developed to automate the process of print to a thermal
default printer on a totem without the confirmation of the user to finish the process

## Tecnology
I used Electron to create a native OS application to force the printer execution on the default printer and the electron-reload module to watch changes on the project files and reload the application on change

## Inital configuration
run `yarn`
On `main.js` file, change the comment commands to your desired project (if you want to give the power of decision to the user)
Here you choose if the application will be show to the user
```
 win = new BrowserWindow({
         width: 800, 
         height: 600
        //comment the sizes below, uncomment the show attribute
        //show: true
    })
```


Here you select if the user have to confirm the print operation
```
 win.webContents.print({
    // uncomment this attribute to print without confirmation of the user
    //silent: true,
    printBackground:false,
    deviceName: printer.name
},()=>{
    win.close()
})
```


On `index.html` file you change the page to your desired pattern to print
On `print.css` you change the style of the page to be print