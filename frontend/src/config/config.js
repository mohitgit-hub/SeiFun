import { http, createConfig } from '@wagmi/core'
import { seiTestnet } from '@wagmi/core/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
    chains: [seiTestnet],
    connectors: [injected()],
    transports: {
        [seiTestnet.id]: http(),
    },
})
