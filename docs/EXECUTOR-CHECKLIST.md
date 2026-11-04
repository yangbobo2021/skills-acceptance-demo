# 验收执行者检查表

本文件给验收 Agent/维护者使用，不是用户必须输入的 Prompt。
每轮严格跟随手册当前一步，检查不得提前触发后续安装、配置或工作流。

## 步骤 1—2：安装

- 起点只读记录 OS/架构、宿主版本、登录、Git、可靠取得的模型，以及同名个人/共享/项目/插件安装；不输出凭据。
- 已有安装或个人 SPEX 数据时不擅自删除；使用专用系统用户/机器，或记录从零场景未覆盖。
- 正常个人 SPEX 环境首次初始化为主路线；已有 SPEX_HOME 自定义值需记录，不得拿隔离覆盖证明默认路径首次使用。
- 完整 Git 克隆，保留版本记录，已有目标不覆盖、不创建备份冒充新安装。
- spex-spec-workflow v1.0.1 SHA：4b39b03d286abe3c0860c336ebb6d882d2a12837。
- sublang 使用 v1.0.10；SHA 以 versions.json 中的固定提交为准，并核对远端标签。
- 保存实际路径、origin、SHA、tag、工作区及宿主发现结果；SPEC Skill 应含 agents/、references/。
- SubLang 应含 scripts/、runtime/package.json、package-lock.json、release.json、node-checksums.txt 和 vendor 中两个 tgz；v1.0.10 的 CLI/Core 须由同一上游 420aba7b 加公开 spex-source.patch 的源码树及锁文件构建；核对两份 artifactSources 一致、补丁哈希、源码树和制品哈希。不能凭仍为 5.0.0/0.1.0 的 npm 版本判断制品来源。
- Codex 沙箱中原生监听不可用时应自动轮询，preflight 不应因未处理 EMFILE 崩溃；不通过提高 ulimit 或关闭宿主沙箱掩盖缺陷。
- Codex 对已有 Core 的 PID 探测返回 EPERM 时，应继续经过令牌认证和协议校验连接；认证失败不得启动第二个写入者，也不改目录权限。
- 并行 CLI 启动与初始化锁竞争应有界等待，不移除他人的锁；临时 Core 的原拥有者完成后应保持其他已连接客户端的操作，待其断开再正常关闭。握手前地址撤销/更换可重新连接，已提交业务请求不重发。
- 记录 Core 是 temporary 还是 attached；已有旧 Core 必须先由操作者正常结束，再验证新运行时。不得强停任务或用新 CLI 路径冒充旧 Core 已升级。
- 安装/准备/help-only 只运行 setup 与必要 help 检查，不打开 Core 或运行 preflight/agent-init；步骤 2 后默认 HOME/.spex 应仍不存在。提前初始化记范围缺陷，不能冒充步骤 5 首次请求验证。
- 由已安装 Skill 准备运行时：macOS/Linux 用 setup.sh，原生 Windows 用 setup.ps1，不要求 Bash。
- 保存 setup 返回的 node、cli、runtime、protocolVersion；用返回路径检查 help 的九个要求入口，以及 preflight / agent-init / agent-configure。
- 不全局安装 CLI，不装 SPEX App，不修改宿主认证或权限。

## 步骤 3：SPEC

- 新空项目与后续被测项目分离；使用当前宿主所需 Agent 指令，不要求无关宿主配置。
- 保存实际 CLI 来源/版本；scaffold/lint 显式指定空项目，不能落在外层 Git 根。
- 中文、meta.md、map.md、最小 hello 业务包和 Agent 指令完整；明确约束须有可引用要求与可观察验证，零第三方依赖不能只出现在意图。
- 另审查业务语义：无参数 stdout=68656c6c6f0a、stderr 零字节、退出码 0、无第三方依赖，不扩展其他参数或功能。
- 不实现产品；按 Skill 规则清理能够确认来源的默认项目许可证副作用，保留上游 SPDX 行和未知许可/版权占位值，不把它们当阻断。

## 步骤 4：被测项目和台账

