
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export const executeCommand = async (command: string): Promise<any> => {
    try {
        const { stdout, stderr } = await execPromise(command);
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return [false, stderr]
        }
        console.log(`Stdout: ${stdout}`);
        return [true, stdout]
    } catch (error:any) {
        console.error(`Error: ${error?.message}`);
        return [false, error?.message]
    }
};