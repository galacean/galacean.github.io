# Oasis Engine Site

The documentation source of [Oasis Engine](https://github.com/oasis-engine/engine).

### Development

#### Steps

1. Clone the engine repository to local (if you have done, please skip to next step):

```bash
git clone git@github.com:oasis-engine/engine.git
cd engine
npm i
npm run b:types
```

2. `cd` to this site repository, modify the `typedocSource`  field value in `siteconfig.json` file:

```json
  "typedocSource": "{ENGINE_REPOSITORY_PATH}",
```

Then run:

```bash
$ npm install
$ npm run bootstrap
$ npm run dev
```

OK, visit http://localhost:8000 .

#### How to insert a playground in markdown
```
// leave a blank line here
<playground src="buffer-mesh-instance.ts"></playground>
```

### Deploy

1. Build the public content:

```bash
$ npm run build
```

2. Copy the files in `public` directory to the root of `gh-pages` branch.



### Playground

#### How to development
```bash
npm run playground
```

#### How to link
* Mac
```bash
npm link ../engine/packages/* --no-package-lock
```
* windows
```bash
npm link ..\engine\packages\oasis-engine --no-package-lock
```