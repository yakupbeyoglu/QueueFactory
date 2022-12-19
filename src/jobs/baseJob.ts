import { jobHandler } from "../types/jobHandler";
import { redisConfig } from "../types/redisConfig";
import { Queue, Worker } from 'bullmq';
import { workerListeners } from "../types/listeners/workerListeners";

export abstract class baseJob {
    private name: string;
    private queue: Queue;
    protected worker: any;
    private workerListeners?: workerListeners;
    private connection: any;
    protected handler: any;

    constructor(name: string, redisConfigs: redisConfig, workerListeners?: workerListeners) {
        this.name = name;
        // set worker events handlers
        this.workerListeners = workerListeners;
        this.connection = {
            host: redisConfigs.redisHost,
            port: redisConfigs.redisPort,
            password: redisConfigs.redisPassword
        };

        this.queue = new Queue(this.name, {
            connection: this.connection
        });
    }

    dispatch(data: any, delay: number = 0, attempts: number = 1, lifo: boolean = false): baseJob {
        this.queue.add(this.name, data, {
            delay: delay,
            attempts: attempts,
            removeOnComplete: true,
            removeOnFail: false,
            backoff: {
                type: 'exponential'
            },
            lifo: lifo
        });
        return this;
    }

    setWorker(handler: jobHandler<any>, concurency?: number) {
        this.handler = handler;

        this.worker = new Worker(this.name, this.handler.getHandler(), { connection: this.connection, concurrency: concurency == undefined ? 1 : concurency });
        if (this.workerListeners != undefined)
            this.setWorkerEvents(this.workerListeners);
    }

    setWorkerEvents(listeners: workerListeners) {
        this.workerListeners = listeners;

        if (this.workerListeners.completed != undefined)
            this.worker.on('completed', this.workerListeners.completed);

        if (this.workerListeners.failed != undefined)
            this.worker.on('failed', this.workerListeners.failed);

        if (this.workerListeners.progress != undefined)
            this.worker.on('progress', this.workerListeners.progress);
    }

    getName() {
        return this.name;
    }

    public closeCluster() {
        this.queue.close();
        this.worker.close();
    }
}
