export interface AlertContact{
    partitionKey: string,
    rowKey: string,
    name: string,
    phoneNumber: string
    email: string,
    contactViaText: boolean
}