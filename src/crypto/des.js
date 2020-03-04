import cryptoJs from 'crypto-js'

// DES加密
export const encryptDes = (message, key) => {
    let keyHex = cryptoJs.enc.Utf8.parse(key);
    let option = { mode: cryptoJs.mode.ECB, padding: cryptoJs.pad.Pkcs7 };
    let encrypted = cryptoJs.DES.encrypt(message, keyHex, option);
    return encrypted.ciphertext.toString()
};

// DES解密
export const decryptDes = (message, key) => {
    let keyHex = cryptoJs.enc.Utf8.parse(key);
    let decrypted = cryptoJs.DES.decrypt(
        {
            ciphertext: cryptoJs.enc.Hex.parse(message)
        },
        keyHex,
        {
            mode: cryptoJs.mode.ECB,
            padding: cryptoJs.pad.Pkcs7
        }
    );
    return decrypted.toString(cryptoJs.enc.Utf8);
};

export const encryptMd5 = (data) => {
    // 加入字符编码
    return cryptoJs.MD5(data).toString().toUpperCase();
};

//base64编码
export const encryptBase64 = (message) => {
    let words  = cryptoJs.enc.Utf8.parse(message);
    return cryptoJs.enc.Base64.stringify(words).toString();
};