- 从包含本修订的 main 分支获取材料并记录实际 Git SHA 固定本轮版本；旧 manual-v1.0.1 仍是旧流程，版本不符不能冒充新版。
- 材料和独立示例均位于新目录，不污染真实开发源码；fixtures/hello-world 复制成独立 Git 项目后再登记，不把整份验收手册纳入产品规格抽取范围。
- 可用 prepare-fixtures.mjs 完成复制与本地 Git 基线；它不配置 SPEX、不执行工作流，生成额外空目录可直接作为步骤 3 的同类准备工具，但不能借此重跑步骤 3。
- 合成 Git 身份仅限示例仓库本地，不当作版权主体、不修改全局身份。
- 原测试应 1 项通过；assert-hello.mjs baseline 核对精确字节，implemented 初始应失败。
- 保存源码、原测试、需求、LICENSE 哈希，HEAD、fixture-baseline 标签和 Git 状态；独立项目须无 specs/，不实现 --upper。
- evidence/run.json 记录实际材料、项目、空项目、Node 和默认 SPEX_HOME；evidence/toolchain.json 记录 node、cli、runtime、spexCli、project、specProject、evidence、spexHome，不写凭据。
- spexCli 必须是 runtime/node_modules/@sublang/spex/dist/cli.js 的实际路径，确认存在并读 help。
- 运行时、项目、权限范围、用户请求和停止点由 Skill 传给内层，不让用户复制路径、内部 ID 或配置接口字段。

## 首次实际请求：步骤 5

- 首次请求前不由验收者调用 configure / agent-configure 或直接写配置修正默认值，不提前准备个人 SPEX 数据。Skill 在正常首次请求中自动初始化属于被测行为，必须记录，不能冒充用户预配置。
- 调用宿主必须由 Skill 显式传给 CLI：--host-agent codex 或 claude；只有可靠的当前会话元数据才能作为 --host-model。缺省模型分别为 gpt-6.1-sol / claude-opus-5-5，不从凭据猜宿主。
- 由 Skill 自行完成必要项目登记；保存首次市场搜索的真实请求与结果。
- 工作流请求先由 Skill 调用 preflight，再比较配置；preflight 自动初始化缺失记录，pending 则续用原选择，ready 则保留配置。记录缺失不是配置冲突，不向用户重复询问 Agent/模型。
- settings 单独诊断在无 ready 记录时必须不启动 Core、不创建默认配置，返回初始化状态及 next: preflight；仅诊断请求不自动初始化。
- 请求后通过 settings 只读保存个人/项目有效配置、配置路径、角色覆盖和 readiness。
- 目标 adapter 等于当前宿主；模型来自可靠当前宿主记录，无法取得时 Codex 默认 gpt-6.1-sol、Claude 默认 claude-opus-5-5。
- 核对 Captain、全部 Player 和角色覆盖；保持不同 Player ID，coder/reviewer 不合并。
- 错误默认值或必须手工预配置为 FAIL；认证或目标模型不可用为 BLOCKED；不降级模型或切换提供商。
- v1.0.10 应在正常首次请求前持久化初始化记录并通过 Core 更新个人配置；记录配置路径、初始化状态、模型来源及实际 Captain/Player/角色设置。不得以显式补配替代自动初始化。
- A-01 不通过即停止主路线，后续 NOT_RUN；补充配置验证需另行授权，保留原失败。
- readiness 仅证明静态就绪，不能证明模型实际调用成功；真实调用证据在后续工作流中补齐。
- 后续安装/继续使用时只读比较既有配置是否固定，新 Player 是否继承当前 Captain；不改真实凭据来制造测试。
- 用户主动要求重新配置时使用 agent-configure，可改变 Captain/全部 Player/角色模型；记录为另项验证。既有历史会话保留旧快照，新会话才验证新配置，不静默重放旧任务。
- “凭据变化后不重设”等未实测子项写 NOT_RUN，不能用普通重启代替。

## 步骤 5—8：搜索、安装

- 每包分搜索和安装两步，搜索后停下；未获得下一步安装请求，不新增包。
- 使用 package-search 的真实市场结果，不用 catalog 的本地过滤代替。
- merico-ai/extract-specs@0.3.0；yangbobo2021/app-delivery-acceptance@0.4.17。
- 安装后核对 packages 版本/installed、catalog、inspect 和有效 Agent/模型，新 Player 应继承已固定选择，不由执行者补配掩盖缺陷。
- npm 运行时 @sublang/playbook 为 18.1.4，Core 应解析到同一安装版本；同时核对 Core 生成的内置 sublang/playbooks@18.1.4。外部市场包版本保持各自独立。
- 每次安装后保存 runtime-check：实际提供服务的 Core 构建来源、各 registry module 与导入者、解析出的 @sublang/playbook/xstate-runtime 和 xstate 的物理路径/版本；必须 aligned 为 true。新 run 在有引擎偏差时应拒绝提交，不静默执行其他版本。
- decide/code 来自内置 sublang/playbooks@18.1.4；只检查，不另增用户步骤，不提前执行。
- 网络、认证失败和无匹配分别记录，版本偏差不自动升级。
- Windows 记录安装前是否有其他主体只读授权、首次安装是否成功及失败路径；不能要求改 ACL/管理员运行来把结果变绿。CI 以临时目录实际 read-grant 和 package-add 回归补充，不代替该用户机器结果。
- 只在独立示例中做必要环境清单本地提交，冻结工作流前产品基线；不提交凭据、个人状态、缓存或证据。

