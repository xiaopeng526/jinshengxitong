module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "max-lines": [
      "error",
      {
        max: 600,
        skipComments: true,
        skipBlankLines: true
      }
    ],
    complexity: ["error", 20],
    "no-cond-assign": "error",
    "prefer-const": "error",
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_"
      }
    ]
    // "max-nested-callbacks": ["error", 3],
    // "max-lines-per-function": [
    //   "error",
    //   { max: 50, IIFEs: false, skipComments: true, skipBlankLines: true }
    // ]
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
