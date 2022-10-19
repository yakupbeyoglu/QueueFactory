import { Job } from "bullmq";

export interface workerListeners {
    completed?: (job: Job, returnvalue: any) => Promise<any>;
    failed?: (job: Job, error: Error) => Promise<any>;
    progress?: (jobId: string, data: number | object) => Promise<any>;
}
