---
title: Getting your Revolt authentication token
description: You need it sometimes, so you can get it.
coverImage: /posts/revolt-tokens/empty-devtools.png
date: "2021-11-28T21:56:11.216Z"
relation:
    project: revolt
author:
    name: Infi
    picture: https://github.com/infi.png
ogImage: /posts/revolt-tokens/empty-devtools.png
---

:::note{type="danger"}
**Never, never, never ever share your session token!** Anyone with your session token will be able to read your private messages and send messages as you.
:::

Sometimes, you need to do advanced tasks with the Revolt API. This requires you to get an API token.  
Revolt doesn't use global user tokens, it rather uses session tokens. This means that the token is different for every instance of you being logged in, and expires when you log out.

It is relatively easy to get a session token using the DevTools of your browser.

Those instructions are for Chrome, and the Revolt Desktop App, but Firefox has a similar flow with its own DevTools.

## Let's get started

First, log into Revolt in your browser or the desktop app. Next, we need to open the DevTools. You can open the DevTools by pressing `Ctrl + Shift + I` (or `Cmd + Shift + I` on Mac).  
Click on the `Network` tab and select the `Fetch/XHR` filter, like this:
![](/posts/revolt-tokens/empty-devtools.png)

Now, you can see the requests that are being sent to the API. If you don't see any, you can click around in the app and see the requests that are being made. You can also reload the page if you still don't see any requests.

Click on one of the requests and select the `Headers` tab.  
Scroll down to the `x-session-token` header (it's towards the bottom of the list). The value of this header is your session token.

This should help you to get started with the Revolt API.
