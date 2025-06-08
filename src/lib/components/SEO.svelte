<script lang="ts">
	import { page } from '$app/stores';

	export let title: string = 'Invochess';
	export let description: string =
		"Unlock your chess potential with Invochess. Get AI-powered insights by combining Stockfish's analytical strength with Gemini's explanatory power to deepen your understanding and win more games.";
	export let image: string = '/invochess-opengraph.png';
	export let siteName: string = 'Invochess';
	export let author: string | null = 'Fitzsixto';
	export let keywords: string =
		'chess, AI chess, SvelteKit, Stockfish, Gemini, chess analysis, game analyzer, openings lab, chess improvement, chess learning, chess tools, AI-powered chess, Supabase, Vercel';

	const siteUrlBase: string = 'https://invochess.vercel.app';

	$: currentPath = $page.url.pathname;

	$: canonicalUrl = `${siteUrlBase}${currentPath}`;
	const logoUrl: string = '/invochess-logo-min.png';

	// Construct JSON-LD
	$: jsonLdSchema = {
		'@context': 'https://schema.org',
		'@type': 'Website',
		name: siteName,
		url: canonicalUrl,
		logo: `${siteUrlBase}/invochess-logo-min.png`,
		description: description
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />
	{#if author}
		<meta name="author" content={author} />
	{/if}
	{#if keywords}
		<meta name="keywords" content={keywords} />
	{/if}

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:logo" content={logoUrl} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={new URL(siteUrlBase).hostname} />
	<meta property="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	{@html `<script type="application/ld+json">${JSON.stringify(jsonLdSchema, null, 2)}</script>`}
</svelte:head>