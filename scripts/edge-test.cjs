// 用 playwright 模拟 Edge InPrivate 模式，拉 HTML 验证
const { spawn } = require('child_process');
const py = process.env.USERPROFILE + '\\AppData\\Local\\Programs\\Python\\Python312\\python.exe';
const script = [
  'import asyncio',
  'from playwright.async_api import async_playwright',
  'async def main():',
  '    async with async_playwright() as p:',
  '        browser = await p.chromium.launch(headless=True, channel="msedge", args=["--incognito"])',
  '        if not browser:',
  '            print("no edge, falling back to chromium")',
  '            browser = await p.chromium.launch(headless=True)',
  '        ctx = await browser.new_context(viewport={"width": 1280, "height": 900}, user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0")',
  '        page = await ctx.new_page()',
  '        await page.goto("https://www.togthr.life/en", wait_until="networkidle")',
  '        await page.wait_for_timeout(3000)',
  '        html_class = await page.evaluate(\'document.documentElement.className\')',
  '        body_bg = await page.evaluate(\'getComputedStyle(document.body).backgroundColor\')',
  '        print(f"html class after 3s wait: {html_class!r}")',
  '        print(f"body bg: {body_bg}")',
  '        # Watch for className changes',
  '        await page.add_init_script("window.__changes=[]; new MutationObserver(ms=>{for(const m of ms){if(m.attributeName===chr(34)classchr(34))window.__changes.push({t:performance.now(),c:document.documentElement.className})}}).observe(document.documentElement,{attributes:true,attributeFilter:[chr(34)classchr(34)]});")',
  '        await page.reload()',
  '        await page.wait_for_timeout(2000)',
  '        changes = await page.evaluate("window.__changes||[]")',
  '        print(f"className mutations:")',
  '        for c in changes:',
  '            print(f"  {c}")',
  '        await browser.close()',
  'asyncio.run(main())',
].join('\n');
const child = spawn(py, ['-c', script], { stdio: 'inherit' });
child.on('close', code => process.exit(code || 0));
