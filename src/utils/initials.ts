export default function Initials(username: string) {
    return username.split(" ").map((name) => name[0]?.toUpperCase()).join("")
}