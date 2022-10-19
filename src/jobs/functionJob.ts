import { jobHandler } from "../types/jobHandler";
import { workerListeners } from "../types/listeners/workerListeners";
import { redisConfig } from "../types/redisConfig";
import { baseJob } from "./baseJob";

export class functionJob extends baseJob {

    protected handler: jobHandler<Function>
    constructor(name: string, redisConfigs: redisConfig, handler: Function, listeners?:workerListeners,  concurency?:number) {
        super(name, redisConfigs, listeners);
        this.handler = new jobHandler(handler);
        this.setWorker(this.handler, concurency);
    }
}
