import { jobHandler } from "../types/jobHandler";
import { redisConfig } from "../types/redisConfig";
import { baseJob } from "./baseJob";

export class processJob extends baseJob {
    protected handler:jobHandler<string>;

    constructor(name:string, redisConfigs:redisConfig, handler: string, onCompleted:Function , onFail:Function) {
        super(name, redisConfigs, onCompleted, onFail);

        // The sandbox process required dirname to run worker process
        if (!handler.includes(__dirname)) 
            handler = __dirname + '/../' + handler;
        console.log("HANDLER = ", handler);
        this.handler = new jobHandler(handler);
        this.setWorker(this.handler);

        console.log("I AM process job", this.handler.getType());

    }


}
