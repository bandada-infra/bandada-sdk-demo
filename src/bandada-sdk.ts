import { ApiSdk } from "@bandada/api-sdk"
import figlet from "figlet"
import chalk from "chalk"
import * as emoji from "node-emoji"
import "dotenv/config"

// Theme.
const { log } = console
const bandadaPrimaryBold = chalk.hex("#E4CCFF").bold
const cloudEmoji = emoji.get("sun_behind_large_cloud")
const birdEmoji = emoji.get("bird")
const circleEmoji = emoji.get("purple_heart")

// Env.
const groupId = process.env.GROUP_ID!
const groupApiKey = process.env.GROUP_API_KEY!
const memberInviteCode = process.env.MEMBER_INVITE_CODE!

// Link to see the group info on the Bandada Dashboard
const groupLink = `https://bandada.pse.dev/groups/off-chain/${groupId}`

// Create a new instance of the Bandada SDK.
const apiSdk = new ApiSdk()

async function main() {
    log(`${bandadaPrimaryBold(figlet.textSync("Bandada SDK Demo"))}\n`)

    /**
     * getGroups
     * Returns all Bandada off-chain groups.
     */
    const groups = await apiSdk.getGroups()
    log(`${birdEmoji} There are currently ${bandadaPrimaryBold(groups.length)} off-chain groups`)

    /**
     * getGroup
     * Returns a specific group.
     */
    const { id, name, description, admin, treeDepth, fingerprintDuration, createdAt, members, credentials } =
        await apiSdk.getGroup(groupId)
    log(`\n${circleEmoji} Bandada Group ${bandadaPrimaryBold(id)} (${bandadaPrimaryBold(groupLink)})`)
    log(`\nGroup data:`)
    log(`   Name: ${bandadaPrimaryBold(name)}`)
    log(`   Description: ${bandadaPrimaryBold(description)}`)
    log(`   Admin: ${bandadaPrimaryBold(admin)}`)
    log(`   Tree depth: ${bandadaPrimaryBold(treeDepth)}`)
    log(`   Fingerprint duration: ${bandadaPrimaryBold(fingerprintDuration)}`)
    log(`   Created at: ${bandadaPrimaryBold(createdAt)}`)
    log(`   Members: ${bandadaPrimaryBold(members.length === 0 ? "[]" : members)}`)
    log(`   Credentials: ${bandadaPrimaryBold(credentials)}`)

    /**
     * addMemberByApiKey
     * Adds a member to a group using an API Key.
     */
    const memberIdApiKey = "1"
    await apiSdk.addMemberByApiKey(groupId, memberIdApiKey, groupApiKey)

    log(`\nAdding the member ${bandadaPrimaryBold(memberIdApiKey)} using an API Key`)
    log(`Group members: ${bandadaPrimaryBold(`[${(await apiSdk.getGroup(groupId)).members}]`)}`)

    /**
     * addMemberByInviteCode
     * Adds a member to a group using an Invite Code.
     * An invite code can be used to join a group only once and for one member.
     */
    const memberIdInviteCode = "2"
    await apiSdk.addMemberByInviteCode(groupId, memberIdInviteCode, memberInviteCode)

    log(`\nAdding the member '${bandadaPrimaryBold(memberIdInviteCode)}' using an invite Code`)
    log(`Group members: `, bandadaPrimaryBold(`[${(await apiSdk.getGroup(groupId)).members}]`))

    /**
     * addMembersByApiKey
     * Adds multiple members to a group using an API Key.
     */
    const memberIds = []
    for (let i = 3; i < 10; i += 1) {
        memberIds.push(i.toString())
    }
    await apiSdk.addMembersByApiKey(groupId, memberIds, groupApiKey)

    log(`\nAdding members [${bandadaPrimaryBold(memberIds)}] using an API Key`)
    log(`Group members: ${bandadaPrimaryBold(`[${(await apiSdk.getGroup(groupId)).members}]`)}\n`)

    /**
     * isGroupMember
     * Returns true if the member is in the group and false otherwise.
     */
    const memberId = "1"
    const isMember = await apiSdk.isGroupMember(groupId, memberId)

    log(`Is '${bandadaPrimaryBold(memberId)}' member of the group? ${bandadaPrimaryBold(isMember)}`)

    /**
     * generateMerkleProof
     * Returns the Merkle Proof for a member in a group.
     */
    const merkleProof = await apiSdk.generateMerkleProof(groupId, memberId)
    const { root, leaf, pathIndices, siblings } = JSON.parse(JSON.stringify(merkleProof))
    log(`\nGenerate Merkle Proof of the member ${bandadaPrimaryBold(memberId)}:`)
    log(`   Root: '${bandadaPrimaryBold(root)}'`)
    log(`   Leaf: '${bandadaPrimaryBold(leaf)}'`)
    log(`   Path indices: [${bandadaPrimaryBold(pathIndices)}]"`)
    log(`   siblings: [${bandadaPrimaryBold(...siblings)}]`)

    /**
     * removeMemberByApiKey
     * Removes a member from a group using an API Key.
     */
    const memberIdToRemove = "1"
    await apiSdk.removeMemberByApiKey(groupId, memberIdToRemove, groupApiKey)

    log(`\nRemoving member '${bandadaPrimaryBold(memberIdToRemove)}' using an API Key`)
    log(`Group members: ${bandadaPrimaryBold(`[${(await apiSdk.getGroup(groupId)).members}]`)}\n`)

    /**
     * removeMembersByApiKey
     * Removes multiple members from a group using an API Key.
     */
    const membersIdsToRemove = ["2", "3", "4"]
    await apiSdk.removeMembersByApiKey(groupId, membersIdsToRemove, groupApiKey)

    log(`Removing members [${bandadaPrimaryBold(membersIdsToRemove)}] using an API Key`)
    log(`Group members: ${bandadaPrimaryBold(`[${(await apiSdk.getGroup(groupId)).members}]`)}\n`)

    log(
        `${cloudEmoji}  You have ${bandadaPrimaryBold("successfully")} interacted with ${bandadaPrimaryBold("Bandada SDK")} ${cloudEmoji}`
    )
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
