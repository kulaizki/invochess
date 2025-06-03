<script lang="ts">
	import { page } from '$app/state';

	export let title: string = 'Invochess - AI-Powered Chess Analysis';
	export let description: string =
		"Unlock your chess potential with Invochess. Get AI-powered insights by combining Stockfish's analytical strength with Gemini's explanatory power to deepen your understanding and win more games.";
	export let image: string = '/invochess-og.png'; 
	export let siteName: string = 'Invochess';
	export let author: string = 'Fitzsixto';
	export let keywords: string = 'chess, AI chess, SvelteKit, Stockfish, Gemini, chess analysis, game analyzer, openings lab, chess improvement, chess learning, chess tools, AI-powered chess, Supabase, Vercel';

	let siteUrlBase: string = 'https://www.invochess.vercel.app';

	let currentPath = '';
	$: if (page && page.url) {
		currentPath = page.url.pathname;
	}

	function getAbsoluteImageUrl(imgPath: string): string {
		if (imgPath.startsWith('http')) {
			return imgPath;
		}
		const path = imgPath.startsWith('/') ? imgPath.substring(1) : imgPath;
		return `${siteUrlBase}/${path}`;
	}

	let absoluteImageUrl: string;
	$: absoluteImageUrl = getAbsoluteImageUrl(image);

	let canonicalUrl: string;
	$: canonicalUrl = `${siteUrlBase}${currentPath}`;

	// Construct JSON-LD
	let jsonLdSchema: Record<string, any>;
	$: jsonLdSchema = {
		'@context': 'https://schema.org',
		'@type': 'Website',
		name: title,
		url: canonicalUrl,
		logo: getAbsoluteImageUrl('/invochess-logo-min.png') 
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
	<meta property="og:image" content={absoluteImageUrl} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={new URL(siteUrlBase).hostname} />
	<meta property="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={absoluteImageUrl} />

	{@html `<script type="application/ld+json">${JSON.stringify(jsonLdSchema, null, 2)}</script>`}
</svelte:head>
