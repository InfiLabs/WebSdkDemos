const sdk = window.InfiAccessorySDK;
let sdkClient = null;
let signInClient = null;

const appConfig = {
  appId: "YOUR_APPID",
  appSecret: "YOUR_APP_SECRET",
  channelId: "CHANNEL_ID",
};

const { encrypt, decrypt } = genAes256(appConfig.appSecret);

const rawConfig = {
  appId: appConfig.appId,
  channelId: appConfig.channelId,
  loginName: "user_",
  userType: "guest",
  /** 设置从此刻起十分钟过期 */
  expire: new Date(Date.now() + 600000),
};

document.getElementById("init-sdk").addEventListener("click", async () => {
  const config = {
    token: rawConfig.appId + "@" + encrypt(JSON.stringify(rawConfig)),
    channelId: rawConfig.channelId,
    loginName: rawConfig.loginName,
  };

  const result = await sdk.createClient(config);
  if (result.code === 0) {
    sdkClient = result.payload;
    console.log("SDK Client created:", sdkClient);

    sdkClient.on("CONNECTION_CLOSED", (data) => {
      console.log(
        "websocket connection closed, will start reconnect soon",
        data
      );
    });

    sdkClient.on("CONNECTING", (data) => {
      console.log("websocket connecting", data);
    });
    sdkClient.on("RECONNECTED", (data) => {
      console.log("websocket reconnected", data);
    });
    sdkClient.on("ERROR", (data) => {
      console.log("init error", data);
    });
  } else if (result.code === 4) {
    console.error("SDK Client already initialized");
  } else {
    console.error("Error creating SDK Client:", result.code);
  }
});

document.getElementById("create-client").addEventListener("click", async () => {
  if (sdkClient) {
    const { code, payload } = sdkClient.getSignInClient();
    signInClient = payload;

    signInClient.on("SIGNIN_SESSION_STARTED", (data) => {
      console.log("有新的签到", data);
    });
    signInClient.on("REMOTE_SIGNED_IN", (data) => {
      console.log("有人签到了，签到信息：", data);
    });
    signInClient.on("REMAINING_TIME_SYNC", (data) => {
      console.log("最新的剩余时间", data);
    });
    signInClient.on("SESSION_ENDED", (data) => {
      console.log("当前签到结束了", data);
    });
    console.log("Creating SignIn client:", code, payload);
  } else {
    console.error("SDK Client not initialized");
  }
});

document
  .querySelector("#create-signin-session")
  .addEventListener("click", async () => {
    if (signInClient) {
      try {
        const res = await signInClient.createSignInSession({
          title: "SignIn Session",
          duration: 20,
        });
        if (res.code) {
          throw new Error(res.code);
        }
      } catch (error) {
        console.error("Exception creating SignIn session:", error);
      }
    }
  });

document
  .querySelector("#create-infinity-signin-session")
  .addEventListener("click", async () => {
    if (signInClient) {
      try {
        const res = await signInClient.createSignInSession({
          title: "SignIn Session",
          duration: 0,
        });
        if (res.code) {
          throw new Error(res.code);
        }
      } catch (error) {
        console.error("Exception creating SignIn session:", error);
      }
    }
  });

document.querySelector("#sign-in").addEventListener("click", async () => {
  if (signInClient) {
    const res = await signInClient.signIn("some string");
    if (!res.code) {
      console.log(`SignIn`, res);
    } else {
      console.error(`SignIn error: ${res.code}`);
    }
  }
});

document
  .querySelector("#terminate-signin-session")
  .addEventListener("click", async () => {
    if (signInClient) {
      const res = await signInClient.terminateCurrentSession();
      console.log(res);
      if (res.code === 0) {
        console.log(`Terminate SignIn Session`, res);
      } else {
        console.error(`SignIn error: ${res.code}`);
      }
    }
  });

document
  .querySelector("#destroy-signin-client")
  .addEventListener("click", () => {
    if (signInClient) {
      signInClient.destroy();
      signInClient = null;
      console.log(`Destroy SignIn Client`, signInClient);
    } else {
      console.error(`app error: No SignIn Client`);
    }
  });

function genAes256(preKey) {
  let keyString = preKey;
  const len = keyString.length;
  if (len > 32) {
    keyString = keyString.substring(0, 32);
  } else if (len < 32) {
    keyString += "xxxxxxxxxxxxxxxxxxxxxx".substring(0, 32 - len);
  }
  const key = CryptoJS.enc.Utf8.parse(keyString);
  const iv = CryptoJS.enc.Hex.parse("1934576290ABCBEF1264147890ACAE45");
  function encrypt(text) {
    const srcs = CryptoJS.enc.Utf8.parse(text);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  }
  function decrypt(text) {
    const decryptResult = CryptoJS.AES.decrypt(text, key, {
      //  AES解密
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const resData = decryptResult.toString(CryptoJS.enc.Utf8).toString();
    return resData;
  }
  return {
    encrypt,
    decrypt,
  };
}
