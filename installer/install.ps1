# PokeDynamic 安装脚本 v1.0
# 需要以管理员权限运行

param(
    [string]$InstallPath = "",
    [switch]$CreateDesktopShortcut = $true,
    [switch]$CreateStartupShortcut = $true,
    [switch]$Silent = $false
)

$ErrorActionPreference = "Stop"

$AppName = "PokeDynamic"
$AppVersion = "1.0.0"
$DefaultInstallPath = "$env:LOCALAPPDATA\$AppName"

if ([string]::IsNullOrEmpty($InstallPath)) {
    $InstallPath = $DefaultInstallPath
}

function Write-Status {
    param([string]$Message)
    if (-not $Silent) {
        Write-Host $Message -ForegroundColor Cyan
    }
}

function Write-Success {
    param([string]$Message)
    if (-not $Silent) {
        Write-Host $Message -ForegroundColor Green
    }
}

function Write-Error {
    param([string]$Message)
    Write-Host $Message -ForegroundColor Red
}

try {
    # 检查管理员权限
    $isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
    
    if (-not $isAdmin) {
        Write-Error "请以管理员权限运行此安装程序！"
        Write-Host "右键点击此脚本，选择'以管理员身份运行'" -ForegroundColor Yellow
        if (-not $Silent) {
            Read-Host "按 Enter 键退出"
        }
        exit 1
    }

    Write-Status "`n========================================"
    Write-Status "  PokeDynamic v$AppVersion 安装程序"
    Write-Status "========================================`n"

    # 显示安装选项
    if (-not $Silent) {
        Write-Host "安装路径: $InstallPath" -ForegroundColor White
        Write-Host "创建桌面快捷方式: $CreateDesktopShortcut" -ForegroundColor White
        Write-Host "开机自动启动: $CreateStartupShortcut`n" -ForegroundColor White
        
        $confirm = Read-Host "确认安装? (Y/N)"
        if ($confirm -ne "Y" -and $confirm -ne "y") {
            Write-Host "安装已取消" -ForegroundColor Yellow
            exit 0
        }
    }

    # 创建安装目录
    Write-Status "正在创建安装目录..."
    if (Test-Path $InstallPath) {
        Write-Status "检测到已安装版本，正在更新..."
        Remove-Item -Path $InstallPath -Recurse -Force
    }
    New-Item -ItemType Directory -Path $InstallPath -Force | Out-Null

    # 复制文件
    Write-Status "正在复制文件..."
    $scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
    $binPath = Join-Path $scriptPath "bin"
    
    if (Test-Path $binPath) {
        Copy-Item -Path "$binPath\*" -Destination $InstallPath -Recurse -Force
    } else {
        # 如果没有 bin 目录，尝试从当前目录复制
        $filesToCopy = @(
            "PokeDynamic.exe",
            "PokeDynamic.dll",
            "PokeDynamic.runtimeconfig.json",
            "PokeDynamic.ico",
            "Assets",
            "Skins",
            "runtimes",
            "*.dll"
        )
        
        foreach ($file in $filesToCopy) {
            $sourcePath = Join-Path $scriptPath $file
            if (Test-Path $sourcePath) {
                Copy-Item -Path $sourcePath -Destination $InstallPath -Recurse -Force
            }
        }
    }

    # 创建桌面快捷方式
    if ($CreateDesktopShortcut) {
        Write-Status "正在创建桌面快捷方式..."
        $WshShell = New-Object -ComObject WScript.Shell
        $Shortcut = $WshShell.CreateShortcut("$env:USERPROFILE\Desktop\PokeDynamic.lnk")
        $Shortcut.TargetPath = "$InstallPath\PokeDynamic.exe"
        $Shortcut.WorkingDirectory = $InstallPath
        $Shortcut.IconLocation = "$InstallPath\PokeDynamic.ico"
        $Shortcut.Description = "PokeDynamic - Windows 灵动岛"
        $Shortcut.Save()
        [System.Runtime.Interopservices.Marshal]::ReleaseComObject($WshShell) | Out-Null
    }

    # 创建开始菜单快捷方式
    Write-Status "正在创建开始菜单快捷方式..."
    $StartMenuPath = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs"
    $WshShell = New-Object -ComObject WScript.Shell
    $Shortcut = $WshShell.CreateShortcut("$StartMenuPath\PokeDynamic.lnk")
    $Shortcut.TargetPath = "$InstallPath\PokeDynamic.exe"
    $Shortcut.WorkingDirectory = $InstallPath
    $Shortcut.IconLocation = "$InstallPath\PokeDynamic.ico"
    $Shortcut.Description = "PokeDynamic - Windows 灵动岛"
    $Shortcut.Save()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($WshShell) | Out-Null

    # 设置开机自启
    if ($CreateStartupShortcut) {
        Write-Status "正在设置开机自启..."
        $StartupPath = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup"
        $WshShell = New-Object -ComObject WScript.Shell
        $Shortcut = $WshShell.CreateShortcut("$StartupPath\PokeDynamic.lnk")
        $Shortcut.TargetPath = "$InstallPath\PokeDynamic.exe"
        $Shortcut.WorkingDirectory = $InstallPath
        $Shortcut.IconLocation = "$InstallPath\PokeDynamic.ico"
        $Shortcut.Description = "PokeDynamic - Windows 灵动岛"
        $Shortcut.Save()
        [System.Runtime.Interopservices.Marshal]::ReleaseComObject($WshShell) | Out-Null
    }

    # 注册卸载信息
    Write-Status "正在注册卸载信息..."
    $UninstallKey = "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\$AppName"
    New-Item -Path $UninstallKey -Force | Out-Null
    Set-ItemProperty -Path $UninstallKey -Name "DisplayName" -Value "$AppName v$AppVersion"
    Set-ItemProperty -Path $UninstallKey -Name "DisplayVersion" -Value $AppVersion
    Set-ItemProperty -Path $UninstallKey -Name "Publisher" -Value "PokeDynamic Team"
    Set-ItemProperty -Path $UninstallKey -Name "InstallLocation" -Value $InstallPath
    Set-ItemProperty -Path $UninstallKey -Name "DisplayIcon" -Value "$InstallPath\PokeDynamic.ico"
    Set-ItemProperty -Path $UninstallKey -Name "UninstallString" -Value "powershell -ExecutionPolicy Bypass -File `"$InstallPath\uninstall.ps1`""
    Set-ItemProperty -Path $UninstallKey -Name "NoModify" -Value 1
    Set-ItemProperty -Path $UninstallKey -Name "NoRepair" -Value 1

    # 创建卸载脚本
    Write-Status "正在创建卸载脚本..."
    $UninstallScript = @'
# PokeDynamic 卸载脚本
param([switch]$Silent = $false)

$AppName = "PokeDynamic"
$InstallPath = "$env:LOCALAPPDATA\$AppName"

if (-not $Silent) {
    $confirm = Read-Host "确定要卸载 PokeDynamic? (Y/N)"
    if ($confirm -ne "Y" -and $confirm -ne "y") {
        Write-Host "卸载已取消" -ForegroundColor Yellow
        exit 0
    }
}

Write-Host "正在卸载 PokeDynamic..." -ForegroundColor Cyan

# 关闭正在运行的程序
Get-Process -Name "PokeDynamic" -ErrorAction SilentlyContinue | Stop-Process -Force

# 删除快捷方式
Remove-Item "$env:USERPROFILE\Desktop\PokeDynamic.lnk" -Force -ErrorAction SilentlyContinue
Remove-Item "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\PokeDynamic.lnk" -Force -ErrorAction SilentlyContinue
Remove-Item "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup\PokeDynamic.lnk" -Force -ErrorAction SilentlyContinue

# 删除安装目录
if (Test-Path $InstallPath) {
    Remove-Item -Path $InstallPath -Recurse -Force
}

# 删除注册表项
Remove-Item "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\$AppName" -Force -ErrorAction SilentlyContinue

Write-Host "PokeDynamic 已成功卸载!" -ForegroundColor Green
if (-not $Silent) {
    Read-Host "按 Enter 键退出"
}
'@
    Set-Content -Path "$InstallPath\uninstall.ps1" -Value $UninstallScript -Encoding UTF8

    Write-Success "`n========================================"
    Write-Success "  安装完成!"
    Write-Success "========================================`n"
    Write-Host "安装路径: $InstallPath" -ForegroundColor White
    Write-Host "桌面快捷方式: $(if($CreateDesktopShortcut){'已创建'}else{'未创建'})" -ForegroundColor White
    Write-Host "开机自启: $(if($CreateStartupShortcut){'已启用'}else{'未启用'})" -ForegroundColor White
    Write-Host ""
    Write-Host "运行 PokeDynamic:" -ForegroundColor Yellow
    Write-Host "  - 双击桌面快捷方式" -ForegroundColor White
    Write-Host "  - 或在开始菜单中找到 PokeDynamic" -ForegroundColor White
    Write-Host ""
    Write-Host "卸载:" -ForegroundColor Yellow
    Write-Host "  - 控制面板 > 程序 > 卸载程序" -ForegroundColor White
    Write-Host "  - 或运行 $InstallPath\uninstall.ps1" -ForegroundColor White

    # 询问是否立即启动
    if (-not $Silent) {
        $launch = Read-Host "`n是否立即启动 PokeDynamic? (Y/N)"
        if ($launch -eq "Y" -or $launch -eq "y") {
            Start-Process "$InstallPath\PokeDynamic.exe"
        }
    }

} catch {
    Write-Error "安装失败: $_"
    if (-not $Silent) {
        Read-Host "按 Enter 键退出"
    }
    exit 1
}
