import CryptoJS from 'crypto-js/crypto-js';

export function encryption(data) {
    // let strs=[];
    // for(let i in data){
    //     strs.push(i+'='+data[i]);
    // }
    // strs.sort();
    // strs=strs.join('&');
    let endData = JSON.stringify(data);
    console.log(endData)
    let key = CryptoJS.enc.Utf8.parse("1A2A354D1F223C4E"); // 加密秘钥
    let iv = CryptoJS.enc.Utf8.parse("2A5D12CBEF18CE31");  //  矢量
    let encryptResult = CryptoJS.AES.encrypt(endData,key, {   //  AES加密
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7  // 后台用的是pad.Pkcs5,前台对应为Pkcs7
    });
    return encryptResult.ciphertext.toString().toUpperCase() // Base64加密再 encode;
}
export function decryption(data) {
    let key = CryptoJS.enc.Utf8.parse("1A2A354D1F223C4E");  // 加密秘钥
    let iv = CryptoJS.enc.Utf8.parse("2A5D12CBEF18CE31");   //  矢量
    let baseResult=CryptoJS.enc.Base64.parse(data);   // Base64解密
    let ciphertext=CryptoJS.enc.Base64.stringify(baseResult);     // Base64解密
    let decryptResult = CryptoJS.AES.decrypt(ciphertext,key, {    //  AES解密
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    let resData=decryptResult.toString(CryptoJS.enc.Utf8).toString();

    return JSON.parse(resData);

}
