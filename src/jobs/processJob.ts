import { jobHandler } from "../types/jobHandler";
import { redisConfig } from "../types/redisConfig";
import { baseJob } from "./baseJob";

export class processJob extends baseJob {
    protected redisConfigs: redisConfig;

    constructor(handler: string, onCompleted:Function = undefined, onFail:Function = undefined) {
        super(onCompleted, onFail);
        
        // The sandbox process required dirname to run worker process
        if (!handler.includes(__dirname)) 
            handler = __dirname + '/' + handler;
        
        let job_handler = new jobHandler(handler);
        this.setWorker(job_handler);
        console.log("I AM process queue", job_handler.getType());

    }


}
