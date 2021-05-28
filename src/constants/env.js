// Set this for local development
const localDev = false

// STATIC //
export var serverUrl
if (process.env.NODE_ENV === "development") {
    if (localDev) {
        serverUrl = "http://localhost:5000"
    } else {
        serverUrl = "https://dev.api.fotura.co"
    }
} else {
    serverUrl = "https://api.fotura.co"
}
