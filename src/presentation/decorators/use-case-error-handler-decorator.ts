export function UseCaseErrorHandlerDecorator() {
  return function (target: any) {
    const originalMethod = target.prototype.execute

    target.prototype.execute = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args)
      } catch (result: any) {
        return result
      }
    }
  }
}
