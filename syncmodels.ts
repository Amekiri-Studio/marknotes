import { syncModels, close } from './src/database'

const executeCommand = async() => {
    await syncModels({force: true});
    await close();
}

executeCommand();