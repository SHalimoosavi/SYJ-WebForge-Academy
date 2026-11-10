import {writeFile} from 'node:fs/promises';

export async function writeReviewExport(path,lines){
 await writeFile(path,lines.join('\n')+'\n',{mode:0o600});
}
