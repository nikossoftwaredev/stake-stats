@echo off
setlocal enabledelayedexpansion

cd .

set count=1
for %%f in (*.json) do (
    ren "%%f" !count!.json
    set /a count+=1
)

echo Renaming completed.
pause
