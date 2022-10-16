import { jobHandler } from "../types/jobHandler";
import { redisConfig } from "../types/redisConfig";
import { baseJob } from "./baseJob";

export class functionJob extends baseJob {
    protected redisConfigs: redisConfig;

    constructor(redisConfigs: redisConfig, handler: Function, onCompleted: Function = undefined, onFail: Function = undefined) {
        super(onCompleted, onFail);

        this.redisConfigs = redisConfigs;
        
        // The sandbox process required dirname to run worker process
        let job_handler = new jobHandler(handler);
        this.setWorker(job_handler);
        console.log("I AM process queue", job_handler.getType());
    }


}
