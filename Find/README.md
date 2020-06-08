# Nexss PROGRAMMER 2.0

find files, with content search.

## To implement

- Sorting based on ripgrep eg: –sort path|modified|accessed|created

## Parameters

- nexss FS/Find pattern1 pattern2 paternX folder --param1 --param2

- **pathMatch** (can be multiple) - will find filenames/path by regexp eg `--pathMatch=_.txt` `--pathMatch=_.rc`
  You can use `!` to negate: eg --inFiles=!\*2020.txt
- **inTypes** (can be multiple) - will search by types (if type is wrong will display list of available types - are the same as -- ripgrep --type-list)
- **inZip** - search in compressed files
- **caseSensitive** - enable case sensitive search
- **sort**,**sortr** - ascending,descending sorting. possible values: accessed, created, modified, none, path

## Examples

```sh
nexss FS/Find invoice ./invoices # finds files which contains word 'invoice' in the content (second or last parameter is where to look)
nexss FS/Find invoice faktura ./invoices # here will find faktura and invoice in the file content in the folder 'invoices'
nexss FS/Find --pathMatch=*2020.txt # find only files without checking the content
nexss FS/Find faktura --pathMatch=*2020.txt --inTypes=txt --caseSensitive # find in txt files, using caseSensitive, path match *2020.txts
nexss FS/Find faktura --inTypes=txt --pathMatch=*something* --pathMatch=!*8* # will match path something, but not with number 8
```

## More info

This package uses great ripgrep !
