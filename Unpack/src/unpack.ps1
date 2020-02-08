# Nexss PROGRAMMER 2.0 - Package Download
$input | . "$($env:NEXSS_PACKAGES_PATH)/Nexss/Lib/NexssIn.ps1"
# This one will be removed after package run ends
$nxsParameters = @("unpackPathCache")

. "$($env:NEXSS_PACKAGES_PATH)/Nexss/Lib/EasyExtract.ps1"

if ($NexssStdout.unpackPathCache -and $NexssStdout.destinationFolder) { 
    nxsError("You have specified --unpackPathCache and --destinationFolder");
    nxsError("Remove one of them or use --nxsDelete feature to remove it.")
    break
}

if ($NexssStdout.unpackPathCache) {
    $unpackFolder = Join-Path $env:NEXSS_CACHE_PATH $env:DOWNLOAD_FOLDER
}
else {
    if ($NexssStdout.destinationFolder) {
        $unpackFolder = $NexssStdout.destinationFolder
    }
    else {
        $unpackFolder = $NexssStdout.cwd
    }
}
    
$NexssStdout | Add-Member -Force -NotePropertyMembers  @{unpackFolder = "$unpackFolder" }

if ( ! ( Test-Path $unpackFolder)) {    
    New-Item -ItemType "directory" -Path $unpackFolder | Out-Null
}

$total = $inFieldValue_1.Count
nxsInfo("Starting Unpacking $total files(s)..")
    
$extractedPaths = @()
foreach ($sourceFile in $inFieldValue_1) { 
    $destinationFolder = [io.path]::GetFileNameWithoutExtension($sourceFile.SubString($sourceFile.LastIndexOf('/') + 1))        
    $targetPath = Join-Path -Path $unpackFolder -ChildPath $destinationFolder  
    if ( ! ( Test-Path $targetPath) -and !$NexssStdout.unpackNocache) {     
        nxsInfo("Unpacking $sourceFile to the location $targetPath")  
            
        if (![System.IO.Path]::IsPathRooted($sourceFile)) {
            $sourceFile = Join-Path $NexssStdout.cwd $sourceFile
        }
            
        extract "$sourceFile" "$targetPath"
        # Expand-Archive -Force -LiteralPath $sourceFile -DestinationPath $targetPath     
    }
    else {            
        nxsOk("$targetPath already exists. Use --unpackNocache to overwrite")
    }
    $extractedPaths += $targetPath 
} 

$NexssStdout | Add-Member -Force -NotePropertyMembers  @{"$resultField_1" = $extractedPaths }

. "$($env:NEXSS_PACKAGES_PATH)/Nexss/Lib/NexssOut.ps1"
