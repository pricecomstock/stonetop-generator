<script>
	import Load from '$lib/components/Load.svelte';
</script>

<div class="welcome md-render">
	<img src="img/typewriter.png" alt="" />
	<h1>Stonetop Arcanum Generator</h1>
	<div class="tags"><Load count={2} />, magical, experimental</div>
	<p>
		Hello! This is a tool designed for use with the <a
			href="https://spoutinglore.blogspot.com/2018/07/stonetop.html">Stonetop</a
		>
		TTRPG by <a href="https://spoutinglore.blogspot.com/">Jeremy Strandberg</a>. The game has a
		beautiful print style, and a unique set of magic items known as <i>Arcana</i>.
	</p>
	<p>
		Every now and then someone asks on the Discord for templates to make Arcana that look like the
		ones included with the game. There are blank templates in the book, and it seems there is an
		Adobe InDesign template floating around somewhere. But I was interested in a project about
		rendering markdown into images and PDFs, and this scratched that itch.
	</p>
	<p>Hope you find it useful!</p>

	<h3>Details</h3>
	<p>
		<b>How to Use.</b> You'll fill out the form and write Markdown. Check out the table at the bottom
		of every page (including this one) for examples
	</p>
	<hr />
	<p>
		<b>Stack.</b> I used <a href="https://kit.svelte.dev/">SvelteKit</a>. The site is mostly
		client-side rendered. You can check out the source code on my Github.
	</p>
	<hr />
	<p>
		<b>Inspirations and Influences.</b> Definitely
		<a href="https://homebrewery.naturalcrit.com/">The Homebrewery</a>, which makes D&D 5e content
		from Markdown.
	</p>

	<h3>Updates</h3>
	<p><b>2023-04-02.</b> Initial Release</p>

	<h3>Future Possibilities</h3>
	<h5><span class="checkboxes">▢</span>Better Monster/Follower/NPC blocks</h5>
	<p>
		The arcana that come with the game have nice blocks with icons indicating creature type. I'm not
		sure what the copyright on those icons is, and it would be a bit of effort and <i
			>weird syntax</i
		>
		to get the monster blocks laid out just as they are with the game's Arcana.
	</p>
	<p>
		For now, you can get reasonably close with the <code>{`{{monster ...}}`}</code> tag and other formatting.
		See the table below.
	</p>
	<hr />
	<h5><span class="checkboxes">▢</span>More Free Writing Options</h5>
	<p>
		The formatting so far is built specifically for Arcana, but things like two-column layouts would
		allow more similar formatting to content in the book.
	</p>
	<hr />
	<h5><span class="checkboxes">▢</span>Playbooks</h5>
	<p>
		It would definitely be a lot of work to capture all the flexibility that goes into a playbook,
		and I don't know how much work it would actually save versus laying it out manually using the
		templates. But it might be neat!
	</p>
</div>

<style lang="postcss">
	.welcome {
		font-size: 1.25em;
		margin: 2rem auto;
		max-width: 40rem;

		& h1 {
			text-align: center;
		}

		& p {
			margin-bottom: 1rem;
		}

		& img {
			max-height: 25rem;
			margin: 1rem auto;
		}
	}
</style>
