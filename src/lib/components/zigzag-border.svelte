<svg width="100%" height="20" viewBox="0 0 1200 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" class="my-4 md:my-8">
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <path 
    id="zigzag-path"
    d="M0 14 L100 4 L200 14 L300 4 L400 14 L500 4 L600 14 L700 4 L800 14 L900 4 L1000 14 L1100 4 L1200 14" 
    stroke="currentColor" 
    stroke-width="2" 
    fill="none" 
    class="text-sky-500 path-style"
  />

  <circle cx="0" cy="0" r="3.5" 
          fill="currentColor" 
          stroke="currentColor" 
          stroke-width="1" 
          class="text-sky-300 circle-style" 
          filter="url(#glow)">
    <animateMotion dur="5s" repeatCount="indefinite">
      <mpath href="#zigzag-path" />
    </animateMotion>
  </circle>
</svg>

<style>
  .path-style {
    filter: drop-shadow(0 0 3px rgb(14 165 233 / 0.7));
  }
  /* The circle gets its glow from the SVG filter, fill and stroke from text-sky-300 */
</style> 