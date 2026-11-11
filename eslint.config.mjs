import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  { rules: { "react/no-unescaped-entities": "off" } },
  { ignores: [".next/**", "node_modules/**", ".impeccable/**"] },
];

export default eslintConfig;
