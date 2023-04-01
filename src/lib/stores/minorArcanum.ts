import {
	createLocalStorageSyncedWritableString,
	createLocalStorageSyncedWritableJSON,
	createLocalStorageSyncedWritableInt
} from '../util/localStorageSyncedWriteable';

import { derived, type Readable } from 'svelte/store';
import type { MinorArcanum } from '../types';

export const title = createLocalStorageSyncedWritableString(
	'Minor Arcanum Generator',
	'minor-title'
);

export const load = createLocalStorageSyncedWritableInt(0, 'minor-load');
export const loadNote = createLocalStorageSyncedWritableString('', 'minor-load-note');
export const tags = createLocalStorageSyncedWritableString('close, powerful', 'minor-tags');

export const frontMd = createLocalStorageSyncedWritableString(
	`When you ***load up the page***, begin typing.

When you ***make a change in the input text box***, the content of the cards will update
to reflect it.`,
	'minor-front-md'
);

export const backMd = createLocalStorageSyncedWritableString(
	`## Mysteries of the Back of the card
### Spells
**Inspired Creation.** Call upon your accumulated knowledge of fantasy tropes and sticky situations, writing
a dramatic and fascinating item.

---
**Export.** When you are finished, click the *Export* button to download a PNG of your Minor Arcanum.
### Consequences
- You feel an insatiable urge to create homebrew content for Stonetop.`,
	'minor-back-md'
);

export const minorArcanum: Readable<MinorArcanum> = derived(
	[title, load, loadNote, tags, frontMd, backMd],
	([$title, $load, $loadNote, $tags, $frontMd, $backMd]) => {
		return {
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
