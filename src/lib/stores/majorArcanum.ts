import {
	createLocalStorageSyncedWritableString,
	createLocalStorageSyncedWritableInt
} from '../util/localStorageSyncedWriteable';

import { derived, type Readable } from 'svelte/store';
import type { MajorArcanum } from '../types';

export const imgUrl = createLocalStorageSyncedWritableString(
	'http://via.placeholder.com/250',
	'major-img-url'
);
export const title = createLocalStorageSyncedWritableString(
	'Major Arcanum Generator',
	'major-title'
);

export const load = createLocalStorageSyncedWritableInt(0, 'major-load');
export const loadNote = createLocalStorageSyncedWritableString('', 'major-load-note');
export const tags = createLocalStorageSyncedWritableString('close, powerful', 'major-tags');

export const frontMd = createLocalStorageSyncedWritableString(
	`When you ***load up the page***, begin typing.

When you ***make a change in the input text box***, the content of the cards will update
to reflect it.`,
	'major-front-md'
);

export const backMd = createLocalStorageSyncedWritableString(
	`## Mysteries of the Back of the card
### Spells
**Inspired Creation.** Call upon your accumulated knowledge of fantasy tropes and sticky situations, writing
a dramatic and fascinating item.

---
**Export.** When you are finished, click the *Export* button to download a PNG of your Major Arcanum.
### Consequences
- You feel an insatiable urge to create homebrew content for Stonetop.`,
	'major-back-md'
);

export const majorArcanum: Readable<MajorArcanum> = derived(
	[imgUrl, title, load, loadNote, tags, frontMd, backMd],
	([$imgUrl, $title, $load, $loadNote, $tags, $frontMd, $backMd]) => {
		return {
			imgUrl: $imgUrl,
			title: $title,
			load: $load,
			loadNote: $loadNote,
			tags: ($tags ?? [])
				.split(',')
				.map((tag) => tag.trim())
				.filter((tag) => tag.length > 0),
			frontMd: $frontMd,
			backMd: $backMd
		};
	}
);
