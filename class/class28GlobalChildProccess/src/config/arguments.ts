import minimist from "minimist"

const optionalArgsObj = {
    alias: {
        p: "port"
    },
    default: {
        port: 8080
    }
}

export const args = minimist(process.argv.slice(2), optionalArgsObj)