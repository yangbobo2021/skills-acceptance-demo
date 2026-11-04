# 两个 Skill 的手动交付验收

从“已安装并登录 Codex／Claude Code，但未安装目标 Skill”开始，经 GitHub 安装两个 Skill，再验证 SPEC 初始化和四个 Playbook。

**操作文档：[MANUAL-ACCEPTANCE.md](MANUAL-ACCEPTANCE.md)**

目标操作日期：2026-11-05，Asia/Shanghai；材料准备于 2026-11-04。

| 被测项 | 固定来源 |
| --- | --- |
| SPEC Skill | [spex-spec-workflow v1.0.0](https://github.com/yangbobo2021/spex-spec-workflow/tree/v1.0.0) |
| 工作流 Skill | [sublang-skill v1.0.0](https://github.com/yangbobo2021/sublang-skill/tree/v1.0.0) |
| 提取规格 | `merico-ai/extract-specs@0.3.0`，先搜索后安装 |
| 设计决策 | `sublang/playbooks@18.1.3` 的 `decide` |
| 实现 | `sublang/playbooks@18.1.3` 的 `code` |
| 交付验收 | `yangbobo2021/app-delivery-acceptance@0.4.17`，先搜索后安装，入口 `acceptance-orchestrate` |

最小案例：当前程序输出 `hello\n`；先提取现状规格，再设计并实现单独的 `--upper` 参数，输出 `HELLO\n`，最后只验收该新增正常场景。

`scripts/prepare-fixtures.mjs` 只生成独立目录和基线提交；`scripts/assert-hello.mjs` 只做真实 CLI 字节检查。两者均不执行 Playbook，不替代人工验收。

**四工作流不得放入 CI，也不得由本材料自动运行。** 本仓库没有 CI 工作流。

历史选择依据与已知限制见 [docs/SOURCES-AND-LIMITS.md](docs/SOURCES-AND-LIMITS.md)。版本固定见 [versions.json](versions.json)。
