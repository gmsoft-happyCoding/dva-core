import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import filesize from "rollup-plugin-filesize";

const globals = {
  redux: "Redux",
  "redux-saga": "ReduxSaga"
};

export default [
  // UMD Development
  {
    input: "src/index.js",
    output: {
      file: "dist/dva-core.js",
      format: "umd",
      name: "DvaCore",
      indent: false,
      sourcemap: true,
      globals
    },
    external: Object.getOwnPropertyNames(globals),
    plugins: [
      nodeResolve({
        jsnext: true,
        main: true
      }),
      commonjs(),
      babel({
        runtimeHelpers: true,
        exclude: "node_modules/**"
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("development")
      }),
      filesize()
    ]
  },

  // UMD Production
  {
    input: "src/index.js",
    output: {
      file: "dist/dva-core.min.js",
      format: "umd",
      name: "DvaCore",
      indent: false,
      sourcemap: true,
      globals
    },
    external: Object.getOwnPropertyNames(globals),
    plugins: [
      nodeResolve({
        jsnext: true,
        main: true
      }),
      commonjs(),
      babel({
        exclude: "node_modules/**",
        runtimeHelpers: true
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      }),
      filesize()
    ]
  }
];
