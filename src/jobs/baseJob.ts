import { jobHandler } from "../types/jobHandler";
import { redisConfig } from "../types/redisConfig";
import { Queue, Worker } from 'bullmq'

export abstract class baseJob {
    private name: string;
    private queue: Queue;
    private worker:Worker;
    protected redisConfigs: redisConfig;
    protected handler: jobHandler<any>;

    dispatch(data:any, delay:any, repeat : any = 3) : baseJob{
        return this;
    }
}
