[Setup]
AppId={{A1B2C3D4-E5F6-7890-ABCD-EF1234567890}
AppName=PokeDynamic
AppVersion=1.0.0
AppPublisher=PokeDynamic Team
AppPublisherURL=https://github.com/pokedynamic
AppSupportURL=https://github.com/pokedynamic
AppUpdatesURL=https://github.com/pokedynamic
DefaultDirName={autopf}\PokeDynamic
DefaultGroupName=PokeDynamic
AllowNoIcons=yes
LicenseFile=LICENSE.txt
InfoBeforeFile=README.txt
OutputDir=output
OutputBaseFilename=PokeDynamic-Setup-v1.0
SetupIconFile=PokeDynamic.ico
Compression=lzma2/ultra64
SolidCompression=yes
WizardStyle=modern
PrivilegesRequired=admin
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
UninstallDisplayIcon={app}\PokeDynamic.exe
UninstallDisplayName=PokeDynamic
VersionInfoVersion=1.0.0
VersionInfoCompany=PokeDynamic Team
VersionInfoDescription=PokeDynamic - Windows Dynamic Island with Gengar Theme
VersionInfoCopyright=Copyright (C) 2026 PokeDynamic Team
VersionInfoProductName=PokeDynamic
VersionInfoProductVersion=1.0.0

[Languages]
Name: "chinesesimplified"; MessagesFile: "compiler:Languages\ChineseSimplified.isl"
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: checked
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
Name: "startup"; Description: "开机自动启动"; GroupDescription: "启动选项"; Flags: checked

[Files]
Source: "bin\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "bin\Assets\*"; DestDir: "{app}\Assets"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "bin\Skins\*"; DestDir: "{app}\Skins"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "bin\runtimes\*"; DestDir: "{app}\runtimes"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\PokeDynamic"; Filename: "{app}\PokeDynamic.exe"
Name: "{group}\{cm:ProgramOnTheWeb,PokeDynamic}"; Filename: "https://github.com/pokedynamic"
Name: "{group}\{cm:UninstallProgram,PokeDynamic}"; Filename: "{uninstallexe}"
Name: "{autodesktop}\PokeDynamic"; Filename: "{app}\PokeDynamic.exe"; Tasks: desktopicon
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\PokeDynamic"; Filename: "{app}\PokeDynamic.exe"; Tasks: quicklaunchicon

[Registry]
Root: HKCU; Subkey: "Software\Microsoft\Windows\CurrentVersion\Run"; ValueType: string; ValueName: "PokeDynamic"; ValueData: "{app}\PokeDynamic.exe"; Tasks: startup; Flags: uninsdeletevalue

[Run]
Filename: "{app}\PokeDynamic.exe"; Description: "{cm:LaunchProgram,PokeDynamic}"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
Type: filesandordirs; Name: "{app}"

[Code]
function IsDotNetDetected(version: string; service: cardinal): boolean;
var
    key, versionKey: string;
    install, release, serviceCount, vers: cardinal;
    success: boolean;
begin
    versionKey := version;
    vers := Pos('v', version);
    if (vers > 0) then begin
        versionKey := Copy(version, 2, Length(version) - 1);
    end;
    
    key := 'SOFTWARE\Microsoft\NET Framework Setup\NDP\' + versionKey;
    success := RegQueryDWordValue(HKLM, key, 'Release', release);
    result := success;
end;

function InitializeSetup(): Boolean;
begin
    if not IsDotNetDetected('v4.5', 0) then
    begin
        MsgBox('此程序需要 .NET Framework 4.5 或更高版本。'#13#13
            '请先安装 .NET Framework，然后重新运行安装程序。'#13#13
            '您可以从 Microsoft 官网下载。', mbError, MB_OK);
        result := false;
    end
    else
        result := true;
end;
