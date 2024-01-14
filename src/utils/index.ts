import { ACCESS_TOKEN } from "./constants";

export const concatUrl = (...args: (string | null | undefined)[]): string => {
    let result = "";

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        if (!arg || arg.trim() === '') {
            continue;
        }
        const trimmedArg = arg.startsWith('/') ? arg.substr(1) : arg;

        result = result.endsWith('/') ?
            result + trimmedArg :
            result + (result !== "" ? "/" : "") + trimmedArg;
    }
    return result;
}

export const modifyHeader =  (headerShown = true) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!headerShown) {
        return {};
    }
    return token ? { Authorization: `Bearer ${token}` } : {};
}