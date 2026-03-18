import yaml from 'js-yaml';
import { defineCachedHandler } from 'nitro/cache';
import { fetch } from 'nitro';

interface FriendsList {
	[key: string]: { slogan: string; avatar: string; link: string };
}

export default defineCachedHandler(
	async () => {
		const source = await fetch(
			'https://raw.githubusercontent.com/s-complex/Friends/refs/heads/main/list.yml'
		);
		const list = yaml.load(await source.text()) as FriendsList;

		const result = Object.fromEntries(
			Object.entries(list).map(([key, value]) => [
				key,
				{ ...value, avatar: `https://api.sirvr.win/linklist/img/${value.avatar}` },
			])
		);

		return result;
	},
	{ maxAge: 60 * 60 }
);
