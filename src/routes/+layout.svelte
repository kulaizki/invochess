<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<Header/>
	<main class="flex-grow flex flex-col pt-16 bg-gradient-to-br from-gray-900 to-gray-950">
		<slot />
	</main>
	<Footer/>
</div>
