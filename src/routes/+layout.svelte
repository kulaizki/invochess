<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/footer.svelte';
	import Navbar from '$lib/components/navbar.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<Navbar />
	<main class="flex-grow flex flex-col pt-16 bg-gradient-to-b from-gray-900 to-gray-950">
		<slot />
	</main>
	<Footer />
</div>
