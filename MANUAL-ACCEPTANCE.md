# 两个 Skill 的手动交付验收操作步骤

准备日期：2026-11-04；计划操作日期：2026-11-05；时区：Asia/Shanghai。

**只进行手动验收。每次只复制当前步骤的一条命令或一个 Prompt，看到预期结果后再继续。四个工作流不进入 CI，不由准备脚本自动触发。**

## 0. 选择本轮宿主与环境

主场景是：用户已安装并登录 **Codex**，尚未安装两个目标 Skill。Claude Code 路线用于验证相同 Skill 在另一个宿主中的安装和使用；该路线须先有可用且已登录的 Claude Code。

| 验收组合 | 操作方法 |
| --- | --- |
| macOS + Codex | 按全文顺序执行 |
| Windows + Codex | 同样顺序；让宿主使用 PowerShell/native Windows 路径 |
| macOS + Claude Code | 独立新一轮；将 Prompt 开头的 `$技能名` 写为 `/技能名` |
| Windows + Claude Code | 独立新一轮，采用 PowerShell；技能前缀同上 |

四种组合各填一份记录。只执行了一种，不能把其他三种也记为通过。没有 Claude Code 的机器将 Claude 路线记 NOT_RUN，而不是声称验证完成。

每轮使用新的材料副本或独立 run 目录，并使用本轮新建的 SPEX_HOME。**不删除旧 Skill、旧登录、旧配置和旧会话来制造“干净环境”。** 若已有同名个人 Skill，安装从零场景应换新系统用户/机器；可以继续功能检查，但安装项须标为未覆盖。

以下所有正文代码框标明了执行位置。`PROMPT` 只粘贴到当前宿主聊天，不能当 Shell 命令执行。需要 Agent 修改测试文件或创建本地提交时，本手册已明确授权；始终不推送、不建立 PR、不修改工作流包。

## 1. 检查起点（PROMPT）

```text
先做只读检查，为两个 Skill 的交付验收确认起点。报告当前 OS/架构、宿主是 Codex 还是 Claude Code、宿主版本、Git 是否可用，以及你能可靠取得的当前模型。不要猜测模型。
检查当前宿主的个人和项目 Skill 目录中是否已存在 spex-spec-workflow 或 sublang，报告绝对路径；也检查同名全局技能会不会遮蔽本次安装。不要删除或覆盖已有内容，不要修改登录或全局配置。
本轮目标是从“已安装并登录宿主、尚未安装这两个 Skill”开始。Git 是通过 GitHub 克隆材料与版本化安装的前提；缺少 Git 时明确报告并给出当前系统的安装步骤，先不要把前提未满足记为 Skill 已安装。不要安装 SPEX App。
```

**预期：** 宿主可用且已登录；Git 可用；两个目标 Skill 未安装。首次网络下载需要联网。Node 可尚未安装，SubLang 的初始化入口负责准备其运行时。

## 2. 从 GitHub 安装 SPEC Skill（PROMPT）

```text
请从这个公开 GitHub 地址安装 spex-spec-workflow，固定到 v1.0.0：
https://github.com/yangbobo2021/spex-spec-workflow/tree/v1.0.0
使用完整 Git 克隆保留版本记录，安装到当前宿主实际可发现的个人 Skill 目录；Codex 通常是 CODEX_HOME/skills 或 ~/.codex/skills，Claude Code 是 ~/.claude/skills。不要只下载 SKILL.md。目标目录已有内容时先报告，不覆盖、不替换、不创建备份副本。
完成后读出真正安装位置的 SKILL.md，核对 name 为 spex-spec-workflow。报告绝对路径、origin、Git SHA；期望 SHA 是 d5c8afa040d0c002ee5507d190fb37cb0e05d4ed。不要开始初始化项目 SPEC。
```

**预期：** 完整目录含 `SKILL.md`、`agents/`、`references/`，SHA 相同；记 I-01 的安装部分。

## 3. 从 GitHub 安装 SubLang Skill（PROMPT）

