---
title: GIFBox is up!
description: It's been 15 months and a week
date: "2022-08-12T17:15:40.752Z"
author:
    name: Infi
    picture: https://github.com/infi.png
---

Let's start with the big news: **[GIFBox](/project/gifbox) is now available at https://gifbox.me**!  
At the time of publishing, this was actually a bit over a year ago, so let's look at the journey that led up to this point.  
  
## GIFBox, The First  
  
I was helping out with [Revolt](https://revolt.chat), and it quickly became apparent that a modern chat platform simply not the same without a GIF picker to either find GIFs or save your memes in there. Discord had it, Slack had it, even Microsoft Teams had it.  
  
![Discord's GIF picker](/posts/gifbox-is-up/Screenshot_2022-08-12_001507.png)  
  
But there simply wasn't a GIF searching API that satisfied everyone enough, and so I decided to go on the journey of rolling my own for the sole purpose of being used by Revolt. GIFBox was a name chosen by the Revolt community, and seeing as it was freely available on [GitHub](https://github.com/gifbox), I assume that this is likely a new name not taken before.  
  
I quickly came up with a box-like logo &mdash; note the curious lack of a floor in the box &mdash; set the logotype in two weights of Helvetica, and started building my biggest personal project for the next while.

![Old GIFBox Logo](/posts/gifbox-is-up/old-logo.png)
  
### The API: Switching File Formats, but You're on Your Own

The API was built using a stack I knew. It was powered by [Express](https://expressjs.com) (most of which I learned during a phase in which I was steadily creating new Discord bots), and MongoDB for storage. The MinIO client libraries were used to interface with S3, though I do admit I only learned about the existence of MinIO through Revolt's use of it. The present-day API still uses all of those, and they are in fact good choices that I still take no issue with.  
  
The API has, of course, some very questionable coding and logic practices, and I would in no way consider it production-ready nowadays. Considering this was only a year ago, you may see the old API was admittedly very rushed, though I won't undersell the fact I have also certainly improved in the past year. The source code is still [available](https://gitlab.insrt.uk/gifbox/core) on Insert's GitLab, if you're interested.  
  
In the beginning, the API stored the GIFs in the literal GIF format. While this may seem as the most obvious thing, no other GIF service does this in practice. The reason for this is fundemantal: **GIFs are actually horrible.**  
  
The GIF format gives you an entirety of 256 colors, no alpha-channel transparency (a pixel is either transparent or not, no in-between), and there is no compression between any of the animated frames, so enjoy having a huge and yet still very poor-looking file in the end.  
  
Even during the first development cycle, I quickly realized that this will quickly become rather infeasible, and started to look for alternatives. Eventually, I stumbled upon [Tenor](https://tenor.com), another popular GIF aggregator owned by Google, and it's tendency to serve MP4s rather than GIFs. This seems like the perfect format for this, I thought: MP4's intra-frame compression works wonders for GIFs, as they usually don't change scene but rather often stay focused at the same environment, and with captioned GIFs, you often don't need to change the pixels between the frames at all. It seemed like the ultimate solution, but more on that later.  
  
And as such, I set out to convert every GIF into MP4 while it's uploaded &mdash; and back every time it's being served to a user &mdash; which, as you might imagine, doesn't have a shining performance footprint at all. Behind the scenes I used FFmpeg to process the files, and while this was a solid choice, it wasn't the very fastest. Although it is good enough, in fact, the modern GIFBox API still uses FFmeg behind the scenes, though a lot more sparingly.  
  
To top it all off, I didn't write any code to help you migrate your files or database at all! You were entirely left up to figuring out how to transfer any of those if you were hosting your very own GIFBox API. 
  
### The Frontend: Rather Weird, Rather Unusable, Nothing Like Expected

Of course, no one is expected to simply use the API by itself, so armed with `create-react-app` and a single mockup that I got some rather positive feedback on, I set out to build the next piece of the puzzle.

![The Mockup in Question](/posts/gifbox-is-up/first-mockup.png)  
  
Despite already having a rather clear vision of how I want the app to look and feel, I decided to use [Ant Design](https://ant.design) as a component library. The reasons for this are not explicable to me today. Inevitably, this meant that the final product ended up looking nothing like the mockup.  
  
Here's a brief showcase of what it offered:

![Sign Up Page](/posts/gifbox-is-up/signup_page.png)
![Upload Page](/posts/gifbox-is-up/upload_page.png)
![Main Page](/posts/gifbox-is-up/main_page.png)
![View Page](/posts/gifbox-is-up/view_page.png)
![Search Query Page](/posts/gifbox-is-up/search_query_page.png)
![Search Results Page](/posts/gifbox-is-up/search_page.png)  
  
I won't even go into half of the issues that are visible from just those screenshots, but I will explicitly take the time to mention that separating your search and query pages (and still having them on the same `/search` route) is a very silly idea.     
  
The avatar system ended up being really poorly thought-out back then: The user had to set a post ID as their avatar, and that post would then become their avatar. In hindsight, it's quite obvious that it would lead to "avatarposting", just so people could set their avatar to what they wanted. Though the frontend never supported setting an avatar or even displaying any avatars, as it never actually got that far.
  
### The Client: One Attempt to Make Things Better  
  
Even I eventually realized that the frontend had some room for improvement. In fact, a lot of room for improvement. It eventually became clear that a rewrite was the way forward. This time, armed with [Vite](https://vitejs.dev) as my toolchain &mdash; which is still my vastly preferred toolchain to Webpack and especially `create-react-app` &mdash; and no component framework in sight, I set out to make a client that is a lot closer to the original philosophy seen in the mockup above.  
  
In the end, it didn't get very far and I eventually lost interest in the project, but I will give extra points to myself for actually thinking of the possibility of the world speaking more than one language this time round.  
  
Almost any route ended you up on a "Coming Soon" placeholder page, and not even infinite scroll was implemented, as you can see by the presence of what is painfully obviously an unstyled HTML button.

![Main Page](/posts/gifbox-is-up/client_explore.png)
![Coming Soon Page (here on upload)](/posts/gifbox-is-up/client_upload.png)  
  
The first iteration effectively ends at this point, I lost interest in the project for a while.

## GIFBox, The Second  

Revolt was still left without any native GIF picker for months to come. This did grind my gears a lot, and I began to occasionally receive questions along the lines of "When will GIFBox be finally done?" (although in practice it is usually a pragmatic "@infi when gifbox"). I suddenly remembered about something I learned rather recently: The WebP format is surprisingly close to magic. It will comfortably turn a 7MB gif into a ~100KB webp file, which seemed very much astonishing to me.  
  
This was, to me, the *perfect opportunity* to restart GIFBox as a project.  
  
With the previous GIFBox branding not up to my standards, I have created a brand new logo and a bunch of other assets for GIFBox (which was about to become a lot closer to WebPBox).

![GIFBox Banner](/projects/gifbox/cover.webp)
![Overview of Adobe Illustrator Workspace](/posts/gifbox-is-up/gifbox-illustrator.png)  
  
The API still consists of a lot of the same building blocks from the first iteration. Same Express framework, same MongoDB database, and so on.  
  
Sure, there are a lot of smaller differences, like using the Argon2 hashing function for passwords instead of the older bcrypt function, but the main addition is converting files to WebP after upload. As the files are served as WebP directly instead of attempting to convert them on every request while completely uncached, the API became a lot faster too. The avatar system is now fixed too, using dedicated avatar images instead of attempting to reuse the posts system. This seems like a very obvious change, but you can thank the past me for not thinking of this during iteration one.  
  
Taking into account the positive experiences that the Revolt project made with using GitHub for code hosting, I've done the same and [github.com/gifbox](https://github.com/gifbox) became the home of all iteration two source code.
  
After finishing the very basic version of the API, I continued by writing an extensive [client library](https://js.gifbox.me) for the GIFBox API. Conveniently, the `gifbox.js` name was available for me to use. With GIFBox now being a sub-project of Revolt, this was perfect to mirror its `revolt.js` API client library.  
  
If you've been paying attention, you will notice that the first iteration didn't have a client library, the client directly calling the API routes. While this may be a valid method sometimes, building a client library has insane benefits that you only notice when you've built it.  

Oh, did I mention the fancy [gifbox.me](https://gifbox.me) domain we have now? Yeah, that's also pretty neat. There's a bit more to it, but I won't go into that in this article.  
  
With API and library out of the way, final step was to build the actual client. It had to be server-side rendered &mdash; otherwise, the Revolt API wouldn't be able to fetch the metadata of GIFBox links &mdash; as Revolt's embed crawler doesn't run JS. I have decided to use [Next.js](https://next.js) for that, effectively giving me the best of the server-side rendering and client-side rendering worlds.  
  
While I learned from the first client of the first iteration and didn't use a CSS framework this time, I consciously ignored the mockup to focus on a more functional and user-friendly style, though you will have to visit the website yourself to see how it looks.  
  
I did, however, use [Tailwind](https://tailwindcss.com). It has a lot of useful helper functions for layout and style, and one of Tailwind's default colors (Blue 500 or `#3b82f6`) is the primary brand color of GIFBox.  
  
This completes our small GIFBox history journey, be sure to check out the [final site](https://gifbox.com) and join the GIFBox Revolt server at https://rvlt.gg/gifbox!

> It's /dʒɪf/.