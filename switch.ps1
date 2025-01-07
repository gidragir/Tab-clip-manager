param(
    [Parameter(Mandatory=$true)]
    [string]$Key
)

$scripts = @{
  "frontend" = "cd ./apps/frontend/"
  "backend" = "cd ./apps/backend/"
  "orm" = "cd ./packages/orm/"
}
if ($scripts.ContainsKey($Key)) {
    Invoke-Expression $scripts[$Key]
} else {
    Write-Host "No script found for key: $Key"
}