```text
请从这个公开 GitHub 地址安装 sublang Skill，固定到 v1.0.0：
https://github.com/yangbobo2021/sublang-skill/tree/v1.0.0
使用完整 Git 克隆，目录名使用 sublang，安装到当前宿主的个人 Skill 目录；已有内容不覆盖、不移动到备份。不要把仓库名 sublang-skill 误用成技能调用名。
必须保留 agents、references、scripts、runtime/package.json、runtime/package-lock.json、runtime/release.json、runtime/node-checksums.txt 和 runtime/vendor 中两个 tgz，不能只装入口文档。报告绝对路径、origin、Git SHA；期望 SHA 为 d9d39852a9d88f982aec34302895873cdc27cd1e。
然后在 macOS/Linux 使用 sh 执行该目录 scripts/setup.sh；原生 Windows 使用 powershell.exe -NoProfile -ExecutionPolicy Bypass -File 执行 scripts/setup.ps1。保留返回 JSON 中 node、cli、runtime 和 protocolVersion 的真实绝对路径。用返回的 node 执行返回的 cli help，确认有 package-search、package-add、catalog、inspect、configure、run、continue、status、history。
这一步只准备运行时，不调用业务工作流、不修改 Agent 认证、不要求安装 SPEX App、不执行全局 npm 安装。
```

**预期：** 初始化成功、完整性校验通过、help 有上述入口；Node 可来自独立缓存。首次需要下载时记录实际结果；编译依赖缺失或网络失败不能写 PASS。

## 4. 验证宿主能发现两个技能（PROMPT）

必要时先重开当前宿主会话，再粘贴下列 Prompt；只重启发现失败的宿主，不删除技能。

```text
请分别加载个人安装目录中的 spex-spec-workflow 和 sublang 两个 Skill。只报告技能名称、实际 SKILL.md 绝对路径，以及从各自入口实际读到的一项能力。不要使用材料仓库里的副本代替个人安装，不运行业务工作流。
如果某个 Skill 未被宿主发现，请明确报告，不用直接执行普通文件冒充已激活技能。保留前面安装步骤记录的路径和 SHA；必要时重新运行 SubLang setup 恢复 node/cli 路径。
```

**预期：** 两个名称都可加载。Claude Code 中可在 `/` 技能菜单核对；Codex 中可显式用 `$spex-spec-workflow` 与 `$sublang` 调用。至此分别完成 I-01、I-02。

## 5. 克隆公开验收材料（PROMPT）

```text
请把公开验收材料仓库 https://github.com/yangbobo2021/skills-acceptance-demo 克隆到用户主目录下一个全新的目录，固定标签 manual-v1.0.1，记录绝对路径与 Git SHA。不要覆盖已有目录。
阅读 MANUAL-ACCEPTANCE.md 和 versions.json，确认四个入口是 extract-specs、decide、code、acceptance-orchestrate。现在只准备材料，不执行四个工作流；不要将四工作流加入 CI 或定时任务。
```

**预期：** 读到本手册和固定版本；无需私有 GitHub 权限。

## 6. 生成本轮独立测试目录（PROMPT）

```text
使用 SubLang setup 返回的 node 绝对路径，执行材料仓库 scripts/prepare-fixtures.mjs。--host 按本轮宿主填 codex 或 claude；--root 指向用户主目录下一个尚不存在、包含本轮宿主和时间的绝对目录，且必须位于材料仓库之外。
将输出保存并阅读 evidence/run.json。后续引用其中的 specProject、project、spexHome、evidence、materials 和 node；不要自己编造路径。
prepare 只允许在新目录中复制示例并初始化测试项目的本地 Git。允许示例仓库使用明确的合成身份 Skill Acceptance Tester <skill-acceptance@example.invalid>，不修改全局 Git 身份或用户登录，不把该身份当作项目版权证据。不要运行工作流。
```

**预期：** 得到两个独立目录：空的 `spec-init` 与已有 Hello World 代码的 `playbook-demo`。后者有干净的本地基线提交、标签 `fixture-baseline`，没有远端；两者都没有 `specs/`。`spexHome` 尚未使用。

