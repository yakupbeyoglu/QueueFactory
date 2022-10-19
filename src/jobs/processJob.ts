import { jobHandler } from "../types/jobHandler";
import { workerListeners } from "../types/listeners/workerListeners";
import { redisConfig } from "../types/redisConfig";
import { baseJob } from "./baseJob";

export class processJob extends baseJob {
    protected handler: jobHandler<string>;

    constructor(name: string, redisConfigs: redisConfig, handler: string, listener?: workerListeners, concurency?: number) {
        super(name, redisConfigs, listener);

        console.log("HANDLER = ", handler);
        this.handler = new jobHandler(handler);
        this.setWorker(this.handler);
        if (concurency != undefined)
            this.worker.concurency = concurency;

        console.log("I AM process job", this.handler.getType());

    }


}
