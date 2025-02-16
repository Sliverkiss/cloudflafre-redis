/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Hono } from "hono";
import { Redis } from '@upstash/redis/cloudflare';

const app = new Hono();

const redis = new Redis({
	url: 'https://sweeping-kitten-14437.upstash.io',
	token: 'AThlAAIjcDFmYWZiMjk4ZDk1NzE0MTNmYTkyZTVjOGRjNTM2ZTM1OXAxMA',
})

//读取所有键
app.get('/keys', async (c) => {
	try {
	  const keys = await redis.keys('*'); // 获取所有键
	  return c.json({ keys });
	} catch (error) {
	  return c.json({ error: 'Failed to retrieve keys' }, 500);
	}
  });

// 插入或更新单条数据
app.post('/set', async (c) => {
	try {
		const { key, value } = await c.req.json();
		await redis.set(key, JSON.stringify(value));
		return c.json({ message: 'Data set', key, value });
	} catch (error) {
		return c.json({ error: 'Invalid JSON body' }, 400);
	}
});

// 查找数据
app.get('/find/:key', async (c) => {
	try {
		const key = c.req.param('key');
		const value = await redis.get(key);
		return value ? c.json({ key, value }) : c.json({ error: 'Key not found' }, 404);
	} catch (e) {
		c.json({ error: 'Key not found' }, 404);
	}
});

// 删除数据
app.get('/delete/:key', async (c) => {
	try {
		const key = c.req.param('key');
		const result = await redis.del(key);
		return result ? c.json({ message: 'Data deleted', key }) : c.json({ error: 'Key not found' }, 404);
	} catch (e) {
		c.json({ error: 'Key not found' }, 404)
	}
});

export default app;
