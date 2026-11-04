# 两个 Skill 的手动交付验收

修订日期：2026-11-05；计划操作日期：2026-11-05；时区：Asia/Shanghai。

从“宿主已安装并登录，两个 Skill 和 SPEX App 尚未安装”的状态开始。
以下 12 步适用于 macOS、Windows、Codex 和 Claude Code，Prompt 不区分平台或宿主，Skill 应自行适配。
**每次只执行一步，报告后停止，等操作者继续；四个工作流分别由人触发，不进入 CI 或定时任务。**

被测版本：SPEC Skill 固定 v1.0.0；SubLang Skill 固定统一 CLI、Core 和内置内容构建的 v1.0.6。
本手册随 main 分支发布；本轮以实际克隆的 Git SHA 固定材料版本。
旧标签 manual-v1.0.1 仍保留旧流程，不要使用它执行本手册。

## 1. 安装 SPEC Skill

```text
帮我安装这个 Skill，使用 v1.0.0：
https://github.com/yangbobo2021/spex-spec-workflow/tree/v1.0.0
```

预期：完整安装到宿主可发现的个人目录，调用名为 spex-spec-workflow。
已有同名内容不覆盖；缺少 Git 等实际依赖时如实报告。

## 2. 安装 SubLang Skill

```text
帮我安装这个 Skill，使用 v1.0.6，并按它的说明完成必要准备：
https://github.com/yangbobo2021/sublang-skill/tree/v1.0.6
先不要运行业务工作流。
```

预期：完整安装，调用名为 sublang，运行时准备成功，宿主可发现。
无需用户安装 SPEX App、全局 CLI，或手工选择系统脚本。

## 3. 在空项目初始化 SPEC

```text
使用 spex-spec-workflow，在一个新的空项目目录里初始化中文 SPEC。
产品是一个无第三方依赖的 Hello 命令行工具：不传参数时只输出 hello 加一个 LF，stderr 为空，退出码 0。其他功能不在范围内。只写规格，先不实现代码。
```

预期：中文标准目录、一个最小 Hello 业务包及当前宿主需要的 Agent 指令完整；结构和业务语义检查通过。
不替项目选择许可证或版权主体，不因它们未定暂停。

## 4. 克隆被测项目

```text
克隆这个公开示例仓库，把其中 fixtures/hello-world 示例准备成一个独立的被测项目：
https://github.com/yangbobo2021/skills-acceptance-demo
保留原始材料，先不要写规格或增加功能。
```

预期：独立 Hello 项目有原源码、原测试和本地 Git 基线，没有 specs/，尚未实现 --upper。
后续步骤均针对这个被测项目，不使用步骤 3 的空项目。
原测试和默认输出的核对由执行者在本步完成，不另要求用户输入技术检查 Prompt。

## 5. 搜索规格抽取 Playbook

```text
使用 sublang，在市场搜索从现有代码提取规格的工作流，介绍 merico-ai/extract-specs 的搜索结果。先不要安装。
```

预期：实际市场搜索找到 merico-ai/extract-specs，可见 0.3.0；没有新增安装。
首次必要准备、项目登记、Agent 初始化和平台适配应由 Skill 处理。
本步必须验证 Captain、全部 Player、角色模型实际使用当前宿主；模型无法可靠取得时采用约定默认值。后续固定该配置，不由操作者提前补配。

## 6. 安装规格抽取 Playbook

```text
使用 sublang，把刚才搜索到的 merico-ai/extract-specs 0.3.0 安装到这个项目，先不要运行。
```

预期：项目范围实际安装 0.3.0，extract-specs 入口可用。
执行者运行 runtime-check，核对 extract-specs 的实际引擎路径指向本发布的 @sublang/playbook@18.1.4，保存检查结果。
Windows 上即使 Codex 沙箱给目录附加只读授权，也应完成安装；不要求用户修改 ACL、以管理员身份重跑或绕过检查。失败时保存完整错误和失败路径，不以搜索成功代替安装成功。

## 7. 搜索交付验收 Playbook

```text
使用 sublang，在市场搜索交付验收工作流，介绍 yangbobo2021/app-delivery-acceptance 的搜索结果。先不要安装。
```

预期：实际市场搜索找到 yangbobo2021/app-delivery-acceptance，可见 0.4.17；没有新增安装。

