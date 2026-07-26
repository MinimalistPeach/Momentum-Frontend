import { GeneratorConfig } from "ng-openapi";

const config: GeneratorConfig = {
    input: "http://localhost:3000/api-json",
    output: "./api",
    options: {
        dateType: "Date",
        enumStyle: "enum",
    },
};

export default config;