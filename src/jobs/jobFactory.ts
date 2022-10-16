import { functionJob } from "./functionJob";
import { baseJob } from "./baseJob";
import { processJob } from "./processJob";
import { redisConfig } from "../types/redisConfig";


export class jobFactory {
    public static build<U extends string | Function>(name: string, handler: U, onCompleted: any, onFail: any): baseJob {
        const configs: redisConfig = {
            redisHost: process.env.REDIS_HOST as string,
            redisPort:parseInt(process.env.REDIS_PORT as string),
            redisPassword: process.env.REDIS_PASSWORD as string
        };
        // ame: string, redisConfigs: redisConfig, handler: string, onCompleted?: Function, onFail?: Function
        if (typeof handler == 'string') {
            return new processJob(name, configs, handler, onCompleted, onFail);
        }
        else if (typeof handler == 'function') {
            console.log("YES");
            return new functionJob(name, configs, handler, onCompleted, onFail);
        }
        else
            throw new Error("The job type only be function or string !");
    }
}
