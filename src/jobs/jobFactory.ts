import { functionJob } from "./functionJob";
import { baseJob } from "./baseJob";
import { processJob } from "./processJob";
import { redisConfig } from "../types/redisConfig";


export class jobFactory {
    public static build<U extends string | Function>(name: string, redisConfigs:redisConfig, handler: U, onCompleted: any, onFail: any): baseJob {

        if (typeof handler == 'string') {
            return new processJob(name, redisConfigs, handler, onCompleted, onFail);
        }
        else if (typeof handler == 'function') {
            return new functionJob(name, redisConfigs, handler, onCompleted, onFail);
        }
        else
            throw new Error("The job type only be function or string !");
    }
}
