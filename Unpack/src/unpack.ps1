# Nexss PROGRAMMER 2.0 - Package Download
$input | . "$($env:NEXSS_PACKAGES_PATH)/Nexss/Lib/NexssIn.ps1"
# This one will be removed after package run ends
$nxsParameters = @("unpackPathCache", "unpacksFolder")

. "$($env:NEXSS_PACKAGES_PATH)/Nexss/Lib/EasyExtract.ps1"

if ($NexssStdout.unpackPathCache -and $NexssStdout.unpacksFolder) { 
    nxsError("You have specified --unpackPathCache and --unpacksFolder");
    nxsError("Remove one of them or use --nxsDelete feature to remove it.")
    break
}

if ($NexssStdout.unpackPathCache) {
    $unpacksFolder = Join-Path $env:NEXSS_CACHE_PATH $env:DOWNLOAD_FOLDER
}
else {
    if ($NexssStdout.unpacksFolder) {
        $unpacksFolder = $NexssStdout.unpacksFolder
    }
    else {
        $unpacksFolder = $NexssStdout.cwd
    }
}
    
$NexssStdout | Add-Member -Force -NotePropertyMembers  @{unpacksFolder = "$unpacksFolder" }

if ( ! ( Test-Path $unpacksFolder)) {    
    New-Item -ItemType "directory" -Path $unpacksFolder | Out-Null
}

$total = $inFieldValue_1.Count
nxsInfo("Starting Unpacking $total files(s)..")
    
$extractedPaths = @()
foreach ($sourceFile in $inFieldValue_1) { 
    $destinationFolder = [io.path]::GetFileNameWithoutExtension($sourceFile.SubString($sourceFile.LastIndexOf('/') + 1))   
    if($destinationFolder.LastIndexOf(".tar") -gt 1){        
        $destinationFolder = [io.path]::GetFileNameWithoutExtension($destinationFolder)
    }
    $targetPath = Join-Path -Path $unpacksFolder -ChildPath $destinationFolder  
    if ( ! ( Test-Path $targetPath) -or $NexssStdout.unpackNocache) {     
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
