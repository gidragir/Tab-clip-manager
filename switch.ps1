param(
    [Parameter(Mandatory=$true)]
    [string]$Key
)

$scripts = @{
  "frontend" = "cd ./apps/frontend/"
  "backend" = "cd ./apps/backend/"
  "prisma" = "cd ./packages/prisma/ && pnpm nvm"
}
if ($scripts.ContainsKey($Key)) {
    Invoke-Expression $scripts[$Key]
} else {
    Write-Host "No script found for key: $Key"
}
