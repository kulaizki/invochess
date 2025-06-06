<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  let password = '';
  let passwordConfirm = '';
  let errorMessage: string | null = null;
  let successMessage: string | null = null;
  let loading = false;
  let isInView = false;
  let hasPasswordRecoverySession = false;

  onMount(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        hasPasswordRecoverySession = true;
      }
    });

    setTimeout(() => {
      isInView = true;
    }, 10);
  });

  async function handleSubmit() {
    if (password !== passwordConfirm) {
      errorMessage = "Passwords do not match.";
      return;
    }
    if (!password) {
      errorMessage = "Password cannot be empty.";
      return;
    }

    loading = true;
    errorMessage = null;
    successMessage = null;

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      errorMessage = error.message;
      console.error("Update password error:", error.message);
    } else {
      successMessage = 'Your password has been updated successfully. You can now log in with your new password.';
      await supabase.auth.signOut(); // Sign out the temporary session
      setTimeout(() => {
          goto('/login');
      }, 3000);
    }
    loading = false;
  }
</script>

<div class="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8 bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl transition-all duration-1000 transform {isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
    <div>
      <h2 class="mt-6 text-center text-3xl md:text-4xl font-bold tracking-tight text-white">
        Update Your Password
      </h2>
      <p class="mt-2 text-center text-sm text-gray-400">
        Enter and confirm your new password.
      </p>
    </div>
    <form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
      {#if errorMessage}
        <div class="p-3 bg-red-500/30 text-red-300 border border-red-500 rounded-md text-sm mb-4">
          {errorMessage}
        </div>
      {/if}
      {#if successMessage}
        <div class="p-3 bg-green-500/30 text-green-300 border border-green-500 rounded-md text-sm mb-4">
          {successMessage}
        </div>
      {/if}
      <div class="rounded-md shadow-sm space-y-4">
        <div>
          <label for="password" class="sr-only">New Password</label>
          <input id="password" name="password" type="password" bind:value={password} required
                 class="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-700 bg-gray-700/50 placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                 placeholder="New Password">
        </div>
        <div>
          <label for="password-confirm" class="sr-only">Confirm New Password</label>
          <input id="password-confirm" name="password-confirm" type="password" bind:value={passwordConfirm} required
                 class="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-700 bg-gray-700/50 placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                 placeholder="Confirm New Password">
        </div>
      </div>

      <div class="mt-6">
        <button type="submit"
                disabled={loading || !!successMessage}
                class="hover:cursor-pointer group relative inline-flex items-center justify-center gap-2.5 px-8 py-3 text-lg font-semibold text-white rounded-lg shadow-md transition-all duration-300 border-2 border-sky-900 bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700 hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed w-full">
          {#if loading}
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Updating...
          {:else}
            Update Password
          {/if}
        </button>
      </div>
    </form>
     <div class="text-sm text-center">
      <a href="/login" class="font-medium text-sky-400 hover:text-sky-300">
        Back to login
      </a>
    </div>
  </div>
</div> 