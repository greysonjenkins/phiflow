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
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 class="mt-10 mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome to PhiFlow</h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Explore the world of philosophical arguments and symbolic logic with our intuitive tools and interactive sandbox.</p>
        <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <GradientButton color="purpleToBlue" href="/tools/sandbox">Try Sandbox <ArrowRightOutline class="w-3.5 h-3.5 ml-2" /></GradientButton>
          <Button color="light" href="/about">Learn More</Button>
        </div>
      </div>
    </section>
  
    <!-- Features Section -->
    <section class="bg-gray-50 dark:bg-gray-800">
      <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="max-w-screen-md mb-8 lg:mb-16">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Designed for philosophical thinkers</h2>
          <p class="text-gray-500 sm:text-xl dark:text-gray-400">Here at PhiFlow, we focus on providing tools that help you analyze and visualize complex philosophical arguments.</p>
        </div>
        <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          {#each features as feature}
          <Card>
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
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">Start your logical journey today</h2>
          <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">Try our Logic Sandbox and experience the power of PhiFlow in structuring and analyzing arguments.</p>
          <GradientButton color="purpleToBlue" href="/tools/sandbox">Get started</GradientButton>
        </div>
      </div>
    </section>
  </div>