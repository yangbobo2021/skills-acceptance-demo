# 来源、固定版本与验证边界

## 四个工作流的来源

SMM 已检索并打开原对话 **12543**（会话 `01a1a441-265c-7e43-9321-060ed0ae9c0e`）：

- 位置 **446**：确认 `extract-specs 0.3.0 → decide → code → acceptance-orchestrate 0.4.17` 四个入口。
- 位置 **5323**：历史运行并非四项全部通过；decide 原终态读取超时，验收用例评估有结构校验异常。
- 位置 **6347**：已有 Hello World 轻量手动验收基线，仍按上述顺序。

本仓库重新建立独立 Node.js 最小案例，不依赖此前操作者的目录、远程机器、私聊或 App 项目；没有复制私聊内容。
2026-11-04 通过当前 SubLang 市场接口重新查到 `merico-ai/extract-specs@0.3.0` 和 `yangbobo2021/app-delivery-acceptance@0.4.17`。注册表配置为 `https://spex.sublang.ai`。
另用全新 SPEX_HOME、未复制市场登录的隔离环境复查，两个包和上述版本均可搜索到。这只证明匿名搜索可用，没有替操作者完成安装或四工作流验收。

## 当前公开被测版本

两份 Skill 均已公开，分支和标签已推送；SHA 固定在 [versions.json](../versions.json)。

SubLang v1.0.0 已有 [macOS/Windows CI 冒烟结果](https://github.com/yangbobo2021/sublang-skill/actions/runs/41826418646)：两平台完成初始化、CLI help、独立 Core 项目登记与工作流目录发现。**该 CI 没有运行四个业务工作流，也没有证明真实模型执行成功。**

四工作流验收只允许由操作者按手册手动触发。本仓库没有 `.github/workflows/`，也不创建定时任务。

## 尚未实现的功能

被测 v1.0.0 **尚未实现“首次跟随宿主自动选择并固定所有 Agent/模型，之后只由用户修改”的新规则**。
本手册明确使用 `configure` 的人工 Prompt 配置隔离环境，并再次核对。该步骤只能证明显式配置可用，不能记录为自动初始化通过。
不能仅凭外层聊天来自 Codex 就认为内部 Player 也是 Codex；必须读取 `settings` 并保存实际 Agent/模型。

## 验收不混淆的几个概念

- GitHub Skill 安装成功，不等于市场 PLAYBOOK 包已经安装。
- 包已安装，不等于入口可运行；需要检查 `catalog` 与 `inspect`。
- 工具退出码为 0、CLI `ok: true`、一轮结束，均不能单独代替工作流正常终态和产物验收。
- 人工 Gate 等待属于 WAITING；未经确认不能当作工作流完成。
- `coverage.policy=off` 是关闭本轮代码覆盖率；用例评估是否足以覆盖所选场景仍须检查。
- 相同模型、不同 Player ID 可以进行独立角色审查；不要把 coder/reviewer 绑定到同一会话来消除问题。
- 市场接口失败、认证失败和确实无匹配包分别记录。不要用本机旧安装掩盖从零安装失败。

## 安装依据

- [OpenAI：本地 Skill 安装与发现](https://learn.chatgpt.com/docs/build-skills#install-curated-skills-for-local-use)
- [Claude Code：个人与项目 Skill 目录](https://code.claude.com/docs/en/skills#choose-where-skills-load)

本手册采用 GitHub 链接加显式安装 Prompt，并要求记录真实安装目录和 SHA；不依赖操作者另装第三方 Skill 管理器。
