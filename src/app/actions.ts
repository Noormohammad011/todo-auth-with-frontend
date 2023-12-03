'use server'

import { cookies } from 'next/headers'

async function deleteCookie() {
    cookies().delete('refreshToken')
}



export { deleteCookie }

