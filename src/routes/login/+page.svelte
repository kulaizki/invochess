<script lang="ts">
  import { onMount } from 'svelte';

  let isInView = false;

  // Future: Add form handling logic and Supabase auth calls.
  let email = '';
  let password = '';

  function handleSubmit() {
    // TODO: Integrate with Supabase Auth
    console.log("Login form submitted", { email, password });
    alert("Login functionality not yet implemented.");
  }

  onMount(() => {
    // Trigger animation on mount with a slight delay for the transition to be visible.
    setTimeout(() => {
      isInView = true;
    }, 10); 
  });
</script>

<div class="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8 bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl transition-all duration-1000 transform {isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
    <div>
      <h2 class="mt-6 text-center text-3xl md:text-4xl font-bold tracking-tight text-white">
        Log in to Invochess
      </h2>
      <p class="mt-2 text-center text-sm text-gray-400">
        Or <a href="/signup" class="font-medium text-sky-400 hover:text-sky-300">create an account if you don't have one</a>
      </p>
    </div>
    <form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" bind:value={email} required
                 class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700/50 placeholder-gray-400 text-gray-200 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                 placeholder="Email address">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" type="password" bind:value={password} required
                 class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700/50 placeholder-gray-400 text-gray-200 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                 placeholder="Password">
        </div>
      </div>

      <div class="flex items-center justify-between mt-6">
        <div class="text-sm">
          <a href="#" class="font-medium text-sky-400 hover:text-sky-300"> <!-- TODO: Link to password reset -->
            Forgot your password?
          </a>
        </div>
      </div>

      <div class="mt-6">
        <button type="submit"
                class="font-semibold hover:cursor-pointer text-white group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-gray-900 bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-400 transition-colors duration-150 transform hover:scale-[1.02]">
          Sign In
        </button>
      </div>
    </form>
  </div>
</div> 