import * as e2eRepository from '../repositories/e2eRepository.js'

export async function reset() {
    await e2eRepository.reset();
}