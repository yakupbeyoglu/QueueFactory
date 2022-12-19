import { functionJob } from "./functionJob";
import { baseJob } from "./baseJob";
import { processJob } from "./processJob";
import { redisConfig } from "../types/redisConfig";
import { workerListeners } from "../types/listeners/workerListeners";
import fs from 'fs';
import { QueueFactory } from "../types/common";
export class jobFactory {

    public static worker_map: Map<string, baseJob>;


    public static build<U extends string | Function>(name: string, redisConfigs: redisConfig, handler: U, listeners?: workerListeners, concurency?: number): baseJob {
        if (jobFactory.worker_map == undefined)
            jobFactory.worker_map = new Map<string, baseJob>([]);

        if (jobFactory.worker_map.has(name))
            throw new Error("Worker " + name + " is already exist");

        let job: baseJob;
        if (typeof handler == 'string') {
            if (!fs.existsSync(handler))
                throw new Error(handler + " is not exist or wrong path used !");
            job = new processJob(name, redisConfigs, handler, listeners, concurency);
        }
        else if (typeof handler == 'function') {
            job = new functionJob(name, redisConfigs, handler, listeners, concurency);
        }
        else {
            throw new Error("The job type only be function or string !");
        }
        jobFactory.worker_map.set(name, job);
        return job;
    }

    public static CloseConnections() {
        jobFactory.worker_map.forEach(element => {
            element.closeCluster();
        });
    }

}
