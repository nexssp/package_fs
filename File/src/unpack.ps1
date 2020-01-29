# Nexss PROGRAMMER 2.0.0 - PowerShell
# Default template for JSON Data
# STDIN
[Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8
[Console]::InputEncoding = [Text.UTF8Encoding]::UTF8

$NexssStdin = $input
$NexssStdout = $NexssStdin | ConvertFrom-Json

# $env:NEXSS_CACHE_PATH - is default nexss env folder
# $env:DOWNLOAD_FOLDER - is specified in the config.env of this module

if ($NexssStdout.unpack) {
    if ($NexssStdout.cache) {
        $unpackFolder = "$($env:NEXSS_CACHE_PATH)/$env:DOWNLOAD_FOLDER"
    }
    else {
        $unpackFolder = $NexssStdout.cwd
    }
    
    $NexssStdout | Add-Member -Force -NotePropertyMembers  @{unpackFolder = "$unpackFolder" }

    if ( ! ( Test-Path $unpackFolder)) {    
        New-Item -ItemType "directory" -Path $unpackFolder | Out-Null
    }
    
    $extractedPaths = @()
    foreach ($sourceFile in $NexssStdout.unpack) { 
        $destinationFolder = [io.path]::GetFileNameWithoutExtension($sourceFile.SubString($sourceFile.LastIndexOf('/') + 1))
        $targetPath = Join-Path -Path $unpackFolder -ChildPath $destinationFolder  
        Expand-Archive -Force -LiteralPath $sourceFile -DestinationPath $targetPath
        $extractedPaths += $targetPath
    } 

    $NexssStdout | Add-Member -Force -NotePropertyMembers  @{paths = $extractedPaths }
    $NexssStdout.PSObject.Properties.Remove("files")
}

# STDOUT
Write-Host 	(ConvertTo-Json -Compress $NexssStdout)
