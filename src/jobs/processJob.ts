import { jobHandler } from "../types/jobHandler";
import { redisConfig } from "../types/redisConfig";
import { baseJob } from "./baseJob";

export class processJob extends baseJob {
    protected redisConfigs: redisConfig;
    protected handler: jobHandler<string>;

    constructor(handler: string) {
        super();
        this.handler = new jobHandler(handler);
        console.log("I AM process queue", this.handler.getType());
    }


}
