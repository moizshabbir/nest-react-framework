const StorageKey:string = "app-login-session";

const str2ab = (str: string) => {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0; i < str.length; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return bufView;
  }

const encryption = (obj: object) => {
    const jsonString = JSON.stringify(obj);
  
    // Step 2: Convert the JSON string to binary data
    const binaryData = str2ab(jsonString);
    const nums: number[] = [].slice.call(new Uint8Array(binaryData));
    // Step 3: Convert binary data to base-64 encoded string using btoa()
    const base64String = btoa(String.fromCharCode.apply(null, nums));
    return base64String;
  }
  const decryption = (str: string|null) => {
    // Step 1: Decode base64 string to binary data using atob()
    try {
      if (str) {
  
        const decodedBinaryData = atob(str);
  
        // Step 2: Convert binary datsa to string
        let decodedString = '';
        for (let i = 0; i < decodedBinaryData.length; i++) {
          decodedString += String.fromCharCode(decodedBinaryData.charCodeAt(i) & 0xff);
        }
  
        // Step 3: Parse JSON string back into an object
        const decryptedObject = JSON.parse(decodedString);
        return decryptedObject
      }
    } catch (e) {
      localStorage.removeItem(StorageKey);
    }
  
  }

export const saveToken = (data: object) => {
    localStorage.setItem(StorageKey, encryption(data));
    console.log("Token saved", StorageKey);
}

export const preloadState = () => {
    return decryption(localStorage.getItem(StorageKey));
}

export const removeToken = () => {
  localStorage.removeItem(StorageKey);
}