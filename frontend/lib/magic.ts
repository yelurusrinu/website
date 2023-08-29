import { Magic } from 'magic-sdk';

const createMagic = (key: any) => {
    // We make sure that the window object is available
    // Then we create a new instance of Magic using a publishable key
    return typeof window !== 'undefined' && new Magic(key, { network: customNodeOptions });
};

// Pass in your publishable key from your .env file
export const magic = createMagic(process.env.MAGIC_PUBLISHABLE_KEY);

export const customNodeOptions = {
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/', // Polygon RPC URL  
    chainId: 80001, // Polygon chain id
}