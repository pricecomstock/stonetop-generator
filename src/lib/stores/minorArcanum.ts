import {
	createLocalStorageSyncedWritableString,
	createLocalStorageSyncedWritableJSON,
	createLocalStorageSyncedWritableInt
} from '../util/localStorageSyncedWriteable';

import { derived, type Readable } from 'svelte/store';
import type { MinorArcanum } from '../types';

export const title = createLocalStorageSyncedWritableString('Sample Minor Arcanum', 'minor-title');

export const load = createLocalStorageSyncedWritableInt(1, 'minor-load');
export const loadNote = createLocalStorageSyncedWritableString('', 'minor-load-note');
export const tags = createLocalStorageSyncedWritableString('fragile, clumsy', 'minor-tags');

export const frontMd = createLocalStorageSyncedWritableString(
	`When you ***load up the page***, begin typing markdown in the boxes to the left, referencing the table at the bottom of the page.

When you ***make a change in the input text box***, the content of the cards will update to reflect it. Choose as many of the following as you please:

- lists of requirements
- progress meters \\prog3
- spells
- moves
- monsters or followers
- tables to roll on
- consequences`,
	'minor-front-md'
);

export const backMd = createLocalStorageSyncedWritableString(
	`# Unlocked Arcanum
\\mark4 Bubbles

Seems like you've learned more about this item.

When you ***are ready to export***, click one of the buttons on the left and roll +INT: **On a 10+**, it works as well as you could hope. Enjoy your new arcana! **On a 7-9**, there's a visual bug or something isn't laid out quite right. **On a 6-**, it's probably best to just submit an issue on [Github](https://github.com/pricecomstock/stonetop-generator).

> Thanks for checking this out!`,
	'minor-back-md'
);

export const monogram = createLocalStorageSyncedWritableString('', 'minor-monogram');

export const minorArcanum: Readable<MinorArcanum> = derived(
	[title, load, loadNote, tags, frontMd, backMd, monogram],
	([$title, $load, $loadNote, $tags, $frontMd, $backMd, $monogram]) => {
		return {
			title: $title,
			load: $load,
			loadNote: $loadNote,
			tags: ($tags ?? [])
				.split(',')
				.map((tag) => tag.trim())
				.filter((tag) => tag.length > 0),
			frontMd: $frontMd,
			backMd: $backMd,
			monogram: $monogram
		};
	}
);
