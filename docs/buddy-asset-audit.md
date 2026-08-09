# Togthr Buddy 资产审计报告（Module 0.5 前置）

> 日期：2026-08-09 | 工具：PIL 像素级扫描 | 目录：public/pets/

## 一、核心结论

| 项 | 结果 |
|---|---|
| 统一尺寸 | ✅ 74 张 1024×1024（RGBA 透明底，无白底问题） |
| **异类尺寸** | ❌ `anim-greet-1.png`（1584×672）+ `anim-greet-2.png`（1408×768） |
| 白底检测 | ✅ 全部 RGBA 有 alpha 通道，四角无白色残留 |
| 风格异类 | ⚠️ greet 系列（见下） |

## 二、状态清单（关键资产）

| 资产 | 尺寸 | 状态 | 说明 |
|---|---|---|---|
| anim-idle-1.png | 1024² | ✅ OK-基准 | 主形态 DNA |
| anim-idle-2.png | 1024² | ✅ OK-基准(闭眼) | |
| anim-blink.png | 1024² | ✅ OK | |
| anim-breath.png | 1024² | ✅ OK | |
| anim-success-1.png | 1024² | ✅ OK | |
| anim-success-2.png | 1024² | ✅ OK | |
| anim-thinking-1.png | 1024² | ✅ OK(sprite 表) | 勿直接引用 |
| anim-thinking-2.png | 1024² | ✅ OK | 沉思帧，miss 过渡可用 |
| anim-greet-1.png | **1584×672** | ❌ 异类尺寸 | 疑似 3D 渲染 |
| anim-greet-2.png | **1408×768** | ❌ 异类尺寸 | 疑似 3D 渲染 |
| anim-greet-3.png | 1024² | ⚠️ 待人工标注 | 尺寸正常但风格待验 |
| anim-greet-4.png | 1024² | ⚠️ 待人工标注 | 尺寸正常但风格待验 |
| astronaut.png / chef.png | 1024² | ⏸ 后期皮肤库 | 不进入 MVP |
| 其余 60 张 | 1024² | ✅ OK | holidays/scenes/stickers |

## 三、过渡期帧映射（buddy-asset-map.ts 建议）

```
idle:    ['anim-idle-1', 'anim-idle-2']
breath:  ['anim-breath', 'anim-idle-2']
blink:   ['anim-blink']
greet:   ['anim-success-1', 'anim-success-2', 'anim-idle-1']   ← 过渡：开心帧≈挥手
success: ['anim-success-1', 'anim-success-2']
miss:    ['anim-thinking-2']                                    ← 过渡：沉思帧+气泡
sleep:   ['anim-idle-2']
sign:    ['anim-idle-1']                                        ← 牌子 Canvas 绘制
```

**❌ 禁止引用**：anim-greet-1/2/3/4（异类/待验）、astronaut、chef

## 四、情感缺口补偿

miss 状态配情绪气泡 speech：`"...i missed you. it's okay. i'm here."`——气泡承载情感，帧只需中性姿态。符合 quiet companion 调性。

## 五、greet 真帧路线（等唐总拍板）

- 选项① 脚本改像素：Node+sharp 读 idle-1 → 程序化改右臂 → 3 帧（确定性高，但"右臂像素定位"有风险）
- 选项② CSS 程序化兜底：idle-1 + translateY bounce + ::before 伪元素手臂（100% 风格一致，零资产风险）
- **禁止**：AI 图像生成（Kimi/MJ/SD）
