---
order: 0
title: Overview
type: Basics
label: Basics
---

## Overview

**Galacean** is a web-first and mobile-first high-performance real-time interactive solution，Use component system design and pursue ease of use and light weight. Developers can independently use and write Typescript scripts to develop projects using pure code.It contains [Rendering](${docs}mesh-renderer), [Physics](${docs}physics-overall), [Animation](${docs}animator) and [Interaction](${docs}input) Function，and it provides a visual online editor with a complete workflow to help you create gorgeous 2D/3D interactive applications on the browser.

**Galacean** consists of three parts:

- [Galacean Engine](https://github.com/galacean/engine)
- [Galacean Toolkit](https://github.com/galacean/engine-toolkit)
- [Galacean Editor](https://galacean.antgroup.com/editor)

Learn more about **Galacean** abilities from the following sources:

- [Engine Documentation](${docs}install): In-depth understanding of the various functional modules of the engine.
- [Editor Documentation](${docs}editor): Learn how to use the editor, create, author and export 2D and 3D projects.
- [Example](https://antg.antgroup.com/#/examples/latest/background): Browse examples of various functions of the engine and support online debugging.
- [Artist Documentation](${docs}artist-scene-standard): View scene specifications and artist tutorials.

## Compatibility

**Galacean Engine** can run in an environment that supports WebGL, and so far, all major mobile and desktop browsers support this standard. The compatibility of the operating environment can be checked on [CanIUse](https://caniuse.com/?search=webgl).

![npm-init](https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*8Ed3RZfVmbgAAAAAAAAAAAAADleLAQ/original)

In addition, **Galacean Engine** also supports [Alipay/Taobao Mini Program](${docs}miniprogram), and some developers have contributed [WeChat Mini Program/Game Adaptation Solution](https://github.com/deepkolos/platformize).

For some functional modules that require additional consideration of compatibility, the current adaptation scheme is as follows:

| Module                            | Compatibility                                                 | Details                                                                               |
| :------------------------------ | :------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| [Input](${docs}input)      | [PointerEvent](https://caniuse.com/?search=PointerEvent) | Please refer to [polyfill-pointer-event](https://github.com/galacean/polyfill-pointer-event) |
| [PhysX](${docs}physics-overall) | [WebAssembly](https://caniuse.com/?search=wasm)          | Needs to support WebAssembly                                            |

## Workflow

If you want to start a small project in the form of pure code, you can refer to [Install Galacean Engine](${docs}install) for quick setup. But for more complex projects, we **recommend using the editor for visual development**, because **through the editor, technology and art students can collaborate better**, you can go to [editor home page](https://galacean.antgroup.com/editor) quickly start the development of the first project through the project template, [more editor capabilities](${docs}editor) look forward to your exploration.


![npm-init](https://mdn.alipayobjects.com/huamei_jvf0dp/afts/img/A*WuTjTYbNTtcAAAAAAAAAAAAADleLAQ/original)

## Version

### Version management

Taking `@galacean/engine` as an example, developers can find it in [Github](https://github.com/galacean/engine/releases) or [NPM](https://www.npmjs.com/package/@galacean/engine?activeTab=versions) where:

- alpha: internal beta version, used for early function development, with new features within milestones but poor stability, such as [1.0.0-alpha.6](https://www.npmjs.com/package/@galacean/engine/v/1.0.0-alpha.6)
- beta: public beta version, the internal testing has been basically completed, the stability is strong, but there may still be fewer problems and defects, such as [1.0.0-beta.8](https://www.npmjs.com/package/@galacean/engine/v/1.0.0-beta.8)
- stable: Official stable version, after long-term testing and verification, no major defects, recommended version that can be put into production, such as [0.9.8](https://www.npmjs.com/package/@galacean/engine/v/0.9.8)

### Dependencies between NPM repositories

In the same project, please ensure that the version of [Engine Core Architecture Logic Subpackage](https://github.com/galacean/engine/tree/main/packages) is the same, [toolkit](https://github.com/galacean/engine-toolkit) must be consistent with the major version of the used engine, taking the 1.0.x version of the engine as an example, it needs to be used with the 1.0.y version of the toolkit.

### Version upgrade

[Version Upgrade Guide](https://github.com/galacean/engine/wiki/Migration-Guide) will be released synchronously during each milestone version update iteration, which contains the content of this update and BreakChange, which can be based on this document Perform version update iterations.

## Open source co-construction

**Galacean** is eager to build an interactive engine with developers, all development processes, including [planning](https://github.com/galacean/engine/projects?query=is%3Aopen), [milestone](https://github.com/galacean/engine/milestones), [architecture design] (https://github.com/galacean/engine/wiki/Physical-system-design), all of which are publicly available on GitHub In project management, developers can [create an issue](https://docs.github.com/zh/issues/tracking-your-work-with-issues/creating-an-issue) and [submit a PR](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) to participate in the construction of the engine.

## Community and Discussion Board

If you have questions or need help, you can join the DingTalk group (group number: 31065609) or [discussion area] (https://github.com/orgs/galacean/discussions) for help.