从这一步起，记录填在本轮 `evidence/RESULTS.md`，不填进公开材料仓库。可复制 [记录表](docs/RESULTS-TEMPLATE.md)。

## 7. 检查 Hello World 基线（PROMPT）

```text
读取本轮 evidence/run.json。使用记录的 Node，在 playbook-demo 中执行 node --test test/hello.test.mjs（node 必须替换为实际绝对路径）。然后用同一个 Node 执行材料仓库 scripts/assert-hello.mjs --project 本轮project绝对路径 --mode baseline。
记录退出码、测试结果和生成的 evidence/hello-baseline-*.json。确认不传参数输出字节为 68656c6c6f0a，stderr 为空、退出码0；当前传入 --upper 也仍输出 hello，这只是证明新增功能尚未实现，不新增该参数的现状业务约定。检查两测试目录仍无 specs/，产品工作区干净。不修改代码。
```

**预期：** 原测试 1 项通过，baseline 检查通过；`implemented` 模式此时应失败。这里只验材料，不记作任何 Playbook 已通过。

## 8. 使用第一个 Skill 初始化 SPEC（PROMPT）

```text
$spex-spec-workflow
读取本轮 evidence/run.json，只为其中 specProject 指向的独立空目录初始化中文 SPEC，Agent 指令同时面向 codex 和 claude。不要操作 playbook-demo，它必须保持没有 specs/，留给后面的规格抽取工作流。
产品需求只有一个无第三方依赖的 Hello 命令行工具：不传参数运行时，stdout 是 UTF-8 字节 68 65 6c 6c 6f 0a，stderr 为空，退出码0。其他参数、UI、网络、部署、持久化不在范围内。本步只写规格，不实现程序。
如需 SPEX CLI，优先检查 SubLang runtime 中已锁定的 @sublang/spex 版本和帮助；使用 setup 返回的 Node 运行它，不假定系统有全局 node/npm/spex。也可以按 Skill 获取固定版本，但须报告来源与实际版本。scaffold 和 lint 都必须显式指定 specProject，不能落到外层 Git 根目录。
许可证、版权、Git 身份和完整产品环境不是本次 SPEC 初始化的前提；保留已有内容，不替项目选择许可证。完成后报告 meta.md、map.md、业务包和 Agent 指令位置，并给出实际 lint 命令、退出码；不能用 lint 通过替代业务语义检查。最后确认 playbook-demo 的源码、原测试、基线提交和无 specs 状态均未变化。
```

**预期：** `spec-init/specs/` 完整，业务契约明确，lint 0 errors；没有产品实现，没有因许可未定暂停，`playbook-demo` 未受影响。完成 S-01。

## 9. 建立隔离的 SPEX 环境与明确 Agent 配置（PROMPT）

**版本说明：** 当前 v1.0.0 未实现“首次自动跟随宿主并固定”的新规则。本步是明确配置验收，不得记为自动继承成功。

```text
$sublang
读取本轮 evidence/run.json。本轮所有 SubLang CLI 操作都必须显式传 --spex-home 为 run.json.spexHome，并以 run.json.project 作为 --project。不要使用或修改真实 ~/.spex。先用 packages/settings 检查本轮环境；需要时仅注册这个 playbook-demo Git 项目。
明确配置本轮的 Agent：Codex 路线统一使用 codex；Claude Code 路线统一使用 claude。能可靠取得当前宿主模型时使用该模型；取不到时 Codex 默认 gpt-6.1-sol，Claude 默认 claude-opus-5-5，不额外询问。第三方服务不支持这个模型时如实记录，不能偷偷替换或声称成功。
通过现有 configure 接口在本轮隔离 SPEX_HOME 的 personal 范围设置 Captain 和全部已有 Player 的 adapter、model，处理与目标 adapter 不兼容的旧调参；不修改认证、不擅自扩大权限。各角色保留独立 Player ID；coder 与 reviewer 不能绑定到同一个 Player。保留角色职责，检查角色级模型覆盖没有盖过本轮指定模型。
再次调用 settings，保存配置路径、每个 Agent/模型、readiness 和实际选用依据到 evidence。后续新发现但未显式配置的 Player 应继承本轮 Captain 的默认 Agent/模型；安装新包后仍要重新核对。不要运行四个业务工作流。
另外保存 setup 返回的 runtime 目录，以及其中 node_modules/@sublang/spex/dist/cli.js 的真实绝对路径，作为本轮 SPEX CLI；先确认该文件存在并读取帮助。把 Node、SPEX CLI、project、spexHome 和 evidence 的路径写入 evidence/toolchain.json，不写凭据。
```

