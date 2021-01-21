export const deepCopyObj = <T>(arg: T) => <T>JSON.parse(JSON.stringify(arg));