## 8. 安装交付验收 Playbook

```text
使用 sublang，把刚才搜索到的 yangbobo2021/app-delivery-acceptance 0.4.17 安装到这个项目，先不要运行。
```

预期：项目范围实际安装 0.4.17，acceptance-orchestrate 入口可用。
执行者在本步确认内置 decide、code 来自 sublang/playbooks@18.1.4，也可用；不另造安装步骤。
执行者运行 runtime-check，保存实际 Core 的源码/补丁/构建信息，以及每个已安装工作流的 registry 路径、引擎导入路径和版本。必须 aligned 为 true；不能只看根目录 npm 版本，也不能手工改缓存消除问题。此检查不执行工作流。

## 9. 执行 extract-specs

```text
使用 sublang 的 extract-specs 工作流，为这个 Hello 项目提取中文现状规格。
只描述已有行为，不改源码和测试。需要我确认时先停下来。
```

预期：只提取已有 HELLO-01，不把后续 --upper 需求当作现状；完成原工作流的独立审查和 lint。
Skill 先完成执行前准备：尚未初始化时自动采用当前宿主，已有配置时沿用；不能把缺少初始化记录当作配置冲突而要求用户再次选择 Agent/模型。此准备不运行业务工作流。
工作流要求人工确认时，展示本轮实际材料，操作者阅读后自然语言回复；Skill 应继续原任务，不要求用户抄内部会话 ID。
等待确认记 WAITING，不能记已完成。

## 10. 执行 decide

```text
使用 sublang 的 decide 工作流设计一个变更：只有单独传入 --upper 时输出 HELLO 加一个 LF，stderr 为空，退出码 0；不传参数的行为不变，其他参数组合不扩展。
完成规格、设计和独立审查，先不要实现代码。
```

预期：需求和规格记录 HELLO-02，原提案、合成、嵌套 review 和修订正常完成；新功能尚未实现。

## 11. 执行 code

```text
使用 sublang 的 code 工作流实现刚才审定的 --upper 设计。
保留原测试，补充真实命令行测试，并完成独立审查。不要增加其他功能。
```

预期：无参数和单独 --upper 两种输入有精确字节、stderr 和退出码测试；原 code 及其嵌套 review 完成。
执行者在本步独立核对实现结果，不另让用户发技术检查 Prompt。

## 12. 执行 acceptance-orchestrate

```text
使用 sublang 的 acceptance-orchestrate 工作流验收刚才完成的 --upper 变更。
只选并正式执行一个正常场景：真实运行命令，检查输出为 HELLO 加一个 LF、stderr 为空、退出码 0。
关闭代码覆盖率，完成用例评估、执行、独立复审和报告，不改产品代码。
```

预期：总入口协调子工作流；选定场景有接收成功的用例评估、正式执行、独立复审和可定位报告，追溯到实际实现版本。
结构校验失败、评估未接收或原任务终态不明，不能因命令成功就判通过。

## 执行与判定

- 技术核对和记录见 [执行者检查表](docs/EXECUTOR-CHECKLIST.md)，不拼进用户 Prompt。
- 首次使用遵循正常个人环境，不提前建立隔离 SPEX_HOME 或配置 Captain/Player 来绕过初始化问题。
- 期望首次采用当前宿主 Agent/模型，无法取得模型时采用约定默认值，此后固定；实际配置与执行必须核对，不能由外层宿主推断。
- SubLang v1.0.6 必须自行完成首次初始化；v1.0.0 的失败记录保留，不用新结果改写旧版本结论。不能预先手工配置后声称开箱可用。
- 初次使用选错 Agent/模型或依赖手工预配置时记录缺陷，停止主路线；后续项写 NOT_RUN。显式重新配置与自动首次初始化分别记录。升级时保留历史会话，新配置只用于新会话，不把旧会话当成已切换。
- 正常业务执行才需要的人工问题按实际内容回答，不提前批量批准；不热改被测版本让验收变绿。
- 只在示例项目内做必要本地提交，不推送、不建 PR、不修改工作流包。
- 默认保留记录；仅在用户明确要求时清理本轮数据，保留登录、全局配置、开发源码和其他技能。
- 四种 OS/宿主组合分别记录，没有实际执行的组合一律 NOT_RUN。
