import { createLocalStorageSyncedWritableString } from '../util/localStorageSyncedWriteable';

export const freeMd = createLocalStorageSyncedWritableString(
	`A free space, to write whatever you please in the stonetop style.

For example:
- GM Notes
- Threats
- Handouts
- Custom moves
- Love letters`,
	'free-md'
);
