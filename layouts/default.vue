<template> 
  <div class="flex flex-col min-h-screen">
    <header>
      <AppHeader />
    </header>
    <main id="mainContent" class="flex-grow">
      <slot />
    </main>
    <footer>
      <AppFooter />
    </footer>
  </div>
</template>