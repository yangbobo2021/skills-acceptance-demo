# Hello World 基线

这是一个无第三方依赖的 Node.js 命令行程序，当前唯一需求是 [HELLO-01](REQUIREMENTS.md)。

```sh
node src/hello.mjs
```

预期 stdout 为 `hello` 加 LF，stderr 为空，退出码为 0。

```sh
node --test test/hello.test.mjs
```

已有一项通过真实子进程验证默认输出的测试。
没有 `specs/`；未来功能不属于当前行为，不应从仓库外的验收手册反向提取为已有需求。
Node.js 可使用 SubLang Skill 初始化返回的绝对路径，无需全局 npm 包。
