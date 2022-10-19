import { jobHandler } from "../types/jobHandler";
import { redisConfig } from "../types/redisConfig";
import { baseJob } from "./baseJob";

export class functionJob extends baseJob {

    protected handler: jobHandler<Function>
    constructor(name: string, redisConfigs: redisConfig, handler: Function, onCompleted: any, onFail: any,  concurency?:number) {
        super(name, redisConfigs, {completed:onCompleted, failed:onFail});
        this.handler = new jobHandler(handler);
        this.setWorker(this.handler, concurency);
    }
}
