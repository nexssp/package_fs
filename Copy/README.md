# FS/Copy

Move files and folders

## Examples

```sh
nexss FS/Copy myfolder1 myfile1 --_destination='./currentFolder'
nexss FS/Copy --nxsIn=myfile,myfolder --_destination='./currentFolder,SecondDestination'
nexss FS/Copy myfile1 myfile2 --destination=x1,x2,x3 # error, destination can be one or the same as input files and/or folders
nexss FS/Copy README.md printers.ahk --_destination='folder1,folder2' # Folders will be created
nexss FS/Copy README.md printers.ahk --_destination='folder1,folder2' --_dry # This will not copy any files nor folders but will display source/destination pairs.
```

## To Implement

```sh
nexss FS/File myfolder myfile1.jpg --_destination=ftp://mapoart@192.168.1.55/%2Fetc/
nexss FS/File
```
