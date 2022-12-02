import { WebGLEngine } from "oasis-engine";

//@ts-ignore
window.cypressEnv = {};
export const registerEngineForE2E = (engine: WebGLEngine) => {
  //@ts-ignore
  window.cypressEnv.engine = engine;
}
