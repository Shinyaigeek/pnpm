import loadJsonFile from 'load-json-file'
import * as retry from '@zkochan/retry'

export default async <T>(filePath: string): Promise<T> => {
  const operation = retry.operation({})

  return new Promise<T>((resolve, reject) => {
    operation.attempt(async (currentAttempt) => {
      try {
        resolve(await loadJsonFile<T>(filePath))
      } catch (err: any) { // eslint-disable-line
        if (operation.retry(err)) {
          return
        }
        reject(err)
      }
    })
  })
}
