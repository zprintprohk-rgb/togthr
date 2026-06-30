// Capture final state of 3 pages with new pet PNGs
const { spawn } = require('child_process');
const path = require('path');

const py = process.env.USERPROFILE + '\\AppData\\Local\\Programs\\Python\\Python312\\python.exe';

const script = [
  'import asyncio',
  'from playwright.async_api import async_playwright',
  'import os',
  'async def main():',
  '    async with async_playwright() as p:',
  '        browser = await p.chromium.launch(headless=True)',
  '        ctx = await browser.new_context(viewport={"width": 1280, "height": 900})',
  '        page = await ctx.new_page()',
  '        for url, label, out in [',
  '            ("https://www.togthr.life/en/store", "STORE", "store-final.png"),',
  '            ("https://www.togthr.life/en/pet", "PET", "pet-final.png"),',
  '            ("https://www.togthr.life/en", "HOME", "home-final.png"),',
  '        ]:',
  '            await page.goto(url, wait_until="networkidle")',
  '            await page.wait_for_timeout(2500)',
  '            out_path = "C:/Users/Administrator/AppData/Local/Temp/" + out',
  '            await page.screenshot(path=out_path)',
  '            print(f"{label} saved: {out_path} size={os.path.getsize(out_path)}")',
  '        await browser.close()',
  'asyncio.run(main())',
].join('\n');

const child = spawn(py, ['-c', script], { stdio: 'inherit' });
child.on('close', code => process.exit(code || 0));
