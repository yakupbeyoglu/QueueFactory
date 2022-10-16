import { jobHandler } from "../types/jobHandler";
import { redisConfig } from "../types/redisConfig";
import { baseJob } from "./baseJob";

export class functionJob extends baseJob {

    protected handler:jobHandler<Function>
    constructor(name:string, redisConfigs: redisConfig, handler: Function, onCompleted: any, onFail: any) {
        super(name,redisConfigs, onCompleted, onFail);
        this.handler = new jobHandler(handler);
        this.setWorker(this.handler);
        console.log("I AM process queue", this.handler.getType());
    }


}
