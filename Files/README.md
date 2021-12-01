# Nexss PROGRAMMER 2.x

Gets only file names (no dirs) from the specified directory.

## Examples

```sh
nexss FS/Files . --_types=".js,.txt" # current folder and file types .js and .txt
nexss FS/Files c:/Users/mapoart/.nexss/cache # will return only
nexss FS/Files --FSDirPath=c:/Users/mapoart/.nexss/cache # will return only

nexss FS/Files --FSDirPath=c:/Users/mapoart/.nexss/cache  # will return only
```

## TODO

- [ ] Add Recursive (so will get also files from subfolders)
- [ ] Possibility to add multiple folders.
