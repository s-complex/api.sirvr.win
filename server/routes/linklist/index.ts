import { defineCachedHandler } from 'nitro/cache';
import { fetchLinksData } from '~/server/utils/fetchLinksData';

export default defineCachedHandler(
	async () => {
		const list = await fetchLinksData();

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
