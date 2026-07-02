// Verify dark class sticks across Edge UA context
const { spawn } = require('child_process');
const py = process.env.USERPROFILE + '\\AppData\\Local\\Programs\\Python\\Python312\\python.exe';
const script = [
  'import asyncio',
  'from playwright.async_api import async_playwright',
  'async def main():',
  '    async with async_playwright() as p:',
  '        browser = await p.chromium.launch(headless=True)',
  '        ctx = await browser.new_context(',
  '          viewport={"width": 1280, "height": 900},',
  '          user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0"',
  '        )',
  '        page = await ctx.new_page()',
  '        await page.goto("https://www.togthr.life/en", wait_until="networkidle")',
  '        await page.wait_for_timeout(3000)',
  '        html_class = await page.evaluate("document.documentElement.className")',
  '        body_bg = await page.evaluate("getComputedStyle(document.body).backgroundColor")',
  '        body_schemecolor = await page.evaluate("getComputedStyle(document.documentElement).colorScheme")',
  '        print("html.className:", html_class)',
  '        print("body bg:", body_bg)',
  '        print("html colorScheme:", body_schemecolor)',
  '        await page.screenshot(path="C:/Users/Administrator/AppData/Local/Temp/dark-final.png")',
  '        print("screenshot saved")',
  '        await browser.close()',
  'asyncio.run(main())',
].join('\n');
const child = spawn(py, ['-c', script], { stdio: 'inherit' });
child.on('close', code => process.exit(code || 0));
