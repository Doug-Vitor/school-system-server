export default interface IAuthenticationInfos {
    authenticatedUserId: string
    authenticatedUsername: string
    ownsTeacherProfile: boolean
    isAdmin: boolean
    token: {
        generatedToken: string
        expirationDate: Date
    }
}