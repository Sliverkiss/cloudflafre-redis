### Use Redis in Cloudflare Workers
1. 拉取仓库 ```git clone https://github.com/Sliverkiss/cloudflare-redis.git```
2. 安装环境
```
cd cloudflare-redis
npm install -g @cloudflare/wrangler
npx wrangler login
npm install hono
npm install @upstash/redis
```

3. 注册```Upstash```账号，申请一个Redis数据库
4. 将```src/index.js```中```url```和```token```的值填写为```Redis```数据库的```url```和```token```
5. 上传到cloudflare
   ```
   npx wrangler deploy
   ```

