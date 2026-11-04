# 手动验收记录

状态只能填写：PASS / FAIL / BLOCKED / NOT_RUN。等待中的人工确认写 WAITING，不能写 PASS。

| 环境 | 记录 |
| --- | --- |
| 操作者、日期、OS/架构 | |
| 宿主（Codex 或 Claude Code）及版本 | |
| 宿主选择的模型；工作流实际配置的模型 | |
| 两个 Skill 的绝对路径、Git SHA | |
| 材料仓库 SHA、run.json 路径 | |
| 本轮隔离 SPEX_HOME | |
| Node、Git、SPEX CLI 版本 | |
| 三个包的实际版本 | |

| ID | 检查项 | 状态 | 证据路径 / 会话ID / 提交 |
| --- | --- | --- | --- |
| I-01 | 从 GitHub 安装 SPEC Skill，宿主发现 | NOT_RUN | |
| I-02 | 从 GitHub 完整安装 SubLang，初始化和宿主发现 | NOT_RUN | |
| P-01 | 独立目录创建及原始 Hello 基线 | NOT_RUN | |
| S-01 | SPEC Skill 初始化，业务规格及 lint | NOT_RUN | |
| A-01 | 明确配置并核对 Captain / 所有 Player | NOT_RUN | |
| M-01 | 市场搜索 extract-specs，未产生安装 | NOT_RUN | |
| M-02 | 安装 extract-specs 0.3.0，入口可用 | NOT_RUN | |
| M-03 | 市场搜索 app-delivery-acceptance，未产生安装 | NOT_RUN | |
| M-04 | 安装 app-delivery-acceptance 0.4.17，入口可用 | NOT_RUN | |
| W-01 | extract-specs：原会话完成、人工 Gate、审查、lint | NOT_RUN | |
| W-02 | decide：原会话及嵌套 review 完成，未实现 | NOT_RUN | |
| W-03 | code：实现、真实 CLI 两种输入、独立 review | NOT_RUN | |
| W-04 | acceptance-orchestrate：1场景、用例评估、执行、独立复审、报告 | NOT_RUN | |

## 各工作流的证据

对 W-01 至 W-04 分别填写：sessionId、实际包/版本、真实终态、最终答复、Git 提交、精确复审修订、Agent/模型、人工确认内容、失败/恢复记录。不能用另一条新会话的结果代替原会话终态。

验收工作流另外填写：AT ID、场景 ID、用例 ID、用例评估实际接收状态、正式执行收据、stdout/stderr 原始字节、退出码、独立结果复审、报告路径。代码覆盖率关闭；用例评估的覆盖充分性仍须核对。

## 总结

- 本轮仅代表此 OS、宿主、版本和最小案例。
- 四工作流是否全部通过：待填写。
- 未执行的其他环境组合：待填写。
- 已知失败、阻断、恢复及剩余问题：待填写。
