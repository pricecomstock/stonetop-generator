import {
	createLocalStorageSyncedWritableBool,
	createLocalStorageSyncedWritableString,
	createLocalStorageSyncedWritableInt
} from '../util/localStorageSyncedWriteable';

export const freeMd = createLocalStorageSyncedWritableString(
	`###### Free Writing

A free space, to write whatever you please in the stonetop style.

For example:
- Almanacs
- Adventure Starters
- Handouts
- Custom move sheets
- Love letters
- GM Notes
- Threats

\\q A question you might ask
\\q Another question

> ##### Custom move
> When you ***want to create a move for a specific situation***, it might look something like this.


> *Little asides like can be achieved using blockquote syntax.*

`,
	'free-md'
);

export const freeColumns = createLocalStorageSyncedWritableInt(2, 'free-columns');
export const freeFontSizePx = createLocalStorageSyncedWritableInt(18, 'free-font-size-px');
export const isLandscape = createLocalStorageSyncedWritableBool(false, 'free-is-landscape');
