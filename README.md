# 两个 Skill 的手动交付验收

模拟用户已经登录宿主，从 GitHub 安装 Skill，到项目中实际使用四个工作流。

**操作文档：[MANUAL-ACCEPTANCE.md](MANUAL-ACCEPTANCE.md)**

12 个步骤：分别安装两个 Skill → 空项目初始化 SPEC → 克隆被测项目 → 分别搜索、安装两个外部 Playbook → 逐个执行 extract-specs、decide、code、acceptance-orchestrate。
Prompt 对 macOS/Windows、Codex/Claude Code 通用；系统适配与内部配置由 Skill 处理。
多轮回归减少 token 的操作见 [精简复验](docs/LIGHTWEIGHT-ACCEPTANCE.md)，仍由真实宿主调用 Skill，不替代首次完整交付验收。
技术核对另见 [执行者检查表](docs/EXECUTOR-CHECKLIST.md)，不要求用户输入内部路径、配置或会话 ID。

| 被测项 | 固定版本 |
| --- | --- |
| spex-spec-workflow | v1.0.1 |
| sublang | v1.0.10 |
| @sublang/playbook | 18.1.4，npm 运行时 |
| merico-ai/extract-specs | 0.3.0，先搜索后安装 |
| sublang/playbooks | 18.1.4，内置 decide/code |
| yangbobo2021/app-delivery-acceptance | 0.4.17，先搜索后安装 |

最小案例：现有 hello 加 LF → 提取现状规格 → 设计并实现单独 --upper 输出 HELLO 加 LF → 正式验收一个新增正常场景。

首次使用采用正常个人 SPEX 环境，不先用隔离环境或手工配置补齐产品缺口。
SubLang v1.0.10 统一构建 CLI、Core 和内置内容，并检查实际引擎路径；保留首次按宿主选择并固定 Agent/模型的修复。首次使用、后续保持和新 Player 继承均需取证。v1.0.0 的失败记录保留，不能用验收者预配置替代初始化。

本修订随 main 分支发布，尚未单独打新标签；克隆后记录实际 Git SHA 作为本轮固定材料版本。
旧 manual-v1.0.1 不包含新流程，不要使用旧标签执行新版验收。
计划操作日期：2026-11-05（Asia/Shanghai）。

准备脚本只复制示例和生成本地 Git 基线；字节检查脚本只核对真实 CLI 输出。
**四个工作流只能由人分别触发，不进入 CI 或定时任务。**
来源和边界见 [SOURCES-AND-LIMITS.md](docs/SOURCES-AND-LIMITS.md)，版本清单见 [versions.json](versions.json)。
