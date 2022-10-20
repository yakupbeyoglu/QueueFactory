import { functionJob } from "./functionJob";
import { baseJob } from "./baseJob";
import { processJob } from "./processJob";
import { redisConfig } from "../types/redisConfig";
import { workerListeners } from "../types/listeners/workerListeners";
import fs from 'fs';
export class jobFactory {
    public static build<U extends string | Function>(name: string, redisConfigs:redisConfig, handler: U, listeners:workerListeners, concurency?:number): baseJob {

        if (typeof handler == 'string') {
            if(!fs.existsSync(handler))
                throw new Error(handler + " is not exist or wrong path used !");
            return new processJob(name, redisConfigs, handler, listeners, (concurency == undefined ? undefined : concurency));
        }
        else if (typeof handler == 'function') {
            
            return new functionJob(name, redisConfigs, handler, listeners, (concurency == undefined ? undefined : concurency));
        }
        else
            throw new Error("The job type only be function or string !");
    }
}
