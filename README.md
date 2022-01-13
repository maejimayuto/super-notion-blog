# Super Notion Blog
This is a project that allows Notion to be published externally on its own domain.  
Next.js on Vercel + Notion private API  
**Demo**: https://maejimayuto.com/blog

## Getting Started
First, follow this [getting started guide](https://maejimayuto.com/blog/authentication-notion-private-api-en) to get a `BLOG_INDEX_ID` and a `NOTION_TOKEN`, then add them to a .env file.

``` bash
BLOG_INDEX_ID=
NOTION_TOKEN=
```

Install dependencies

``` bash
yarn
```

Start the server with

``` bash
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmaejimayuto%2Fsuper-notion-blog&env=BLOG_INDEX_ID,NOTION_TOKEN&envDescription=BLOG_INDEX_ID%20and%20NOTION_TOKEN%20are%20required%20to%20retrieve%20information%20from%20Notion%20private%20API&envLink=https%3A%2F%2Fmaejimayuto.com%2Fblog%2Fauthentication-notion-private-api-en&project-name=super-notion-blog&repo-name=super-notion-blog&demo-title=Super%20Notion%20Blog&demo-description=You%20can%20publish%20Notion%20externally%20on%20your%20own%20domain.&demo-url=https%3A%2F%2Fmaejimayuto.com%2Fblog)


## How to publish your own blog
There are two simple steps to follow. 1.

1. Customize it in your own way
2. Deploy to Vercel

In the future, I would like to eliminate the step 1 and display the information in Notion as it is on all pages.
Currently, there are some pages and site names that need to be changed in order to use it for yourself.

Please refer to the following page for detailed instructions.

[前島 悠人 \| How to publish your blog on Super Notion Blog](https://maejimayuto.com/blog/publish-super-notion-blog-en)

If you have any questions, please feel free to contact me and I will help you!
[@maejimayuto](https://twitter.com/maejimayuto)
