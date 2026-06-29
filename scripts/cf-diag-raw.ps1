# scripts/cf-diag-raw.ps1 — Dumps raw response body + status.
# Use this when cf-diag.ps1 output is ambiguous.

$tok = $env:CLOUDFLARE_API_TOKEN
if (-not $tok) { Write-Error 'token not set'; return }

$base = 'https://api.cloudflare.com/client/v4'
$accountId = '32c174efaa22353f357c0fdff9d61b86'

function Get-Raw {
  param([string]$Path, [string]$Label)
  $uri = "$base$Path"
  $req = [System.Net.HttpWebRequest]::CreateHttp($uri)
  $req.Method = 'GET'
  $req.Headers['Authorization'] = "Bearer $tok"
  $req.Accept = 'application/json'
  try {
    $resp = $req.GetResponse()
    $stream = $resp.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $body = $reader.ReadToEnd()
  } catch {
    $resp = $_.Exception.Response
    $stream = $resp.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $body = $reader.ReadToEnd()
  }
  Write-Host ''
  Write-Host "### $Label  (status=$([int]$resp.StatusCode))  url=$uri" -ForegroundColor Yellow
  Write-Host '--- raw body (first 2KB) ---'
  if ($body.Length -gt 2048) { $body.Substring(0, 2048) + '...<truncated>' } else { $body }
  Write-Host '---'
}

Get-Raw '/zones?per_page=50'                                                   '1. ALL zones visible to token (no filter)'
Get-Raw '/zones?name=togthr.life'                                               '2. Zone lookup by name (no account filter)'
Get-Raw "/zones?name=togthr.life&account.id=$accountId"                         '3. Zone lookup with account filter'
Get-Raw '/user'                                                                 '4. Token identity (sanity check)'
