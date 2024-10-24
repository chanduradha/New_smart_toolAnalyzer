@echo off
REM Navigate to the project directory
cd "%~dp0"

REM Start the React development server on a specific port
echo Starting the React development server...
start npm start

REM Wait for a moment to ensure the server starts
timeout /t 2

REM Open the default web browser (Chrome) to the app URL
start chrome http://localhost:9678/

REM Keep the window open
pause
