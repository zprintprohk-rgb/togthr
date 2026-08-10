//  TogthrBuddyWidget.swift — iOS 锁屏 Widget（WidgetKit）
//  S5 LAUNCH · W8-W10 · 预算 $0（Apple Developer $99/年已计入）
//
// 功能：锁屏显示宠物呼吸/眨眼动画（AccessoryInline + AccessoryRectangular）
// 数据：读取 App Group 共享的宠物状态（最后喂食时间 → 呼吸速率/表情）
// 演示：Xcode 14+ 打开本文件所在工程，Target 选 Widget Extension，选择任一模拟器运行

import WidgetKit
import SwiftUI

// MARK: - 时间线条目（宠物状态快照）
struct BuddyEntry: TimelineEntry {
    let date: Date
    let petName: String
    let stage: Int          // 0=egg 1=baby 2=teen 3=adult 4=mature
    let isSleeping: Bool
    let missMode: Bool      // >48h 未喂食
    let theme: String       // lavender/mint/sakura/...
}

// MARK: - 提供者（读取 App Group 共享状态）
struct BuddyProvider: TimelineProvider {
    func placeholder(in context: Context) -> BuddyEntry {
        BuddyEntry(date: Date(), petName: "Buddy", stage: 1, isSleeping: false, missMode: false, theme: "lavender")
    }

    func getSnapshot(in context: Context, completion: @escaping (BuddyEntry) -> Void) {
        completion(currentEntry())
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<BuddyEntry>) -> Void) {
        let entry = currentEntry()
        // 每 15 分钟刷新一次（呼吸动画在锁屏由 SwiftUI 动画驱动）
        let next = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
        completion(Timeline(entries: [entry], policy: .after(next)))
    }

    private func currentEntry() -> BuddyEntry {
        // 从 App Group 读取（主 App 每次喂食写入）
        let defaults = UserDefaults(suiteName: "group.com.clouddreamer.togthr")
        let name = defaults?.string(forKey: "petName") ?? "Buddy"
        let stage = defaults?.integer(forKey: "petStage") ?? 1
        let lastFed = defaults?.double(forKey: "lastFedAt") ?? 0
        let hours = lastFed > 0 ? (Date().timeIntervalSince1970 - lastFed) / 3600 : 999
        let theme = defaults?.string(forKey: "petTheme") ?? "lavender"
        return BuddyEntry(
            date: Date(),
            petName: name,
            stage: stage,
            isSleeping: isNight(),
            missMode: hours > 48,
            theme: theme
        )
    }

    private func isNight() -> Bool {
        let h = Calendar.current.component(.hour, from: Date())
        return h >= 22 || h < 6
    }
}

// MARK: - 像素宠物视图（呼吸 = scale 动画，眨眼 = opacity 动画）
struct BuddyPixelView: View {
    let entry: BuddyEntry
    @State private var breathing = false

    private var glowColor: Color {
        switch entry.theme {
        case "mint": return Color(red: 0.20, green: 0.83, blue: 0.60)
        case "sakura": return Color(red: 0.96, green: 0.45, blue: 0.71)
        case "moonlight": return Color(red: 0.38, green: 0.65, blue: 0.98)
        case "warm": return Color(red: 0.98, green: 0.57, blue: 0.24)
        default: return Color(red: 0.49, green: 0.23, blue: 0.93)
        }
    }

    var body: some View {
        ZStack {
            // 光晕（呼吸联动）
            Circle()
                .fill(glowColor.opacity(entry.missMode ? 0.55 : 0.30))
                .frame(width: 44, height: 44)
                .blur(radius: 10)
                .scaleEffect(breathing ? 1.15 : 0.95)

            // 像素身体（圆头小机器人）
            VStack(spacing: 1) {
                if entry.missMode {
                    Text("…") // 想念表情
                        .font(.system(size: 8, weight: .bold))
                        .foregroundColor(.white)
                }
                RoundedRectangle(cornerRadius: 6)
                    .fill(glowColor)
                    .frame(width: 24, height: 24)
                    .overlay(
                        // 眼睛（眨眼：周期性 opacity 动画）
                        HStack(spacing: 6) {
                            Circle().fill(Color.white).frame(width: 4, height: 4)
                                .opacity(entry.isSleeping ? 0.15 : 1)
                            Circle().fill(Color.white).frame(width: 4, height: 4)
                                .opacity(entry.isSleeping ? 0.15 : 1)
                        }
                    )
            }
            .scaleEffect(breathing ? 1.05 : 0.97)
            .opacity(entry.isSleeping ? 0.65 : 1)
        }
        .onAppear {
            withAnimation(.easeInOut(duration: entry.missMode ? 1.2 : 2.2).repeatForever(autoreverses: true)) {
                breathing = true
            }
        }
    }
}

// MARK: - 锁屏小组件
struct TogthrBuddyWidget: Widget {
    let kind = "TogthrBuddyWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: BuddyProvider()) { entry in
            if #available(iOSApplicationExtension 16.0, *) {
                AccessoryRectangularWidgetView(entry: entry)
            } else {
                BuddyPixelView(entry: entry)
            }
        }
        .configurationDisplayName("Togthr Buddy")
        .description("Your quiet companion, breathing on your lock screen.")
        .supportedFamilies([.accessoryRectangular, .accessoryInline, .systemSmall])
    }
}

@available(iOSApplicationExtension 16.0, *)
struct AccessoryRectangularWidgetView: View {
    let entry: BuddyEntry

    var body: some View {
        HStack(spacing: 12) {
            BuddyPixelView(entry: entry)
            VStack(alignment: .leading, spacing: 2) {
                Text(entry.petName)
                    .font(.system(size: 13, weight: .semibold))
                Text(entry.missMode ? "misses you" : (entry.isSleeping ? "sleeping" : "quietly here"))
                    .font(.system(size: 11))
                    .foregroundColor(.secondary)
            }
        }
        .containerBackground(for: .widget) { Color.clear }
    }
}

// MARK: - 注册
@main
struct TogthrWidgetBundle: WidgetBundle {
    var body: some Widget {
        TogthrBuddyWidget()
    }
}