**预期：** 新环境中 Agent/模型明确、运行依赖可用，且真实个人 SPEX 配置未改变；记录 A-01。没有凭据或模型不可调用时记 BLOCKED，不能靠换模型掩盖问题。

## 10. 核对内置 decide / code（PROMPT）

```text
$sublang
沿用本轮 run.json 的 project 和隔离 spexHome，查询 catalog 并 inspect decide、code。确认两者来自 sublang/playbooks 18.1.3，安装文件存在且入口可运行；记录包、版本、角色绑定和所用 Agent/模型。只发现和检查，不启动工作流；不自动升级内置包。
```

**预期：** 两入口可用，不需要再从市场安装它们。若版本不同，记录偏差，不直接按固定版本判通过。

## 11. 搜索第一个市场包（PROMPT）

```text
$sublang
仅通过 package-search 搜索市场中的 extract-specs。使用本轮隔离 spexHome 和 project 的项目范围；不要以 catalog 的本地过滤替代市场搜索，不安装任何包。
记录 merico-ai/extract-specs 的描述及是否列出 0.3.0，保留真实搜索输出。比较搜索前后的 packages 状态，确认没有新增安装。认证/网络失败和没有匹配分别记录，不能用本机旧包代替搜索结果。
```

**预期：** 查到 `merico-ai/extract-specs`，版本含 `0.3.0`，未安装。记录 M-01。

## 12. 安装并检查第一个市场包（PROMPT）

```text
$sublang
根据上一步真实搜索结果，在本轮 playbook-demo 的项目环境安装 merico-ai/extract-specs，版本精确为 0.3.0。不得安装到真实个人环境，不自动升级为其他版本。
完成后查 packages 的实际解析版本与 installed 状态，再刷新 catalog，inspect extract-specs，记录入口角色、人工 Gate、产物及停止条件，核对有效 Agent/模型。不要执行该工作流。
```

**预期：** 版本和安装状态正确，入口可运行，完成 M-02；此时 `playbook-demo` 仍无 `specs/`。

## 13. 搜索第二个市场包（PROMPT）

```text
$sublang
只通过 package-search 搜索 app-delivery-acceptance，使用本轮隔离 spexHome 和项目范围。不要安装，不调用验收工作流。记录 yangbobo2021/app-delivery-acceptance 的说明以及是否列出 0.4.17，保留真实输出，并确认 packages 没有新增安装。
```

**预期：** 查到目标包，版本含 `0.4.17`，没有自动安装。完成 M-03。

## 14. 安装并检查第二个市场包（PROMPT）

```text
$sublang
根据上一步真实搜索结果，在本轮项目环境精确安装 yangbobo2021/app-delivery-acceptance@0.4.17。查 packages 核实实际版本和 installed，刷新 catalog 并 inspect acceptance-orchestrate。只检查业务统一入口，不直接运行它的子工作流。
列出它和前面三个入口的有效 Agent/模型，确认所有 Player 默认符合本轮配置，补齐缺失的显式模型设置但保留不同 Player ID。本步不运行四个工作流。
```

**预期：** 两个外部包均已在项目环境安装；四个入口可运行。记录 M-04、实际角色和模型。

## 15. 工作流开始前冻结基线（PROMPT）

