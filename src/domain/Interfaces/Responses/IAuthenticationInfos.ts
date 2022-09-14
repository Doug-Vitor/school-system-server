export default interface IAuthenticationInfos {
    authenticatedUserId: string
    authenticatedUsername: string
    isAdmin: boolean
    generatedToken: string
    expirationDate: Date
}