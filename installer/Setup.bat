@echo off
chcp 65001 >nul
title PokeDynamic 安装程序

echo.
echo ========================================
echo   PokeDynamic v1.0 安装程序
echo ========================================
echo.
echo 正在启动安装向导...
echo.

:: 检查管理员权限
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo 需要管理员权限，正在请求提升权限...
    powershell -Command "Start-Process PowerShell -ArgumentList '-ExecutionPolicy Bypass -File \"%~dp0install.ps1\"' -Verb RunAs"
) else (
    powershell -ExecutionPolicy Bypass -File "%~dp0install.ps1"
)

exit
