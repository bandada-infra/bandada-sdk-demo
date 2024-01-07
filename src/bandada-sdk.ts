import { ApiSdk } from "@bandada/api-sdk"
import "dotenv/config"

const groupId = process.env.GROUP_ID!
const groupApiKey = process.env.GROUP_API_KEY!
const memberInviteCode = process.env.MEMBER_INVITE_CODE!

// Link to see the group info on the Bandada Dashboard
const groupLink = `https://bandada.pse.dev/groups/off-chain/${groupId}`
console.log(groupLink)

// Create a new instance of the Bandada SDK.
const apiSdk = new ApiSdk()

async function main() {
    /**
     * getGroups
     * Returns all Bandada off-chain groups.
     */
    const groups = await apiSdk.getGroups()

    console.log("Bandada Groups Length", groups.length)

    /**
     * getGroup
     * Returns a specific group.
     */
    const group = await apiSdk.getGroup(groupId)

    console.log(`Group ${groupId}`, group)

    /**
     * addMemberByApiKey
     * Adds a member to a group using an API Key.
     */
    const memberIdApiKey = "1"
    await apiSdk.addMemberByApiKey(groupId, memberIdApiKey, groupApiKey)

    console.log(`Add member ${memberIdApiKey} using an API Key`)
    console.log(`Group ${groupId} members`, (await apiSdk.getGroup(groupId)).members)

    /**
     * addMemberByInviteCode
     * Adds a member to a group using an Invite Code.
     * An invite code can be used to join a group only once and for one member.
     */
    const memberIdInviteCode = "2"
    await apiSdk.addMemberByInviteCode(groupId, memberIdInviteCode, memberInviteCode)

    console.log(`Add member ${memberIdInviteCode} using an Invite Code`)
    console.log(`Group ${groupId} members`, (await apiSdk.getGroup(groupId)).members)

    /**
     * addMembersByApiKey
     * Adds multiple members to a group using an API Key.
     */
    const memberIds = []
    for (let i = 3; i < 10; i += 1) {
        memberIds.push(i.toString())
    }
    await apiSdk.addMembersByApiKey(groupId, memberIds, groupApiKey)

    console.log(`Add members ${memberIds} using an API Key`)
    console.log(`Group ${groupId} members`, (await apiSdk.getGroup(groupId)).members)

    /**
     * isGroupMember
     * Returns true if the member is in the group and false otherwise.
     */
    const memberId = "1"
    const isMember = await apiSdk.isGroupMember(groupId, memberId)

    console.log(`Is ${memberId} member of group ${groupId}`, isMember)

    /**
     * generateMerkleProof
     * Returns the Merkle Proof for a member in a group.
     */
    const merkleProof = await apiSdk.generateMerkleProof(groupId, memberId)

    console.log(`Merkle Proof of the member ${memberId} in the group ${groupId}`, merkleProof)

    /**
     * removeMemberByApiKey
     * Removes a member from a group using an API Key.
     */
    const memberIdToRemove = "1"
    await apiSdk.removeMemberByApiKey(groupId, memberIdToRemove, groupApiKey)

    console.log(`Remove member ${memberIdToRemove} using an API Key`)
    console.log(`Group ${groupId} members`, (await apiSdk.getGroup(groupId)).members)

    /**
     * removeMembersByApiKey
     * Removes multiple members from a group using an API Key.
     */
    const memberIdsToRemove = ["2", "3"]
    await apiSdk.removeMembersByApiKey(groupId, memberIdsToRemove, groupApiKey)

    console.log(`Remove members ${memberIdsToRemove} using an API Key`)
    console.log(`Group ${groupId} members`, (await apiSdk.getGroup(groupId)).members)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
