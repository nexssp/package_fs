# Nexss PROGRAMMER 2.0 - Package Unlock
#Requires -RunAsAdministrator
$nxsParameters = @("downloadPathCache", "downloadNocache", "downloadFast")
$input | . "$($env:NEXSS_PACKAGES_PATH)/Nexss/Lib/NexssIn.ps1"

# Add value to data

$NexssStdout | Add-Member -Force -NotePropertyMembers  @{test = "test" }

foreach ($fileOrFolder in $inFieldValue_1) { 
    # We need to have absolute path
    if (-Not [System.IO.Path]::IsPathRooted($fileOrFolder)) {
        $fileOrFolder = Join-Path $NexssStdout.cwd "$fileOrFolder" -Resolve 
    }
    nxsInfo($fileOrFolder)
    If ((Test-Path -Path $fileOrFolder) -eq $false) { 
        nxsError("File or directory does not exist.")
    } 
    Else {
        # if ($IsWindows) {
        $fileOrFolder = $fileOrFolder -replace "\\\\", "\"
        $fileOrFolder = $fileOrFolder -replace "/", "\"
        # }
        # else {
        #     $fileOrFolder = $fileOrFolder -replace "\\\\", "/"
        #     $fileOrFolder = $fileOrFolder -replace "\\", "/"
        # }
        
        if ($NexssStdout.stopProcess) {
            $LockingProcess = Get-process | Where-Object { $_.Path -like "$fileOrFolder*" } | Stop-Process -Force
            nxsInfo("LockingProcess(es): $LockingProcess") 
        }
        else {
            $LockingProcess = Get-process | Where-Object { $_.Path -like "$fileOrFolder*" } | Out-String
            nxsInfo("LockingProcess(es): $LockingProcess") 
            nxsWarn("To stop the processes use --stopProcess flag")
        }
        
    }
}

$NexssStdout.PSObject.Properties.Remove($resultField_1)

. "$($env:NEXSS_PACKAGES_PATH)/Nexss/Lib/NexssOut.ps1"