## 步骤 9—12：四个真实工作流

| 入口 | 必要证据 |
| --- | --- |
| extract-specs | 仅 HELLO-01；原流程审查、实际 Gate、lint；源码/原测试哈希不变 |
| decide | HELLO-02 进入需求/规格；原提案与嵌套 review 完成；代码尚未实现 |
| code | 两种真实子进程输入的精确字节/退出码断言；原独立 review、修订和本地提交 |
| acceptance-orchestrate | 固定实现 SHA；新 AT；一个正式场景；评估接收、执行收据、独立复审、报告 |

- 每次仅运行用户指定的入口，保存 selected_workflow、实际包版本、原 sessionId、终态和设计/实现/精确复审 SHA。
- 每轮记录宿主沙箱与审批设置；内层 Agent 的数据库或 app-server 启动被拒绝时保留失败，不关闭宿主沙箱或提高权限冒充通过。
- 发下一条继续请求前，等待上一条宿主调用和 CLI 完整退出；不要对同一对话/临时 Core 并发提交人工回复。
- Gate 展示本轮材料，由用户阅读后确认，继续原会话；WAITING 不是 PASS。
- Gate 1 前核对原委派审查的实际调用、完整 gate1-report.md 与编号决定；只有 `## Gate 1 decisions` 占位标题不算审查完成。已复现 merico-ai/extract-specs@0.3.0 仅匹配该标题而跳过委派审查，不能直接批准；保留失败，使用该原会话实际广告的恢复入口补做原委派审查，再审阅批准，不手写报告或热改包。
- Gate 2 核对必需目录可随 Git 克隆保留；删除全部 IR 后，空 intents/ 目录需要被跟踪的目录保留文件，不为留目录虚构意图。实际修订交回原工作流，重新审阅交付结果。
- 极小 Hello 的规格可能长于源码；若原审查提出 Size 发现，保留原发现和人工裁定。人工接受必须明确理由，不能记为已修复、量表豁免或零发现。
- 将初次失败、原流程恢复后的通过、操作者执行错误和提供商阻塞分别记录；新版本或恢复结果不覆盖原始失败，也不把恢复后结果称为首次无错误通过。
- code 后独立执行 implemented 字节检查和现有测试，保存证据；失败不由外层代修。
- acceptance-orchestrate 只从总入口委托；coverage.policy=off，其他候选场景不算正式执行。
- 中断恢复时分别核对 SPEX 会话身份和业务编排 task_id，不能把继续同一 SPEX 会话等同于继续同一业务任务。acceptance-orchestrate 的公开合同要求显式 JSON 续接时，在 CLI continue 的请求文件中保留完整 `/acceptance-orchestrate {…}` 委托、原 task_id 和新的 request_id；总入口自行检查持久状态与未决效果。自然语言中提及旧 ID 不代替合同字段，不让调度角色递归调用自身，不重建 AT 或重放已完成子调用。误生成的空记录和原失败均保留并分别记账。
- case-evaluation 未接收或有结构错误，不能因 CLI 成功就通过。
- exit 0、ok:true、一轮结束不等于整条工作流成功；原终态不明就只读续查，不能另开 review 冒充。
- 不热改安装包、Skill、会话或锁，不删除失败历史，不把四工作流放进 CI/定时任务。

## 记录和清理

- 使用 RESULTS-TEMPLATE.md；保存真实命令、输出、退出码和必要截图，结论只覆盖当前实际组合。
- 材料准备与确定性测试不是模型/工作流验收；显式补充配置不覆盖首次使用失败。
- 默认保留；获清理授权后按本轮创建清单和进程核对再删除，不清理无关目录或远端资源。
- 清理本轮安装/缓存/项目/个人状态时保留登录、全局配置、开发源码、其他技能和聊天历史。
