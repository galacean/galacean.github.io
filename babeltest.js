
const babel = require('@babel/core');

const result = babel.transformFileSync('./playground/spine.ts', {
  presets: [
    ["@babel/preset-env",
      {
        "loose": true,
        "modules": 'umd'
      }
    ],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "@babel/plugin-transform-modules-umd",
      {
        "globals": {
          "@oasis-engine/controls": "controlsssssss",
          "@oasis-engine/spine": "oasisSpine"
        },
        exactGlobals: true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties", { loose: true },
    ],
  ],
  filename: "index.ts",
});

console.log('result.code:', result.code);