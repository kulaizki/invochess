<script lang="ts">
  // No specific logic needed for this page, it's purely informational.
  // You could add a countdown or a button to resend confirmation if desired in the future.
</script>

<div class="flex-grow flex flex-col items-center justify-center p-6 text-center">
  <div class="bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl max-w-lg">
    <h1 class="text-3xl font-bold text-white mb-6">Almost there!</h1>
    <p class="text-sky-300 text-lg mb-4">
      We've sent a confirmation link to your email address.
    </p>
    <p class="text-gray-400 mb-8">
      Please check your inbox (and spam folder, just in case) and click the link to complete your registration and activate your Invochess account.
    </p>
    <p class="text-sm text-gray-400">
      Didn't receive an email? You can try signing up again or contact support if the issue persists.
      <!-- In a future step, you could add a "Resend confirmation" button here -->
    </p>
    <div class="mt-8">
      <a href="/login" class="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-md transition-colors duration-150">
        Go to Login
      </a>
    </div>
  </div>
</div> 