const CheckPayment = async (token: string) => {

    if (!token) {
        return {
            error: "No token provided",
            success: false,
        }
    }

    try {
        const resp = await fetch(`https://banking-tr.gta.world/gateway_token/${token}`)

        if (resp.status !== 200) {
            return {
                error: "Invalid token",
                success: false
            }
        }

        const data = await resp.json()
        console.log(data)
        if (data.routing_to != 10063312 || data.token_expired) {
            return {
                error: "Invalid token",
                success: false
            }
        } else {
            return {
                success: true,
                payment: data.payment,
                routing_from: data.routing_from
            }
        }
    }catch(err){
        return {
            error: "Invalid token",
            success: false
        }
    }



}

export const BankingApi = {
    CheckPayment
}