<script lang="ts">
  import { user } from '$lib/store';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let welcomeMessage = '';

  onMount(() => {
    const unsubscribe = user.subscribe(currentUser => {
      if (currentUser) {
        welcomeMessage = `Welcome to your Dashboard, ${currentUser.email}!`;
      } else {
        // If not logged in and not already redirecting, navigate to login
        // This check avoids potential redirect loops if navigation is slow
        if (typeof window !== 'undefined') { // Ensure this runs only client-side for goto
          goto('/login');
        }
      }
    });

    return () => {
      unsubscribe();
    };
  });

</script>

<div class="flex-grow flex flex-col items-center justify-center p-6">
  {#if $user}
    <div class="bg-gray-800 p-8 rounded-xl shadow-2xl text-center">
      <h1 class="text-3xl font-bold text-white mb-4">Invochess Dashboard</h1>
      <p class="text-sky-300 text-lg">{welcomeMessage}</p>
      <p class="mt-6 text-gray-400">More cool dashboard features coming soon!</p>
      
      <button 
        on:click={async () => {
          const { error } = await supabase.auth.signOut();
          if (error) {
            console.error('Error logging out:', error.message);
            alert('Error logging out: ' + error.message);
          } else {
            // user store will be updated by onAuthStateChange in +layout.svelte
            // which should trigger redirect if this page requires auth
            // or simply update UI elsewhere
            await goto('/'); // Go to homepage after logout
          }
        }}
        class="hover:cursor-pointer mt-8 px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-md transition-colors duration-150 transform hover:scale-105">
        Log Out
      </button>
    </div>
  {:else}
    <p class="text-white">Loading dashboard...</p> 
  {/if}
</div>

<script context="module" lang="ts">
  import { supabase } from '$lib/supabaseClient';
</script> 