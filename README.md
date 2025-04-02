# svelte-lock

[![version](https://badgen.now.sh/npm/v/svelte-lock)](https://www.npmjs.com/package/svelte-lock)
[![downloads](https://badgen.now.sh/npm/dm/svelte-lock)](https://www.npmjs.com/package/svelte-lock)

Reactive lock manager for Svelte 5 with runes

## Installation

```bash
npm install svelte-lock
```

## Usage

A lock key can be a string or a symbol. You can use one or multiple keys to manage independent or shared lock
conditions.

### 1. Initialize lock context

Call `initLockContext()` once at the root of your Svelte app:

```svelte
<script>
	import { initLockContext } from 'svelte-lock';

	initLockContext();
</script>
```

### 2. Use `useLock()` inside a component

Use `useLock()` to observe and control the lock state for one or more keys.

#### Single key

```svelte
<script>
	import { useLock } from 'svelte-lock';

	const task = useLock(Symbol());

	function run() {
		task.lock();

		setTimeout(() => {
			task.release();
		}, 1000);
	}
</script>

<button on:click={run} disabled={task.isLocked}>
	{#if task.isLocked}
		Running...
	{:else}
		Run
	{/if}
</button>
```

#### Multiple keys

```svelte
<script>
	const lock = useLock(['saving', 'submitting']);

	if (lock.isLocked) {
		// true if either key is locked
	}
</script>
```

### 3. Use `getLocker()` for lower-level control

```svelte
<script>
	import { getLocker } from 'svelte-lock';

	const locker = getLocker();
	const release = locker.lock(['form', 'submit']);

	// Later
	release();
</script>
```

## API

### `initLockContext(): void`

Initializes the internal lock state.
Must be called once in a root-level component.

---

### `useLock(keys?: LockKey | LockKey[]): { ... }`

Returns an object for observing and controlling a specific lock or group of locks.
If no key is provided, a unique symbol will be used automatically.

- `isLocked: boolean` — reactive value; `true` if any of the provided keys are currently locked.
- `lock(): void` — locks all provided keys. Already locked keys stay locked.
- `release(): void` — removes the lock for all provided keys.

---

### `getLocker(): { ... }`

Returns an object for low-level lock operations with the following methods:

- **`lock(keys: LockKey[]): () => void`**  
  Locks the given keys. Returns a function that releases them.

- **`release(keys: LockKey[]): void`**  
  Manually removes keys from the lock.

- **`observe(keys: LockKey[]): { isLocked: boolean }`**  
  Creates a reactive observer for the given keys.  
  The `isLocked` property is `true` if any of the specified keys are currently locked.

- **`isLocked(keys: LockKey[]): boolean`**  
  Returns `true` if any of the given keys are currently locked.  
  _This is a non-reactive snapshot and does not update automatically._

---

## License

MIT
