export function extractAppIndicator(appName: string) {
    return  appName.split('-')[1] || appName
}
