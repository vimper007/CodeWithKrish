@echo off
start wt -p "Command Prompt" ^
    new-tab cmd /k "cd /d C:\Code\Assignments\node-js-practical\microservices-nest\cosmos\customer-service && npm run start:dev" ^
    ; new-tab cmd /k "cd /d C:\Code\Assignments\node-js-practical\microservices-nest\cosmos\order-service && npm run start:dev" ^
    ; new-tab cmd /k "cd /d C:\Code\Assignments\node-js-practical\microservices-nest\cosmos\inventory-service && npm run start:dev" ^
    ; new-tab cmd /k "cd /d C:\Code\Assignments\node-js-practical\cosmos-fe && npm run dev"
