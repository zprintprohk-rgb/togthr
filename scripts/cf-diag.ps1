# scripts/cf-diag.ps1 — CF API diag via .NET HttpClient (PS 5.1 safe)
# Bypasses Invoke-RestMethod quirks (IE dep, response encoding, URL quoting).
# Run: . .\scripts\cf-diag.ps1     (or . F:\CloudDreamerApp\togthr\scripts\cf-diag.ps1)

$ErrorActionPreference = 'Stop'

$tok = $env:CLOUDFLARE_API_TOKEN
if (-not $tok) { Write-Error 'CLOUDFLARE_API_TOKEN env var is not set'; return }

$base = 'https://api.cloudflare.com/client/v4'
$accountId = '32c174efaa22353f357c0fdff9d61b86'

function Invoke-CF {
  param([string]$Path)
  $uri = "$base$Path"
  $req = [System.Net.HttpWebRequest]::CreateHttp($uri)
  $req.Method = 'GET'
  $req.Headers['Authorization'] = "Bearer $tok"
  $req.Accept = 'application/json'
  $req.ContentType = 'application/json'
  try {
    $resp = $req.GetResponse()
    $stream = $resp.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $body = $reader.ReadToEnd()
    return [pscustomobject]@{ Status = [int]$resp.StatusCode; Body = $body }
  } catch {
    $resp = $_.Exception.Response
    if ($resp) {
      $stream = $resp.GetResponseStream()
      $reader = New-Object System.IO.StreamReader($stream)
      $body = $reader.ReadToEnd()
      return [pscustomobject]@{ Status = [int]$resp.StatusCode; Body = $body }
    }
    throw
  }
}

function Show {
  param([string]$Title, [pscustomobject]$R)
  Write-Host ''
  Write-Host "=== $Title ===" -ForegroundColor Cyan
  Write-Host "STATUS: $($R.Status)"
  $j = $R.Body | ConvertFrom-Json -ErrorAction SilentlyContinue
  if ($j) {
    $j | Format-List
  } else {
    $R.Body
  }
}

# 1. All zones visible to this token (no filter)
$r = Invoke-CF '/zones?per_page=50'
Show '1. All zones visible to token' $r

# 2. Filtered by name + account
$r = Invoke-CF '/zones?name=togthr.life&account.id=' + $accountId
Show '2. Zone lookup: togthr.life' $r
