# Oasis Engine Site

The documentation source of [Oasis Engine](https://github.com/oasis-engine/engine).

## Development
#### Develop site

```bash
$ yarn
$ yarn dev
```
#### Only develop playground
```bash
yarn playground
```
## Deploy
```bash
$ yarn build
```
## Deploy
```bash
$ yarn deploy
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
yarn link ../engine/packages/*
```
* windows
```bash
yarn link ..\engine\packages\oasis-engine
```