```text
读取本轮 run.json，在 playbook-demo 中检查 Git 差异。只允许提交本轮项目登记和包安装产生、确需版本化的环境清单；不要把任何凭据、SPEX_HOME、导出缓存或验收证据加入 Git。允许仅在本地测试分支创建这一个准备提交，不推送、不建 PR。
保存当前 HEAD、产品源文件和原测试哈希到 evidence。确认 HELLO-01 原测试通过，--upper 仍未实现，没有 specs/，已有 SPEC 初始化结果仅在 spec-init 目录。通过后停止，等待我手动触发下一个工作流。
```

**预期：** 提取规格的前提明确；没有把第一个 Skill 的成果混入第二个 Skill 的抽取场景。

**每次调用的交接约定：** 内层 Playbook 不会自动继承外层聊天。外层必须将 `run.json` 和 `toolchain.json` 中的真实绝对路径与当前任务限制写入本次 request-file。系统没有全局 Node 时，内层用提供的 Node 绝对路径；需要在本轮子进程 PATH 前置该 Node 所在目录时，只作用于该进程及其子进程，不改全局环境。

## 16. 手动调用 extract-specs（PROMPT）

```text
$sublang
在本轮隔离 spexHome 和 playbook-demo 中，使用 merico-ai/extract-specs@0.3.0 的 extract-specs 工作流执行以下真实请求。必须通过 Skill run 创建原会话，保留 sessionId、selected_workflow 和实际返回记录；不要由外层 Agent 手工完成任务来替代工作流。
将本轮 toolchain.json 中 Node 与 SPEX CLI 的绝对路径、工作目录、证据目录和以下限制完整交接给内层；不假定其能看到本聊天或全局 node/npm。
为当前 Node.js Hello World 提取中文现状 SPEC，只覆盖 REQUIREMENTS.md 的 HELLO-01 与 src/hello.mjs、test/hello.test.mjs 展示的行为。只设一个最小业务包；本验收手册中的未来 --upper/HELLO-02 不进入当前规格，不新增其他参数或部署需求，不研究 Node 内部实现。
保留现有 LICENSE，不从测试身份推断版权；按已安装原版流程处理必要的 Git/许可种子、计划、独立审查、人工 Gate、样例校准、lint 与交接。允许仅在本地测试分支提交规格和必要环境文件，不修改产品源码或原测试，不推送、不建 PR，不修改工作流包。
收到真实人工 Gate 时向我展示本轮材料并等待；不要自动代我批准，不复用旧运行的批准。结束时报告原会话真实终态、规格和 Gate 证据、提交、lint、未解决问题。
```

**预期：** 新建完整 `specs/`，HELLO-01 有真实代码/测试证据、通过独立审查与 lint；原源码和测试哈希未变，原会话正常完成。完成 W-01。

### 16a. 若工作流要求批准提取计划（PROMPT，仅在阅读本轮计划后使用）

```text
我已阅读这条原会话本轮展示的提取计划，批准按 HELLO-01 的最小范围继续。不得把未来 HELLO-02 当作现状，不修改产品源码或原测试，不推送。请通过原 sessionId 的 continue 传达本次确认，不新开重复工作流。
```

### 16b. 若要求样例校准或篇幅例外（PROMPT，仅在实际稿件正确时使用）

```text
我已阅读本轮实际生成的 hello 样例规格及审查意见，确认它只描述 HELLO-01 的现状。批准这份实际稿件的校准；允许仅这个极小示例的规格篇幅超过业务源码，不把该例外推广到其他项目。保留待解决的真实问题，继续原会话的正常审查、交接和 lint。
```

实际稿件不正确就不能复制批准句；应在原会话指出具体问题。工作流只是在等待时记 WAITING。

## 17. 手动调用 decide（PROMPT）

