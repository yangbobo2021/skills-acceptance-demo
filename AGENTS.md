# Acceptance material maintenance

- This repository contains manual acceptance instructions and small fixtures for two public Skills.
- The four Playbooks (`extract-specs`, `decide`, `code`, `acceptance-orchestrate`) are manual acceptance only. Do not add their execution to CI, scheduled jobs, fixture scripts or automated tests.
- Material preparation and deterministic fixture checks are separate from acceptance. Do not report them as model/Playbook execution results.
- Preserve the baseline fixture without `specs/` or an implemented `--upper` feature. Generate each operator's run in a separate directory.
- Do not publish operators' credentials, SPEX homes, generated evidence or test-run workspaces.
