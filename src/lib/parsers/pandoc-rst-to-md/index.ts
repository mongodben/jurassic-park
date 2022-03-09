import fs from 'fs';
import path from 'path';
import util from 'util';
import { exec as execNoPromise } from 'child_process';
import { homedir } from 'os';

const exec = util.promisify(execNoPromise);

async function rstToMd(inputRst: string): Promise<string> {
  const timestamp = Date.now().toString();
  const tempDir = 'tmp_' + timestamp;
  const tempDirPath = path.join(homedir(), tempDir);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }
  try {
    const tempRstFilePath = path.join(
      tempDirPath,
      Date.now().toString() + '.rst',
    );
    fs.writeFileSync(tempRstFilePath, inputRst);
    const args = `pandoc ${tempRstFilePath} -f rst -t gfm --standalone`;
    const { stdout, stderr } = await exec(args);
    if (stderr) {
      console.log('there was an error with pandoc at stderr:');
      console.log(stderr);
      throw new Error(stderr);
    }
    return stdout;
  } catch (err: any) {
    console.error('error parsing RST to MD');
    console.error(err);
    throw new Error(err);
  } finally {
    // md conversion clean up
    fs.rmSync(tempDirPath, { recursive: true, force: true });
  }
}

export default rstToMd;