```text
$sublang
沿用本轮隔离环境，在 playbook-demo 新建一条运行 sublang/playbooks@18.1.3 的 decide 原会话，保存 sessionId。仅设计 HELLO-02：恰好一个 --upper 参数时，stdout 必须是 UTF-8 字节 48 45 4c 4c 4f 0a，stderr 为空，退出码0；无参数 HELLO-01 不变，其他参数组合不新增约定。
将本轮 Node、SPEX CLI、项目与证据绝对路径，以及以下权限和停止条件写入真实 request-file 交接给内层。
按原版 decide 完成不同 Player 的独立提案、合成、设计决定、嵌套 review 和必要修订，更新 REQUIREMENTS.md 及已有 hello 业务规格，清理本范围内过时说明。本步不得实现 --upper，不修改产品源码或原测试。
允许本地设计提交，不推送、不建 PR，不修改工作流。仅有正常人工问题时再向我展示并在原会话继续。
最终报告原 decide 与原嵌套 review 的真实终态、设计提交、精确 evaluated revision、未解决 findings；不能另开一次 review 来冒充原流程完成。
```

**预期：** 新需求和设计进入 SPEC，独立审查完成；`--upper` 尚未实现，原 CLI 仍输出 hello。保存设计 SHA，完成 W-02。原终态不可核实时记 BLOCKED/未证明，不能因为设计文件存在就写 PASS。

## 18. 手动调用 code（PROMPT）

```text
$sublang
在同一本轮隔离环境中，新建 sublang/playbooks@18.1.3 的 code 原会话，只实现上一步已审定的 HELLO-02。保留 HELLO-01：默认仍输出 hello 加 LF，单独 --upper 输出 HELLO 加 LF。无第三方业务依赖，不扩展其他参数组合或功能。
明确把本轮 Node 绝对路径、项目、已批准设计提交与证据目录传给内层，不能依赖外层聊天或系统全局 node。
保留原集成测试，并补充至少一项实际子进程调用 --upper 的测试。必须二进制捕获 stdout/stderr，分别断言两种输入的精确 UTF-8 字节、stderr 空和退出码0，不用字符串 trim 或自动换行转换掩盖差异。
完成原版 code 的独立 review、必要修订和本地提交，不推送、不建 PR，不修改工作流。最终给出原 code 和嵌套 review 终态、实现提交、精确复审版本、真实命令与退出码、未解决 findings，并保存 sessionId。
```

**预期：** 两种输入各有真实 CLI 测试通过，原 review 正常完成且未解决问题为零，保存实现 SHA；完成 W-03。

## 19. 独立核对实现结果（PROMPT）

```text
读取本轮 run.json，用记录的 Node 执行材料仓库 scripts/assert-hello.mjs --project 本轮project绝对路径 --mode implemented，并在产品目录运行完整现有测试。保留生成的 evidence/hello-implemented-*.json。
核对默认 stdout 为 68656c6c6f0a，单独 --upper 为 48454c4c4f0a，stderr 均为空、退出码均0。只检查不修复；失败就保存证据并报告，不直接替 code 修改产品。本步是外部核对，不代替原 code 工作流及独立审查结果。
```

**预期：** 两项字节核对通过，产品工作区干净；不触发其他工作流。

## 20. 手动调用交付验收工作流（PROMPT）

```text
$sublang
在本轮隔离环境中，新建一条使用 yangbobo2021/app-delivery-acceptance@0.4.17 的 acceptance-orchestrate 原会话，保存 sessionId。只通过此业务总入口委托，不由外层 Agent 直接调用它的子流程或工具。
将本轮 Node、项目、实现 SHA、证据目录的真实绝对路径完整交接给总入口，供它继续向子工作流传递；不依赖外层聊天或全局 node。
读取本轮 REQUIREMENTS.md 与已审定 SPEC，创建新的验收身份；仅针对 HELLO-02 生成并采用场景，选择且只正式执行一个正常场景：真实启动 Node 执行 src/hello.mjs --upper，以二进制捕获验证 stdout 为 48 45 4c 4c 4f 0a、stderr 零字节、退出码0。
授权生成和冻结本范围需求与场景候选、准备隔离执行目录、生成或修补本轮测试用例，完成用例评估、正式执行、独立结果复审及报告导出后停止。代码覆盖率明确关闭；依实际已安装合同使用 coverage.policy=off，不自行发明字段。其他生成场景保留为未执行，HELLO-01 不算本次选定场景的正式验收。
固定本轮实现提交，不修改产品源码、原始需求或工作流，不降低断言，不推送、不建 PR。保留所有失败和正常恢复记录。
最终先报告 case-evaluation 的实际接收状态及是否存在结构校验错误，再列 AT/场景/用例 ID、正式执行命令/字节/退出码、独立复审和报告路径。退出0、ok:true、用例运行成功或一句“已完成”都不能替代全部证据。
```

