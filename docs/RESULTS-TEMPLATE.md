# 手动验收记录

状态：PASS / FAIL / BLOCKED / NOT_RUN；真实人工等待记 WAITING，不能写 PASS。
本记录由验收执行者维护，不要求用户复制技术内容到 Prompt。

| 环境 | 记录 |
| --- | --- |
| 日期、OS/架构、宿主/版本、Git | |
| 当前可靠模型及来源；未知时采用的约定默认值 | |
| 两个 Skill 的实际安装路径、origin、tag、SHA、宿主发现 | |
| 材料修订、ref/SHA、被测项目、空项目和证据路径 | |
| 正常个人 SPEX_HOME、是否已有状态/自定义覆盖 | |
| setup 返回 Node、CLI、runtime、protocolVersion、SPEX CLI 版本 | |
| 首次请求前是否预配置；若有，首次场景不可判通过 | |
| 实际 Captain、全部 Player、角色覆盖、readiness、配置路径 | |
| 其他 OS/宿主组合 | NOT_RUN |

| ID | 手册步骤 | 检查项 | 状态 | 实际证据/会话/提交 |
| --- | --- | --- | --- | --- |
| I-01 | 1 | SPEC Skill 完整安装、宿主发现 | NOT_RUN | |
| I-02 | 2 | SubLang 完整安装、运行时、宿主发现 | NOT_RUN | |
| S-01 | 3 | 空项目中文 SPEC、当前宿主指令、语义和 lint | NOT_RUN | |
| P-01 | 4 | 独立 Hello、原测试、字节基线、Git/哈希 | NOT_RUN | |
| A-01 | 5起 | 首次自动选择 Agent/模型、固定及新 Player 继承 | NOT_RUN | |
| M-01 | 5 | 市场搜索 extract-specs，未安装 | NOT_RUN | |
| M-02 | 6 | 项目安装 extract-specs 0.3.0 | NOT_RUN | |
| M-03 | 7 | 市场搜索 app-delivery-acceptance，未安装 | NOT_RUN | |
| M-04 | 8 | 项目安装 app-delivery-acceptance 0.4.17，四入口可用 | NOT_RUN | |
| W-01 | 9 | extract-specs 原流程、Gate、审查、lint | NOT_RUN | |
| W-02 | 10 | decide 原流程/嵌套 review、设计未实现 | NOT_RUN | |
| W-03 | 11 | code 原流程/review、实现和独立字节核对 | NOT_RUN | |
| W-04 | 12 | acceptance-orchestrate 评估接收、执行、复审、报告 | NOT_RUN | |

## 首次使用缺口与停止点

- 首次搜索真实输入/输出：待填。
- 默认配置是否满足要求：待填；SubLang v1.0.3 应自行完成首次初始化，不能靠预配置变绿。
- A-01 的选择、继续使用稳定性、新 Player 继承、凭据变化后不重设分别记录；未实测子项写 NOT_RUN。
- 静态 readiness 与模型真实调用结果分开：待填。
- 失败时停止主路线，后续 NOT_RUN；另行授权的显式配置补充验证独立列出，不覆盖原失败。

## 四个工作流证据

每项保存：实际包/版本、selected_workflow、原 sessionId 和终态、Agent/模型、人工确认、设计/实现/精确复审 SHA、真实命令和退出码、失败/恢复记录。
验收另存：AT/场景/用例 ID、case-evaluation 接收状态及结构错误、正式收据、stdout/stderr 字节、退出码、独立复审和报告路径。
不拿另开 review 或重复执行代替原结果。

## 范围与清理

- 仅覆盖当前实际组合及最小 Hello 变化；四工作流是否全部通过：待填。
- 本轮创建的安装、缓存、项目和数据清单：待填。
- 默认保留；如获清理授权，记录实际删除和保留项，不保留凭据副本。
