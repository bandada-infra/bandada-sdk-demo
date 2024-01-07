import { ApiSdk } from "@bandada/api-sdk"

async function main() {
    const apiSdk = new ApiSdk()
    const groups = await apiSdk.getGroups()
    console.log(groups[0])
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