**预期：** 新 AT 可追溯到实际实现 SHA；1 个选定场景有通过的用例评估、正式执行收据和独立结果复审；报告可定位；产品和需求未被验收阶段改变。完成 W-04。

## 21. 原会话结果过长或终态不明确时只读续查（PROMPT）

```text
$sublang
只读检查本轮已有 sessionId 和原记录，必要时在同一 acceptance-orchestrate 会话内继续询问已有 AT 的结果。不要创建新 AT，不重跑测试，不另开 review 替代原回执，不删除锁或改写会话文件。
摘要列出原工作流终态、用例评估实际接收状态/结构错误、正式执行与独立复审、报告和证据路径。无法证明的项明确标为未证明；历史失败保留。
```

**预期：** 原始证据可读；无法取得就如实记 BLOCKED，而不是把重跑成功当作原运行成功。

## 22. 填写最终验收记录（PROMPT）

```text
只根据本轮已保存的真实证据，填写 evidence/RESULTS.md。逐项给出 I-01/I-02、P-01、S-01、A-01、M-01 至 M-04、W-01 至 W-04 的 PASS/FAIL/BLOCKED/NOT_RUN，保留 WAITING 和失败历史。
记录两份 Skill 的路径和 SHA、宿主及 OS/架构、Agent/模型、三个包版本、所有工作流原 sessionId、设计/实现/复审 SHA、AT/场景/用例和报告路径。没有执行的宿主或平台不能判通过。
说明本轮只验证一个 Hello World 正常变化，不宣称全量产品验收；明确 Agent 首次自动继承功能尚未在 v1.0.0 实现，本次只测试显式配置。不上传凭据、整个 SPEX_HOME 或未脱敏的会话到公开仓库。不推送测试分支。
```

**预期：** 每个结论有证据，失败和缺口可见。整个验收由人逐步操作，没有进入 CI。

## 23. 结束后保留和清理（PROMPT）

```text
报告本轮材料目录、run 根目录、evidence 和测试 SPEX_HOME 的实际路径，列出仍在运行的本轮进程。只停止能确认属于本轮且已不需要的执行；保留工作流会话、Git历史、报告和失败证据。
默认不删除任何目录、不卸载技能、不清理真实个人配置。需要释放空间时先给出仅包含本轮路径的清理清单，由我另外决定。
```

## 常见偏差怎么记录

| 情况 | 正确处理 |
| --- | --- |
| Skill 已存在 | 不覆盖；从零安装项未覆盖，换新环境补验 |
| 只下载了 SKILL.md | 安装失败，补齐完整目录后重新记录 |
| GitHub 克隆失败 | 保留真实错误；不要求私有账号权限来掩盖公开仓库问题 |
| Node/npm 下载或原生依赖失败 | 记录依赖准备失败；不能写初始化通过 |
| API/市场认证或网络失败 | 与“无匹配”区分；不假装安装了公开包 |
| 内部实际 Agent/模型与本轮配置不同 | A-01 或对应 W 项失败，不能只依据外层聊天模型判通过 |
| 工作流正在人工 Gate | WAITING；由操作者看过实际稿件后回应原会话 |
| decide 原终态超时 | 保留原会话并续查；仍不可证明就不判 PASS |
| case-evaluation 有 validation error | W-04 不通过，即使 CLI 用例运行成功 |
| 工作流或包需要修复 | 本轮保留失败；修复后换明确的新版本与新 run，不热改已安装包 |

依据与已知限制见 [SOURCES-AND-LIMITS.md](docs/SOURCES-AND-LIMITS.md)。
