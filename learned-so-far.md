# Best Practices

* When using *.json or any other file, do not under any circumstances name them the same name as the typescript configuration files. That one hell of a transpiler cannot see the difference in them.
* Electron-Builder: Requires files to be included in package.json
  * Use "extraFiles" to package them within the application.
  * Use "fs" to copy async or non async to given userData folder.