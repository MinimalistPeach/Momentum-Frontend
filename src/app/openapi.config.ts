import { GeneratorConfig } from "ng-openapi";
import { environment } from "../environments/environment";

const config: GeneratorConfig = {
    input: environment.apiUrl+"/api-json",
    output: "./api",
    options: {
        dateType: "Date",
        enumStyle: "enum",
    },
};

export default config;