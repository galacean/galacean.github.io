This repository is archived. The documentation source of Galacean Engine has been moved to [galacean/engine](https://github.com/galacean/engine/docs).

# Galacean Site

The documentation source of [Galacean Engine](https://github.com/galacean/engine).

## Development
#### Develop site

```bash
$ yarn
$ yarn dev

open http://local.alipay.net
```
#### Only develop playground
```bash
$ yarn playground
```
## Deploy
```bash
$ yarn build
```

## Q&A
#### How to insert a playground in markdown
```
// leave a blank line here
<playground src="buffer-mesh-instance.ts"></playground>
```
#### How to link engine
* Mac
```bash
$ yarn link ../engine/packages/*
```
* windows
```bash
$ yarn link ..\engine\packages\galacean
```

