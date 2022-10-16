import { jobHandler } from "../types/jobHandler";
import { redisConfig } from "../types/redisConfig";
import { Queue, Worker, JobsOptions, Backoffs } from 'bullmq'

export abstract class baseJob {
    private name: string;
    private queue: Queue;
    private worker: Worker;
    private onCompleted: Function;
    private onFail: Function;
    protected redisConfigs: redisConfig;
    private handler: jobHandler<any>;

    constructor(onCompleted: any, onFail: any) {
        this.onCompleted = onCompleted;
        this.onFail = onFail;
    }

    dispatch(data: any, delay: number, attempts: number = 1): baseJob {

        this.queue.add(this.name, data, {
            delay: delay,
            attempts: attempts,
            removeOnComplete: true,
            removeOnFail: false,
            backoff: {
                type: 'exponential'
            }
        });

        return this;
    }

    setWorker(handler: jobHandler<any>) {
        this.handler = handler;

        this.worker = new Worker(this.name, this.handler.getHandler());

        if (this.onCompleted != undefined) {
            this.worker.on('completed', (job) => {
                this.onCompleted.call(job);
            });
        }
        
        if (this.onFail != undefined) {
            this.worker.on('failed', (job) => {
                this.onFail.call(job);
            });
        }

    }

    getName() {
        return this.name;
    }
}
