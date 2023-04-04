import {
	createLocalStorageSyncedWritableString,
	createLocalStorageSyncedWritableInt
} from '../util/localStorageSyncedWriteable';

import { derived, type Readable } from 'svelte/store';
import type { MajorArcanum } from '../types';

export const imgUrl = createLocalStorageSyncedWritableString(
	'https://placehold.co/800x800',
	'major-img-url'
);
export const title = createLocalStorageSyncedWritableString('Sample Major Arcanum', 'major-title');

export const load = createLocalStorageSyncedWritableInt(2, 'major-load');
export const loadNote = createLocalStorageSyncedWritableString('', 'major-load-note');
export const tags = createLocalStorageSyncedWritableString('magical, warm, awkward', 'major-tags');

export const frontMd = createLocalStorageSyncedWritableString(
	`When you ***load up the page***, begin typing markdown in the boxes to the left, referencing the table at the bottom of the page.

When you ***make a change in the input text box***, the content of the cards will update to reflect it.

Since this is a Major Arcanum, you have quite a bit more room! Once you've done enough, you can unlock the back of the card

\\prog5

Maybe you also have a list of requirements, like this...

{{list
\\check Buy Stonetop
\\check Print Stonetop
\\check Gather your closest friends
\\check Play stonetop
}}`,
	'major-front-md'
);

export const backMd = createLocalStorageSyncedWritableString(
	`## Mysteries of the Back of the card
### Moves
##### \\check Export PNG
When you ***are finished with your arcanum and click the*** **Export PNG** ***button***, download a high quality PNG image of your Major Arcanum.

---

##### \\check Export for Print

When you ***are finished with your arcanum and click the*** **Print/PDF** ***button***, get a printable version of your arcanum. You can cut it out into a physical card with front and back.

### Spells
**Inspired Creation.** Call upon your accumulated knowledge of fantasy tropes and sticky situations, to write a dramatic and fascinating item.

---

**Wow Players.** Give your players a new quest or new abilities, or both!

### Consequences
\\check3 Your urge to create homebrew content for Stonetop increases.
\\check Share your created Arcana on the Stonetop Discord
\\check Summon a Player

{{monster
###### Player
*extraordinary, hardy, strong, stonetop-wise*
\\statframe {Armor} {1} {}
\\statframe {HP} {} {Max 6}

**Cost** a regularly scheduled session
{{indent(Loyalty \\prog3)}}

**Instinct** to portray a compelling character
{{indent
\\mm Pay attention
\\mm Take notes
\\mm Ask questions

}}
**Damage** punchers 1d4
}}`,
	'major-back-md'
);

export const monogram = createLocalStorageSyncedWritableString('', 'major-monogram');

export const majorArcanum: Readable<MajorArcanum> = derived(
	[imgUrl, title, load, loadNote, tags, frontMd, backMd, monogram],
	([$imgUrl, $title, $load, $loadNote, $tags, $frontMd, $backMd, $monogram]) => {
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
			backMd: $backMd,
			monogram: $monogram
		};
	}
);
