export default interface IAuthenticationInfos {
    authenticatedUserId: string
    isAdmin: boolean
    generatedToken: string
    expirationDate: Date
}