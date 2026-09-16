$ErrorActionPreference = 'Stop'
Set-Location 'C:\Users\DELL\OneDrive\Documents\Assignment_Playwright'
& 'C:\Program Files\nodejs\npx.cmd' playwright test tests/orangeHrm.spec.js --reporter=line --workers=1
exit $LASTEXITCODE
