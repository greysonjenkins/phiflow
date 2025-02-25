<script lang="ts">
  import { Card, Button, GradientButton } from 'flowbite-svelte';
  import { ArrowRightOutline } from 'flowbite-svelte-icons';
  
  const features = [
    { title: 'Logic Sandbox', description: 'Experiment with propositional logic in our interactive sandbox.' },
    { title: 'Argument Mapping', description: 'Visualize the structure of arguments with our mapping tool.' },
    { title: 'Premise Analysis', description: 'Break down complex arguments into their constituent parts.' },
    { title: 'Truth Tables', description: 'Generate and analyze truth tables for logical expressions.' },
    { title: 'Collaborative Features', description: 'Share and discuss your work with peers and mentors.' },
    { title: 'Learning Resources', description: 'Access a wealth of tutorials and guides on logical reasoning.' }
  ];
  </script>
  
  <div class="bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="bg-white dark:bg-gray-900 mt-8">
      <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 class="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome to PhiFlow</h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Explore the world of philosophical arguments and symbolic logic with the help of PhiFlow's intuitive tools and activities.</p>
        <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <GradientButton color="purpleToBlue" href="/tools/sandbox" class="w-full sm:w-auto">Try Sandbox <ArrowRightOutline class="w-3.5 h-3.5 ml-2" /></GradientButton>
          <Button color="light" href="/about" class="w-full sm:w-auto">Learn More</Button>
        </div>
      </div>
    </section>
  
    <!-- Features Section -->
    <section class="bg-gray-50 dark:bg-gray-800">
      <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="max-w-screen-md mb-8 lg:mb-16">
          <h2 class="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">Designed for philosophical thinkers</h2>
          <p class="text-gray-500 sm:text-xl dark:text-gray-400">PhiFlow develops tools to help you in your analyses of complex philosophical arguments.</p>
        </div>
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {#each features as feature}
          <Card padding="lg">
            <h3 class="mb-2 text-xl font-bold dark:text-white">{feature.title}</h3>
            <p class="text-gray-500 dark:text-gray-400">{feature.description}</p>
          </Card>
          {/each}
        </div>
      </div>
    </section>
  
    <!-- CTA Section -->
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
          <h2 class="mb-4 text-3xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">Start your logical journey today</h2>
          <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">Try our Sandbox to explore PhiFlow's dynamic, responsive logical evaluation.</p>
          <GradientButton color="purpleToBlue" href="/tools/sandbox" class="w-full sm:w-auto">Get started</GradientButton>
        </div>
      </div>
    </section>
  </div>