# Nexss PROGRAMMER 2.0

Unpack different compression formats. Now support ZIP.

## Examples

```sh
# downloads to files to the currentfolder/downloads
nexss FS/File C:\\Users\\mapoart\\.nexss\\cache\\downloads\\tcl8610-src.zip C:\\Users\\mapoart\\.nexss\\cache\\downloads\\tk8610-src.zip C:\\Users\\mapoart\\.nexss\\cache\\downloads\\tk8610-src.zip --unpackPathCache



# if you add --cache it will unpack to the ${env:NEXSS_CACHE_PATH}/downloads
# 'downloads' is setup in the config.env
```

## Parameters

**--unpackPathCache** - will unpack to the cache folder (not the current folder)
**--unpackNocache** - will overwrite if already exists unpacked.
