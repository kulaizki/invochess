<script lang="ts">
	import { inview } from 'svelte-inview';
	let isInView = false;
	let hasAnimated = false;
</script>

<section 
	class="py-16 md:py-24 text-gray-200"
	use:inview={{ threshold: 0.1, unobserveOnEnter: true }}
	on:inview_change={(event) => {
		if (event.detail.inView && !hasAnimated) {
			isInView = true;
			hasAnimated = true;
		}
	}}
>
	<div class="container mx-auto px-4 transition-all duration-1000 transform {isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
		<div class="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
			<h2 class="text-4xl sm:text-5xl font-bold text-white leading-tight">Don't Just See Moves.</h2>
			<p class="text-4xl sm:text-5xl font-bold text-sky-400 leading-tight mt-1 sm:mt-2">Understand Them.</p>
			<p class="text-lg md:text-xl text-gray-400 mt-4 md:mt-5">
				Invochess goes beyond simple engine outputs, offering deep insights into the 'why' behind every critical position.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8 md:gap-10 items-stretch">
			<div class="bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl 
						border-2 border-transparent 
						hover:shadow-sky-500/10 hover:border-sky-600 hover:-translate-y-1 
						transition-all duration-300 ease-in-out 
						flex flex-col">
				<h3 class="text-2xl md:text-3xl font-semibold text-white mb-5">The Hurdles</h3>
				<p class="text-lg text-gray-400 mb-5 flex-grow">
					Standard chess engines show you the best lines, but often leave you wondering about the underlying strategy or the reasons for specific move choices. This makes true learning difficult.
				</p>
				<ul class="list-disc list-inside text-gray-400 space-y-2.5 pl-2 mt-auto text-lg">
					<li>Lost in complex variations.</li>
					<li>Vague strategic plans.</li>
					<li>Ineffective mistake learning.</li>
				</ul>
			</div>
			<div class="bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl 
						border-2 border-transparent 
						hover:shadow-sky-500/10 hover:border-sky-600 hover:-translate-y-1 
						transition-all duration-300 ease-in-out 
						flex flex-col">
				<h3 class="text-2xl md:text-3xl font-semibold text-white mb-5"><span class="text-sky-400">Our Solution</span></h3>
				<p class="text-lg text-gray-400 mb-5 flex-grow">
					We combine Stockfish's raw power with Gemini's advanced reasoning to provide clear, human-like explanations for moves, plans, and positional nuances, turning analysis into actionable learning.
				</p>
				<ul class="list-disc list-inside text-sky-400 space-y-2.5 pl-2 mt-auto text-lg">
					<li>Crystal-clear move explanations.</li>
					<li>Personalized strategic insights.</li>
					<li>Accelerated game improvement.</li>
				</ul>
			</div>
		</div>
	</div>
</section>  