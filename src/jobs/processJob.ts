import { jobHandler } from "../types/jobHandler";
import { redisConfig } from "../types/redisConfig";
import { baseJob } from "./baseJob";

export class processJob extends baseJob {
    protected handler: jobHandler<string>;

    constructor(name: string, redisConfigs: redisConfig, handler: string, onCompleted: any, onFail: any, concurency?: number) {
        super(name, redisConfigs, { completed: onCompleted, failed: onFail });

        console.log("HANDLER = ", handler);
        this.handler = new jobHandler(handler);
        this.setWorker(this.handler);
        if (concurency != undefined)
            this.worker.concurency = concurency;

        console.log("I AM process job", this.handler.getType());

    }


}
