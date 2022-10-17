import { jobHandler } from "../types/jobHandler";
import { redisConfig } from "../types/redisConfig";
import { Queue, Worker, JobsOptions, Backoffs } from 'bullmq'

export abstract class baseJob {
    private name: string;
    private queue: Queue;
    protected worker: any;
    private onCompleted: any;
    private onFail: any;
    private connection: any;
    protected handler: any;

    constructor(name: string, redisConfigs: redisConfig, onCompleted: any, onFail: any) {
        this.name = name;
        this.onCompleted = onCompleted;
        this.onFail = onFail;
        this.connection = {
            host: redisConfigs.redisHost,
            port: redisConfigs.redisPort,
            password: redisConfigs.redisPassword
        };
        this.queue = new Queue(this.name, {
            connection: this.connection
        });

    }

    dispatch(data: any, delay: number = 0, attempts: number = 1): baseJob {

        this.queue.add(this.name, data, {
            delay: delay,
            attempts: attempts,
            removeOnComplete: true,
            removeOnFail: false,
            backoff: {
                type: 'exponential'
            },
        });

        return this;
    }

    setWorker(handler: jobHandler<any>) {
        this.handler = handler;
        this.worker = new Worker(this.name, this.handler.getHandler(), { connection: this.connection });
        
        if (this.onCompleted != undefined) {
            this.worker.on('completed', this.onCompleted);
        }

        if (this.onFail != undefined) {
            this.worker.on('failed', (job: any) => {
                this.onFail.call(job.id);
            });
        }

    }

    getName() {
        return this.name;
    }
}
