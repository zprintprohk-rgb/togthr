import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0B0B1A',
};

export const metadata: Metadata = {
  title: "Togthr",
  description: "Your private space, built for two",
};

const FORCE_DARK_SCRIPT = `(function(){try{var d=document.documentElement;d.className=(d.className||'')+' dark';var s=d.style;s.colorScheme='dark';s.backgroundColor='#0B0B1A';d.setAttribute('data-theme','dark');var b=document.body;if(b){b.setAttribute('bgcolor','#0B0B1A');b.setAttribute('text','#F4F4F5');b.setAttribute('link','#F472B6');b.setAttribute('vlink','#A78BFA');}}catch(e){var st=document.createElement('style');st.textContent='html,body{background:#0B0B1A!important;color-scheme:dark;}';if(document.head){document.head.appendChild(st);}else{document.addEventListener('DOMContentLoaded',function(){document.head.appendChild(st);});}}})();`;

/* ── EXT_GUARD_SCRIPT — 浏览器扩展白底注入自适应防御 ─────────────────────
 * 背景：部分浏览器扩展（翻译/护眼/阅读模式类）会向页面容器注入白色底层或
 * 浅色样式表，把强制深色的页面衬成白底、浅色文字不可读。站点无法阻止扩展
 * 运行，但可以对其"结果"反制：
 *   A. DOM 注入型 — MutationObserver 发现"新增的近白色大覆盖层"→ display:none
 *      （只处理非我方节点，React 不管理它们，不会引发 hydration 冲突）
 *   B. 样式注入型 — 轮询 html/body/main/hero 根容器的计算背景，一旦变浅
 *      立即用 inline !important 夺回（同级优先级 inline 最高）
 * 白名单：Google 翻译 <font>、沉浸式翻译等已知类名 — 不误伤正常翻译。
 * 防御命中时置 <html data-ext-guard="hit"> 并上报 ext_guard_hit（PostHog）。
 * ──────────────────────────────────────────────────────────────────────── */
const EXT_GUARD_SCRIPT = `(function(){
'use strict';
var DARK='#0B0B1A';
var HERO_GRAD='linear-gradient(to bottom, #0B0B1A, #110A20, #06030F)';
var hits=0, scheduled=false, pending=[];
function lum(s){var m=s&&s.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/);return m?(+m[1]*299 + +m[2]*587 + +m[3]*114)/1000:null;}
function mark(kind,info){
  hits++;
  try{document.documentElement.setAttribute('data-ext-guard','hit');}catch(e){}
  try{if(window.posthog&&window.posthog.capture)window.posthog.capture('ext_guard_hit',{kind:kind,info:String(info||'').slice(0,60)});}catch(e){}
}
function judge(el){
  try{
    if(!(el instanceof HTMLElement))return;
    var t=el.tagName;
    if(t==='SCRIPT'||t==='STYLE'||t==='FONT'||t==='LINK'||t==='META'||t==='NOSCRIPT')return;
    if(el.closest('font'))return;
    var cls=String(el.className&&el.className.baseVal===undefined?el.className:'');
    if(/immersive-translate|immersive_translate|translated-|skiptranslate|notranslate/.test(cls))return;
    var L=lum(getComputedStyle(el).backgroundColor);
    if(L===null||L<235)return;
    var r=el.getBoundingClientRect();
    if(r.width<100||r.height<100)return;
    var coverVp=r.width>=innerWidth*0.9&&r.height>=innerHeight*0.9;
    var p=el.parentElement?el.parentElement.getBoundingClientRect():null;
    var coverParent=p&&p.width>200&&p.height>200&&r.width>=p.width*0.8&&r.height>=p.height*0.8;
    if(!coverVp&&!coverParent)return;
    el.style.setProperty('display','none','important');
    mark('dom',t+'.'+cls.slice(0,40));
  }catch(e){}
}
function flush(){scheduled=false;var q=pending;pending=[];for(var i=0;i<q.length;i++)judge(q[i]);}
function enforce(){
  try{
    var sels=['html','body','main'];
    for(var i=0;i<sels.length;i++){
      var el=document.querySelector(sels[i]);
      if(!el)continue;
      var L=lum(getComputedStyle(el).backgroundColor);
      if(L!==null&&L>200){el.style.setProperty('background-color',DARK,'important');el.style.setProperty('background-image','none','important');if(!hits)mark('css',sels[i]);}
    }
    var hero=document.querySelector('main > div');
    if(hero){
      var cs=getComputedStyle(hero);
      var L2=lum(cs.backgroundColor);
      if(cs.backgroundImage==='none'||L2===null||L2>200){
        hero.style.setProperty('background-image',HERO_GRAD,'important');
        if(L2!==null&&L2>200)hero.style.setProperty('background-color',DARK,'important');
        if(!hits)mark('css','hero');
      }
    }
  }catch(e){}
}
function start(){
  try{
    new MutationObserver(function(muts){
      for(var i=0;i<muts.length;i++){
        var m=muts[i];
        if(m.addedNodes)for(var j=0;j<m.addedNodes.length;j++)pending.push(m.addedNodes[j]);
        if(m.type==='attributes'&&m.target)pending.push(m.target);
      }
      if(!scheduled){scheduled=true;setTimeout(flush,120);}
    }).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['style','class']});
    var n=0;
    var iv=setInterval(function(){enforce();if(++n>=15){clearInterval(iv);setInterval(enforce,2000);}},400);
  }catch(e){}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* No-JS fallback: hard-code dark colors inline so even if FORCE_DARK_SCRIPT
            is blocked by CSP / Edge UA override, html/body still render dark. */}
        <style dangerouslySetInnerHTML={{ __html: `
          html, body { background-color: #0B0B1A !important; color: #F4F4F5 !important; color-scheme: dark !important; }
          html { background: #0B0B1A !important; }
          body { background: #0B0B1A !important; min-height: 100vh; margin: 0; }
        `}} />
        <script dangerouslySetInnerHTML={{ __html: FORCE_DARK_SCRIPT }} />
        {/* 扩展白底注入自适应防御：对扩展造成的白色覆盖层/样式篡改即时反制 */}
        <script dangerouslySetInnerHTML={{ __html: EXT_GUARD_SCRIPT }} />
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#0B0B1A" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col text-zinc-100`}
        style={{ backgroundColor: '#0B0B1A', minHeight: '100vh', margin: 0 }}
      >{children}</body>
    </html>
  );
}