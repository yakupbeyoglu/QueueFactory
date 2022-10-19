import { config } from "dotenv";
import { functionJob } from "./src/jobs/functionJob";
import { jobFactory } from "./src/jobs/jobFactory";
import { redisConfig } from "./src/types/redisConfig";
require('dotenv').config();

async function test(job: any, error ?: any) {
    console.log("Hello my data =>", job.id);
}

async function complete(job: any, error ?: any) {
    console.log("JOB COMPLETED", job.name);
}

async function fail(job: any, error ?: any) {
    console.log("JOB FAILED", job);
}

// redisConfigs: redisConfig, handler: Function, onCompleted: Function = undefined, onFail: Function = undefined

const configs: redisConfig = {
    redisHost: process.env.REDIS_HOST as string,
    redisPort: parseInt(process.env.REDIS_PORT as string),
    redisPassword: process.env.REDIS_PASSWORD as string
};
const my_function_job = jobFactory.build("yakup-factory", configs, test, complete, fail);
my_function_job.dispatch({ name: "TEST" });
const my_function_job2 = jobFactory.build("yakup-factory-2", configs, __dirname + "/src/test.ts", complete, fail);
for (var i = 0; i < 10; i++)
    my_function_job2.dispatch({ name: "TEST" + i });
