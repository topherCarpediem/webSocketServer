@echo off
title Setup WebSocket Server
echo Initiating install of node dependencies 
echo.
echo ===================================================
echo. 
echo Installing process manager 
call npm install pm2 -g
echo =================================================== 
echo.
echo Installing process manager windows startup 
call npm install pm2-windows-startup -g
echo =================================================== 
echo.
echo Adding process manager to windows startup 
call %HOMEPATH%\AppData\Roaming\npm\pm2-startup install
echo =================================================== 
echo.
echo Adding the server to the process manager 
call %HOMEPATH%\AppData\Roaming\npm\pm2 start app.js
echo =================================================== 
echo.
echo Saving server instance to process manager 
call %HOMEPATH%\AppData\Roaming\npm\pm2 save
echo =================================================== 

echo.
echo.
echo.
echo =================================================== 
echo Sucessfully setup the server
echo.
echo.

echo               _=====_                               _=====_
echo              / _____ \       REAL-TIME SERVER      / _____ \
echo            +.-'_____'-.---------------------------.-'_____'-.+
echo           /   ^|     ^|  '.           C01         .'  ^|  _  ^|   \
echo          / ___^| /^|\ ^|___ \       JOYSTICK      / ___^| /_\ ^|___ \
echo         / ^|      ^|      ^| ;  __           _   ; ^| _         _ ^| ;
echo         ^| ^| ^<---   ---^> ^| ^| ^|__^|         ^|_:^> ^| ^|^|_^|       (_)^| ^|
echo         ^| ^|___   ^|   ___^| ;                   ; ^|___       ___^| ;
echo         ^|\    ^| \^|/ ^|    /  _     ___      _   \    ^| (X) ^|    /^|
echo         ^| \   ^|_____^|  .','" "', ^|___^|  ,'" "', '.  ^|_____^|  .' ^|
echo         ^|  '-.______.-' /       \      /       \  '-._____.-'   ^|
echo         ^|               ^|       ^|------^|       ^|                ^|
echo         ^|              /\       /      \       /\               ^|
echo         ^|             /  '.___.'        '.___.'  \              ^|
echo         ^|            /                            \             ^|
echo          \          /                              \           /
echo           \________/                                \_________/
echo.
echo.
echo.
echo.
pause 










































