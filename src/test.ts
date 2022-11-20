import { Job } from "bullmq";

export default async function (job:Job) {
    console.log("HELLO PROCESS", job.data);
}
