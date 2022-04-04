import base64 from "base-64"

export const CreatePaginationEncoding = (count, offset) => {
    let b64Str = base64.encode(JSON.stringify({count : count, offset: offset}))
    return b64Str.replaceAll("+", ".").replaceAll("/", "-").replaceAll("=", "-")
}

export const CreateFilterEncoding = (jsonData) => {
    let b64Str = base64.encode(JSON.stringify(jsonData))
    return b64Str.replaceAll("+", ".").replaceAll("/", "-").replaceAll("=", "-")
}